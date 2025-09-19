-- Create schemas
create schema if not exists catalog;
create schema if not exists subjects;
create schema if not exists mapping;

-- Courses
create table if not exists catalog.course (
  code text not null,
  plan_version text not null,
  name text not null,
  degree text,
  ects_total integer,
  duration_semesters integer,
  institution text,
  school text,
  language text,
  summary text,
  inserted_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint course_pk primary key (code, plan_version)
);

create table if not exists catalog.course_content (
  course_code text not null,
  plan_version text not null,
  content_md text not null,
  constraint course_content_pk primary key (course_code, plan_version),
  constraint course_content_course_fk foreign key (course_code, plan_version)
    references catalog.course (code, plan_version) on delete cascade
);

-- Curricular units
create table if not exists catalog.uc (
  code text primary key,
  course_code text not null,
  plan_version text not null,
  name text not null,
  description text,
  ects integer,
  semester integer,
  language text,
  prerequisites text[] default '{}',
  inserted_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint uc_course_fk foreign key (course_code, plan_version)
    references catalog.course (code, plan_version) on delete cascade
);

create table if not exists catalog.uc_content (
  uc_code text primary key,
  content_md text not null,
  constraint uc_content_uc_fk foreign key (uc_code)
    references catalog.uc (code) on delete cascade
);

create table if not exists catalog.uc_learning_outcome (
  uc_code text not null,
  outcome text not null,
  "order" integer not null,
  constraint uc_learning_outcome_pk primary key (uc_code, "order"),
  constraint uc_learning_outcome_uc_fk foreign key (uc_code)
    references catalog.uc (code) on delete cascade
);

-- Topics
create table if not exists subjects.topic (
  slug text primary key,
  name text not null,
  summary text
);

create table if not exists subjects.topic_content (
  topic_slug text primary key,
  content_md text not null,
  constraint topic_content_topic_fk foreign key (topic_slug)
    references subjects.topic (slug) on delete cascade
);

create table if not exists subjects.topic_tag (
  topic_slug text not null,
  tag text not null,
  constraint topic_tag_pk primary key (topic_slug, tag),
  constraint topic_tag_topic_fk foreign key (topic_slug)
    references subjects.topic (slug) on delete cascade
);

-- Mappings
create table if not exists mapping.uc_topic (
  uc_code text not null,
  topic_slug text not null,
  constraint uc_topic_pk primary key (uc_code, topic_slug),
  constraint uc_topic_uc_fk foreign key (uc_code)
    references catalog.uc (code) on delete cascade,
  constraint uc_topic_topic_fk foreign key (topic_slug)
    references subjects.topic (slug) on delete cascade
);

create table if not exists mapping.uc_playlist (
  uc_code text not null,
  playlist_id text not null,
  priority integer,
  constraint uc_playlist_pk primary key (uc_code, playlist_id),
  constraint uc_playlist_uc_fk foreign key (uc_code)
    references catalog.uc (code) on delete cascade
);

create table if not exists mapping.topic_playlist (
  topic_slug text not null,
  playlist_id text not null,
  priority integer,
  constraint topic_playlist_pk primary key (topic_slug, playlist_id),
  constraint topic_playlist_topic_fk foreign key (topic_slug)
    references subjects.topic (slug) on delete cascade
);

-- RLS policies
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

create policy "Allow anon read" on catalog.course for select using (true);
create policy "Allow anon read" on catalog.course_content for select using (true);
create policy "Allow anon read" on catalog.uc for select using (true);
create policy "Allow anon read" on catalog.uc_content for select using (true);
create policy "Allow anon read" on catalog.uc_learning_outcome for select using (true);
create policy "Allow anon read" on subjects.topic for select using (true);
create policy "Allow anon read" on subjects.topic_content for select using (true);
create policy "Allow anon read" on subjects.topic_tag for select using (true);
create policy "Allow anon read" on mapping.uc_topic for select using (true);
create policy "Allow anon read" on mapping.uc_playlist for select using (true);
create policy "Allow anon read" on mapping.topic_playlist for select using (true);

create policy "Service role full access" on catalog.course for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on catalog.course_content for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on catalog.uc for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on catalog.uc_content for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on catalog.uc_learning_outcome for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on subjects.topic for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on subjects.topic_content for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on subjects.topic_tag for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on mapping.uc_topic for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on mapping.uc_playlist for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access" on mapping.topic_playlist for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
