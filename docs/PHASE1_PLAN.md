# Phase 1 — Weeks 0–2 — Goal: First Listing Live (Web)

**Outcome:** A user can sign up, create a basic listing (address/price/beds/baths/sqft), upload a video, and publish.
Listing detail page renders hero video + key details. Admin can remove content.

## Workstreams & Acceptance Criteria
1) **Auth & Profiles**
   - Email + Google sign-in (Supabase Auth)
   - Profile edit (display name, location, avatar)
   - ✅ Sign up/in/out; JWT session; profile persists

2) **Listings CRUD**
   - Create/edit/draft/publish listing
   - Basic validation + autosave
   - ✅ Published listing appears in feed & detail page

3) **Video Upload (Mux)**
   - Client uploads via Mux direct-upload URL
   - Webhook -> store assetId, playbackId
   - ✅ Video plays on detail page after processing

4) **Listing Detail Page**
   - Video hero + gallery placeholders + features
   - “Message Seller” (stub) & “Schedule Showing” (stub)
   - ✅ LCP < 2.5s locally; responsive

5) **Admin v0**
   - Remove listing, ban user (soft-delete)
   - ✅ Moderation action logged to DB

## Non-functional targets
- Perf budget (local): LCP <2.5s; CLS <0.1
- A11y: keyboard nav, alt text on thumbnails
- Security: server validations; role-based checks

## Deliverables by end of Phase 1
- Web app routes working: `/`, `/listings/[id]`, `/create`
- DB schema deployed in Supabase
- Mux webhook online and persisting playback data
- One demo listing in Phoenix published
