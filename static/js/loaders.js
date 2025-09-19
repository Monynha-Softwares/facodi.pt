import { ensureClient } from "./supabaseClient.js";

const isBrowser = typeof window !== "undefined";

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderMarkdown(target, markdown) {
  if (!target) return;
  target.dataset.state = "ready";
  if (!markdown) {
    target.innerHTML = '<p class="text-muted">Conteúdo indisponível.</p>';
    return;
  }
  if (isBrowser && window.marked) {
    target.innerHTML = window.marked.parse(markdown);
  } else {
    target.textContent = markdown;
  }
}

function removePlaceholders(container) {
  if (!container) return;
  container.querySelectorAll("[data-placeholder]").forEach((node) => node.remove());
}

function showError(target, message) {
  if (!target) return;
  removePlaceholders(target);
  target.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}

function createPlaylistLink(playlistId, priority) {
  const wrapper = document.createElement("a");
  wrapper.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";
  wrapper.href = `https://www.youtube.com/playlist?list=${playlistId}`;
  wrapper.target = "_blank";
  wrapper.rel = "noopener";
  wrapper.textContent = playlistId;
  if (priority != null) {
    const badge = document.createElement("span");
    badge.className = "badge rounded-pill text-bg-primary";
    badge.textContent = `Prioridade ${priority}`;
    wrapper.appendChild(badge);
  }
  return wrapper;
}

function ensureContainer(selector) {
  const node = document.querySelector(selector);
  if (!node) {
    console.warn(`FACODI: container ${selector} não encontrado.`);
  }
  return node;
}

export async function loadCoursePage(courseCode, planVersion) {
  if (!courseCode) return;
  const detailsEl = ensureContainer("[data-course-details]");
  const contentEl = document.getElementById("course-content");
  const ucList = document.getElementById("course-uc-list");
  if (!detailsEl) return;

  let client;
  try {
    client = ensureClient();
  } catch (error) {
    showError(contentEl, "Configure as variáveis do Supabase para visualizar os detalhes do curso.");
    showError(ucList, "Configure as variáveis do Supabase para listar as UCs.");
    return;
  }

  try {
    const { data: course, error } = await client
      .from("catalog.course")
      .select("code, name, degree, ects_total, duration_semesters, plan_version, institution, school, language, summary")
      .eq("code", courseCode)
      .eq("plan_version", planVersion)
      .maybeSingle();
    if (error) throw error;
    if (course) {
      ["degree", "ects_total", "duration_semesters", "language", "institution", "school"].forEach((field) => {
        const target = detailsEl.querySelector(`[data-field="${field}"]`);
        if (target) {
          target.textContent = course[field] ?? "—";
        }
      });
    }
  } catch (err) {
    console.error("FACODI: erro ao carregar curso", err);
  }

  if (contentEl) {
    try {
      const { data, error } = await client
        .from("catalog.course_content")
        .select("content_md")
        .eq("course_code", courseCode)
        .eq("plan_version", planVersion)
        .maybeSingle();
      if (error) throw error;
      renderMarkdown(contentEl, data?.content_md ?? "");
    } catch (err) {
      console.error("FACODI: erro ao carregar conteúdo do curso", err);
      showError(contentEl, "Não foi possível carregar a ementa do curso.");
    }
  }

  if (ucList) {
    try {
      const { data: ucs, error } = await client
        .from("catalog.uc")
        .select("code, name, description, ects, semester, language")
        .eq("course_code", courseCode)
        .eq("plan_version", planVersion)
        .order("semester", { ascending: true });
      if (error) throw error;
      removePlaceholders(ucList);
      if (!ucs || ucs.length === 0) {
        ucList.innerHTML = '<div class="col-12"><div class="alert alert-warning">Nenhuma UC cadastrada para este curso.</div></div>';
        return;
      }
      const coursePath = document.body?.dataset?.coursePath ?? window.location.pathname;
      const normalizedPath = coursePath.endsWith("/") ? coursePath : `${coursePath}/`;
      ucs.forEach((uc) => {
        const col = document.createElement("div");
        col.className = "col-md-6";
        const card = document.createElement("article");
        card.className = "card h-100 shadow-sm border-0";
        const body = document.createElement("div");
        body.className = "card-body";
        const title = document.createElement("h3");
        title.className = "h5 mb-2";
        const link = document.createElement("a");
        link.className = "stretched-link text-decoration-none";
        const ucSlug = slugify(uc.code);
        link.href = `${normalizedPath}uc/${ucSlug}/`;
        link.textContent = uc.name ?? uc.code;
        title.appendChild(link);
        const description = document.createElement("p");
        description.className = "text-muted mb-3";
        description.textContent = uc.description ?? "Descrição não informada.";
        const meta = document.createElement("p");
        meta.className = "small text-muted mb-0";
        meta.textContent = `Semestre ${uc.semester ?? "?"} · ${uc.ects ?? "?"} ECTS`;
        body.appendChild(title);
        body.appendChild(description);
        body.appendChild(meta);
        card.appendChild(body);
        col.appendChild(card);
        ucList.appendChild(col);
      });
    } catch (err) {
      console.error("FACODI: erro ao carregar UCs", err);
      showError(ucList, "Não foi possível listar as UCs no momento.");
    }
  }
}

export async function loadUCPage(ucCode) {
  if (!ucCode) return;
  const detailsEl = ensureContainer("[data-uc-details]");
  const contentEl = document.getElementById("uc-content");
  const outcomesEl = document.getElementById("uc-outcomes");
  const playlistsEl = document.getElementById("uc-playlist-list");
  const topicsEl = document.getElementById("uc-topic-list");
  if (!detailsEl) return;

  let client;
  try {
    client = ensureClient();
  } catch (error) {
    showError(contentEl, "Configure as variáveis do Supabase para visualizar esta UC.");
    return;
  }

  try {
    const { data: uc, error } = await client
      .from("catalog.uc")
      .select("code, description, ects, semester, language, prerequisites, course_code, plan_version")
      .eq("code", ucCode)
      .maybeSingle();
    if (error) throw error;
    if (uc) {
      const prereqTarget = detailsEl.querySelector('[data-field="prerequisites"]');
      if (prereqTarget) {
        if (Array.isArray(uc.prerequisites) && uc.prerequisites.length > 0) {
          prereqTarget.textContent = uc.prerequisites.join(", ");
        } else {
          prereqTarget.textContent = "Nenhum";
        }
      }
      ["ects", "semester", "language"].forEach((field) => {
        const target = detailsEl.querySelector(`[data-field="${field}"]`);
        if (target && uc[field] != null) {
          target.textContent = uc[field];
        }
      });
    }
  } catch (err) {
    console.error("FACODI: erro ao buscar detalhes da UC", err);
  }

  if (contentEl) {
    try {
      const { data, error } = await client
        .from("catalog.uc_content")
        .select("content_md")
        .eq("uc_code", ucCode)
        .maybeSingle();
      if (error) throw error;
      renderMarkdown(contentEl, data?.content_md ?? "");
    } catch (err) {
      console.error("FACODI: erro ao carregar conteúdo da UC", err);
      showError(contentEl, "Não foi possível carregar o conteúdo desta UC.");
    }
  }

  if (outcomesEl) {
    try {
      const { data, error } = await client
        .from("catalog.uc_learning_outcome")
        .select("outcome, order")
        .eq("uc_code", ucCode)
        .order("order", { ascending: true });
      if (error) throw error;
      removePlaceholders(outcomesEl);
      if (!data || data.length === 0) {
        outcomesEl.innerHTML = '<li class="text-muted">Nenhum resultado de aprendizagem cadastrado.</li>';
      } else {
        data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.outcome;
          outcomesEl.appendChild(li);
        });
      }
    } catch (err) {
      console.error("FACODI: erro ao carregar resultados de aprendizagem", err);
      showError(outcomesEl, "Não foi possível carregar os resultados de aprendizagem.");
    }
  }

  if (playlistsEl) {
    try {
      const { data, error } = await client
        .from("mapping.uc_playlist")
        .select("playlist_id, priority")
        .eq("uc_code", ucCode)
        .order("priority", { ascending: true });
      if (error) throw error;
      removePlaceholders(playlistsEl);
      if (!data || data.length === 0) {
        playlistsEl.innerHTML = '<div class="list-group-item">Nenhuma playlist associada.</div>';
      } else {
        data.forEach((playlist) => {
          playlistsEl.appendChild(createPlaylistLink(playlist.playlist_id, playlist.priority));
        });
      }
    } catch (err) {
      console.error("FACODI: erro ao carregar playlists da UC", err);
      showError(playlistsEl, "Não foi possível carregar as playlists associadas.");
    }
  }

  if (topicsEl) {
    try {
      const { data, error } = await client
        .from("mapping.uc_topic")
        .select("topic:topic_slug (slug, name, summary)")
        .eq("uc_code", ucCode)
        .order("topic.slug", { ascending: true });
      if (error) throw error;
      removePlaceholders(topicsEl);
      if (!data || data.length === 0) {
        topicsEl.innerHTML = '<div class="col-12"><div class="alert alert-warning">Nenhum tópico foi mapeado para esta UC.</div></div>';
      } else {
        const ucPath = document.body?.dataset?.ucPath ?? window.location.pathname;
        const normalizedPath = ucPath.endsWith("/") ? ucPath : `${ucPath}/`;
        data.forEach((entry) => {
          if (!entry.topic) return;
          const col = document.createElement("div");
          col.className = "col-md-6";
          const card = document.createElement("article");
          card.className = "card h-100 border-0 shadow-sm";
          const body = document.createElement("div");
          body.className = "card-body";
          const h3 = document.createElement("h3");
          h3.className = "h5";
          const link = document.createElement("a");
          link.className = "stretched-link text-decoration-none";
          link.href = `${normalizedPath}${entry.topic.slug}/`;
          link.textContent = entry.topic.name ?? entry.topic.slug;
          h3.appendChild(link);
          const summary = document.createElement("p");
          summary.className = "text-muted mb-0";
          summary.textContent = entry.topic.summary ?? "Resumo não informado.";
          body.appendChild(h3);
          body.appendChild(summary);
          card.appendChild(body);
          col.appendChild(card);
          topicsEl.appendChild(col);
        });
      }
    } catch (err) {
      console.error("FACODI: erro ao carregar tópicos da UC", err);
      showError(topicsEl, "Não foi possível carregar os tópicos desta UC.");
    }
  }
}

export async function loadTopicPage(topicSlug) {
  if (!topicSlug) return;
  const contentEl = document.getElementById("topic-content");
  const playlistEl = document.getElementById("topic-playlist-list");
  const tagListEl = document.getElementById("topic-tag-list");

  let client;
  try {
    client = ensureClient();
  } catch (error) {
    showError(contentEl, "Configure as variáveis do Supabase para visualizar o tópico.");
    return;
  }

  if (contentEl) {
    try {
      const { data, error } = await client
        .from("subjects.topic_content")
        .select("content_md")
        .eq("topic_slug", topicSlug)
        .maybeSingle();
      if (error) throw error;
      renderMarkdown(contentEl, data?.content_md ?? "");
    } catch (err) {
      console.error("FACODI: erro ao carregar conteúdo do tópico", err);
      showError(contentEl, "Não foi possível carregar o conteúdo deste tópico.");
    }
  }

  if (playlistEl) {
    try {
      const { data, error } = await client
        .from("mapping.topic_playlist")
        .select("playlist_id, priority")
        .eq("topic_slug", topicSlug)
        .order("priority", { ascending: true });
      if (error) throw error;
      removePlaceholders(playlistEl);
      if (!data || data.length === 0) {
        playlistEl.innerHTML = '<div class="list-group-item">Nenhuma playlist cadastrada para este tópico.</div>';
      } else {
        data.forEach((playlist) => {
          playlistEl.appendChild(createPlaylistLink(playlist.playlist_id, playlist.priority));
        });
      }
    } catch (err) {
      console.error("FACODI: erro ao carregar playlists do tópico", err);
      showError(playlistEl, "Não foi possível carregar as playlists deste tópico.");
    }
  }

  if (tagListEl) {
    try {
      const { data, error } = await client
        .from("subjects.topic_tag")
        .select("tag")
        .eq("topic_slug", topicSlug)
        .order("tag", { ascending: true });
      if (error) throw error;
      removePlaceholders(tagListEl);
      if (!data || data.length === 0) {
        tagListEl.innerHTML = '<li class="list-inline-item text-muted">Sem tags cadastradas.</li>';
      } else {
        data.forEach((row) => {
          const item = document.createElement("li");
          item.className = "list-inline-item badge rounded-pill text-bg-secondary me-2";
          item.textContent = row.tag;
          tagListEl.appendChild(item);
        });
      }
    } catch (err) {
      console.error("FACODI: erro ao carregar tags do tópico", err);
      showError(tagListEl, "Não foi possível carregar as tags deste tópico.");
    }
  }
}
