-- ================================================================
--  Balance 3D — Auth Schema
--  Run AFTER schema.sql in the Supabase SQL Editor.
--  Requires: Supabase Auth enabled (it is by default).
-- ================================================================

-- ---------------------------------------------------------------
-- PROFILES — one row per auth.users entry
-- Supabase auth.users handles passwords, OAuth tokens, phone OTP.
-- We extend it here with our app-specific fields.
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text,
  name_en       text        not null default '',
  name_ar       text        not null default '',
  phone         text,
  avatar_url    text,
  role          text        not null default 'customer'
                            check (role in ('customer', 'admin')),
  preferred_lang text       not null default 'ar'
                            check (preferred_lang in ('ar', 'en')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name_en, name_ar, phone, avatar_url, preferred_lang)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'full_name_ar', ''),
    new.phone,
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'preferred_lang', 'ar')
  )
  on conflict (id) do update set
    email      = excluded.email,
    avatar_url = excluded.avatar_url,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------
-- ADMIN USERS — store admin credentials separately from Supabase Auth
-- This table is used for the hardcoded admin system while you can
-- optionally promote Supabase users to admin via the role column.
-- ---------------------------------------------------------------
create table if not exists public.admin_users (
  id            serial      primary key,
  username      text        not null unique,
  password_hash text        not null,   -- bcrypt hash; DO NOT store plaintext
  name          text        not null default 'Admin',
  created_at    timestamptz not null default now()
);

-- Seed the default admin (password: admin123)
-- bcrypt hash of 'admin123' with cost 12:
insert into public.admin_users (username, password_hash, name)
values ('admin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCKkBhDk02OFd4L4KeD8hm.', 'Admin')
on conflict (username) do nothing;

-- ---------------------------------------------------------------
-- ROW-LEVEL SECURITY for profiles
-- ---------------------------------------------------------------
alter table public.profiles enable row level security;

-- Users can read and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins (role='admin') can read all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Service role bypasses all RLS automatically

-- ---------------------------------------------------------------
-- LINK profiles to orders/customers (optional, for production)
-- ---------------------------------------------------------------
-- When a logged-in customer places an order, their auth.uid()
-- can be stored in orders.user_id for personalised order history.
alter table public.orders
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists idx_orders_user_id on public.orders(user_id);

-- Customers can only read their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (user_id = auth.uid() or auth.uid() is null);

-- ---------------------------------------------------------------
-- ENABLE AUTH PROVIDERS in Supabase Dashboard:
-- (These are configured in the UI, not SQL)
-- 1. Email/Password: Authentication > Providers > Email — enable
-- 2. Google: Authentication > Providers > Google
--    → add OAuth 2.0 Client ID + Secret from Google Cloud Console
--    → Redirect URL: https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
-- 3. Apple: Authentication > Providers > Apple
--    → add Service ID, Team ID, Key ID, Private Key from Apple Dev Portal
--    → Redirect URL: same as above
-- 4. Phone/OTP: Authentication > Providers > Phone
--    → add Twilio Account SID, Auth Token, Messaging Service SID
-- ---------------------------------------------------------------

-- ---------------------------------------------------------------
-- RPC: verify_admin_password
-- Checks a plain-text password against the stored bcrypt hash.
-- Requires: pg_crypto extension
-- ---------------------------------------------------------------
create extension if not exists pgcrypto;

create or replace function public.verify_admin_password(p_username text, p_password text)
returns boolean language plpgsql security definer as $$
declare
  stored_hash text;
begin
  select password_hash into stored_hash
  from public.admin_users
  where username = p_username;

  if stored_hash is null then
    return false;
  end if;

  return (crypt(p_password, stored_hash) = stored_hash);
end;
$$;

-- Revoke direct execution from anon; allow via service role only
-- revoke execute on function public.verify_admin_password from anon;
-- (Comment out the revoke above during development)
