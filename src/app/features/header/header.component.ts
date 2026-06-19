import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { ResumeDataService } from '../../core/services/resume-data.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

/**
 * Sticky top navigation.
 * - Highlights the active section via ScrollSpyService.
 * - Adds a `scrolled` style once the page is scrolled.
 * - Collapses into a slide-in drawer on mobile.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, IconComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private readonly spy = inject(ScrollSpyService);
  private readonly data = inject(ResumeDataService);

  readonly navItems = this.data.navItems;
  readonly initials = 'MK';

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly active = this.spy.activeSection;

  ngAfterViewInit(): void {
    // Defer to ensure all sections exist in the DOM.
    queueMicrotask(() => this.spy.observe(this.navItems.map((n) => n.id)));
  }

  ngOnDestroy(): void {
    this.spy.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onNavClick(event: MouseEvent, id: string): void {
    event.preventDefault();
    this.closeMenu();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }
}
