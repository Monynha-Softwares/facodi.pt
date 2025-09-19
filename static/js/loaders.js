(function () {
  function getClient() {
    if (!window.facodi || !window.facodi.supabase) {
      console.warn('[FACODI] Cliente Supabase indisponível.');
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
    const escaped = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return '<p>' + escaped.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br />') + '</p>';
  }

  function toText(value, fallback = '—') {
    if (Array.isArray(value)) {
      return value.length ? value.join(', ') : fallback;
    }
    if (value === null || value === undefined || value === '') {
      return fallback;
    }
    return value;
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
        throw courseError || new Error('Curso não encontrado.');
      }

      detailsEl.innerHTML = `
        <dt class="col-5">Instituição</dt>
        <dd class="col-7">${toText(course.institution)}</dd>
        <dt class="col-5">Escola</dt>
        <dd class="col-7">${toText(course.school)}</dd>
        <dt class="col-5">ECTS</dt>
        <dd class="col-7">${toText(course.ects_total)}</dd>
        <dt class="col-5">Duração</dt>
        <dd class="col-7">${toText(course.duration_semesters)} semestres</dd>
        <dt class="col-5">Idioma</dt>
        <dd class="col-7">${toText(course.language)}</dd>
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
        contentEl.innerHTML = '<p class="text-muted mb-0">Ainda não há conteúdo sincronizado para este curso.</p>';
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
        ucContainer.innerHTML = '<div class="col-12 text-muted">Nenhuma unidade curricular sincronizada.</div>';
        return;
      }

      const basePath = window.location.pathname.endsWith('/')
        ? window.location.pathname
        : window.location.pathname + '/';

      ucList.forEach((uc) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        const ucUrl = `${basePath}uc/${encodeURIComponent(uc.code)}/`;
        col.innerHTML = `
          <article class="card h-100 border-0 shadow-sm">
            <div class="card-body">
              <h3 class="h5">
                <a class="text-decoration-none" href="${ucUrl}">${uc.code} · ${uc.name}</a>
              </h3>
              <p class="text-muted small mb-2">${toText(uc.semester)}º semestre · ${toText(uc.ects)} ECTS</p>
              <p class="mb-0">${toText(uc.description, 'Descrição em preparação.')}</p>
            </div>
          </article>
        `;
        ucContainer.appendChild(col);
      });
    } catch (err) {
      console.error('[FACODI] Erro ao carregar curso:', err);
      detailsEl.innerHTML = '<div class="text-danger">Falha ao carregar detalhes do curso.</div>';
      contentEl.innerHTML = '<p class="text-danger mb-0">Não foi possível carregar o conteúdo sincronizado.</p>';
      ucContainer.innerHTML = '<div class="col-12 text-danger">Não foi possível carregar as unidades curriculares.</div>';
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
        throw ucError || new Error('UC não encontrada.');
      }

      detailsEl.innerHTML = `
        <dt class="col-5">Curso</dt>
        <dd class="col-7">${toText(uc.course_code)}</dd>
        <dt class="col-5">ECTS</dt>
        <dd class="col-7">${toText(uc.ects)}</dd>
        <dt class="col-5">Semestre</dt>
        <dd class="col-7">${toText(uc.semester)}</dd>
        <dt class="col-5">Idioma</dt>
        <dd class="col-7">${toText(uc.language)}</dd>
        <dt class="col-5">Pré-requisitos</dt>
        <dd class="col-7">${toText(uc.prerequisites)}</dd>
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
        contentEl.innerHTML = '<p class="text-muted mb-0">Conteúdo ainda não disponível.</p>';
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
        outcomesEl.innerHTML = '<li class="list-group-item text-muted">Nenhum resultado cadastrado.</li>';
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
        playlistsEl.innerHTML = '<div class="col-12 text-muted">Sem playlists associadas.</div>';
      } else {
        playlists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">Prioridade ${playlist.priority ?? '-'}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">Abrir playlist</a>
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
        topicsEl.innerHTML = '<div class="col-12 text-muted">Sem tópicos associados.</div>';
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

        topics.forEach((topic) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const topicUrl = `${basePath}${encodeURIComponent(topic.slug)}/`;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h3 class="h6"><a class="text-decoration-none" href="${topicUrl}">${topic.name}</a></h3>
                <p class="mb-0 text-muted">${toText(topic.summary, 'Resumo em preparação.')}</p>
              </div>
            </article>
          `;
          topicsEl.appendChild(col);
        });
      }
    } catch (err) {
      console.error('[FACODI] Erro ao carregar UC:', err);
      detailsEl.innerHTML = '<div class="text-danger">Falha ao carregar informações da UC.</div>';
      contentEl.innerHTML = '<p class="text-danger mb-0">Não foi possível carregar a ementa sincronizada.</p>';
      outcomesEl.innerHTML = '<li class="list-group-item text-danger">Erro ao carregar resultados de aprendizagem.</li>';
      playlistsEl.innerHTML = '<div class="col-12 text-danger">Erro ao carregar playlists.</div>';
      topicsEl.innerHTML = '<div class="col-12 text-danger">Erro ao carregar tópicos.</div>';
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
        throw topicError || new Error('Tópico não encontrado.');
      }

      const { data: topicContent, error: topicContentError } = await client
        .from('subjects.topic_content')
        .select('content_md')
        .eq('topic_slug', topicSlug)
        .maybeSingle();

      if (topicContentError) {
        throw topicContentError;
      }

      const summaryHtml = topic.summary ? `<p class="fw-semibold">${topic.summary}</p>` : '';
      if (topicContent && topicContent.content_md) {
        contentEl.innerHTML = summaryHtml + renderMarkdown(topicContent.content_md);
      } else {
        contentEl.innerHTML = summaryHtml || '<p class="text-muted mb-0">Conteúdo em preparação.</p>';
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
        playlistsEl.innerHTML = '<div class="col-12 text-muted">Sem playlists cadastradas.</div>';
      } else {
        topicPlaylists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">Prioridade ${playlist.priority ?? '-'}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">Abrir playlist</a>
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
        span.textContent = 'Sem etiquetas';
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
      contentEl.innerHTML = '<p class="text-danger mb-0">Não foi possível carregar o conteúdo do tópico.</p>';
      playlistsEl.innerHTML = '<div class="col-12 text-danger">Erro ao carregar playlists.</div>';
      tagsEl.innerHTML = '<span class="badge text-bg-danger">Erro ao carregar tags</span>';
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
