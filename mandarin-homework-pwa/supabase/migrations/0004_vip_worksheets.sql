-- Apply after 0003. Existing Stripe customers retain lifetime app access.
begin;
create table public.access_codes (
 id uuid primary key default gen_random_uuid(), code_hash text not null unique check(code_hash ~ '^[0-9a-f]{64}$'),
 plan_type text not null check(plan_type in ('app_only','worksheets_only','combo_all')),
 grade_access text not null check(grade_access in ('ALL','P1','P2','P3','P4','P5','P6')),
 created_by uuid not null references auth.users(id), created_at timestamptz not null default now(),
 redeemed_by uuid references auth.users(id), redeemed_at timestamptz,
 check(plan_type='worksheets_only' or grade_access='ALL'),
 check((redeemed_by is null)=(redeemed_at is null))
);
create table public.worksheet_grants (
 user_id uuid not null references auth.users(id) on delete cascade,
 grade smallint not null check(grade between 1 and 6),
 -- NULL denotes permanent combo access. A worksheet subscription expires one year after redemption.
 expires_at timestamptz, granted_at timestamptz not null default now(), primary key(user_id,grade)
);
alter table public.access_codes enable row level security;
alter table public.worksheet_grants enable row level security;
revoke all on public.access_codes,public.worksheet_grants from anon,authenticated;
grant all on public.access_codes,public.worksheet_grants to service_role;
grant select on public.worksheet_grants to authenticated;
create policy read_own_worksheet_grants on public.worksheet_grants for select to authenticated using(user_id=(select auth.uid()));

create function public.redeem_access_code(p_hash text,p_user uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
declare c public.access_codes%rowtype; g smallint; new_expiry timestamptz;
begin
 select * into c from public.access_codes where code_hash=p_hash for update;
 if not found then return jsonb_build_object('status','invalid'); end if;
 if c.redeemed_by is not null then
   if c.redeemed_by=p_user then return jsonb_build_object('status','already_redeemed','plan_type',c.plan_type,'grade_access',c.grade_access); end if;
   return jsonb_build_object('status','used');
 end if;
 if not exists(select 1 from auth.users where id=p_user) then return jsonb_build_object('status','invalid'); end if;
 if c.plan_type in ('app_only','combo_all') then
  insert into public.entitlements(user_id,status,granted_at,revoked_at) values(p_user,'active',now(),null)
   on conflict(user_id) do update set status='active',revoked_at=null;
 end if;
 if c.plan_type in ('worksheets_only','combo_all') then
  new_expiry=case when c.plan_type='combo_all' then null else now()+interval '1 year' end;
  for g in 1..6 loop
   if c.grade_access='ALL' or c.grade_access=('P'||g::text) then
    insert into public.worksheet_grants(user_id,grade,expires_at) values(p_user,g,new_expiry)
    on conflict(user_id,grade) do update set expires_at=case
      when public.worksheet_grants.expires_at is null or excluded.expires_at is null then null
      else greatest(public.worksheet_grants.expires_at,now())+interval '1 year' end;
   end if;
  end loop;
 end if;
 update public.access_codes set redeemed_by=p_user,redeemed_at=now() where id=c.id;
 return jsonb_build_object('status','redeemed','plan_type',c.plan_type,'grade_access',c.grade_access);
end $$;
revoke execute on function public.redeem_access_code(text,uuid) from public,anon,authenticated;
grant execute on function public.redeem_access_code(text,uuid) to service_role;
commit;
