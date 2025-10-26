# HomeSocial — Phase 1 Quickstart (Idiot-Proof Guide)

This pack gives you a minimal, WORKING scaffold to get to **first listing live with video**.

## What you’ll do (10 steps)
1) Create free accounts: **Vercel**, **Supabase**, **Mux**.
2) In **Supabase** → create a new project.
3) In Supabase → run the SQL in `infra/db/schema.sql` (Tables: users_public, listings, media_assets, moderation_log).
4) In **Mux** → grab your **Token ID/Secret**; add a **Webhook** URL (later) `https://YOURDOMAIN/api/mux/webhook`.
5) In **Vercel** → New Project → Import this folder as a repo (or upload) → Framework: Next.js.
6) In Vercel **Environment Variables**, set everything in `apps/web/.env.example`.
7) Click **Deploy** → you get a preview URL.
8) Open the app: Sign up (email). Create a listing on `/create`. Upload a video.
9) Wait ~1–2 minutes for Mux to process → refresh listing page → video plays.
10) When ready, add your custom domain in Vercel (Domains tab).

## Local Dev
```bash
cd apps/web
npm i
npm run dev
# visit http://localhost:3000
```

If you hit any snag, open **Vercel Logs** (for the API routes) and **Supabase Logs**.
