# **FACODI (Static MVP + Supabase)**

## Agents

---

### Repository Tasks

1. **Remove Next.js dependencies**:

* Clean up any remaining Next.js app.
* Update README.md to reflect that the project runs with Hugo.
* Configure basic scripts:

* `npm run dev` → run `hugo server -D`
* `npm run build` → run `hugo`

1. **Configure Hugo (Doks theme)**:

* Adjust `config/_default/config.toml` with the title, languages ​​(PT default, EN fallback prepared), and baseURL.
* Ensure the folder structure follows `content/courses/…/uc/…/topic.md`. * Create Hugo layouts/templates for:

* Home page (course list)
* Course page (details + courses)
* Course page (syllabus + outcomes + playlists + topics)
* Topic page (content + playlists + tags)

1. **Add Supabase integration on the front-end (pure JS)**:

* Create `static/js/supabaseClient.js` by initializing `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`. * Create `static/js/loaders.js` with functions:

* `loadCoursePage(courseCode, planVersion)`
* `loadUCPage(ucCode)`
* `loadTopicPage(topicSlug)`
* In Hugo layouts, include `<body data-*>` with attributes (`data-course`, `data-uc`, `data-topic`) and run the corresponding JS function.

1. **CI/CD GitHub Actions**:

* Maintain/adjust the `sync-md-to-supabase.yml` workflow to synchronize `.md → DB` using `SUPABASE_SERVICE_KEY`.
* Validate front matter via `validate-md.yml`.

---

### Database Tasks (Supabase)

1. **Create schemas and tables (names in English):**

* `catalog.course (code, name, degree, ects_total, duration_semesters, plan_version, institution, school, language, summary)`
* `catalog.course_content(course_code fk, content_md)`
* `catalog.uc (code pk, course_code fk, name, description, ects, semester, language, prerequisites text[])`
* `catalog.uc_content (uc_code fk, content_md)`
* `catalog.uc_learning_outcome (uc_code fk, outcome, order)`
* `subjects.topic (slug pk, name, summary)`
* `subjects.topic_content(topic_slug fk, content_md)`
* `subjects.topic_tag(topic_slug fk, tag)`
* `mapping.uc_topic(uc_code fk, topic_slug fk)`
* `mapping.uc_playlist(uc_code fk, playlist_id, priority)`
* `mapping.topic_playlist(topic_slug fk, playlist_id, priority)`

1. **Configure RLS**:

* Enable RLS on all tables.
* Allow public `SELECT` for `role anon`.
* Restrict `INSERT/UPDATE/DELETE` to the service role only.

1. **Initial Seeds**:

* Insert a sample course (LESTI 2024/2025), a course (LESTI-ALG1), a topic (data structures), and dummy playlists.
* These seeds can come from files already present in `content/`.

---

### Acceptance Criteria

* `hugo server` must run and generate navigable static pages.
* Opening a course page must display a static title + details loaded from Supabase.
* UCs must appear associated with the course, loaded dynamically.
* UCs must display outcomes, Markdown content, and playlists.
* Topic pages must display text + playlists + tags.
* CI must synchronize `.md → DB` correctly.
