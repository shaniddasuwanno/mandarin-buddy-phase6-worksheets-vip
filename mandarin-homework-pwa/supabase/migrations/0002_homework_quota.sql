-- Atomic persistent daily allowance; only trusted server code can consume it.
begin;
create table public.homework_daily_quota(
 user_id uuid not null references auth.users(id) on delete cascade,
 day date not null, request_count integer not null default 0 check(request_count between 0 and 10),
 primary key(user_id,day)
);
alter table public.homework_daily_quota enable row level security;
revoke all on public.homework_daily_quota from anon,authenticated;
grant all on public.homework_daily_quota to service_role;
create function public.consume_homework_quota(p_user_id uuid) returns boolean language plpgsql security definer set search_path='' as $$
declare n int;
begin
 if not exists(select 1 from public.entitlements where user_id=p_user_id and status='active') then return false; end if;
 insert into public.homework_daily_quota(user_id,day,request_count) values(p_user_id,(now() at time zone 'Asia/Bangkok')::date,1)
 on conflict(user_id,day) do update set request_count=public.homework_daily_quota.request_count+1 where public.homework_daily_quota.request_count<10
 returning request_count into n;
 return n is not null;
end; $$;
revoke execute on function public.consume_homework_quota(uuid) from public,anon,authenticated;
grant execute on function public.consume_homework_quota(uuid) to service_role;
commit;
