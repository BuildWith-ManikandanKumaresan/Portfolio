import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

/**
 * Signal-based theme manager.
 * - Persists the choice to localStorage.
 * - Falls back to the OS `prefers-color-scheme` on first visit.
 * - Reflects the active theme onto <html data-theme> and the browser theme-color,
 *   so the global CSS-variable design system reacts instantly.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  /** Current theme as a reactive signal. */
  readonly theme = signal<Theme>(this.resolveInitialTheme());

  /** Convenience computed flag for templates. */
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Whenever the theme signal changes, apply it to the DOM + persist it.
    effect(() => this.applyTheme(this.theme()));

    // Keep in sync with OS changes only while the user hasn't made an explicit choice.
    const media = this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', (e) => {
      if (!this.hasStoredPreference()) {
        this.theme.set(e.matches ? 'dark' : 'light');
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.theme.set(theme);
  }

  // ---------- internals ----------

  private applyTheme(theme: Theme): void {
    const html = this.doc.documentElement;
    html.setAttribute('data-theme', theme);

    const meta = this.doc.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#0b1020' : '#f6f8fc');

    this.safeStore(theme);
  }

  private resolveInitialTheme(): Theme {
    const stored = this.safeRead();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    const prefersDark = this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark === false ? 'light' : 'dark';
  }

  private hasStoredPreference(): boolean {
    return this.safeRead() !== null;
  }

  private safeRead(): string | null {
    try {
      return this.doc.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private safeStore(theme: Theme): void {
    try {
      this.doc.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage may be unavailable (private mode) — fail silently */
    }
  }
}
