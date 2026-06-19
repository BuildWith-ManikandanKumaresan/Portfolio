# Manikandan Kumaresan — Portfolio

A modern, single-page **Angular 17 (standalone)** portfolio website with light/dark theming,
scroll-reveal animations, an animated typewriter hero, an expandable experience timeline, and a
Firebase Hosting deployment pipeline. **Zero runtime UI dependencies** — no UI framework, no icon
library, fully self-contained and offline-capable.

---

## ✨ Features

| Area              | Details                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Architecture**  | Angular 17 standalone components (no NgModules), feature-based folders, SCSS                 |
| **State**         | Angular **signals** for theme, scroll-spy, progress; RxJS-free reactive UI                  |
| **Theming**       | Light/Dark toggle persisted to `localStorage`, driven entirely by CSS custom properties     |
| **Animations**    | IntersectionObserver scroll-reveal directive, Angular animations, CSS keyframes              |
| **Hero**          | Animated typewriter cycling roles + staggered fade-in entrance                               |
| **Skills**        | Auto-scrolling competency marquee (pauses on hover) + categorized skill cards                |
| **Experience**    | Vertical descending timeline, each role expandable with animated height                      |
| **Projects**      | "Coming soon" empty state linking to GitHub (cards render automatically when projects are added) |
| **Contact**       | Clickable `mailto:`, `tel:`, LinkedIn, GitHub, Portfolio + résumé download                   |
| **Performance**   | OnPush change detection, `runOutsideAngular` animation loops, production budgets, asset caching |
| **SEO / PWA**     | Meta + Open Graph + Twitter tags, JSON-LD structured data, web manifest, SVG favicon, robots.txt |
| **A11y**          | Semantic landmarks, `aria-*`, focus-visible styles, `prefers-reduced-motion` support         |

---

## 📁 Project structure

```
portfolio/
├── angular.json                 # CLI workspace + build/serve/test targets
├── firebase.json                # Firebase Hosting config (SPA rewrite + cache headers)
├── .firebaserc                  # Firebase project alias
├── package.json
├── tsconfig*.json
├── public/                      # Copied verbatim to site root
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── robots.txt
└── src/
    ├── index.html               # SEO meta, JSON-LD, inline preloader
    ├── main.ts                  # Standalone bootstrap
    ├── styles.scss              # Global design system (CSS variables, both themes)
    ├── assets/
    │   └── Manikandan_Kumaresan_Resume.pdf
    └── app/
        ├── app.component.*      # Shell: progress bar, back-to-top, loader
        ├── app.config.ts        # Root providers (animations, zone coalescing)
        ├── core/
        │   ├── models/resume.model.ts
        │   ├── services/        # resume-data, theme, scroll-spy
        │   └── directives/scroll-reveal.directive.ts
        ├── shared/components/   # icon, theme-toggle, loading-spinner
        └── features/            # header, hero, skills, experience, projects, contact
```

---

## 🚀 Getting started

> Requires **Node.js 18.13+** (tested on Node 20/22/24) and npm 9+.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (http://localhost:4200)
npm start

# 3. Production build → dist/portfolio/browser
npm run build
```

Other scripts:

```bash
npm run watch        # rebuild on change (development config)
npm test             # Karma + Jasmine unit tests
```

---

## 🔥 Firebase deployment

### One-time setup

```bash
# Install the Firebase CLI globally (if you don't have it)
npm install -g firebase-tools

# Log in
firebase login

# Link this folder to a Firebase project.
# Choose "Use an existing project" (or create one), then:
#   - Public directory:        dist/portfolio/browser
#   - Single-page app rewrite: Yes
#   - Overwrite index.html:    No
firebase init hosting
```

> `firebase.json` and `.firebaserc` are already included. During `firebase init`,
> keep the existing files when prompted, or simply edit `.firebaserc` to set your
> own project id under `projects.default`.

### Build & deploy

```bash
# Build the production bundle and deploy in one step
npm run deploy

# …or manually
npm run build
firebase deploy --only hosting
```

After deploy the CLI prints your **Hosting URL** (e.g. `https://<project-id>.web.app`).

### Custom domain (optional)

In the Firebase Console → **Hosting → Add custom domain**, point `manikandan.in`
at the site and follow the DNS verification steps.

---

## 🎨 Customizing content

All copy lives in **one place** — `src/app/core/services/resume-data.service.ts`.
Update the `profile`, `skillGroups`, `experience`, `projects`, etc. and the whole
site updates. Swap the résumé PDF at `src/assets/Manikandan_Kumaresan_Resume.pdf`.

Theme colors are CSS variables in `src/styles.scss` under `:root` (dark) and
`html[data-theme='light']`.

---

## 🧱 Tech notes

- **No NgModules** — every component is `standalone: true`.
- **OnPush everywhere** — combined with signals for minimal change detection.
- **Animation loops** (typewriter, scroll handlers) run via `NgZone.runOutsideAngular`
  and only re-enter Angular when a signal value actually changes.
- **Scroll reveal** uses a per-element `IntersectionObserver` via a reusable directive.
- **Reduced motion** is respected throughout (`prefers-reduced-motion`).

---

© Manikandan Kumaresan
