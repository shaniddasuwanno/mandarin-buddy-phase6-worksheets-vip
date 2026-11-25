-- Apply after 0001 and 0002. Keep the public profile flag and existing AI/RLS entitlement in sync.
begin;
alter table public.profiles add column is_paid boolean not null default false;
insert into public.profiles(id) select id from auth.users on conflict(id) do nothing;
-- Existing active entitlements remain valid after migration.
update public.profiles p set is_paid=true where exists(select 1 from public.entitlements e where e.user_id=p.id and e.status='active');
-- The existing grants permit only display_name/language/timezone updates, never is_paid.
revoke update(is_paid) on public.profiles from anon,authenticated;
-- At most one outstanding checkout per account. Resolve any legacy duplicate pending rows before applying.
create unique index purchases_one_pending_per_user on public.purchases(user_id) where status='pending';

-- Atomic, idempotent fulfillment. Stripe signature and session details are validated by the server first.
create function public.fulfill_lifetime_purchase(p_event_id text,p_event_type text,p_session text,p_user uuid,p_intent text,p_amount integer,p_currency text)
returns boolean language plpgsql security definer set search_path='' as $$
declare purchase public.purchases%rowtype; inserted_count int;
begin
 if p_amount<>39900 or p_currency<>'thb' or p_intent is null or p_intent='' then raise exception 'invalid payment'; end if;
 select * into purchase from public.purchases where stripe_checkout_session_id=p_session for update;
 if not found or purchase.user_id<>p_user or purchase.amount<>p_amount or purchase.currency<>p_currency then raise exception 'purchase mismatch'; end if;
 insert into public.stripe_events(event_id,event_type) values(p_event_id,p_event_type) on conflict do nothing;
 get diagnostics inserted_count=row_count;
 if inserted_count=0 then return false; end if;
 if purchase.status='refunded' then return false; end if;
 if purchase.status='paid' then return false; end if;
 if purchase.stripe_payment_intent_id is not null and purchase.stripe_payment_intent_id<>p_intent then raise exception 'intent mismatch'; end if;
 update public.purchases set status='paid',stripe_payment_intent_id=p_intent,paid_at=coalesce(paid_at,now()) where id=purchase.id;
 insert into public.entitlements(user_id,status,granted_at,revoked_at) values(p_user,'active',now(),null)
 on conflict(user_id) do update set status='active',revoked_at=null;
 update public.profiles set is_paid=true where id=p_user;
 if not found then raise exception 'profile missing'; end if;
 return true;
end $$;
revoke execute on function public.fulfill_lifetime_purchase(text,text,text,uuid,text,integer,text) from public,anon,authenticated;
grant execute on function public.fulfill_lifetime_purchase(text,text,text,uuid,text,integer,text) to service_role;

-- Explicitly synchronize profile bit when a trusted admin changes an entitlement (e.g. full refund).
create function public.sync_profile_entitlement() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if tg_op='DELETE' then update public.profiles set is_paid=false where id=old.user_id; return old; end if;
 update public.profiles set is_paid=(new.status='active') where id=new.user_id; return new;
end $$;
revoke execute on function public.sync_profile_entitlement() from public,anon,authenticated;
create trigger sync_profile_entitlement after insert or update or delete on public.entitlements for each row execute function public.sync_profile_entitlement();
commit;
