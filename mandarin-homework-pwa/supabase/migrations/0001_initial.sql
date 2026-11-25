-- Apply once to a new Supabase project. All payments are in satang.
begin;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text, language text not null default 'th' check(language in ('th','en')),
  timezone text not null default 'Asia/Bangkok', created_at timestamptz not null default now()
);
create table public.entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null check(status in ('active','revoked')),
  granted_at timestamptz not null default now(), revoked_at timestamptz
);
create table public.purchases (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  stripe_checkout_session_id text unique not null, stripe_payment_intent_id text unique,
  amount integer not null check(amount=39900), currency text not null default 'thb' check(currency='thb'),
  status text not null default 'pending' check(status in ('pending','paid','failed','refunded')),
  created_at timestamptz not null default now(), paid_at timestamptz
);
create table public.stripe_events (
  event_id text primary key, event_type text not null, processed_at timestamptz not null default now()
);
create table public.learners (
  id uuid primary key default gen_random_uuid(), parent_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null check(length(nickname) between 1 and 60), grade smallint not null check(grade between 1 and 6),
  created_at timestamptz not null default now()
);
create table public.curriculum_units (
  id uuid primary key default gen_random_uuid(), grade smallint check(grade between 1 and 6),
  framework text not null check(framework in ('TH','YCT','HSK')), level text not null,
  framework_version text not null, unit_order integer not null check(unit_order>0), title_th text not null,
  title_en text not null, source_reference text, verified boolean not null default false,
  unique(framework,framework_version,level,unit_order)
);
create table public.vocabulary (
  id uuid primary key default gen_random_uuid(), hanzi text not null, pinyin text not null,
  meaning_th text not null, meaning_en text not null, example_zh text, example_pinyin text,
  example_th text, example_en text, audio_url text, published boolean not null default false,
  unique(hanzi,pinyin)
);
create table public.unit_vocabulary (
  unit_id uuid references public.curriculum_units(id) on delete cascade,
  vocabulary_id uuid references public.vocabulary(id) on delete cascade,
  position integer not null check(position>0), primary key(unit_id,vocabulary_id), unique(unit_id,position)
);
create table public.dictation_sets (
  id uuid primary key default gen_random_uuid(), unit_id uuid not null references public.curriculum_units(id),
  week_number integer not null check(week_number>0), title_th text not null, title_en text not null,
  unique(unit_id,week_number)
);
create table public.dictation_items (
  set_id uuid references public.dictation_sets(id) on delete cascade,
  vocabulary_id uuid references public.vocabulary(id), position integer not null check(position between 1 and 10),
  primary key(set_id,position), unique(set_id,vocabulary_id)
);
create table public.dictation_sessions (
  id uuid primary key default gen_random_uuid(), learner_id uuid not null references public.learners(id) on delete cascade,
  set_id uuid not null references public.dictation_sets(id), started_at timestamptz not null default now(), completed_at timestamptz
);
create table public.dictation_attempts (
  id uuid primary key default gen_random_uuid(), session_id uuid not null references public.dictation_sessions(id) on delete cascade,
  vocabulary_id uuid not null references public.vocabulary(id), submitted_answer text not null,
  correct boolean not null, revealed boolean not null default false, attempted_at timestamptz not null default now(),
  unique(session_id,vocabulary_id)
);
create table public.word_progress (
  learner_id uuid references public.learners(id) on delete cascade, vocabulary_id uuid references public.vocabulary(id) on delete cascade,
  correct_count integer not null default 0 check(correct_count>=0), miss_count integer not null default 0 check(miss_count>=0),
  mastered boolean not null default false, next_review_at timestamptz, last_review_at timestamptz,
  primary key(learner_id,vocabulary_id)
);
create table public.game_sessions (
  id uuid primary key default gen_random_uuid(), learner_id uuid not null references public.learners(id) on delete cascade,
  game_type text not null check(game_type in ('brush','sentence','listen','match','word','quiz')),
  correct_count integer not null check(correct_count>=0), total_count integer not null check(total_count>0 and correct_count<=total_count),
  completed_at timestamptz not null default now()
);
create table public.learning_days (
  learner_id uuid references public.learners(id) on delete cascade, activity_date date not null,
  activity_count integer not null default 1 check(activity_count>0), primary key(learner_id,activity_date)
);
create table public.homework_requests (
  id uuid primary key default gen_random_uuid(), learner_id uuid not null references public.learners(id) on delete cascade,
  input_type text not null check(input_type in ('text','image')), input_text text,
  image_path text, output_language text not null check(output_language in ('th','en')),
  status text not null default 'pending' check(status in ('pending','processing','completed','failed')),
  result jsonb, created_at timestamptz not null default now(), expires_at timestamptz not null default now()+interval '30 days',
  check((input_type='text' and input_text is not null and image_path is null) or (input_type='image' and image_path is not null and input_text is null))
);
create index on public.learners(parent_id);
create index on public.dictation_sessions(learner_id,started_at desc);
create index on public.word_progress(learner_id,next_review_at) where mastered=false;
create index on public.game_sessions(learner_id,completed_at desc);
create index on public.homework_requests(learner_id,created_at desc);
create index on public.purchases(user_id);

-- Create parent profile on registration. Never grant payment status from user metadata.
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin insert into public.profiles(id) values(new.id); return new; end; $$;
revoke execute on function public.handle_new_user() from public,anon,authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create function public.has_lifetime_access() returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.entitlements where user_id=(select auth.uid()) and status='active');
$$;
create function public.owns_learner(p_id uuid) returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.learners where id=p_id and parent_id=(select auth.uid()));
$$;
revoke execute on function public.has_lifetime_access(),public.owns_learner(uuid) from public,anon;
grant execute on function public.has_lifetime_access(),public.owns_learner(uuid) to authenticated;

-- Deny by default, then grant only required client operations. Server routes use service role after authenticating caller and checking entitlement/ownership.
do $$ declare t text; begin
  foreach t in array array['profiles','entitlements','purchases','stripe_events','learners','curriculum_units','vocabulary','unit_vocabulary','dictation_sets','dictation_items','dictation_sessions','dictation_attempts','word_progress','game_sessions','learning_days','homework_requests'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on public.%I from anon, authenticated',t);
    execute format('grant all on public.%I to service_role',t);
  end loop;
end $$;
grant select on public.profiles,public.entitlements,public.purchases,public.learners,public.curriculum_units,public.vocabulary,public.unit_vocabulary,public.dictation_sets,public.dictation_items,public.dictation_sessions,public.dictation_attempts,public.word_progress,public.game_sessions,public.learning_days,public.homework_requests to authenticated;
grant update(display_name,language,timezone) on public.profiles to authenticated;
grant insert(parent_id,nickname,grade),update(nickname,grade),delete on public.learners to authenticated;
create policy profile_read on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy profile_edit on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create policy entitlement_read on public.entitlements for select to authenticated using(user_id=(select auth.uid()));
create policy purchase_read on public.purchases for select to authenticated using(user_id=(select auth.uid()));
create policy learner_read on public.learners for select to authenticated using(parent_id=(select auth.uid()));
create policy learner_create on public.learners for insert to authenticated with check(parent_id=(select auth.uid()) and (select public.has_lifetime_access()));
create policy learner_edit on public.learners for update to authenticated using(parent_id=(select auth.uid())) with check(parent_id=(select auth.uid()));
create policy learner_delete on public.learners for delete to authenticated using(parent_id=(select auth.uid()));
create policy units_read on public.curriculum_units for select to authenticated using(verified and (select public.has_lifetime_access()));
create policy vocab_read on public.vocabulary for select to authenticated using(published and (select public.has_lifetime_access()));
create policy unit_vocab_read on public.unit_vocabulary for select to authenticated using((select public.has_lifetime_access()) and exists(select 1 from public.curriculum_units u where u.id=unit_id) and exists(select 1 from public.vocabulary v where v.id=vocabulary_id));
create policy sets_read on public.dictation_sets for select to authenticated using((select public.has_lifetime_access()) and exists(select 1 from public.curriculum_units u where u.id=unit_id));
create policy items_read on public.dictation_items for select to authenticated using((select public.has_lifetime_access()) and exists(select 1 from public.dictation_sets s where s.id=set_id) and exists(select 1 from public.vocabulary v where v.id=vocabulary_id));
create policy sessions_read on public.dictation_sessions for select to authenticated using(public.owns_learner(learner_id) and (select public.has_lifetime_access()));
create policy attempts_read on public.dictation_attempts for select to authenticated using(exists(select 1 from public.dictation_sessions s where s.id=session_id));
create policy progress_read on public.word_progress for select to authenticated using(public.owns_learner(learner_id) and (select public.has_lifetime_access()));
create policy game_read on public.game_sessions for select to authenticated using(public.owns_learner(learner_id) and (select public.has_lifetime_access()));
create policy day_read on public.learning_days for select to authenticated using(public.owns_learner(learner_id) and (select public.has_lifetime_access()));
create policy homework_read on public.homework_requests for select to authenticated using(public.owns_learner(learner_id) and (select public.has_lifetime_access()));

-- Private worksheet storage. Browser uploads must use server-issued signed upload URLs.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('homework','homework',false,5242880,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
-- No client storage policies: trusted server authorizes and issues short-lived signed URLs.
commit;
