# Page Dependency Trees

## / (Home Page)
Entry: `app/page.tsx`

Dependencies:
- `app/page.tsx`
  - External: `next/image` (Image component)
- `app/layout.tsx` (route wrapper)
  - External: `next/font/google` (Geist, Geist_Mono)
- `app/globals.css` (global styles and theme tokens)
