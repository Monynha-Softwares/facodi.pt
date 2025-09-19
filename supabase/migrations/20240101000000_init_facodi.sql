-- FACODI initial schema, tables and RLS policies
begin;

create schema if not exists catalog;
create schema if not exists subjects;
create schema if not exists mapping;

create table if not exists catalog.course (
  code text not null,
  plan_version text not null,
  name text not null,
  degree text not null,
  ects_total integer,
  duration_semesters integer,
  institution text,
  school text,
  language text,
  summary text,
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint course_pk primary key (code, plan_version)
);

create table if not exists catalog.course_content (
  course_code text not null,
  plan_version text not null,
  content_md text not null,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint course_content_pk primary key (course_code, plan_version),
  constraint course_content_course_fk
    foreign key (course_code, plan_version)
    references catalog.course (code, plan_version)
    on delete cascade
);

create table if not exists catalog.uc (
  code text primary key,
  course_code text not null,
  course_plan_version text not null,
  name text not null,
  description text,
  ects integer,
  semester integer,
  language text,
  prerequisites text[] not null default '{}',
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint uc_course_fk
    foreign key (course_code, course_plan_version)
    references catalog.course (code, plan_version)
    on delete cascade
);

create table if not exists catalog.uc_content (
  uc_code text primary key,
  content_md text not null,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint uc_content_uc_fk
    foreign key (uc_code)
    references catalog.uc (code)
    on delete cascade
);

create table if not exists catalog.uc_learning_outcome (
  uc_code text not null,
  outcome text not null,
  "order" integer not null,
  constraint uc_learning_outcome_pk primary key (uc_code, "order"),
  constraint uc_learning_outcome_uc_fk
    foreign key (uc_code)
    references catalog.uc (code)
    on delete cascade
);

create table if not exists subjects.topic (
  slug text primary key,
  name text not null,
  summary text,
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists subjects.topic_content (
  topic_slug text primary key,
  content_md text not null,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint topic_content_topic_fk
    foreign key (topic_slug)
    references subjects.topic (slug)
    on delete cascade
);

create table if not exists subjects.topic_tag (
  topic_slug text not null,
  tag text not null,
  constraint topic_tag_pk primary key (topic_slug, tag),
  constraint topic_tag_topic_fk
    foreign key (topic_slug)
    references subjects.topic (slug)
    on delete cascade
);

create table if not exists mapping.uc_topic (
  uc_code text not null,
  topic_slug text not null,
  constraint uc_topic_pk primary key (uc_code, topic_slug),
  constraint uc_topic_uc_fk
    foreign key (uc_code)
    references catalog.uc (code)
    on delete cascade,
  constraint uc_topic_topic_fk
    foreign key (topic_slug)
    references subjects.topic (slug)
    on delete cascade
);

create table if not exists mapping.uc_playlist (
  uc_code text not null,
  playlist_id text not null,
  priority integer,
  constraint uc_playlist_pk primary key (uc_code, playlist_id),
  constraint uc_playlist_uc_fk
    foreign key (uc_code)
    references catalog.uc (code)
    on delete cascade
);

create table if not exists mapping.topic_playlist (
  topic_slug text not null,
  playlist_id text not null,
  priority integer,
  constraint topic_playlist_pk primary key (topic_slug, playlist_id),
  constraint topic_playlist_topic_fk
    foreign key (topic_slug)
    references subjects.topic (slug)
    on delete cascade
);

-- Grant basic schema usage for public querying
grant usage on schema catalog to anon, authenticated, service_role;
grant usage on schema subjects to anon, authenticated, service_role;
grant usage on schema mapping to anon, authenticated, service_role;

-- Enable Row Level Security
alter table catalog.course enable row level security;
alter table catalog.course_content enable row level security;
alter table catalog.uc enable row level security;
alter table catalog.uc_content enable row level security;
alter table catalog.uc_learning_outcome enable row level security;
alter table subjects.topic enable row level security;
alter table subjects.topic_content enable row level security;
alter table subjects.topic_tag enable row level security;
alter table mapping.uc_topic enable row level security;
alter table mapping.uc_playlist enable row level security;
alter table mapping.topic_playlist enable row level security;

-- Helper function to check for service_role
create or replace function public.is_service_role()
returns boolean
language sql
stable
as $$
  select auth.role() = 'service_role';
$$;

-- Course policies
create policy "course_select_public" on catalog.course
  for select to anon
  using (true);
create policy "course_manage_service" on catalog.course
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

-- Course content
create policy "course_content_select_public" on catalog.course_content
  for select to anon
  using (true);
create policy "course_content_manage_service" on catalog.course_content
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

-- UC
create policy "uc_select_public" on catalog.uc
  for select to anon
  using (true);
create policy "uc_manage_service" on catalog.uc
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

-- UC content
create policy "uc_content_select_public" on catalog.uc_content
  for select to anon
  using (true);
create policy "uc_content_manage_service" on catalog.uc_content
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

-- UC learning outcomes
create policy "uc_outcome_select_public" on catalog.uc_learning_outcome
  for select to anon
  using (true);
create policy "uc_outcome_manage_service" on catalog.uc_learning_outcome
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

-- Topics
create policy "topic_select_public" on subjects.topic
  for select to anon
  using (true);
create policy "topic_manage_service" on subjects.topic
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

create policy "topic_content_select_public" on subjects.topic_content
  for select to anon
  using (true);
create policy "topic_content_manage_service" on subjects.topic_content
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

create policy "topic_tag_select_public" on subjects.topic_tag
  for select to anon
  using (true);
create policy "topic_tag_manage_service" on subjects.topic_tag
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

-- Mapping tables
create policy "uc_topic_select_public" on mapping.uc_topic
  for select to anon
  using (true);
create policy "uc_topic_manage_service" on mapping.uc_topic
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

create policy "uc_playlist_select_public" on mapping.uc_playlist
  for select to anon
  using (true);
create policy "uc_playlist_manage_service" on mapping.uc_playlist
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

create policy "topic_playlist_select_public" on mapping.topic_playlist
  for select to anon
  using (true);
create policy "topic_playlist_manage_service" on mapping.topic_playlist
  for all to service_role
  using (public.is_service_role())
  with check (public.is_service_role());

commit;
