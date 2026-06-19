import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeDataService } from '../../core/services/resume-data.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

/**
 * Core competencies (auto-scrolling marquee of chips) + categorized technical
 * skill cards. Pure presentational — data comes from ResumeDataService.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  private readonly data = inject(ResumeDataService);

  readonly competencies = this.data.competencies;
  readonly skillGroups = this.data.skillGroups;

  /** Duplicated list so the marquee loops seamlessly. */
  readonly marquee = [...this.competencies, ...this.competencies];
}
