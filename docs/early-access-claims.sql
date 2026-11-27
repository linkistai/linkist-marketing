-- Early access claims from linkist.ai/early-access (UAE 55 Founding Members), D90, 27 November 2026.
--
-- Run once in the SQL editor of Linkist's Supabase project. Running it again changes nothing.
-- The website's server saves each claim here with the project's secret key (SUPABASE_URL and SUPABASE_SECRET_KEY
-- in Vercel). Nobody else can read or write the table: row level security is on with no policies, and the anon and
-- authenticated roles have no rights on the table or the function. The team reads it in the Table Editor.
-- Claims are kept until the team deletes them (owner, 27 November 2026; the website's sub-processors page says so).

create table if not exists public.early_access_claims (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) between 3 and 200 and email = lower(email)),
  name text not null check (char_length(name) between 1 and 80),
  source jsonb not null default '{}'::jsonb check (jsonb_typeof(source) = 'object'),
  claimed_at timestamptz not null default now(),
  last_claimed_at timestamptz not null default now(),
  times_claimed integer not null default 1,
  lead_emailed boolean,
  welcome_emailed boolean
);

comment on table public.early_access_claims is
  'Early access claims from linkist.ai/early-access, one row per email. Written only by the website with the secret key. Kept until the team deletes them.';
comment on column public.early_access_claims.source is 'The tracking tags of the ad or link the visitor first claimed from (utm_*, gclid, fbclid, li_fat_id).';
comment on column public.early_access_claims.lead_emailed is 'Whether the claim reached the team''s inbox (LEAD_TO) the last time it was made.';
comment on column public.early_access_claims.welcome_emailed is 'Whether the visitor''s welcome email with the activation link went out the last time.';

alter table public.early_access_claims enable row level security;
revoke all on table public.early_access_claims from anon, authenticated;
grant select, insert, update, delete on table public.early_access_claims to service_role;
grant usage, select on sequence public.early_access_claims_id_seq to service_role;

-- Adds a claim, or updates the row when the same email claims again (the first claim's time and tags are kept).
create or replace function public.record_early_access_claim(p_email text, p_name text, p_source jsonb)
returns bigint
language sql
set search_path = ''
as $$
  insert into public.early_access_claims as c (email, name, source)
  values (lower(btrim(p_email)), btrim(p_name), coalesce(p_source, '{}'::jsonb))
  on conflict (email) do update
    set name = excluded.name,
        last_claimed_at = now(),
        times_claimed = c.times_claimed + 1
  returning c.id;
$$;

revoke all on function public.record_early_access_claim(text, text, jsonb) from public, anon, authenticated;
grant execute on function public.record_early_access_claim(text, text, jsonb) to service_role;
