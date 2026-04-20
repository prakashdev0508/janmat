# LiveVotes Design System (Current Baseline)

## Product context
- Product: LiveVotes / JanMat Political Sentiment Platform
- Current codebase status: minimal Next.js starter baseline with one route (`/`)
- Objective: align implementation to approved SuperDesign drafts while preserving maintainable component architecture.

## Visual tokens from current codebase

### Colors
- Background (light): `#ffffff` via `--background`
- Foreground (light): `#171717` via `--foreground`
- Background (dark): `#0a0a0a`
- Foreground (dark): `#ededed`
- Additional utility usage in home page:
  - `bg-zinc-50`, `text-zinc-600`, `text-zinc-950`
  - Dark variants: `dark:bg-black`, `dark:text-zinc-400`, `dark:text-zinc-50`

### Typography
- Primary sans: `--font-geist-sans` (Geist)
- Monospace: `--font-geist-mono` (Geist Mono)
- Base body fallback currently set to `Arial, Helvetica, sans-serif`

### Spacing and layout
- Main content constrained to `max-w-3xl`
- Typical spacing seen: `px-16`, `py-32`, `gap-6`, `gap-4`
- Root layout enforces `min-h-full flex flex-col`

### Radius and shape
- CTA buttons use rounded pill style: `rounded-full`

### Motion and interaction
- Current interactions use Tailwind transition classes only:
  - `transition-colors`
  - hover-based color/background changes

## Component conventions for implementation
- Keep page shells in `app/` and extract reusable UI into `app/components/`
- Prefer stateless presentational components for design fidelity
- Add props for data/state, keep visuals stable and deterministic
- Keep class names readable; avoid over-abstracting until repeated usage appears

## Fidelity constraints for SuperDesign runs
- Reuse existing font stack (Geist variables + sans fallback)
- Preserve current light-mode neutrals unless the approved draft explicitly overrides them
- Maintain consistent rounded/full CTA treatment and spacing rhythm
- Do not introduce unapproved gradients, fonts, or color systems outside approved draft direction
