import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type GalleryImage = {
  src: string;
  alt: string;
  tag: string;
  copy: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  readonly galleryImages: GalleryImage[] = [
    {
      src: '/images/gallery/gallery-portrait.jpg',
      alt: 'Mother breastfeeding her newborn in a warm, calm space',
      tag: 'Postpartum closeness',
      copy: 'A quiet moment of nourishment and connection.'
    },
    {
      src: '/images/gallery/gallery-square.jpg',
      alt: 'Mother and newborn gazing at each other with tenderness',
      tag: 'Bonding',
      copy: 'Early days filled with soft eye contact and trust.'
    },
    {
      src: '/images/gallery/gallery-landscape-01.jpg',
      alt: 'Mother wrapped in a purple shawl during a resting ritual',
      tag: 'Rest ritual',
      copy: 'Warmth, stillness, and gentle restoration.'
    },
    {
      src: '/images/gallery/gallery-landscape-02.jpg',
      alt: 'Pregnant mother dancing with a supporter in a sunlit room',
      tag: 'Movement',
      copy: 'Celebrating the body and its rhythm.'
    },
    {
      src: '/images/gallery/gallery-extra-01.png',
      alt: 'Family moment during postpartum care',
      tag: 'Family care',
      copy: 'Held with calm, tenderness, and practical support.'
    },
    {
      src: '/images/gallery/gallery-extra-02.png',
      alt: 'Newborn and mother in a tender home moment',
      tag: 'Tender beginnings',
      copy: 'Soft transitions into daily life with your baby.'
    },
    {
      src: '/images/gallery/gallery-extra-03.png',
      alt: 'Mother and baby resting in a peaceful room',
      tag: 'Recovery',
      copy: 'Protecting rest so healing can unfold naturally.'
    },
    {
      src: '/images/gallery/gallery-extra-04.png',
      alt: 'Supportive postpartum scene with mother and newborn',
      tag: 'Grounded support',
      copy: 'Steady care adapted to your family rhythm.'
    },
    {
      src: '/images/gallery/gallery-extra-05.png',
      alt: 'Newborn care moment guided by a doula',
      tag: 'Newborn guidance',
      copy: 'Gentle techniques for soothing and connection.'
    },
    {
      src: '/images/gallery/gallery-extra-06.png',
      alt: 'Mother receiving attentive postpartum care',
      tag: 'Being held',
      copy: 'Care that centers your comfort and wellbeing.'
    },
    {
      src: '/images/gallery/gallery-extra-07.png',
      alt: 'Family bonding with newborn in a calm environment',
      tag: 'First days',
      copy: 'Creating safety and confidence, one day at a time.'
    },
    {
      src: '/images/gallery/gallery-extra-08.png',
      alt: 'Postpartum support and nurturing at home',
      tag: 'Nurture',
      copy: 'Warm, practical care rooted in respect.'
    },
    {
      src: '/images/gallery/gallery-extra-09.png',
      alt: 'Mother and baby receiving calm support',
      tag: 'Confidence',
      copy: 'Helping you feel informed and capable every day.'
    },
    {
      src: '/images/gallery/gallery-extra-10.png',
      alt: 'Gentle newborn care in a supportive home setting',
      tag: 'Gentle routines',
      copy: 'Rhythms that feel safe and realistic for your home.'
    },
    {
      src: '/images/gallery/gallery-extra-11.png',
      alt: 'Quiet postpartum ritual with mother and baby',
      tag: 'Quiet rituals',
      copy: 'Small moments that protect emotional recovery.'
    },
    {
      src: '/images/gallery/gallery-extra-12.png',
      alt: 'Family-centered postpartum support session',
      tag: 'Family-centered',
      copy: 'Holding mother, baby, and family as one unit.'
    },
    {
      src: '/images/gallery/gallery-extra-13.png',
      alt: 'Mother and newborn in a serene bonding moment',
      tag: 'Serenity',
      copy: 'A calm atmosphere where connection deepens.'
    },
    {
      src: '/images/gallery/gallery-extra-14.png',
      alt: 'Nurturing postpartum scene with newborn',
      tag: 'Care in practice',
      copy: 'Compassionate support for real everyday needs.'
    }
  ];

  readonly currentSlide = signal(0);
  readonly contactFeedback = signal('');
  readonly contactFeedbackType = signal<'success' | 'error'>('success');
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.resumeCarousel();
  }

  ngOnDestroy(): void {
    this.pauseCarousel();
  }

  nextSlide(): void {
    const next = (this.currentSlide() + 1) % this.galleryImages.length;
    this.currentSlide.set(next);
  }

  prevSlide(): void {
    const next = (this.currentSlide() - 1 + this.galleryImages.length) % this.galleryImages.length;
    this.currentSlide.set(next);
  }

  setSlide(index: number): void {
    this.currentSlide.set(index);
  }

  pauseCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  resumeCarousel(): void {
    this.pauseCarousel();
    this.intervalId = setInterval(() => this.nextSlide(), 4200);
  }

  sendContactEmail(fullName: string, email: string, dueDateOrBabyAge: string, hopesAndNeeds: string): void {
    const normalizedFullName = fullName.trim();
    const normalizedEmail = email.trim();
    const normalizedDueDateOrBabyAge = dueDateOrBabyAge.trim();
    const normalizedHopesAndNeeds = hopesAndNeeds.trim();

    if (!normalizedFullName || !normalizedEmail || !normalizedHopesAndNeeds) {
      this.contactFeedbackType.set('error');
      this.contactFeedback.set('Please complete full name, email address, and message.');
      return;
    }

    const subject = `New inquiry from ${normalizedFullName}`;
    const body = [
      'Hello Cocomama Doula,',
      '',
      'A new contact form inquiry has been submitted:',
      '',
      `Full name: ${normalizedFullName}`,
      `Email: ${normalizedEmail}`,
      `Due date or baby age: ${normalizedDueDateOrBabyAge || 'Not provided'}`,
      '',
      'Hopes and needs:',
      normalizedHopesAndNeeds,
      '',
      '--',
      'Sent from cocomamadoula.uk contact form'
    ].join('\n');

    const mailtoUrl = `mailto:info@cocomamadoula.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    this.contactFeedbackType.set('success');
    this.contactFeedback.set('Your email app should open with your message pre-filled.');
  }
}
