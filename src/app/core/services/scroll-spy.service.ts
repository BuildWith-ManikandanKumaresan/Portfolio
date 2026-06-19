import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject, signal } from '@angular/core';

/**
 * Tracks which page section is currently in view and exposes it as a signal,
 * so the sticky header can highlight the active nav link.
 *
 * One IntersectionObserver watches all registered section ids; the entry with
 * the greatest visible ratio wins.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly doc = inject(DOCUMENT);
  private readonly zone = inject(NgZone);

  readonly activeSection = signal<string>('home');

  private observer?: IntersectionObserver;
  private readonly ratios = new Map<string, number>();

  /** Begin observing the given section ids. Safe to call after the view renders. */
  observe(ids: readonly string[]): void {
    this.disconnect();

    // Run outside Angular to avoid change-detection churn on every scroll frame.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            this.ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }

          let best = this.activeSection();
          let bestRatio = -1;
          for (const [id, ratio] of this.ratios) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = id;
            }
          }

          if (bestRatio > 0 && best !== this.activeSection()) {
            // Re-enter Angular only when the value actually changes.
            this.zone.run(() => this.activeSection.set(best));
          }
        },
        { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: '-20% 0px -50% 0px' },
      );

      for (const id of ids) {
        const el = this.doc.getElementById(id);
        if (el) {
          this.ratios.set(id, 0);
          this.observer!.observe(el);
        }
      }
    });
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.ratios.clear();
  }
}
