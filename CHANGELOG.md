# Changelog

## [Unreleased] — 2026-09-27

### 🧹 Chore: Remove unused components, files, and dependencies

Major cleanup pass — removed all dead code, unused components, orphaned library
files, the entire Payload CMS integration, and 10 unused npm packages.
The portfolio now runs on a lean, dependency-minimal stack.

---

#### Deleted — Components (superseded by `sections/` or never used)
- `src/components/Analytics.tsx` — Vercel Analytics wrapper, never mounted
- `src/components/Contact.tsx` — replaced by `sections/contact.tsx`
- `src/components/Education.tsx` — replaced by `sections/education.tsx`
- `src/components/ErrorBoundary.tsx` — defined but never imported
- `src/components/Experience.tsx` — replaced by `sections/work.tsx`
- `src/components/Expertise.tsx` — never used in any page or shell
- `src/components/Footer.tsx` — replaced by `sections/footer.tsx`
- `src/components/Hero.tsx` — replaced by `sections/hero.tsx`
- `src/components/Navbar.tsx` — replaced by `nav.tsx`
- `src/components/Projects.tsx` — replaced by `sections/projects.tsx`
- `src/components/ResumePreview.tsx` — never imported anywhere
- `src/components/SectionTitle.tsx` — only used by deleted components
- `src/components/ui/floating-resume-button.tsx` — never imported
- `src/components/ui/resume-preview-modal.tsx` — never imported

#### Deleted — Library / Utility Files
- `src/lib/date-utils.ts` — `formatDateRange` / `getCurrentYear` only used in deleted components
- `src/lib/design-tokens.ts` — `layout` token inlined directly into `nav.tsx`
- `src/lib/imagekit-loader.ts` — custom Next.js image loader, not wired up
- `src/lib/payload.ts` — Payload CMS client helpers, entire CMS removed
- `src/libs/contact.service.ts` — server action wrapping Discord webhook, unused
- `src/libs/discord.ts` — Discord webhook integration, unused
- `src/libs/indexedDB.ts` — contact form rate-limiting store, only used in deleted `Contact.tsx`
- `src/scripts/seed.ts` — Payload CMS seed script

#### Deleted — Payload CMS Config & Types
- `payload.config.ts` — full Payload CMS configuration (MongoDB, ImageKit plugin)
- `payload-types.ts` — auto-generated CMS type definitions

#### Deleted — Variant System (all stubs, no implementation)
- `src/variants/v0–v4/index.tsx` — each was a one-liner re-exporting `HomeShell`
- `src/variants/types.ts` — `VariantProps` interface tied to deleted CMS types

#### Deleted — Dead App Routes
- `src/app/cv/page.tsx` — `/cv` route, not linked from anywhere
- `src/app/cv/cv-shell.tsx` — only rendered by the deleted CV page
- `src/app/cv/cv.module.css` — only used by deleted `cv-shell.tsx`
- `src/app/cv/data.ts` — only used by deleted `cv-shell.tsx`

#### Deleted — No-op Files
- `src/middleware.ts` — `NextResponse.next()` with a single `/` matcher, no logic
- `src/types/globals.d.ts` — CSS module declarations, no CSS modules used in project

---

#### Modified — `src/components/nav.tsx`
- Removed `import { layout } from '@/lib/design-tokens'`
- Inlined `const NAV_HEIGHT = 56` and `const MAX_WIDTH = '1120px'` directly

#### Modified — `src/app/sitemap.ts`
- Removed Payload CMS `getProjects()` call
- Simplified to return static routes only

#### Modified — `next.config.ts`
- Removed `loader: 'custom'` and `loaderFile` pointing to deleted `imagekit-loader.ts`
- Switched to Next.js default image optimization with `remotePatterns` for `ik.imagekit.io`
- Cleaned up CSP: removed `va.vercel-scripts.com` (script-src) and `vitals.vercel-insights.com` (connect-src) — both were Vercel Analytics domains

#### Modified — `package.json`
- Removed unused `dependencies`:
  - `@payloadcms/db-mongodb`, `@payloadcms/next`, `@payloadcms/richtext-lexical`
  - `@vercel/analytics`
  - `dotenv`
  - `fast-check`
  - `payload`
  - `payloadcms-plugin-imagekit`
- Removed unused `devDependencies`:
  - `babel-plugin-react-compiler`
  - `baseline-browser-mapping`
- Removed dead scripts: `payload`, `generate:types`, `seed`

---

#### Stats
- **42 files changed**
- **8,373 lines removed**, 71 lines added (net: −8,302 lines)
- `pnpm-lock.yaml` slimmed significantly after removing 10 packages

---

### 🎨 UI/UX & Accessibility Audit Fixes

Conducted a thorough desktop (`1280x800`) and mobile (`375x812`) UX/UI audit in dark and light modes with subagent verification:

#### 1. Resume Links & Availability
- Fixed dead link: Updated `resumeUrl` in `src/lib/data.ts` and `command-palette.tsx` from `'/Raja_Babu_Dubey.pdf'` (404) to `'/resume'` (serving HTTP 200 PDF).
- Styled Hero "View Resume" with pill button styling (`px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`).
- Prevented orphaned separator dots in Hero socials by adding `whitespace-nowrap`.

#### 2. Wayfinding & Scroll Spy
- Fixed `offsetTop` calculation in `src/components/nav.tsx` and `src/components/section-indicator.tsx`: replaced `el.offsetTop` (which broke inside CSS-transformed `<FadeIn>` wrappers) with `el.getBoundingClientRect().top + window.scrollY`.
- Added bottom-of-page check (`isAtBottom`) to reliably activate "Contact" in both Navbar and Section Indicator when reaching maximum scroll.
- Enhanced Section Indicator: Converted static dots into interactive `<button>` elements with keyboard focus rings, `title`, and `aria-label` jump-to links.

#### 3. WCAG AA Contrast & Light Mode
- Replaced invisible inactive indicator dots in light mode (`bg-white/10`) with `bg-black/15 dark:bg-white/10`.
- Adjusted light mode muted tokens in `src/app/globals.css` (`--text-muted: rgba(0, 0, 0, 0.65)`, `--text-faint: rgba(0, 0, 0, 0.42)`) to satisfy WCAG AA contrast ratios.
- Fixed Command Palette contrast: group headers now use `t-muted` with `font-semibold`, and active keyboard items use `bg-black/5 dark:bg-white/[0.06] t-primary`.
- Enhanced Contact form fields with explicit `aria-label` tags, high-contrast borders, and emerald focus rings.

#### 4. Work Section Accordion Polish
- Added rotating chevron icons to accordion role headers indicating expanded (`rotate-180`) vs collapsed (`rotate-0`) state.

#### 5. Mobile Experience
- Added `GitHub ↗` repository link to mobile project accordion cards.
- Expanded mobile navigation tap targets to standard touch height (`min-h-[44px]`).
- Improved mobile drawer backdrop with `bg-surface/95 backdrop-blur-md shadow-xl`.

#### 6. Toast Animation Fix
- Preserved horizontal centering in `src/components/copy-effect.tsx` by passing `x: '-50%'` across Framer Motion `initial`, `animate`, and `exit` states.

---

### 🚀 Projects Update

- Added **JavaScript Playground** (`https://playground.rajadubey.in/`) to the Projects section:
  - Added `demoUrl` field to `Project` interface and data definition in `src/lib/data.ts`.
  - Added "Live Demo ↗" links with external tab navigation across desktop and mobile project views in `src/components/sections/projects.tsx`.


