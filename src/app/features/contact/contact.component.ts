import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeDataService } from '../../core/services/resume-data.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

/**
 * Contact call-to-action with clickable channels (mailto:, tel:, LinkedIn,
 * GitHub, portfolio) and a résumé download. Icon keys map to the inline-SVG
 * IconComponent.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly data = inject(ResumeDataService);

  readonly profile = this.data.profile;
  readonly links = this.data.contactLinks;

  iconOf(key: string): IconName {
    return key as IconName;
  }
}
