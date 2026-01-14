(function () {
  const messages = window.__FACODI_I18N__ || {};

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resolve(path) {
    if (!path) {
      return undefined;
    }
    return path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key];
      }
      return undefined;
    }, messages);
  }

  function t(path, fallback = '') {
    const value = resolve(path);
    return typeof value === 'string' && value.length > 0 ? value : fallback;
  }

  function format(path, replacements = {}, fallback = '') {
    const template = t(path, fallback);
    return template.replace(/\{\{\s*\.?([\w]+)\s*\}\}/g, (_, key) => {
      const value = replacements[key];
      return value === undefined || value === null ? '' : String(value);
    });
  }

  function getClient() {
    if (!window.facodi || !window.facodi.supabase) {
      // Only warn in development mode
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.info('[FACODI] Cliente Supabase indisponível (modo desenvolvimento).');
      }
      return null;
    }
    return window.facodi.supabase;
  }

  function renderMarkdown(md) {
    if (!md) {
      return '';
    }
    if (window.marked && typeof window.marked.parse === 'function') {
      return window.marked.parse(md);
    }
    const escaped = escapeHTML(md);
    return '<p>' + escaped.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br />') + '</p>';
  }

  function toText(value, fallback = '—') {
    const safeFallback = escapeHTML(fallback);
    if (Array.isArray(value)) {
      if (!value.length) {
        return safeFallback;
      }
      return value
        .map((item) => (item === null || item === undefined ? '' : escapeHTML(item)))
        .filter((item) => item.length > 0)
        .join(', ') || safeFallback;
    }
    if (value === null || value === undefined || value === '') {
      return safeFallback;
    }
    return escapeHTML(value);
  }

  function durationLabel(value) {
    const text = toText(value);
    if (text === '—') {
      return text;
    }
    const numeric = Number(value);
    const suffixKey = Number.isFinite(numeric) && numeric === 1
      ? 'course.details.durationSuffixSingular'
      : 'course.details.durationSuffixPlural';
    const suffixFallback = Number.isFinite(numeric) && numeric === 1 ? 'semestre' : 'semestres';
    const suffix = t(suffixKey, suffixFallback);
    return `${text} ${suffix}`.trim();
  }

  function courseMetaText(uc) {
    const semester = toText(uc.semester);
    const ects = toText(uc.ects);
    return format('course.meta.uc', { semester, ects }, '{{semester}}º semestre · {{ects}} ECTS');
  }

  async function loadCoursePage(courseCode, planVersion) {
    const client = getClient();
    if (!client) return;

    const detailsEl = document.querySelector('[data-course-details]');
    const contentEl = document.querySelector('[data-course-content]');
    const ucContainer = document.querySelector('[data-course-ucs]');

    if (!detailsEl || !contentEl || !ucContainer) {
      return;
    }

    try {
      const { data: course, error: courseError } = await client
        .from('catalog.course')
        .select('*')
        .eq('code', courseCode)
        .eq('plan_version', planVersion)
        .maybeSingle();

      if (courseError || !course) {
        throw courseError || new Error(t('course.errors.notFound', 'Curso não encontrado.'));
      }

      detailsEl.innerHTML = `
        <dt class="col-12 col-sm-5">${t('course.details.institution', 'Instituição')}</dt>
        <dd class="col-12 col-sm-7">${toText(course.institution)}</dd>
        <dt class="col-12 col-sm-5">${t('course.details.school', 'Escola')}</dt>
        <dd class="col-12 col-sm-7">${toText(course.school)}</dd>
        <dt class="col-12 col-sm-5">${t('course.details.ects', 'ECTS')}</dt>
        <dd class="col-12 col-sm-7">${toText(course.ects_total)}</dd>
        <dt class="col-12 col-sm-5">${t('course.details.duration', 'Duração')}</dt>
        <dd class="col-12 col-sm-7">${durationLabel(course.duration_semesters)}</dd>
        <dt class="col-12 col-sm-5">${t('course.details.language', 'Idioma')}</dt>
        <dd class="col-12 col-sm-7">${toText(course.language)}</dd>
      `;

      const { data: courseContent, error: contentError } = await client
        .from('catalog.course_content')
        .select('content_md')
        .eq('course_code', courseCode)
        .eq('plan_version', planVersion)
        .maybeSingle();

      if (contentError) {
        throw contentError;
      }

      if (courseContent && courseContent.content_md) {
        contentEl.innerHTML = renderMarkdown(courseContent.content_md);
      } else {
        contentEl.innerHTML = `<p class="text-muted mb-0">${t('course.empty.content', 'Ainda não há conteúdo sincronizado para este curso.')}</p>`;
      }

      const { data: ucList, error: ucError } = await client
        .from('catalog.uc')
        .select('code,name,description,ects,semester,language,course_plan_version')
        .eq('course_code', courseCode)
        .eq('course_plan_version', planVersion)
        .order('semester', { ascending: true })
        .order('name', { ascending: true });

      if (ucError) {
        throw ucError;
      }

      ucContainer.innerHTML = '';
      if (!ucList || ucList.length === 0) {
        ucContainer.innerHTML = `<div class="col-12 text-muted">${t('course.empty.ucs', 'Nenhuma unidade curricular sincronizada.')}</div>`;
        return;
      }

      const basePath = window.location.pathname.endsWith('/')
        ? window.location.pathname
        : window.location.pathname + '/';

      ucList.forEach((uc) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        const ucUrl = `${basePath}uc/${encodeURIComponent(uc.code)}/`;
        const meta = courseMetaText(uc);
        const description = toText(uc.description, t('course.empty.ucDescription', 'Descrição em preparação.'));
        col.innerHTML = `
          <article class="card h-100 border-0 shadow-sm">
            <div class="card-body">
              <h3 class="h5">
                <a class="text-decoration-none" href="${ucUrl}">${uc.code} · ${uc.name}</a>
              </h3>
              <p class="text-muted small mb-2">${meta}</p>
              <p class="mb-0">${description}</p>
            </div>
          </article>
        `;
        ucContainer.appendChild(col);
      });
    } catch (err) {
      console.error('[FACODI] Erro ao carregar curso:', err);
      detailsEl.innerHTML = `<div class="text-danger">${t('course.errors.details', 'Falha ao carregar detalhes do curso.')}</div>`;
      contentEl.innerHTML = `<p class="text-danger mb-0">${t('course.errors.content', 'Não foi possível carregar o conteúdo sincronizado.')}</p>`;
      ucContainer.innerHTML = `<div class="col-12 text-danger">${t('course.errors.ucs', 'Não foi possível carregar as unidades curriculares.')}</div>`;
    }
  }

  async function loadUCPage(ucCode) {
    const client = getClient();
    if (!client) return;

    const detailsEl = document.querySelector('[data-uc-details]');
    const contentEl = document.querySelector('[data-uc-content]');
    const outcomesEl = document.querySelector('[data-uc-outcomes]');
    const playlistsEl = document.querySelector('[data-uc-playlists]');
    const topicsEl = document.querySelector('[data-uc-topics]');

    if (!detailsEl || !contentEl || !outcomesEl || !playlistsEl || !topicsEl) {
      return;
    }

    try {
      const { data: uc, error: ucError } = await client
        .from('catalog.uc')
        .select('*')
        .eq('code', ucCode)
        .maybeSingle();

      if (ucError || !uc) {
        throw ucError || new Error(t('uc.errors.notFound', 'UC não encontrada.'));
      }

      detailsEl.innerHTML = `
        <dt class="col-12 col-sm-5">${t('uc.details.course', 'Curso')}</dt>
        <dd class="col-12 col-sm-7">${toText(uc.course_code)}</dd>
        <dt class="col-12 col-sm-5">${t('uc.details.ects', 'ECTS')}</dt>
        <dd class="col-12 col-sm-7">${toText(uc.ects)}</dd>
        <dt class="col-12 col-sm-5">${t('uc.details.semester', 'Semestre')}</dt>
        <dd class="col-12 col-sm-7">${toText(uc.semester)}</dd>
        <dt class="col-12 col-sm-5">${t('uc.details.language', 'Idioma')}</dt>
        <dd class="col-12 col-sm-7">${toText(uc.language)}</dd>
        <dt class="col-12 col-sm-5">${t('uc.details.prerequisites', 'Pré-requisitos')}</dt>
        <dd class="col-12 col-sm-7">${toText(uc.prerequisites)}</dd>
      `;

      const { data: ucContent, error: ucContentError } = await client
        .from('catalog.uc_content')
        .select('content_md')
        .eq('uc_code', ucCode)
        .maybeSingle();

      if (ucContentError) {
        throw ucContentError;
      }

      if (ucContent && ucContent.content_md) {
        contentEl.innerHTML = renderMarkdown(ucContent.content_md);
      } else {
        contentEl.innerHTML = `<p class="text-muted mb-0">${t('uc.placeholders.content', 'Conteúdo ainda não disponível.')}</p>`;
      }

      const { data: outcomes, error: outcomesError } = await client
        .from('catalog.uc_learning_outcome')
        .select('outcome, order')
        .eq('uc_code', ucCode)
        .order('order', { ascending: true });

      if (outcomesError) {
        throw outcomesError;
      }

      outcomesEl.innerHTML = '';
      if (!outcomes || outcomes.length === 0) {
        outcomesEl.innerHTML = `<li class="list-group-item text-muted">${t('uc.empty.outcomes', 'Nenhum resultado cadastrado.')}</li>`;
      } else {
        outcomes.forEach((item) => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = item.outcome;
          outcomesEl.appendChild(li);
        });
      }

      const { data: playlists, error: playlistsError } = await client
        .from('mapping.uc_playlist')
        .select('playlist_id, priority')
        .eq('uc_code', ucCode)
        .order('priority', { ascending: true });

      if (playlistsError) {
        throw playlistsError;
      }

      playlistsEl.innerHTML = '';
      if (!playlists || playlists.length === 0) {
        playlistsEl.innerHTML = `<div class="col-12 text-muted">${t('uc.empty.playlists', 'Sem playlists associadas.')}</div>`;
      } else {
        const priorityLabel = t('uc.labels.priority', 'Prioridade');
        const openPlaylist = t('uc.buttons.openPlaylist', 'Abrir playlist');
        playlists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          const priorityValue = playlist.priority === null || playlist.priority === undefined ? '—' : playlist.priority;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">${priorityLabel} ${priorityValue}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">${openPlaylist}</a>
              </div>
            </article>
          `;
          playlistsEl.appendChild(col);
        });
      }

      const { data: topicLinks, error: topicsError } = await client
        .from('mapping.uc_topic')
        .select('topic_slug')
        .eq('uc_code', ucCode);

      if (topicsError) {
        throw topicsError;
      }

      topicsEl.innerHTML = '';
      if (!topicLinks || topicLinks.length === 0) {
        topicsEl.innerHTML = `<div class="col-12 text-muted">${t('uc.empty.topics', 'Sem tópicos associados.')}</div>`;
      } else {
        const slugs = topicLinks.map((item) => item.topic_slug);
        const { data: topics, error: topicsDetailError } = await client
          .from('subjects.topic')
          .select('slug, name, summary')
          .in('slug', slugs);

        if (topicsDetailError) {
          throw topicsDetailError;
        }

        const basePath = window.location.pathname.endsWith('/')
          ? window.location.pathname
          : window.location.pathname + '/';
        const summaryFallback = t('uc.placeholders.summary', 'Resumo em preparação.');

        topics.forEach((topic) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const topicUrl = `${basePath}${encodeURIComponent(topic.slug)}/`;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h3 class="h6"><a class="text-decoration-none" href="${topicUrl}">${topic.name}</a></h3>
                <p class="mb-0 text-muted">${toText(topic.summary, summaryFallback)}</p>
              </div>
            </article>
          `;
          topicsEl.appendChild(col);
        });
      }
    } catch (err) {
      console.error('[FACODI] Erro ao carregar UC:', err);
      detailsEl.innerHTML = `<div class="text-danger">${t('uc.errors.details', 'Falha ao carregar informações da UC.')}</div>`;
      contentEl.innerHTML = `<p class="text-danger mb-0">${t('uc.errors.content', 'Não foi possível carregar a ementa sincronizada.')}</p>`;
      outcomesEl.innerHTML = `<li class="list-group-item text-danger">${t('uc.errors.outcomes', 'Erro ao carregar resultados de aprendizagem.')}</li>`;
      playlistsEl.innerHTML = `<div class="col-12 text-danger">${t('uc.errors.playlists', 'Erro ao carregar playlists.')}</div>`;
      topicsEl.innerHTML = `<div class="col-12 text-danger">${t('uc.errors.topics', 'Erro ao carregar tópicos.')}</div>`;
    }
  }

  async function loadTopicPage(topicSlug) {
    const client = getClient();
    if (!client) return;

    const contentEl = document.querySelector('[data-topic-content]');
    const playlistsEl = document.querySelector('[data-topic-playlists]');
    const tagsEl = document.querySelector('[data-topic-tags]');

    if (!contentEl || !playlistsEl || !tagsEl) {
      return;
    }

    try {
      const { data: topic, error: topicError } = await client
        .from('subjects.topic')
        .select('*')
        .eq('slug', topicSlug)
        .maybeSingle();

      if (topicError || !topic) {
        throw topicError || new Error(t('topic.errors.notFound', 'Tópico não encontrado.'));
      }

      const { data: topicContent, error: topicContentError } = await client
        .from('subjects.topic_content')
        .select('content_md')
        .eq('topic_slug', topicSlug)
        .maybeSingle();

      if (topicContentError) {
        throw topicContentError;
      }

      const summaryHtml = topic.summary ? `<p class="fw-semibold">${escapeHTML(topic.summary)}</p>` : '';
      if (topicContent && topicContent.content_md) {
        contentEl.innerHTML = summaryHtml + renderMarkdown(topicContent.content_md);
      } else {
        const fallback = t('topic.placeholders.content', 'Conteúdo em preparação.');
        contentEl.innerHTML = summaryHtml || `<p class="text-muted mb-0">${fallback}</p>`;
      }

      const { data: topicPlaylists, error: topicPlaylistsError } = await client
        .from('mapping.topic_playlist')
        .select('playlist_id, priority')
        .eq('topic_slug', topicSlug)
        .order('priority', { ascending: true });

      if (topicPlaylistsError) {
        throw topicPlaylistsError;
      }

      playlistsEl.innerHTML = '';
      if (!topicPlaylists || topicPlaylists.length === 0) {
        playlistsEl.innerHTML = `<div class="col-12 text-muted">${t('topic.empty.playlists', 'Sem playlists cadastradas.')}</div>`;
      } else {
        const priorityLabel = t('topic.labels.priority', t('uc.labels.priority', 'Prioridade'));
        const openPlaylist = t('topic.buttons.openPlaylist', t('uc.buttons.openPlaylist', 'Abrir playlist'));
        topicPlaylists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          const priorityValue = playlist.priority === null || playlist.priority === undefined ? '—' : playlist.priority;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">${priorityLabel} ${priorityValue}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">${openPlaylist}</a>
              </div>
            </article>
          `;
          playlistsEl.appendChild(col);
        });
      }

      const { data: tags, error: tagsError } = await client
        .from('subjects.topic_tag')
        .select('tag')
        .eq('topic_slug', topicSlug);

      if (tagsError) {
        throw tagsError;
      }

      tagsEl.innerHTML = '';
      if (!tags || tags.length === 0) {
        const span = document.createElement('span');
        span.className = 'badge text-bg-light text-muted';
        span.textContent = t('topic.empty.tags', 'Sem etiquetas.');
        tagsEl.appendChild(span);
      } else {
        tags.forEach((tagItem) => {
          const span = document.createElement('span');
          span.className = 'badge rounded-pill text-bg-primary-subtle text-primary';
          span.textContent = tagItem.tag;
          tagsEl.appendChild(span);
        });
      }
    } catch (err) {
      console.error('[FACODI] Erro ao carregar tópico:', err);
      contentEl.innerHTML = `<p class="text-danger mb-0">${t('topic.errors.content', 'Não foi possível carregar o conteúdo do tópico.')}</p>`;
      playlistsEl.innerHTML = `<div class="col-12 text-danger">${t('topic.errors.playlists', 'Erro ao carregar playlists.')}</div>`;
      tagsEl.innerHTML = `<span class="badge text-bg-danger">${t('topic.errors.tags', 'Erro ao carregar tags')}</span>`;
    }
  }

  function boot() {
    const dataset = document.body ? document.body.dataset : null;
    if (!dataset) return;
    if (dataset.course && dataset.plan) {
      loadCoursePage(dataset.course, dataset.plan);
    } else if (dataset.uc) {
      loadUCPage(dataset.uc);
    } else if (dataset.topic) {
      loadTopicPage(dataset.topic);
    }
  }

  document.addEventListener('DOMContentLoaded', boot);

  window.loadCoursePage = loadCoursePage;
  window.loadUCPage = loadUCPage;
  window.loadTopicPage = loadTopicPage;
})();
