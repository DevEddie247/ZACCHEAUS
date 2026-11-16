-- Run this once in the Supabase project's SQL Editor before enabling website bookings.
create table if not exists public.appointment_requests (
    id uuid primary key default gen_random_uuid(),
    full_name text not null check (char_length(full_name) between 2 and 120),
    phone text not null check (char_length(phone) between 10 and 25),
    services jsonb not null check (jsonb_typeof(services) = 'array' and jsonb_array_length(services) > 0),
    total_amount integer not null check (total_amount > 0),
    has_estimated_prices boolean not null default false,
    appointment_date date not null,
    appointment_time text not null,
    preferred_platform text not null check (preferred_platform in ('whatsapp', 'instagram', 'tiktok', 'snapchat')),
    receipt_path text,
    receipt_name text,
    receipt_content_type text check (receipt_content_type in ('image/jpeg', 'image/png', 'image/webp', 'application/pdf')),
    receipt_size integer check (receipt_size between 1 and 10485760),
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined')),
    created_at timestamptz not null default now()
);

-- Existing installations can keep old receipt records while new requests omit receipts.
alter table public.appointment_requests alter column receipt_path drop not null;
alter table public.appointment_requests alter column receipt_name drop not null;
alter table public.appointment_requests alter column receipt_content_type drop not null;
alter table public.appointment_requests alter column receipt_size drop not null;

alter table public.appointment_requests enable row level security;

grant usage on schema public to anon;
revoke all on public.appointment_requests from anon, authenticated;
grant insert on public.appointment_requests to anon;

drop policy if exists "Allow anonymous appointment requests" on public.appointment_requests;
create policy "Allow anonymous appointment requests"
    on public.appointment_requests
    for insert
    to anon
    with check (status = 'pending');

drop policy if exists "Allow anonymous appointment receipt uploads" on storage.objects;
