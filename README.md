# HomeSocial — Phase 1 (Weeks 0–2) Monorepo

This repo is a **scaffold** to start building HomeSocial (web + API + mobile shell) with video upload and the first listing flow.

**Goal of Phase 1:** A user can sign up, create a listing, upload a video, and publish. The listing detail page renders a hero video and key info. Admin can remove content.

> Note: This scaffold includes structure, docs, and example stubs. You will still initialize dependencies locally (e.g., `pnpm create next-app`, `npm i`, etc.).

## Monorepo layout
```
apps/
  web/        # Next.js app (web)
  api/        # Serverless functions (Mux webhook stub + admin)
  mobile/     # React Native placeholder (post-MVP)
packages/
  shared/     # Shared types, validation schemas, utilities (stubs)
  ui/         # Design system tokens (stubs)
infra/
  db/         # SQL schema and migrations
  mux/        # Webhook handler notes
  auth/       # Auth notes & flows
docs/
  PHASE1_PLAN.md
  ARCHITECTURE.md
  API_CONTRACT.yaml
project/
  phase1_tickets.csv
  env/.env.example
```

## Suggested stack
- **Frontend:** Next.js + TypeScript + Tailwind
- **Auth & DB:** Supabase (Auth, Postgres, Realtime)
- **Video:** Mux (direct uploads, webhooks, playback)
- **AI (Phase 2+):** Whisper-class ASR for captions; LLM for titles/thumbnails
- **Hosting:** Vercel (web) + serverless functions

See `docs/PHASE1_PLAN.md` for acceptance criteria.
