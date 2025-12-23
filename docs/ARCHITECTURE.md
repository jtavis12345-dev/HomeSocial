# Architecture (Phase 1)

```
Web (Next.js)  --> Supabase Auth
               --> Supabase Postgres (users, listings, media)
               --> Mux (upload/playback) via direct upload
               <-- Webhooks (Mux->API) to persist asset metadata
```

- **Routes**
  - `/` feed (simple list for now)
  - `/listings/[id]` detail page with video hero
  - `/create` listing form + upload widget

- **Security**
  - Row Level Security (RLS) on `listings` by owner
  - Admin role bypass for moderation (service role key server-only)

- **Phase 2+ (AI)**
  - Workers triggered post-upload for captions, titles, thumbnails
  - Store AI outputs in `media_assets` and `listings` metadata
