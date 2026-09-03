-- =====================================================================
-- Security hardening — remove anonymous read/write holes, tighten RLS.
--
-- Public site keeps: reading published content, submitting the contact
-- form, and writing its own analytics (session + events) through
-- constrained policies / SECURITY DEFINER RPCs.
--
-- Apply with: supabase db push   (or paste in the SQL editor)
-- Must be applied together with the matching frontend changes in
-- src/services/analytics.service.js and src/services/contacts.service.js
-- =====================================================================

-- ---------------------------------------------------------------------
-- Analytics RPCs (SECURITY DEFINER, pinned search_path) so the public
-- site never needs direct SELECT/UPDATE on analytics_sessions.
-- ---------------------------------------------------------------------

create or replace function public.session_exists(p_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from analytics_sessions where id = p_id);
$$;

create or replace function public.touch_session(p_session_id uuid)
returns void
language sql
volatile
security definer
set search_path = public
as $$
  update analytics_sessions
     set duration = greatest(0, extract(epoch from (now() - started_at))::int)
   where id = p_session_id
     and ended_at is null;
$$;

drop function if exists public.close_session(uuid, timestamp with time zone);

create or replace function public.close_session(p_session_id uuid)
returns void
language sql
volatile
security definer
set search_path = public
as $$
  update analytics_sessions
     set ended_at = now(),
         duration = greatest(0, extract(epoch from (now() - started_at))::int)
   where id = p_session_id
     and ended_at is null;
$$;

revoke all on function public.session_exists(uuid) from public;
revoke all on function public.touch_session(uuid)  from public;
revoke all on function public.close_session(uuid)  from public;
grant execute on function public.session_exists(uuid) to anon, authenticated;
grant execute on function public.touch_session(uuid)  to anon, authenticated;
grant execute on function public.close_session(uuid)  to anon, authenticated;

-- ---------------------------------------------------------------------
-- contacts — INSERT stays public (length-capped); read/update/delete
-- are admin-only.
-- ---------------------------------------------------------------------

drop policy if exists "Allow read contacts"   on public.contacts;
drop policy if exists "Allow update contacts" on public.contacts;
drop policy if exists "Allow delete contacts" on public.contacts;
drop policy if exists "Allow insert contacts" on public.contacts;

create policy "contacts public insert" on public.contacts
  for insert to anon, authenticated
  with check (
        char_length(coalesce(name, ''))    <= 200
    and char_length(coalesce(email, ''))   <= 200
    and char_length(coalesce(subject, '')) <= 300
    and char_length(coalesce(message, '')) <= 10000
  );

create policy "contacts admin read"   on public.contacts for select to authenticated using (true);
create policy "contacts admin update" on public.contacts for update to authenticated using (true) with check (true);
create policy "contacts admin delete" on public.contacts for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- analytics_sessions — no anonymous SELECT, no anonymous UPDATE.
-- INSERT stays (session creation); the app supplies the id client-side.
-- ---------------------------------------------------------------------

drop policy if exists "Allow public session read"                  on public.analytics_sessions;
drop policy if exists "Allow read analytics sessions"               on public.analytics_sessions;
drop policy if exists "Allow select analytics sessions"             on public.analytics_sessions;
drop policy if exists "Allow authenticated read analytics sessions" on public.analytics_sessions;
drop policy if exists "Allow authenticated read sessions"           on public.analytics_sessions;
drop policy if exists "analytics_sessions update any"               on public.analytics_sessions;
drop policy if exists "analytics_sessions insert any"               on public.analytics_sessions;

create policy "analytics_sessions insert"     on public.analytics_sessions
  for insert to anon, authenticated with check (true);
create policy "analytics_sessions admin read" on public.analytics_sessions
  for select to authenticated using (true);

-- ---------------------------------------------------------------------
-- analytics_events — constrained anonymous INSERT, no anonymous SELECT.
-- ---------------------------------------------------------------------

drop policy if exists "Allow admin read events"                  on public.analytics_events;
drop policy if exists "Allow analytics read"                     on public.analytics_events;
drop policy if exists "Allow authenticated read analytics events" on public.analytics_events;
drop policy if exists "analytics_events insert any"              on public.analytics_events;

create policy "analytics_events insert" on public.analytics_events
  for insert to anon, authenticated
  with check (
        event_type ~ '^[a-z_]{3,40}$'
    and char_length(coalesce(page, ''))     <= 512
    and char_length(coalesce(detail, ''))   <= 256
    and char_length(coalesce(referrer, '')) <= 1024
  );
create policy "analytics_events admin read" on public.analytics_events
  for select to authenticated using (true);

-- ---------------------------------------------------------------------
-- experiences / skills / technologies / project_technologies —
-- public read, writes only for signed-in admins.
-- ---------------------------------------------------------------------

drop policy if exists "Allow insert experiences"      on public.experiences;
drop policy if exists "Allow update experiences"      on public.experiences;
drop policy if exists "Allow delete experiences"      on public.experiences;
drop policy if exists "Allow read experiences"        on public.experiences;
drop policy if exists "Everyone can read experiences" on public.experiences;
drop policy if exists "Public can read experiences"   on public.experiences;
create policy "experiences public read"         on public.experiences for select to anon, authenticated using (true);
create policy "experiences authenticated write" on public.experiences for all    to authenticated using (true) with check (true);

drop policy if exists "Allow insert skills"      on public.skills;
drop policy if exists "Allow update skills"      on public.skills;
drop policy if exists "Allow delete skills"      on public.skills;
drop policy if exists "Allow select skills"      on public.skills;
drop policy if exists "Everyone can read skills" on public.skills;
drop policy if exists "Public can read skills"   on public.skills;
create policy "skills public read"         on public.skills for select to anon, authenticated using (true);
create policy "skills authenticated write" on public.skills for all    to authenticated using (true) with check (true);

drop policy if exists "Allow insert technologies"      on public.technologies;
drop policy if exists "Allow update technologies"      on public.technologies;
drop policy if exists "Allow delete technologies"      on public.technologies;
drop policy if exists "Allow select technologies"      on public.technologies;
drop policy if exists "Everyone can read technologies" on public.technologies;
drop policy if exists "Public can read technologies"   on public.technologies;
drop policy if exists "Public read technologies"       on public.technologies;
create policy "technologies public read"         on public.technologies for select to anon, authenticated using (true);
create policy "technologies authenticated write" on public.technologies for all    to authenticated using (true) with check (true);

drop policy if exists "Allow insert project technologies" on public.project_technologies;
drop policy if exists "Allow delete project technologies" on public.project_technologies;
drop policy if exists "Allow read project technologies"   on public.project_technologies;
drop policy if exists "Allow select project technologies" on public.project_technologies;
drop policy if exists "Public read project technologies"  on public.project_technologies;
create policy "project_technologies public read"         on public.project_technologies for select to anon, authenticated using (true);
create policy "project_technologies authenticated write" on public.project_technologies for all    to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------
-- Dedupe redundant SELECT policies on already-safe tables.
-- (kept: "Everyone can read projects" / "Everyone can read settings")
-- ---------------------------------------------------------------------

drop policy if exists "Authenticated can read projects" on public.projects;
drop policy if exists "Public can read projects"        on public.projects;

drop policy if exists "Authenticated users can read settings" on public.settings;
drop policy if exists "Public can read settings"              on public.settings;

-- ---------------------------------------------------------------------
-- Privilege revocation (defense in depth): anon may only INSERT into
-- the three tables its policies allow, and may not SELECT the private
-- ones even if a policy regresses.
-- ---------------------------------------------------------------------

revoke insert, update, delete, truncate on all tables in schema public from anon;
grant insert on public.contacts           to anon;
grant insert on public.analytics_sessions to anon;
grant insert on public.analytics_events   to anon;
revoke select on public.contacts           from anon;
revoke select on public.analytics_sessions from anon;
revoke select on public.analytics_events   from anon;

-- ---------------------------------------------------------------------
-- Function search_path hardening (advisor 0011).
-- ---------------------------------------------------------------------

alter function public.update_updated_at_column() set search_path = '';
