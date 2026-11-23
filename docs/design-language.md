# reru.io landing — design language

Use this to avoid generic “AI landing page” patterns.

## Palette (only)

- `#000000` — page background
- `#100F0C` — cards / glass tint
- `#111111` — borders, muted surfaces
- Foreground `#f5f5f5`, muted text `#888888`
- No accent colors, no purple/blue gradients on the page

## Layout

- Minimal type hierarchy; one idea per block
- Centered hero; product in a **bento grid** (12 columns, `gap-3`)
- **Grain + gradient only inside boxes** (`.grain-panel`), never full-width sections
- **Glass** (`.glass-panel`) sparingly: hero callout, one bento cell, chart shell
- **Radius:** `rounded-sm` / `--radius: 0.25rem` — no pill buttons or heavy rounding

## Motion & graphics

- No decorative SVG icons, no animated SVGs, no stock illustrations
- No entrance animations; static UI
- Charts: neutral multi-series **area** only (shadcn chart + recharts)

## Copy

- Specific outcomes (percentages, providers, workflows), not “revolutionize / seamless / unlock”
- Short sentences; avoid triple adjective lists
- Name real mailbox providers and API verbs

## Components

- Prefer **shadcn/ui** (button, card patterns, tabs, chart, badge, separator) and tweak classes—do not rebuild primitives
- No lucide icons on the marketing page