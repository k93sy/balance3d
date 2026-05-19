-- ================================================================
--  Balance 3D — Supabase Database Schema
--  Run this in the Supabase SQL Editor to initialise the database.
--  Project: balance3d
-- ================================================================

-- ---------------------------------------------------------------
-- EXTENSIONS
-- ---------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------
create table if not exists public.products (
  id            text        primary key,          -- 'p001' or 'p' + unix-ms
  title_en      text        not null default '',
  title_ar      text        not null default '',
  desc_en       text        not null default '',
  desc_ar       text        not null default '',
  category_en   text        not null default '',
  category_ar   text        not null default '',
  material      text        not null default '',
  price         numeric     not null default 0,
  stock         integer     not null default 0,
  in_stock      boolean     generated always as (stock > 0) stored,
  badge         text        check (badge in ('new','popular','sale','trending','bestseller') or badge is null),
  status        text        not null default 'active'
                            check (status in ('active','draft','out_of_stock')),
  colors        text[]      not null default '{}',
  rating        numeric     not null default 0,
  reviews       integer     not null default 0,
  image_url     text,                              -- Supabase Storage public URL
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------
create table if not exists public.orders (
  id              text        primary key,          -- 'ORD-1000'
  customer_name_en text       not null default '',
  customer_name_ar text       not null default '',
  customer_email  text        not null default '',
  city_en         text        not null default '',
  city_ar         text        not null default '',
  product_name    text        not null default '',
  amount          numeric     not null default 0,
  status          text        not null default 'pending'
                              check (status in ('pending','processing','shipped','delivered','cancelled')),
  items           integer     not null default 1,
  tracking_number text,
  payment_method  text        check (payment_method in ('credit_card','mada','stc_pay','cash') or payment_method is null),
  payment_status  text        not null default 'pending'
                              check (payment_status in ('paid','pending','refunded')),
  order_date      date        not null default current_date,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------
-- CUSTOMERS
-- ---------------------------------------------------------------
create table if not exists public.customers (
  id              text        primary key,          -- 'C100'
  name_en         text        not null default '',
  name_ar         text        not null default '',
  email           text        not null default '',
  phone           text        not null default '',
  city_en         text        not null default '',
  city_ar         text        not null default '',
  order_count     integer     not null default 0,
  total_spent     numeric     not null default 0,
  join_date       date        not null default current_date,
  status          text        not null default 'active'
                              check (status in ('active','blocked')),
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- ROW-LEVEL SECURITY
-- (Public read for products; write requires service-role key)
-- ---------------------------------------------------------------
alter table public.products  enable row level security;
alter table public.orders    enable row level security;
alter table public.customers enable row level security;

-- Anyone can read active products (storefront)
create policy "Public can read active products"
  on public.products for select
  using (status != 'draft');

-- Admin (service role) can do everything — handled via RLS bypass
-- For the admin dashboard using the anon key, we add a permissive policy
-- that you'll remove in production once you set up proper auth:
create policy "Anon full access products"
  on public.products for all
  using (true) with check (true);

create policy "Anon full access orders"
  on public.orders for all
  using (true) with check (true);

create policy "Anon full access customers"
  on public.customers for all
  using (true) with check (true);

-- ---------------------------------------------------------------
-- STORAGE BUCKET for product images
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Anyone can read images (public bucket)
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Anon can upload/update/delete (tighten in production)
create policy "Anon upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

create policy "Anon update product images"
  on storage.objects for update
  using (bucket_id = 'product-images');

create policy "Anon delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images');

-- ---------------------------------------------------------------
-- SEED — initial product data
-- ---------------------------------------------------------------
insert into public.products
  (id, title_en, title_ar, desc_en, desc_ar, category_en, category_ar,
   material, price, stock, badge, status, colors, rating, reviews)
values
  ('p001','Articulated Dragon','تنين متحرك',
   'Fully articulated dragon with moving joints. Printed in premium PLA.',
   'تنين متحرك بالكامل مع مفاصل قابلة للحركة. مطبوع بـ PLA عالي الجودة.',
   'Figurines','مجسمات','PLA Pro',145,23,'popular','active',
   array['#E8E8E8','#2D3436','#0984E3'],4.9,124),

  ('p002','Desk Organizer Pro','منظم مكتب احترافي',
   'Modular desk organizer with 8 compartments. PETG for durability.',
   'منظم مكتب معياري بـ٨ أقسام. مصنوع من PETG للمتانة.',
   'Tools','أدوات','PETG',89,40,'new','active',
   array['#FDCB6E','#2D3436','#FFFFFF'],4.7,87),

  ('p003','Mini Skyline Model','نموذج أفق مصغر',
   'Detailed cityscape miniature. Perfect for offices and gifts.',
   'نموذج مصغر مفصّل للمدينة. مثالي للمكاتب والهدايا.',
   'Architecture','هندسة معمارية','Resin',220,12,null,'active',
   array['#DFE6E9','#2D3436'],4.8,53),

  ('p004','Geometric Ring Set','طقم خواتم هندسية',
   'Set of 3 geometric rings printed in resin. Multiple sizes.',
   'طقم من ٣ خواتم هندسية مطبوعة بالراتنج. أحجام متعددة.',
   'Jewelry','مجوهرات','Resin',65,78,'sale','active',
   array['#A29BFE','#FD79A8','#FFEAA7'],4.6,211),

  ('p005','Vase Collection','مجموعة المزهريات',
   'Elegant parametric vase set. Available in 3 sizes.',
   'طقم مزهريات بتصميم هندسي أنيق. متوفر بـ٣ أحجام.',
   'Home Decor','ديكور منزلي','PLA Pro',110,31,'new','active',
   array['#FFFFFF','#636E72','#00B894'],4.8,98),

  ('p006','Gear Mechanism','آلية التروس',
   'Functional gear set with 5 interlocking gears. Educational.',
   'طقم تروس وظيفي بـ٥ تروس متشابكة. تعليمي.',
   'Engineering','هندسة','PETG',175,0,null,'out_of_stock',
   array['#FF6B35','#2D3436'],4.9,42),

  ('p007','Chess Set 3D','طقم شطرنج ثلاثي الأبعاد',
   'Full chess set with unique 3D designs. Board included.',
   'طقم شطرنج كامل بتصاميم ثلاثية الأبعاد فريدة. يشمل اللوحة.',
   'Gaming','ألعاب','PLA Pro',340,9,'popular','active',
   array['#2D3436','#DFE6E9'],5.0,67),

  ('p008','Scale Car Model','نموذج سيارة مصغر',
   'Highly detailed 1:24 scale car model. Resin printed.',
   'نموذج سيارة مفصّل للغاية بمقياس ١:٢٤. مطبوع بالراتنج.',
   'Automotive','سيارات','Resin',195,17,null,'active',
   array['#E17055','#0984E3','#2D3436'],4.7,39)

on conflict (id) do nothing;
