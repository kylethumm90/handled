# handled. app — desktop + mobile UI

Production-ready React implementation of the approved hi-fi mockups
(Claude design, June 2026): desktop command-center layout (Dashboard
variant A) plus the mobile-first layout, as **one responsive codebase**.
Sample data is Hayes Plumbing Co. — identical to the mockups.

## Run it

```bash
cd app
npm install
npm run dev        # http://localhost:5173
```

Desktop layout kicks in at ≥1024px (navy sidebar); below that you get
the mobile layout (bottom tab bar, card lists, full-width actions).

## What's here

| Path | Contents |
| --- | --- |
| `src/styles/tokens.css` | Design tokens (colors, radii, font) as CSS variables |
| `src/styles/app.css` | All component styles; the only place with media queries |
| `src/data/types.ts` | UI data contracts (mirror Supabase tables where they exist) |
| `src/data/sample.ts` | Mockup sample data — swap for real queries |
| `src/components/primitives.tsx` | AgentChip, StatusPill, TierPill, SourceTag, Toggle, Checkbox, ScoutCard, Stars |
| `src/shell/AppShell.tsx` | Responsive shell: sidebar (desktop) / bottom tabs + More sheet (mobile), mic FAB |
| `src/screens/` | Dashboard (variant A), Leads, LeadDetail, Calendar, Reputation, Referrals |

## Porting into handledsites (Next.js)

1. Copy `src/styles`, `src/components`, `src/shell`, `src/screens`,
   `src/data` into the app. Import `app.css` once in the root layout.
   No dependencies beyond React; no Tailwind required.
2. Replace the in-memory router in `App.tsx`: make `AppShell` the shared
   layout and each screen a route (`/`, `/leads`, `/leads/[id]`,
   `/calendar`, `/reputation`, `/referrals`). `Screen`-typed navigation
   maps 1:1 onto route pushes.
3. Swap `data/sample.ts` for Supabase queries. Mapping:
   - Leads screen/detail → `public.leads`
   - Activity timeline → `public.activity_log`
   - Reputation → `public.reviews`, `public.review_responses`
   - Referrals → `public.referral_partners`, `public.referral_rewards`, `public.referral_events`
   - Dashboard stats → `public.site_stats_daily`
4. No backend exists yet for: Ava-ranked priorities, Scout insight
   blurbs, the win-back campaign, ambassador tiers, the payout queue.
   Those screens render from `sample.ts` until the agent services land —
   keep them behind a flag or feed them derived data.

## Design rules baked in

- Inter on `#FAFAF8`; navy `#0F2A4A` is the working color.
- Amber `#F59E0B` appears **once per screen max** — attention and
  record affordances only (the going-cold priority, Send follow-up,
  the mic FAB, the invite send).
- Agent chips (Ava blue / Stella clay / Scout green) appear only next
  to things that agent actually did.
- 8px grid, 12px radii, 1px borders, no drop shadows.
