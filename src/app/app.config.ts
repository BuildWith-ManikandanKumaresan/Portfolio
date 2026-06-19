import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * Root application providers (standalone bootstrap — no NgModules).
 * - provideAnimations(): enables Angular's animation engine for component transitions.
 * - provideZoneChangeDetection({ eventCoalescing: true }): batches DOM events into a
 *   single change-detection pass for smoother scrolling/animation performance.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
  ],
};
