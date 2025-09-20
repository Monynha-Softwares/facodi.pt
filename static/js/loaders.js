import { marked } from "https://esm.sh/marked@12.0.2";
import { getClient } from "./supabaseClient.js";

marked.use({ mangle: false, headerIds: false });

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderMarkdown = (markdown) => {
  if (!markdown) return "";
  try {
    return marked.parse(markdown);
  } catch (error) {
    console.error("[FACODI] Erro ao renderizar Markdown:", error);
    return `<pre class="bg-body-secondary p-3 rounded">${escapeHtml(markdown)}</pre>`;
  }
};

const getElement = (id) => document.getElementById(id);

const bySelector = (selector) => document.querySelector(selector);

const writeHTML = (selector, html) => {
  const target = typeof selector === "string" ? bySelector(selector) : selector;
  if (!target) return;
  target.innerHTML = html ?? "";
};

const writeText = (selector, text) => {
  const target = typeof selector === "string" ? bySelector(selector) : selector;
  if (!target) return;
  target.textContent = text ?? "";
};

const buildPlaylistList = (playlists = []) => {
  if (!playlists || playlists.length === 0) {
    return "<p class=\"text-muted small mb-0\">Nenhuma playlist registada.</p>";
  }
  const items = playlists
    .slice()
    .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    .map((item) => {
      const id = escapeHtml(item.id ?? item.playlist_id ?? "");
      const title = escapeHtml(item.title ?? item.name ?? id);
      if (!id) {
        return `<li class=\"mb-2\">${title}</li>`;
      }
      return `<li class=\"mb-2\"><a class=\"d-flex align-items-center gap-2\" href=\"https://www.youtube.com/playlist?list=${id}\" target=\"_blank\" rel=\"noopener\"><span class=\"badge bg-danger text-white\">YT</span><span>${title}</span></a></li>`;
    })
    .join("");
  return `<ul class=\"list-unstyled mb-0\">${items}</ul>`;
};

const buildOutcomeList = (outcomes = []) => {
  if (!outcomes || outcomes.length === 0) {
    return "<p class=\"text-muted small mb-0\">Sem resultados registados.</p>";
  }
  return `<ul class=\"small mb-0\">${outcomes.map((outcome) => `<li>${escapeHtml(outcome.outcome ?? outcome)}</li>`).join("")}</ul>`;
};

const buildTopicPills = (topics = []) => {
  if (!topics || topics.length === 0) {
    return "<div class=\"col-12 text-muted\">Sem tópicos registados.</div>";
  }
  return topics
    .map((topic) => {
      const summary = topic.summary ? `<p class=\"small text-muted mb-0\">${escapeHtml(topic.summary)}</p>` : "";
      const href = escapeHtml(topic.permalink ?? "#");
      return `<div class=\"col-12\"><div class=\"p-3 border rounded-3 h-100\"><a class=\"text-decoration-none fw-semibold\" href=\"${href}\">${escapeHtml(
        topic.title ?? topic.name ?? topic.slug ?? "Tópico"
      )}</a>${summary}</div></div>`;
    })
    .join("");
};

const buildUCList = (ucs = []) => {
  if (!ucs || ucs.length === 0) {
    return '<div class="col-12 text-muted">Nenhuma unidade curricular disponível.</div>';
  }
  return ucs
    .slice()
    .sort((a, b) => (a.semester ?? 0) - (b.semester ?? 0))
    .map((uc) => {
      const href = escapeHtml(uc.permalink ?? "#");
      const title = escapeHtml(uc.title ?? uc.name ?? uc.code ?? "Unidade curricular");
      const description = uc.description ? `<p class=\"text-muted\">${escapeHtml(uc.description)}</p>` : "";
      const outcomes = buildOutcomeList(uc.learning_outcomes);
      return `<div class=\"col-md-6 d-flex\"><article class=\"card shadow-sm w-100 h-100\"><div class=\"card-body d-flex flex-column\"><div class=\"d-flex justify-content-between align-items-start mb-2\"><h3 class=\"h5 mb-0\"><a class=\"text-decoration-none\" href=\"${href}\">${title}</a></h3><span class=\"badge bg-dark text-white\">${escapeHtml(uc.semester ?? "-")}º semestre</span></div>${description}<dl class=\"row small text-muted\"><dt class=\"col-6\">ECTS</dt><dd class=\"col-6\">${escapeHtml(uc.ects ?? "-")}</dd><dt class=\"col-6\">Idioma</dt><dd class=\"col-6 text-uppercase\">${escapeHtml(uc.language ?? "-")}</dd></dl><h4 class=\"h6 mt-3\">Resultados de aprendizagem</h4>${outcomes}<div class=\"mt-auto\"><a class=\"btn btn-outline-primary w-100\" href=\"${href}\">Ver detalhes</a></div></div></article></div>`;
    })
    .join("");
};

const normalizePlaylist = (entry) => ({
  id: entry?.id ?? entry?.playlist_id ?? "",
  title: entry?.title ?? entry?.name ?? "",
  priority: entry?.priority ?? 0,
});

const normalizeTopic = (entry) => ({
  slug: entry?.slug ?? entry?.topic_slug ?? "",
  title: entry?.title ?? entry?.name ?? entry?.topic?.name ?? "",
  summary: entry?.summary ?? entry?.topic?.summary ?? "",
  tags: entry?.tags ?? entry?.topic?.tags ?? [],
  youtube_playlists: (entry?.youtube_playlists ?? entry?.playlists ?? []).map(normalizePlaylist),
  permalink: entry?.permalink ?? entry?.topic?.permalink ?? entry?.url ?? null,
  uc_code: entry?.uc_code ?? entry?.topic_slug ?? null,
  course_code: entry?.course_code ?? null,
  plan_version: entry?.plan_version ?? null,
  content_markdown: entry?.content_markdown ?? entry?.content?.content_md ?? entry?.content_md ?? "",
});

const normalizeUC = (entry) => ({
  code: entry?.code ?? entry?.uc_code ?? "",
  title: entry?.title ?? entry?.name ?? "",
  description: entry?.description ?? "",
  ects: entry?.ects ?? null,
  semester: entry?.semester ?? null,
  language: entry?.language ?? "",
  prerequisites: entry?.prerequisites ?? [],
  learning_outcomes: (entry?.learning_outcomes ?? entry?.outcomes ?? []).map((outcome) => outcome?.outcome ?? outcome),
  youtube_playlists: (entry?.youtube_playlists ?? entry?.playlists ?? []).map(normalizePlaylist),
  topics: (entry?.topics ?? []).map(normalizeTopic),
  course_code: entry?.course_code ?? entry?.course ?? null,
  plan_version: entry?.plan_version ?? null,
  permalink: entry?.permalink ?? entry?.url ?? null,
  content_markdown: entry?.content_markdown ?? entry?.content?.content_md ?? entry?.content_md ?? "",
});

const normalizeCourse = (entry) => ({
  course: {
    code: entry?.course?.code ?? entry?.code ?? "",
    title: entry?.course?.title ?? entry?.title ?? entry?.name ?? "",
    degree: entry?.course?.degree ?? entry?.degree ?? "",
    ects_total: entry?.course?.ects_total ?? entry?.ects_total ?? null,
    duration_semesters: entry?.course?.duration_semesters ?? entry?.duration_semesters ?? null,
    plan_version: entry?.course?.plan_version ?? entry?.plan_version ?? "",
    institution: entry?.course?.institution ?? entry?.institution ?? "",
    school: entry?.course?.school ?? entry?.school ?? "",
    language: entry?.course?.language ?? entry?.language ?? "",
    summary: entry?.course?.summary ?? entry?.summary ?? "",
    permalink: entry?.course?.permalink ?? entry?.permalink ?? null,
    content_markdown:
      entry?.course?.content_markdown ??
      entry?.course?.content?.content_md ??
      entry?.content_markdown ??
      entry?.content?.content_md ??
      "",
  },
  ucs: (entry?.ucs ?? entry?.course?.ucs ?? []).map(normalizeUC),
});

const fetchCourse = async (client, courseCode, planVersion) => {
  try {
    const { data, error } = await client
      .from("catalog_course")
      .select(
        `code, name, degree, ects_total, duration_semesters, plan_version, institution, school, language, summary,
         content:catalog_course_content(content_md),
         ucs:catalog_uc!catalog_course_code_fkey (
            code, name, description, ects, semester, language, prerequisites, plan_version,
            content:catalog_uc_content(content_md),
            learning_outcomes:catalog_uc_learning_outcome(order, outcome),
            playlists:mapping_uc_playlist(playlist_id, priority, title),
            topics:mapping_uc_topic(
              uc_code, topic_slug,
              topic:subjects_topic(name, summary),
              playlists:mapping_topic_playlist(playlist_id, priority, title),
              content:subjects_topic_content(content_md)
            )
         )`
      )
      .eq("code", courseCode)
      .eq("plan_version", planVersion)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const normalized = normalizeCourse({ course: data, ucs: data.ucs });
    normalized.course.plan_version = planVersion;
    normalized.ucs = normalized.ucs.map((uc) => ({ ...uc, course_code: courseCode }));
    return normalized;
  } catch (error) {
    console.error("[FACODI] Erro ao carregar curso do Supabase:", error);
    return null;
  }
};

const fetchUC = async (client, ucCode, planVersion) => {
  try {
    let query = client
      .from("catalog_uc")
      .select(
        `code, course_code, title:name, description, ects, semester, language, prerequisites, plan_version,
         content:catalog_uc_content(content_md),
         learning_outcomes:catalog_uc_learning_outcome(order, outcome),
         playlists:mapping_uc_playlist(playlist_id, priority, title),
         topics:mapping_uc_topic(
           topic_slug, uc_code,
           topic:subjects_topic(name, summary),
           playlists:mapping_topic_playlist(playlist_id, priority, title),
           content:subjects_topic_content(content_md)
         )`
      )
      .eq("code", ucCode)
      .maybeSingle();

    if (planVersion) {
      query = query.eq("plan_version", planVersion);
    }

    const { data, error } = await query;
    if (error) throw error;
    if (!data) return null;

    return {
      uc: normalizeUC({ ...data, title: data.title ?? data.name, plan_version: data.plan_version }),
      topics: (data.topics ?? []).map((topic) => normalizeTopic({ ...topic, plan_version })),
    };
  } catch (error) {
    console.error("[FACODI] Erro ao carregar UC do Supabase:", error);
    return null;
  }
};

const fetchTopic = async (client, topicSlug) => {
  try {
    const { data, error } = await client
      .from("subjects_topic")
      .select(
        `slug, name, summary,
         content:subjects_topic_content(content_md),
         tags:subjects_topic_tag(tag),
         playlists:mapping_topic_playlist(playlist_id, priority, title),
         uc_links:mapping_uc_topic(uc_code, course_code:catalog_uc(course_code), plan_version:catalog_uc(plan_version))`
      )
      .eq("slug", topicSlug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const tags = (data.tags ?? []).map((item) => item?.tag ?? item);
    const ucLink = data.uc_links?.[0] ?? {};

    return {
      topic: {
        slug: data.slug,
        title: data.name,
        summary: data.summary,
        tags,
        youtube_playlists: (data.playlists ?? []).map(normalizePlaylist),
        uc_code: ucLink.uc_code ?? null,
        course_code: ucLink.course_code ?? null,
        plan_version: ucLink.plan_version ?? null,
        content_markdown: data.content?.content_md ?? "",
      },
    };
  } catch (error) {
    console.error("[FACODI] Erro ao carregar tópico do Supabase:", error);
    return null;
  }
};

const renderCoursePage = (payload) => {
  if (!payload?.course) return;
  const { course, ucs } = payload;
  writeText("#course-title", course.title);
  writeText("#course-summary", course.summary);
  const metaHTML = `
    <dt class="col-5">Grau</dt><dd class="col-7 text-capitalize">${escapeHtml(course.degree)}</dd>
    <dt class="col-5">ECTS</dt><dd class="col-7">${escapeHtml(course.ects_total ?? "-")}</dd>
    <dt class="col-5">Semestres</dt><dd class="col-7">${escapeHtml(course.duration_semesters ?? "-")}</dd>
    <dt class="col-5">Instituição</dt><dd class="col-7">${escapeHtml(course.institution)}</dd>
    <dt class="col-5">Escola</dt><dd class="col-7">${escapeHtml(course.school)}</dd>
    <dt class="col-5">Idioma</dt><dd class="col-7 text-uppercase">${escapeHtml(course.language)}</dd>`;
  writeHTML("#course-meta", metaHTML);
  writeHTML("#course-content", renderMarkdown(course.content_markdown));
  writeHTML("#uc-list", buildUCList(ucs));
};

const renderUCPage = (payload) => {
  if (!payload?.uc) return;
  const { uc, topics } = payload;
  writeText("#uc-title", uc.title);
  writeText("#uc-summary", uc.description);
  const metaHTML = `
    <dt class="col-5">ECTS</dt><dd class="col-7">${escapeHtml(uc.ects ?? "-")}</dd>
    <dt class="col-5">Semestre</dt><dd class="col-7">${escapeHtml(uc.semester ?? "-")}</dd>
    <dt class="col-5">Idioma</dt><dd class="col-7 text-uppercase">${escapeHtml(uc.language ?? "-")}</dd>
    ${uc.prerequisites && uc.prerequisites.length ? `<dt class="col-5">Pré-requisitos</dt><dd class="col-7">${escapeHtml(uc.prerequisites.join(", "))}</dd>` : ""}`;
  writeHTML("#uc-meta", metaHTML);
  writeHTML("#uc-content", renderMarkdown(uc.content_markdown));
  writeHTML("#uc-outcomes", buildOutcomeList(uc.learning_outcomes));
  writeHTML("#uc-playlists", buildPlaylistList(uc.youtube_playlists));
  writeHTML("#uc-topics", buildTopicPills(topics));
};

const renderTopicPage = (payload) => {
  if (!payload?.topic) return;
  const { topic } = payload;
  writeText("#topic-title", topic.title);
  writeText("#topic-summary", topic.summary);
  const tagsHTML = (topic.tags ?? []).length
    ? (topic.tags ?? []).map((tag) => `<span class="badge bg-dark-subtle text-dark">#${escapeHtml(tag)}</span>`).join(" ")
    : "<span class=\"text-muted small\">Sem tags</span>";
  writeHTML("#topic-tags", tagsHTML);
  writeHTML("#topic-playlists", buildPlaylistList(topic.youtube_playlists));
  writeHTML("#topic-content", renderMarkdown(topic.content_markdown));
};

const loadFromFallback = (fallback, key) => {
  if (!fallback) return null;
  if (key === "course") {
    return normalizeCourse(fallback);
  }
  if (key === "uc") {
    return {
      uc: normalizeUC(fallback.uc ?? fallback),
      topics: (fallback.topics ?? []).map(normalizeTopic),
    };
  }
  if (key === "topic") {
    return { topic: normalizeTopic(fallback.topic ?? fallback) };
  }
  return null;
};

export const loadCoursePage = async (courseCode, planVersion, fallback) => {
  const client = getClient();
  let payload = null;
  if (client) {
    payload = await fetchCourse(client, courseCode, planVersion);
  }
  if (!payload) {
    payload = loadFromFallback(fallback, "course");
  }
  if (!payload) return;
  renderCoursePage(payload);
};

export const loadUCPage = async (ucCode, planVersion, fallback) => {
  const client = getClient();
  let payload = null;
  if (client) {
    payload = await fetchUC(client, ucCode, planVersion);
  }
  if (!payload) {
    payload = loadFromFallback(fallback, "uc");
  }
  if (!payload) return;
  renderUCPage(payload);
};

export const loadTopicPage = async (topicSlug, fallback) => {
  const client = getClient();
  let payload = null;
  if (client) {
    payload = await fetchTopic(client, topicSlug);
  }
  if (!payload) {
    payload = loadFromFallback(fallback, "topic");
  }
  if (!payload) return;
  renderTopicPage(payload);
};

export const loadHomeCourses = (fallback) => {
  const container = getElement("facodi-home-courses");
  if (!container) return;
  if (container.children.length > 0) return;
  const courses = fallback?.courses ?? [];
  if (!Array.isArray(courses) || courses.length === 0) return;
  const cards = courses
    .map((course) => {
      const href = escapeHtml(course.permalink ?? "#");
      return `<div class=\"col-md-6 col-xl-4 d-flex\"><article class=\"card shadow-sm w-100 h-100\"><div class=\"card-body d-flex flex-column\"><div class=\"d-flex justify-content-between align-items-center mb-2\"><h3 class=\"h5 mb-0\"><a class=\"text-decoration-none\" href=\"${href}\">${escapeHtml(
        course.title ?? course.name ?? "Curso"
      )}</a></h3><span class=\"badge bg-primary-subtle text-primary fw-semibold\">${escapeHtml(course.plan_version ?? "")}</span></div><p class=\"text-muted\">${escapeHtml(
        course.summary ?? "Plano curricular disponível em formato aberto."
      )}</p><dl class=\"row small text-muted\"><dt class=\"col-6\">ECTS</dt><dd class=\"col-6\">${escapeHtml(course.ects_total ?? "-")}</dd><dt class=\"col-6\">Duração</dt><dd class=\"col-6\">${escapeHtml(
        course.duration_semesters ?? "-"
      )} semestres</dd></dl><div class=\"mt-auto\"><a class=\"btn btn-outline-primary w-100\" href=\"${href}\">Ver plano curricular</a></div></div></article></div>`;
    })
    .join("");
  container.insertAdjacentHTML("beforeend", cards);
};
