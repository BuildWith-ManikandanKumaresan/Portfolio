import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { IconComponent } from '../icon/icon.component';

/**
 * Accessible light/dark theme switch. The actual persistence + DOM reflection
 * lives in ThemeService; this is a thin, reusable control.
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <button
      class="toggle"
      type="button"
      role="switch"
      [attr.aria-checked]="theme.isDark()"
      [attr.aria-label]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      [title]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      (click)="theme.toggle()"
    >
      <span class="toggle__track">
        <span class="toggle__thumb" [class.toggle__thumb--dark]="theme.isDark()">
          <app-icon [name]="theme.isDark() ? 'moon' : 'sun'" [size]="15" />
        </span>
      </span>
    </button>
  `,
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
}
