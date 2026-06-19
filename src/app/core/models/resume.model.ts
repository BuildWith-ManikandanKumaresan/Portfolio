/**
 * Strongly-typed domain models describing the resume content.
 * Keeping these in one place makes the data service the single source of truth
 * and gives templates full type-safety.
 */

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly phoneDisplay: string;
  readonly linkedin: string;
  readonly github: string;
  readonly portfolio: string;
  readonly summary: string;
  readonly yearsOfExperience: number;
  readonly resumeFile: string;
}

export interface SkillGroup {
  readonly category: string;
  readonly icon: string; // inline SVG path data or emoji glyph
  readonly skills: readonly string[];
}

export interface Competency {
  readonly label: string;
  readonly icon: string;
}

export interface ExperienceItem {
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly start: string;
  readonly end: string;
  readonly location: string;
  readonly current: boolean;
  readonly products: readonly string[];
  readonly highlights: readonly string[];
}

export interface ProjectCard {
  readonly title: string;
  readonly company: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly metric?: { readonly value: string; readonly label: string };
  readonly accent: 'indigo' | 'cyan' | 'emerald' | 'amber';
}

export interface EducationItem {
  readonly degree: string;
  readonly institution: string;
  readonly period: string;
}

export interface Certification {
  readonly title: string;
  readonly issuer: string;
  readonly year: string;
}

export interface ContactLink {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly icon: string;
  readonly external: boolean;
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
}
