import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Full-screen loading overlay shown during the initial app boot and faded out
 * once the first view is painted. Reusable anywhere a busy state is needed.
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="loader" [class.loader--leaving]="leaving" role="status" aria-live="polite">
      <div class="loader__ring">
        <span></span><span></span><span></span>
      </div>
      <p class="loader__label">{{ label }}</p>
      <span class="sr-only">Loading content…</span>
    </div>
  `,
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {
  /** When true, plays the fade-out transition. */
  @Input() leaving = false;
  @Input() label = 'Loading';
}
