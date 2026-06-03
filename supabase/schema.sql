create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  is_guest boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.items (
  id text primary key,
  image text not null,
  title text not null,
  category text not null,
  price numeric(12, 2) not null check (price > 0),
  source text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard', 'Insane')),
  sponsored boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.ads (
  id text primary key,
  placement text not null,
  headline text not null,
  body text not null,
  cta text not null,
  href text not null,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.daily_challenges (
  id uuid primary key default gen_random_uuid(),
  challenge_date date not null unique,
  item_ids uuid[] not null,
  featured_sponsor text,
  created_at timestamptz default now()
);

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  player_name text not null default 'Guest',
  mode text not null check (mode in ('daily', 'classic', 'multiplayer')),
  score integer not null default 0,
  accuracy numeric(5, 2) not null default 0,
  guesses jsonb not null default '[]'::jsonb,
  completed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.leaderboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  player_name text not null,
  score integer not null,
  accuracy numeric(5, 2) not null,
  mode text not null check (mode in ('daily', 'classic', 'multiplayer')),
  period text not null default 'global' check (period in ('global', 'daily', 'weekly', 'monthly')),
  created_at timestamptz default now()
);

create table if not exists public.multiplayer_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique,
  host_user_id uuid references public.users(id) on delete set null,
  item_ids uuid[] not null,
  status text not null default 'waiting' check (status in ('waiting', 'playing', 'complete')),
  live_scores jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.items enable row level security;
alter table public.ads enable row level security;
alter table public.daily_challenges enable row level security;
alter table public.game_sessions enable row level security;
alter table public.leaderboards enable row level security;
alter table public.multiplayer_rooms enable row level security;

create policy "Items are public to read" on public.items for select using (true);
create policy "Ads are public to read" on public.ads for select using (true);
create policy "Daily challenges are public to read" on public.daily_challenges for select using (true);
create policy "Leaderboards are public to read" on public.leaderboards for select using (true);
create policy "Players can create sessions" on public.game_sessions for insert with check (true);
create policy "Players can create leaderboard entries" on public.leaderboards for insert with check (true);
create policy "Players can create rooms" on public.multiplayer_rooms for insert with check (true);
create policy "Rooms are public to read" on public.multiplayer_rooms for select using (true);
