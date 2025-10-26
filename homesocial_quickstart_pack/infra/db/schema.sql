-- HomeSocial Phase 1 Schema (Postgres / Supabase)
create table if not exists users_public (
  user_id uuid primary key,
  display_name text,
  avatar_url text,
  location text,
  created_at timestamptz default now()
);
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  title text,
  address text,
  city text,
  state text,
  zip text,
  price numeric,
  beds int,
  baths numeric,
  sqft int,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  kind text check (kind in ('video','image')) default 'video',
  mux_asset_id text,
  mux_playback_id text,
  url text,
  duration_seconds int,
  poster_url text,
  created_at timestamptz default now()
);
create table if not exists moderation_log (
  id uuid primary key default gen_random_uuid(),
  actor uuid,
  target_listing uuid,
  action text,
  reason text,
  created_at timestamptz default now()
);
create index if not exists idx_listings_owner on listings(owner_id);
create index if not exists idx_media_listing on media_assets(listing_id);
