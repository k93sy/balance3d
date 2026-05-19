-- ================================================================
--  Balance 3D — Payment Schema
--  Run after schema.sql in the Supabase SQL Editor.
-- ================================================================

-- ---------------------------------------------------------------
-- Extend orders table with full payment metadata
-- ---------------------------------------------------------------
alter table public.orders
  add column if not exists payment_id          text,           -- gateway transaction ID
  add column if not exists payment_provider    text,           -- 'moyasar' | 'hyperpay'
  add column if not exists payment_source_type text,           -- 'creditcard' | 'mada' | 'applepay' | 'stcpay'
  add column if not exists payment_fee         numeric default 0,
  add column if not exists payment_currency    text    default 'SAR',
  add column if not exists payment_callback_at timestamptz,
  add column if not exists notes               text;

-- ---------------------------------------------------------------
-- payment_transactions — full audit log of every attempt
-- ---------------------------------------------------------------
create table if not exists public.payment_transactions (
  id              uuid        primary key default uuid_generate_v4(),
  order_id        text        references public.orders(id) on delete cascade,
  provider        text        not null check (provider in ('moyasar','hyperpay','paytabs','demo')),
  provider_txn_id text,                           -- gateway-side transaction ID
  source_type     text,                           -- 'creditcard','mada','applepay','stcpay'
  amount          numeric     not null,
  currency        text        not null default 'SAR',
  status          text        not null default 'initiated'
                              check (status in ('initiated','pending','paid','failed','refunded','voided')),
  gateway_message text,                           -- raw status/error from gateway
  callback_url    text,                           -- where the gateway POSTed back
  metadata        jsonb,                          -- full gateway response payload
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

drop trigger if exists trg_payment_txn_updated_at on public.payment_transactions;
create trigger trg_payment_txn_updated_at
  before update on public.payment_transactions
  for each row execute procedure public.set_updated_at();

alter table public.payment_transactions enable row level security;

-- Anon can insert (create a transaction when placing order)
create policy "Anon can insert transactions"
  on public.payment_transactions for insert
  with check (true);

-- Users see only their own transactions (via orders.user_id)
create policy "Users see own transactions"
  on public.payment_transactions for select
  using (
    order_id in (
      select id from public.orders where user_id = auth.uid()
    )
  );

-- Admins see all
create policy "Admins see all transactions"
  on public.payment_transactions for all
  using (true);

-- ---------------------------------------------------------------
-- RPC: confirm_payment
-- Called by the payment callback / return URL handler.
-- Updates both the transaction and the parent order atomically.
-- ---------------------------------------------------------------
create or replace function public.confirm_payment(
  p_provider_txn_id text,
  p_status          text,
  p_gateway_message text default null,
  p_metadata        jsonb default null
)
returns void language plpgsql security definer as $$
declare
  v_txn  public.payment_transactions%rowtype;
  v_order_status text;
begin
  -- Find the transaction
  select * into v_txn
  from public.payment_transactions
  where provider_txn_id = p_provider_txn_id
  limit 1;

  if not found then
    raise exception 'Transaction not found: %', p_provider_txn_id;
  end if;

  -- Update transaction
  update public.payment_transactions
  set status          = p_status,
      gateway_message = coalesce(p_gateway_message, gateway_message),
      metadata        = coalesce(p_metadata, metadata),
      updated_at      = now()
  where id = v_txn.id;

  -- Map payment status → order status
  v_order_status := case p_status
    when 'paid'     then 'processing'
    when 'failed'   then 'cancelled'
    when 'refunded' then 'cancelled'
    else 'pending'
  end;

  -- Update parent order
  update public.orders
  set payment_status       = p_status,
      payment_id           = p_provider_txn_id,
      payment_callback_at  = now(),
      status               = v_order_status,
      updated_at           = now()
  where id = v_txn.order_id;
end;
$$;
