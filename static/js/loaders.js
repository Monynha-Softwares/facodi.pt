(function () {
  const logPrefix = '[FACODI]';

  const getClient = () => {
    const client = window.facodiSupabase;
    if (!client) {
      console.info(`${logPrefix} Cliente Supabase indisponível.`);
      return null;
    }
    return client;
  };

  const renderMarkdown = (content) => {
    if (!content) return '';
    if (typeof window !== 'undefined' && window.marked && typeof window.marked.parse === 'function') {
      return window.marked.parse(content);
    }
    return content.replace(/\n/g, '<br>');
  };

  const updateHTML = (selector, html) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) return;
    element.innerHTML = html;
  };

  const updateText = (selector, text) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) return;
    element.textContent = text;
  };

  const renderPlaylists = (playlists) => {
    if (!playlists || !playlists.length) {
      return '<p class="text-muted small">Sem playlists cadastradas.</p>';
    }
    const items = playlists
      .slice()
      .sort((a, b) => (a.priority || 0) - (b.priority || 0))
      .map((playlist) => {
        const id = playlist.id || playlist.playlist_id || '';
        const label = id || 'Playlist';
        return `<li class="mb-2"><a class="d-inline-flex align-items-center" href="https://www.youtube.com/playlist?list=${id}" target="_blank" rel="noopener"><span class="badge bg-danger me-2">YT</span>${label}</a></li>`;
      });
    return `<ul class="list-unstyled">${items.join('')}</ul>`;
  };

  const renderTags = (tags) => {
    if (!tags || !tags.length) return '';
    return tags
      .map((tag) => `<span class="badge rounded-pill bg-light text-muted me-1">${tag}</span>`)
      .join('');
  };

  const buildUcUrl = (courseCode, ucCode) => {
    if (!courseCode || !ucCode) return '#';
    return `/courses/${courseCode.toLowerCase()}/uc/${ucCode.toLowerCase()}/`;
  };

  const renderCourseUcs = (courseCode, ucs) => {
    if (!ucs || !ucs.length) {
      return '<div class="col-12"><div class="alert alert-warning" role="alert">Ainda não existem unidades curriculares associadas.</div></div>';
    }
    return ucs
      .slice()
      .sort((a, b) => (a.semester || 0) - (b.semester || 0))
      .map((uc) => {
        const url = uc.path || buildUcUrl(courseCode, uc.code);
        const semesterLabel = uc.semester ? `<span class="text-muted small">Semestre ${uc.semester}</span>` : '';
        const description = uc.description || uc.summary || '';
        const ects = typeof uc.ects === 'number' ? uc.ects : uc.ects || '--';
        const language = uc.language || '--';
        return `
          <div class="col-md-6">
            <article class="card h-100 shadow-sm border-0">
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between mb-2">
                  <span class="badge bg-secondary-subtle text-secondary">${uc.code || ''}</span>
                  ${semesterLabel}
                </div>
                <h3 class="h5"><a class="text-decoration-none" href="${url}">${uc.name || uc.title || ''}</a></h3>
                ${description ? `<p class="text-muted">${description}</p>` : ''}
                <dl class="row small text-muted mt-auto">
                  <dt class="col-5">ECTS</dt>
                  <dd class="col-7">${ects}</dd>
                  <dt class="col-5">Idioma</dt>
                  <dd class="col-7">${language}</dd>
                </dl>
              </div>
            </article>
          </div>`;
      })
      .join('');
  };

  const renderUcTopics = (courseCode, ucCode, topics) => {
    if (!topics || !topics.length) {
      return '<div class="alert alert-info" role="alert">Nenhum tópico cadastrado ainda.</div>';
    }
    return `
      <div class="list-group list-group-flush">
        ${topics
          .slice()
          .sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''))
          .map((topic) => {
            const slug = topic.slug || '';
            const url = topic.path || (slug ? `/courses/${courseCode.toLowerCase()}/uc/${ucCode.toLowerCase()}/${slug}/` : '#');
            const summary = topic.summary || '';
            const playlistCount = topic.playlists ? topic.playlists.length : (topic.youtube_playlists || []).length;
            const tagsHtml = renderTags(topic.tags || []);
            const playlistBadge = playlistCount ? `<span class="badge bg-primary-subtle text-primary">${playlistCount} playlists</span>` : '';
            return `
              <a class="list-group-item list-group-item-action" href="${url}">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 class="h6 mb-1">${topic.name || topic.title || slug}</h3>
                    ${summary ? `<p class="mb-1 small text-muted">${summary}</p>` : ''}
                  </div>
                  ${playlistBadge}
                </div>
                ${tagsHtml ? `<div class="mt-2">${tagsHtml}</div>` : ''}
              </a>`;
          })
          .join('')}
      </div>`;
  };

  const renderOutcomes = (outcomes) => {
    if (!outcomes || !outcomes.length) {
      return '<p class="text-muted small">Nenhum resultado definido.</p>';
    }
    return `<ol class="ps-3">${outcomes
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((item) => `<li class="mb-2">${item.outcome || item}</li>`)
      .join('')}</ol>`;
  };

  const firstRow = (data) => {
    if (!data) return null;
    if (Array.isArray(data)) return data.length ? data[0] : null;
    return data;
  };

  async function loadCoursePage(courseCode, planVersion) {
    const client = getClient();
    if (!client || !courseCode) return;

    try {
      let courseQuery = client
        .from('catalog.course')
        .select('code,name,degree,ects_total,duration_semesters,plan_version,institution,school,language,summary')
        .eq('code', courseCode);
      if (planVersion) {
        courseQuery = courseQuery.eq('plan_version', planVersion);
      }
      courseQuery = courseQuery.limit(1);
      const { data: courseRows, error: courseError } = await courseQuery;
      if (courseError) throw courseError;
      const courseData = firstRow(courseRows);

      const { data: ucRows, error: ucError } = await client
        .from('catalog.uc')
        .select('code,name,description,ects,semester,language,course_code,prerequisites')
        .eq('course_code', courseCode)
        .order('semester', { ascending: true });
      if (ucError) throw ucError;

      if (courseData && courseData.summary) {
        const summaryElement = document.querySelector('[data-facodi-course-summary]');
        if (summaryElement) {
          summaryElement.textContent = courseData.summary;
        }
      }

      const count = document.getElementById('course-uc-count');
      if (count) {
        const total = ucRows ? ucRows.length : 0;
        count.textContent = `${total} ${total === 1 ? 'unidade' : 'unidades'}`;
      }

      const container = document.querySelector('[data-facodi-slot="course-ucs"]');
      if (container && ucRows) {
        container.innerHTML = renderCourseUcs(courseCode, ucRows);
      }
    } catch (error) {
      console.error(`${logPrefix} Falha ao carregar informações do curso ${courseCode}.`, error);
    }
  }

  async function loadUCPage(ucCode) {
    const client = getClient();
    if (!client || !ucCode) return;

    try {
      const { data: ucRows, error: ucError } = await client
        .from('catalog.uc')
        .select('code,name,description,ects,semester,language,prerequisites,course_code')
        .eq('code', ucCode)
        .limit(1);
      if (ucError) throw ucError;
      const ucData = firstRow(ucRows);

      const { data: contentRows } = await client
        .from('catalog.uc_content')
        .select('content_md')
        .eq('uc_code', ucCode)
        .limit(1);
      const contentData = firstRow(contentRows);

      const { data: outcomeRows } = await client
        .from('catalog.uc_learning_outcome')
        .select('outcome,order')
        .eq('uc_code', ucCode)
        .order('order', { ascending: true });

      const { data: playlistRows } = await client
        .from('mapping.uc_playlist')
        .select('playlist_id,priority')
        .eq('uc_code', ucCode)
        .order('priority', { ascending: true });

      const { data: topicMappings } = await client
        .from('mapping.uc_topic')
        .select('topic_slug')
        .eq('uc_code', ucCode);

      let topics = [];
      if (topicMappings && topicMappings.length) {
        const slugs = topicMappings.map((item) => item.topic_slug).filter(Boolean);
        if (slugs.length) {
          const { data: topicRows } = await client
            .from('subjects.topic')
            .select('slug,name,summary')
            .in('slug', slugs);
          const { data: topicPlaylistRows } = await client
            .from('mapping.topic_playlist')
            .select('topic_slug,playlist_id,priority')
            .in('topic_slug', slugs);
          const { data: topicTagRows } = await client
            .from('subjects.topic_tag')
            .select('topic_slug,tag')
            .in('topic_slug', slugs);

          topics = (topicRows || []).map((topic) => {
            const slug = topic.slug;
            const playlists = (topicPlaylistRows || []).filter((item) => item.topic_slug === slug);
            const tags = (topicTagRows || [])
              .filter((item) => item.topic_slug === slug)
              .map((item) => item.tag);
            return {
              slug,
              name: topic.name,
              summary: topic.summary,
              playlists,
              tags
            };
          });
        }
      }

      if (ucData) {
        updateText('.lead.text-muted', ucData.description || ucData.summary || '');
        updateHTML('#uc-learning-outcomes', `<h2 class="h5">Resultados de Aprendizagem</h2>${renderOutcomes(outcomeRows)}`);
        updateHTML('#uc-playlists', `<h2 class="h5">Playlists</h2>${renderPlaylists(playlistRows)}`);
        const prerequisitesElement = document.querySelector('[data-facodi-uc-prerequisites]');
        if (prerequisitesElement) {
          if (Array.isArray(ucData.prerequisites) && ucData.prerequisites.length) {
            prerequisitesElement.textContent = ucData.prerequisites.join(', ');
          } else {
            prerequisitesElement.innerHTML = '<span class="text-muted">Nenhum</span>';
          }
        }
        updateHTML('#uc-topics', `
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h2 class="h4 mb-0">Tópicos</h2>
            <span class="text-muted small">${topics.length} tópicos</span>
          </div>
          ${renderUcTopics(ucData.course_code || '', ucData.code, topics)}
        `);
      }

      if (contentData && contentData.content_md) {
        updateHTML('#uc-content', renderMarkdown(contentData.content_md));
      }
    } catch (error) {
      console.error(`${logPrefix} Falha ao carregar dados da UC ${ucCode}.`, error);
    }
  }

  async function loadTopicPage(topicSlug) {
    const client = getClient();
    if (!client || !topicSlug) return;

    try {
      const { data: topicRows, error: topicError } = await client
        .from('subjects.topic')
        .select('slug,name,summary')
        .eq('slug', topicSlug)
        .limit(1);
      if (topicError) throw topicError;
      const topicData = firstRow(topicRows);

      const { data: contentRows } = await client
        .from('subjects.topic_content')
        .select('content_md')
        .eq('topic_slug', topicSlug)
        .limit(1);
      const contentData = firstRow(contentRows);

      const { data: playlistRows } = await client
        .from('mapping.topic_playlist')
        .select('playlist_id,priority')
        .eq('topic_slug', topicSlug)
        .order('priority', { ascending: true });

      const { data: tagRows } = await client
        .from('subjects.topic_tag')
        .select('tag')
        .eq('topic_slug', topicSlug);

      if (topicData) {
        updateText('.lead.text-muted', topicData.summary || '');
        const tagContainer = document.querySelector('[data-facodi-slot="topic-tags"]');
        if (tagContainer) {
          tagContainer.innerHTML = tagRows && tagRows.length
            ? renderTags(tagRows.map((item) => item.tag))
            : '<span class="text-muted small">Sem tags definidas.</span>';
        }
      }

      if (playlistRows) {
        updateHTML('#topic-playlists', `<h2 class="h5">Playlists relacionadas</h2>${renderPlaylists(playlistRows)}`);
      }

      if (contentData && contentData.content_md) {
        updateHTML('#topic-content', renderMarkdown(contentData.content_md));
      }
    } catch (error) {
      console.error(`${logPrefix} Falha ao carregar dados do tópico ${topicSlug}.`, error);
    }
  }

  window.facodiLoaders = {
    loadCoursePage,
    loadUCPage,
    loadTopicPage
  };
})();
