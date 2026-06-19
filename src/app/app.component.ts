import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  NgZone,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { HeaderComponent } from './features/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { IconComponent } from './shared/components/icon/icon.component';

/**
 * Application shell. Composes every feature section in DOM order, manages the
 * reading-progress bar and the back-to-top button, and dismisses the boot loader
 * once the first view has rendered.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    LoadingSpinnerComponent,
    IconComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);

  /** Reading progress 0–100 for the top bar. */
  readonly progress = signal(0);
  /** Show the floating back-to-top button. */
  readonly showTop = signal(false);
  /** Drives the boot loader fade-out. */
  readonly booting = signal(true);

  ngOnInit(): void {
    // Remove the inline pre-bootstrap loader injected in index.html.
    this.doc.querySelector('.app-preloader')?.remove();
  }

  ngAfterViewInit(): void {
    // Fade the Angular loading overlay shortly after first paint.
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.zone.run(() => this.booting.set(false)), 400);
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const el = this.doc.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
    this.progress.set(Math.min(100, Math.max(0, pct)));
    this.showTop.set(el.scrollTop > 600);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
