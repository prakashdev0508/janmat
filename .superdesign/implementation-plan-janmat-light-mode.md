# JanMat Light Mode Implementation Plan

Source design:
- Project ID: `c06610fc-6688-44c5-ad60-516cadb4ba9c`
- Draft ID: `2f60e267-d6b0-48bf-88fa-a6492fa47d21`
- Draft title: `JanMat Political Sentiment Platform - Light Mode`

Current repo baseline:
- Next.js App Router (`next@16`, `react@19`)
- Existing route: `app/page.tsx`
- Existing global style file: `app/globals.css`

## 1) Scope and target architecture

Implement the fetched design as a production-ready homepage at `/` by replacing starter UI and extracting reusable sections into `app/components/home/`.

Target structure:
- `app/page.tsx` -> composition only
- `app/components/home/HomePage.tsx` -> top-level homepage composition
- `app/components/home/sections/` -> major sections
- `app/components/home/shared/` -> reusable UI blocks
- `app/components/home/homeData.ts` -> typed content/data for cards, stats, links
- `app/globals.css` -> global tokens and custom utility classes needed by the design

## 2) Design-to-code breakdown

Implement these sections in order:

1. Navigation bar (fixed top, translucent backdrop)
2. Hero section (live badge, headline, dual CTA, chart bars background)
3. Trending leaders grid (3 cards with score bars and vote CTA)
4. Region selector section (search input + chips + location CTA)
5. Key stats section (4 metric tiles)
6. How-it-works section (4 step cards)
7. Bottom CTA gradient banner
8. Footer (brand, links, newsletter form, legal row)

## 3) Component plan

Create these components:

- `HomePage`
  - Renders all homepage sections in order.

- `TopNav`
  - Brand cluster, desktop nav links, auth CTA pair.
  - Add responsive behavior: hide center links below `md`.

- `HeroSection`
  - Live indicator pill, headline copy, primary/secondary CTAs, decorative bar graph.

- `TrendingLeadersSection`
  - Section header and `LeaderCard` grid.

- `LeaderCard`
  - Props:
    - `name`
    - `role`
    - `avatarUrl`
    - `trend` (`up` | `down`)
    - `trendDelta`
    - `popularity`
    - `votesToday`
  - Includes progress bar and vote button.

- `RegionSelectorSection`
  - Search field, location button, state chips list.

- `StatsSection`
  - Map over stat tile config; include icon, value, label.

- `HowItWorksSection`
  - Map over four process steps.

- `BottomCtaSection`
  - Gradient card, heading, supporting copy, action button.

- `SiteFooter`
  - Four-column content + lower legal strip.

## 4) Data and typing plan

Introduce central typed content in `app/components/home/homeData.ts`:

- `leaders: Leader[]`
- `stateChips: string[]`
- `stats: StatItem[]`
- `howItWorksSteps: StepItem[]`
- `footerLinkGroups: FooterGroup[]`
- `socialLinks: SocialLink[]`

Add interfaces for each type and keep hardcoded copy out of JSX where possible.

## 5) Styling plan (Tailwind + CSS)

Use Tailwind classes for layout/spacing and keep a small set of custom classes in `app/globals.css`:

- `.hero-gradient`
- `.glass-card`
- `.status-pulse` (+ `@keyframes pulse`)

Token alignment:
- Keep current base variables in `:root`
- Add janmat semantic variables:
  - `--janmat-primary: #0d9488`
  - `--janmat-bg: #f8fafc`
  - `--janmat-text: #1e293b`
- Keep typography defaults but update heading/body stack toward design intent:
  - headings: `Cabinet Grotesk` fallback chain
  - body: `Satoshi` fallback chain

Note: if remote fonts are not desired, keep local fallback-only stack first and add fonts later via `next/font` in a separate pass.

## 6) Icon strategy

Design uses `iconify-icon` web component. For Next.js production consistency, prefer React icon packages:

- Option A (recommended): `lucide-react` for Lucide icons + simple social icons package (`react-icons`)
- Option B: use inline SVG components for all needed icons

Implementation default:
- Add `lucide-react`
- Replace all `iconify-icon` usages with React components

## 7) Accessibility and responsiveness checklist

- Ensure all links/buttons are keyboard reachable and have clear focus states
- Add descriptive `alt` text for all avatars/images
- Preserve heading hierarchy (`h1` once, then `h2`, `h3`)
- Mobile first:
  - nav links hidden on mobile
  - stacked CTA buttons
  - grid collapses: `lg:3 -> md:2 -> 1`
  - footer columns collapse to single column

## 8) Implementation milestones

Milestone 1 - foundation:
- Create folder/file structure
- Build `homeData.ts` typings + seed data
- Create section components with placeholder content

Milestone 2 - visual parity:
- Implement full markup/classes to match design
- Add custom CSS utilities (`hero-gradient`, `glass-card`, pulse)
- Replace `app/page.tsx` with `HomePage` composition

Milestone 3 - polish:
- Responsiveness pass
- Accessibility pass
- Micro-interaction tuning (hover/focus transitions)

Milestone 4 - verification:
- `npm run lint`
- Manual compare against fetched draft HTML
- Capture screenshot pass (desktop + mobile)

## 9) Acceptance criteria

- Homepage visually matches approved light-mode draft structure and style
- `app/page.tsx` remains clean and delegating to components
- No inline giant JSX blob in route file
- Components are typed, reusable, and data-driven
- Lint passes with no new errors

## 10) Suggested next command sequence (execution plan)

1. Add dependencies (if chosen): `npm i lucide-react react-icons`
2. Create `app/components/home/` component tree
3. Add `homeData.ts` and wire section props
4. Update `app/page.tsx` to render `<HomePage />`
5. Extend `app/globals.css` with janmat classes/tokens
6. Run `npm run lint` and iterate on issues
