import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Reusable scroll-reveal directive backed by a single shared IntersectionObserver.
 *
 * Usage:
 *   <div appScrollReveal>...</div>
 *   <div appScrollReveal="left" [revealDelay]="120">...</div>
 *
 * It adds the `.reveal` base class (+ optional variant) immediately, then toggles
 * `.is-visible` when the element scrolls into view. Animation styling lives in
 * the global stylesheet (`styles.scss`) so it can be themed/overridden centrally.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  /** Optional variant: '' | 'left' | 'right' | 'scale' */
  @Input('appScrollReveal') variant: '' | 'left' | 'right' | 'scale' = '';

  /** Stagger delay in milliseconds. */
  @Input() revealDelay = 0;

  /** Reveal only once (default) or re-trigger every time it re-enters. */
  @Input() revealOnce = true;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    el.classList.add('reveal');
    if (this.variant) {
      el.classList.add(`reveal--${this.variant}`);
    }
    if (this.revealDelay) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    // Respect reduced-motion: reveal immediately, skip the observer.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            if (this.revealOnce) {
              this.observer?.unobserve(el);
            }
          } else if (!this.revealOnce) {
            el.classList.remove('is-visible');
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
