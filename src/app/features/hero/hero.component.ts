import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ResumeDataService } from '../../core/services/resume-data.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * Hero / intro section.
 * - Animated typewriter that cycles through `heroRoles`.
 * - Fade-in entrance handled by CSS animations.
 * - CTAs: download resume + jump to contact.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly data = inject(ResumeDataService);
  private readonly zone = inject(NgZone);

  readonly profile = this.data.profile;
  readonly roles = this.data.heroRoles;

  /** Text currently shown by the typewriter. */
  readonly typed = signal('');

  private timer?: ReturnType<typeof setTimeout>;
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;

  ngOnInit(): void {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this.typed.set(this.roles[0]);
      return;
    }
    // Run the loop outside Angular; only the signal.set re-enters CD.
    this.zone.runOutsideAngular(() => this.tick());
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private tick = (): void => {
    const current = this.roles[this.roleIndex];

    if (this.deleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    const slice = current.slice(0, this.charIndex);
    this.zone.run(() => this.typed.set(slice));

    let delay = this.deleting ? 45 : 85;

    if (!this.deleting && this.charIndex === current.length) {
      delay = 1600; // pause on a fully-typed word
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 350;
    }

    this.timer = setTimeout(this.tick, delay);
  };

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
