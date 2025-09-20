(function () {
  const namespace = (window.FACODI = window.FACODI || {});
  const supabaseClient = namespace.supabase;

  function parseJSONFromElement(id) {
    const element = document.getElementById(id);
    if (!element) return null;

    try {
      return JSON.parse(element.textContent || "null");
    } catch (error) {
      console.error(`[FACODI] Falha ao ler JSON do elemento #${id}.`, error);
      return null;
    }
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function renderMarkdown(markdown, fallbackHtml) {
    if (markdown && typeof window.marked !== "undefined") {
      try {
        return window.marked.parse(markdown);
      } catch (error) {
        console.error("[FACODI] Erro ao converter Markdown com marked.", error);
      }
    }
    return fallbackHtml || markdown || "";
  }

  function renderCourseCards(courses) {
    const container = document.getElementById("facodi-course-list");
    if (!container) return;

    container.innerHTML = "";
    if (!courses || !courses.length) {
      container.innerHTML = '<div class="col-12"><p class="text-muted">Nenhum curso disponível.</p></div>';
      return;
    }

    courses.forEach((course) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";

      const article = document.createElement("article");
      article.className = "card h-100 shadow-sm";

      const body = document.createElement("div");
      body.className = "card-body d-flex flex-column";

      const title = document.createElement("h2");
      title.className = "h5";
      title.textContent = course.title || course.name || course.code;
      body.appendChild(title);

      const meta = document.createElement("p");
      meta.className = "text-muted small mb-2";
      meta.textContent = `Código: ${course.code || "—"} · Plano ${course.plan_version || "—"}`;
      body.appendChild(meta);

      if (course.summary) {
        const summary = document.createElement("p");
        summary.className = "flex-grow-1";
        summary.textContent = course.summary;
        body.appendChild(summary);
      }

      const details = document.createElement("dl");
      details.className = "row small text-muted mb-3";
      details.innerHTML = `
        <dt class="col-6">ECTS</dt><dd class="col-6">${course.ects_total ?? "—"}</dd>
        <dt class="col-6">Duração</dt><dd class="col-6">${course.duration_semesters ?? "—"} semestres</dd>
        ${course.language ? `<dt class="col-6">Idioma</dt><dd class="col-6 text-uppercase">${course.language}</dd>` : ""}
      `;
      body.appendChild(details);

      const link = document.createElement("a");
      link.className = "btn btn-primary mt-auto";
      link.href = course.url || "#";
      link.textContent = "Ver plano curricular";
      body.appendChild(link);

      article.appendChild(body);
      col.appendChild(article);
      container.appendChild(col);
    });
  }

  function renderCourseContent(course) {
    const container = document.getElementById("facodi-course-content");
    if (!container) return;
    container.innerHTML = renderMarkdown(course?.content_markdown, course?.content_html);
  }

  function renderCourseUcs(ucs) {
    const container = document.getElementById("facodi-course-ucs");
    if (!container) return;

    container.innerHTML = "";
    const list = ensureArray(ucs);
    if (!list.length) {
      container.innerHTML = '<div class="col-12"><p class="text-muted">Nenhuma unidade curricular publicada ainda.</p></div>';
      return;
    }

    list.forEach((uc) => {
      const col = document.createElement("div");
      col.className = "col-md-6";

      const article = document.createElement("article");
      article.className = "card h-100 shadow-sm";

      const body = document.createElement("div");
      body.className = "card-body d-flex flex-column";

      const title = document.createElement("h3");
      title.className = "h5 mb-1";
      title.textContent = uc.title || uc.name || uc.code;
      body.appendChild(title);

      const meta = document.createElement("p");
      meta.className = "text-muted small mb-2";
      const semester = uc.semester ? `Semestre ${uc.semester}` : "Semestre —";
      const ects = uc.ects ? `${uc.ects} ECTS` : "ECTS —";
      meta.textContent = `${uc.code || "—"} · ${semester} · ${ects}`;
      body.appendChild(meta);

      if (uc.summary || uc.description) {
        const summary = document.createElement("p");
        summary.className = "flex-grow-1";
        summary.textContent = uc.summary || uc.description;
        body.appendChild(summary);
      } else {
        const spacer = document.createElement("div");
        spacer.className = "flex-grow-1";
        body.appendChild(spacer);
      }

      const link = document.createElement("a");
      link.className = "btn btn-outline-primary mt-auto";
      link.href = uc.url || "#";
      link.textContent = "Ver detalhes da UC";
      body.appendChild(link);

      article.appendChild(body);
      col.appendChild(article);
      container.appendChild(col);
    });
  }

  function renderPlaylists(containerId, playlists) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    const list = ensureArray(playlists);
    if (!list.length) {
      container.innerHTML = '<div class="col-12"><p class="text-muted">Nenhuma playlist cadastrada.</p></div>';
      return;
    }

    list.forEach((playlist) => {
      const col = document.createElement("div");
      col.className = container.classList.contains("row") ? "col-md-6" : "col-12";

      const article = document.createElement("article");
      article.className = "card h-100 shadow-sm";

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("h3");
      title.className = containerId.includes("topic") ? "h6" : "h5";
      title.textContent = playlist.title || "Playlist";
      body.appendChild(title);

      const priority = document.createElement("p");
      priority.className = "text-muted small";
      const order = playlist.priority ?? playlist.order ?? 1;
      priority.textContent = `Prioridade ${order}`;
      body.appendChild(priority);

      if (playlist.description) {
        const description = document.createElement("p");
        description.className = "mb-3";
        description.textContent = playlist.description;
        body.appendChild(description);
      }

      const link = document.createElement("a");
      link.className = "btn btn-outline-primary";
      link.target = "_blank";
      link.rel = "noopener";
      const playlistId = playlist.id || playlist.playlist_id;
      link.href = playlist.url || (playlistId ? `https://www.youtube.com/playlist?list=${playlistId}` : "#");
      link.textContent = containerId.includes("topic") ? "Assistir no YouTube" : "Abrir no YouTube";
      body.appendChild(link);

      article.appendChild(body);
      col.appendChild(article);
      container.appendChild(col);
    });
  }

  function renderTopics(topics) {
    const container = document.getElementById("facodi-uc-topics");
    if (!container) return;

    container.innerHTML = "";
    const list = ensureArray(topics);
    if (!list.length) {
      container.innerHTML = '<div class="col-12"><p class="text-muted">Ainda não existem tópicos associados.</p></div>';
      return;
    }

    list.forEach((topic) => {
      const col = document.createElement("div");
      col.className = "col-md-6";

      const article = document.createElement("article");
      article.className = "card h-100 shadow-sm";

      const body = document.createElement("div");
      body.className = "card-body d-flex flex-column";

      const title = document.createElement("h3");
      title.className = "h5";
      title.textContent = topic.title || topic.name || topic.slug;
      body.appendChild(title);

      if (topic.summary) {
        const summary = document.createElement("p");
        summary.className = "flex-grow-1";
        summary.textContent = topic.summary;
        body.appendChild(summary);
      } else {
        const spacer = document.createElement("div");
        spacer.className = "flex-grow-1";
        body.appendChild(spacer);
      }

      const link = document.createElement("a");
      link.className = "btn btn-outline-secondary mt-auto";
      link.href = topic.url || "#";
      link.textContent = "Ver tópico";
      body.appendChild(link);

      article.appendChild(body);
      col.appendChild(article);
      container.appendChild(col);
    });
  }

  function renderTopicContent(topic) {
    const container = document.getElementById("facodi-topic-content");
    if (!container) return;
    container.innerHTML = renderMarkdown(topic?.content_markdown, topic?.content_html);
  }
  async function fetchCourseListFromSupabase() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from("catalog_course")
        .select("code,name,plan_version,degree,ects_total,duration_semesters,language,summary")
        .order("code", { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn("[FACODI] Não foi possível carregar cursos do Supabase.", error);
      return null;
    }
  }

  function mapCourseList(data) {
    return ensureArray(data).map((item) => ({
      code: item.code,
      title: item.name || item.title,
      plan_version: item.plan_version,
      summary: item.summary,
      degree: item.degree,
      ects_total: item.ects_total,
      duration_semesters: item.duration_semesters,
      language: item.language,
      url: item.url || buildCourseUrl(item.code, item.plan_version),
    }));
  }

  function buildCourseUrl(code, planVersion) {
    if (!code) return "#";
    const courseSlug = String(code).toLowerCase();
    const versionSlug = (planVersion || "atual").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `/courses/${courseSlug}/${versionSlug}/`;
  }

  async function fetchCourseFromSupabase(code, planVersion) {
    if (!supabaseClient || !code) return null;
    try {
      let query = supabaseClient
        .from("catalog_course")
        .select("code,name,plan_version,degree,ects_total,duration_semesters,institution,school,language,summary,catalog_course_content(content_md)")
        .eq("code", code);
      if (planVersion) {
        query = query.eq("plan_version", planVersion);
      }
      const { data, error } = await query.single();
      if (error) throw error;

      const course = data || {};
      const contentMarkdown = ensureArray(course.catalog_course_content)[0]?.content_md || "";

      const { data: ucData, error: ucError } = await supabaseClient
        .from("catalog_uc")
        .select("code,course_code,name,description,ects,semester,language,summary,prerequisites, catalog_uc_content(content_md)")
        .eq("course_code", code)
        .order("code", { ascending: true });
      if (ucError) throw ucError;

      const mappedUcs = ensureArray(ucData).map((item) => ({
        code: item.code,
        title: item.name,
        summary: item.summary || item.description,
        description: item.description,
        ects: item.ects,
        semester: item.semester,
        language: item.language,
        prerequisites: item.prerequisites,
        content_markdown: ensureArray(item.catalog_uc_content)[0]?.content_md || "",
        url: buildCourseUrl(code, planVersion).replace(/\/$/, `/uc/${item.code}/`),
      }));

      return {
        code: course.code,
        title: course.name,
        plan_version: course.plan_version,
        degree: course.degree,
        ects_total: course.ects_total,
        duration_semesters: course.duration_semesters,
        institution: course.institution,
        school: course.school,
        language: course.language,
        summary: course.summary,
        content_markdown: contentMarkdown,
        ucs: mappedUcs,
      };
    } catch (error) {
      console.warn("[FACODI] Não foi possível carregar detalhes do curso pelo Supabase.", error);
      return null;
    }
  }

  async function fetchUcFromSupabase(code) {
    if (!supabaseClient || !code) return null;
    try {
      const { data, error } = await supabaseClient
        .from("catalog_uc")
        .select("code,name,description,ects,semester,language,prerequisites,summary, catalog_uc_content(content_md), catalog_uc_learning_outcome(outcome,order), mapping_uc_playlist(playlist_id,priority), mapping_uc_topic(topic_slug)")
        .eq("code", code)
        .single();
      if (error) throw error;

      const uc = data || {};
      const contentMarkdown = ensureArray(uc.catalog_uc_content)[0]?.content_md || "";
      const learningOutcomes = ensureArray(uc.catalog_uc_learning_outcome)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => item.outcome);
      const playlists = ensureArray(uc.mapping_uc_playlist).map((item) => ({
        id: item.playlist_id,
        priority: item.priority,
      }));
      const topics = ensureArray(uc.mapping_uc_topic).map((item) => ({
        slug: item.topic_slug,
      }));

      return {
        code: uc.code,
        title: uc.name,
        description: uc.description,
        summary: uc.summary,
        ects: uc.ects,
        semester: uc.semester,
        language: uc.language,
        prerequisites: uc.prerequisites,
        learning_outcomes: learningOutcomes,
        youtube_playlists: playlists,
        topics,
        content_markdown: contentMarkdown,
      };
    } catch (error) {
      console.warn("[FACODI] Não foi possível carregar a UC pelo Supabase.", error);
      return null;
    }
  }

  async function fetchTopicFromSupabase(slug) {
    if (!supabaseClient || !slug) return null;
    try {
      const { data, error } = await supabaseClient
        .from("subjects_topic")
        .select("slug,name,summary,subjects_topic_content(content_md),subjects_topic_tag(tag),mapping_topic_playlist(playlist_id,priority)")
        .eq("slug", slug)
        .single();
      if (error) throw error;

      const topic = data || {};
      const contentMarkdown = ensureArray(topic.subjects_topic_content)[0]?.content_md || "";
      const tags = ensureArray(topic.subjects_topic_tag).map((item) => item.tag);
      const playlists = ensureArray(topic.mapping_topic_playlist).map((item) => ({
        id: item.playlist_id,
        priority: item.priority,
      }));

      return {
        slug: topic.slug,
        title: topic.name,
        summary: topic.summary,
        content_markdown: contentMarkdown,
        tags,
        youtube_playlists: playlists,
      };
    } catch (error) {
      console.warn("[FACODI] Não foi possível carregar o tópico pelo Supabase.", error);
      return null;
    }
  }

  function updateCoursePage(data) {
    if (!data) return;
    renderCourseContent(data);
    if (data.ucs) {
      const mapped = data.ucs.map((uc) => Object.assign({}, uc, { url: uc.url || buildCourseUrl(data.code, data.plan_version).replace(/\/$/, `/uc/${uc.code}/`) }));
      renderCourseUcs(mapped);
    }
  }

  function updateUcPage(data) {
    if (!data) return;
    const container = document.getElementById("facodi-uc-content");
    if (container) {
      container.innerHTML = renderMarkdown(data.content_markdown, container.innerHTML);
    }
    if (data.youtube_playlists) {
      const playlists = data.youtube_playlists.map((item) => (
        typeof item === "string"
          ? { id: item }
          : Object.assign({}, item, { id: item.id || item.playlist_id })
      ));
      renderPlaylists("facodi-uc-playlists", playlists);
    }
    if (data.topics) {
      renderTopics(data.topics);
    }
    if (Array.isArray(data.learning_outcomes)) {
      const list = document.querySelectorAll("#facodi-uc-content ~ div .card ul");
      if (list.length) {
        const ul = list[list.length - 1];
        ul.innerHTML = "";
        data.learning_outcomes.forEach((outcome) => {
          const li = document.createElement("li");
          li.className = "d-flex align-items-start mb-2";
          li.innerHTML = '<span class="badge bg-success-subtle text-success me-2">✓</span><span>' + outcome + "</span>";
          ul.appendChild(li);
        });
      }
    }
  }

  function updateTopicPage(data) {
    if (!data) return;
    renderTopicContent(data);
    renderPlaylists("facodi-topic-playlists", data.youtube_playlists);

    const content = document.getElementById("facodi-topic-content");
    if (!content) return;

    const wrapper = (() => {
      const previous = content.previousElementSibling;
      if (previous && previous.classList && previous.classList.contains("mb-3")) {
        return previous;
      }
      if (Array.isArray(data.tags) && data.tags.length && content.parentElement) {
        const created = document.createElement("div");
        created.className = "mb-3";
        content.parentElement.insertBefore(created, content);
        return created;
      }
      return null;
    })();

    if (wrapper) {
      wrapper.innerHTML = "";
      if (Array.isArray(data.tags)) {
        data.tags.forEach((tag) => {
          const badge = document.createElement("span");
          badge.className = "badge bg-secondary-subtle text-secondary me-2 mb-2";
          badge.textContent = `#${tag}`;
          wrapper.appendChild(badge);
        });
      }
    }
  }


  async function loadCourseListPage() {
    const fallbackData = parseJSONFromElement("facodi-course-list-data") || [];
    renderCourseCards(fallbackData);

    const remote = await fetchCourseListFromSupabase();
    if (remote && remote.length) {
      renderCourseCards(mapCourseList(remote));
    }
  }

  async function loadCoursePage(meta) {
    const fallbackData = parseJSONFromElement("facodi-course-data");
    if (fallbackData) {
      updateCoursePage(fallbackData);
    }

    const remote = await fetchCourseFromSupabase(meta.code, meta.planVersion);
    if (remote) {
      updateCoursePage(remote);
    }
  }

  async function loadUcPage(meta) {
    const fallbackData = parseJSONFromElement("facodi-uc-data");
    if (fallbackData) {
      updateUcPage(fallbackData);
    }

    const remote = await fetchUcFromSupabase(meta.code);
    if (remote) {
      updateUcPage(remote);
    }
  }

  async function loadTopicPage(meta) {
    const fallbackData = parseJSONFromElement("facodi-topic-data");
    if (fallbackData) {
      updateTopicPage(fallbackData);
    }

    const remote = await fetchTopicFromSupabase(meta.slug);
    if (remote) {
      updateTopicPage(remote);
    }
  }

  async function init() {
    const meta = parseJSONFromElement("facodi-page-meta") || {};
    const type = meta.type;

    try {
      if (type === "course-list") {
        await loadCourseListPage();
      } else if (type === "course") {
        await loadCoursePage(meta);
      } else if (type === "uc") {
        await loadUcPage(meta);
      } else if (type === "topic") {
        await loadTopicPage(meta);
      }
    } catch (error) {
      console.error("[FACODI] Erro ao inicializar página.", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
