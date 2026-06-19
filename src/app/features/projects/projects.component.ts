import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeDataService } from '../../core/services/resume-data.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * Portfolio / projects grid. When personal/open-source projects are added they
 * render as cards with a headline metric, tags and a colored accent. While the
 * list is empty, a friendly "coming soon" state links to GitHub instead.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective, IconComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly data = inject(ResumeDataService);
  readonly projects = this.data.projects;
  readonly github = this.data.profile.github;
}
