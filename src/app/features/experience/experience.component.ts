import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ResumeDataService } from '../../core/services/resume-data.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * Vertical, descending professional timeline.
 * Each entry is expandable to reveal the full highlight list, animated with
 * Angular's animation engine. The most recent role starts expanded.
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective, IconComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [animate('320ms cubic-bezier(0.22,1,0.36,1)')]),
    ]),
  ],
})
export class ExperienceComponent {
  private readonly data = inject(ResumeDataService);

  readonly experience = this.data.experience;
  readonly education = this.data.education;
  readonly certifications = this.data.certifications;

  /** Tracks which timeline rows are expanded (first one open by default). */
  private readonly openState = signal<ReadonlySet<number>>(new Set<number>([0]));

  isOpen(index: number): boolean {
    return this.openState().has(index);
  }

  toggle(index: number): void {
    this.openState.update((set) => {
      const next = new Set(set);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }
}
