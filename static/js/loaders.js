(function () {
  const UI = {
    pt: {
      course: {
        notFound: 'Curso não encontrado.',
        details: {
          institution: 'Instituição',
          school: 'Escola',
          ects: 'ECTS',
          duration: 'Duração',
          durationValue: '{value} semestres',
          language: 'Idioma',
        },
        content: {
          empty: 'Ainda não há conteúdo sincronizado para este curso.',
        },
        ucs: {
          empty: 'Nenhuma unidade curricular sincronizada.',
          descriptionFallback: 'Descrição em preparação.',
          semesterEcts: '{semester}º semestre · {ects} ECTS',
        },
        errors: {
          details: 'Falha ao carregar detalhes do curso.',
          content: 'Não foi possível carregar o conteúdo sincronizado.',
          ucs: 'Não foi possível carregar as unidades curriculares.',
        },
      },
      uc: {
        notFound: 'UC não encontrada.',
        details: {
          course: 'Curso',
          ects: 'ECTS',
          semester: 'Semestre',
          language: 'Idioma',
          prerequisites: 'Pré-requisitos',
        },
        content: {
          empty: 'Conteúdo ainda não disponível.',
        },
        outcomes: {
          empty: 'Nenhum resultado cadastrado.',
        },
        playlists: {
          empty: 'Sem playlists associadas.',
        },
        topics: {
          empty: 'Sem tópicos associados.',
          summaryFallback: 'Resumo em preparação.',
        },
        errors: {
          details: 'Falha ao carregar informações da UC.',
          content: 'Não foi possível carregar a ementa sincronizada.',
          outcomes: 'Erro ao carregar resultados de aprendizagem.',
          playlists: 'Erro ao carregar playlists.',
          topics: 'Erro ao carregar tópicos.',
        },
      },
      topic: {
        notFound: 'Tópico não encontrado.',
        content: {
          empty: 'Conteúdo em preparação.',
        },
        playlists: {
          empty: 'Sem playlists cadastradas.',
        },
        tags: {
          empty: 'Sem etiquetas',
        },
        errors: {
          content: 'Não foi possível carregar o conteúdo do tópico.',
          playlists: 'Erro ao carregar playlists.',
          tags: 'Erro ao carregar tags.',
        },
      },
      common: {
        priority: 'Prioridade {value}',
        openPlaylist: 'Abrir playlist',
      },
    },
    en: {
      course: {
        notFound: 'Course not found.',
        details: {
          institution: 'Institution',
          school: 'School',
          ects: 'ECTS',
          duration: 'Duration',
          durationValue: '{value} semesters',
          language: 'Language',
        },
        content: {
          empty: 'There is no synced content for this course yet.',
        },
        ucs: {
          empty: 'No course units synced yet.',
          descriptionFallback: 'Description in progress.',
          semesterEcts: 'Semester {semester} · {ects} ECTS',
        },
        errors: {
          details: 'Failed to load course details.',
          content: 'Unable to load synced content.',
          ucs: 'Unable to load course units.',
        },
      },
      uc: {
        notFound: 'Course unit not found.',
        details: {
          course: 'Course',
          ects: 'ECTS',
          semester: 'Semester',
          language: 'Language',
          prerequisites: 'Prerequisites',
        },
        content: {
          empty: 'Content not available yet.',
        },
        outcomes: {
          empty: 'No learning outcomes recorded.',
        },
        playlists: {
          empty: 'No playlists linked.',
        },
        topics: {
          empty: 'No associated topics.',
          summaryFallback: 'Summary in progress.',
        },
        errors: {
          details: 'Failed to load course unit information.',
          content: 'Unable to load synced syllabus.',
          outcomes: 'Error while loading learning outcomes.',
          playlists: 'Error while loading playlists.',
          topics: 'Error while loading topics.',
        },
      },
      topic: {
        notFound: 'Topic not found.',
        content: {
          empty: 'Content in progress.',
        },
        playlists: {
          empty: 'No playlists registered.',
        },
        tags: {
          empty: 'No tags',
        },
        errors: {
          content: 'Unable to load topic content.',
          playlists: 'Error while loading playlists.',
          tags: 'Error while loading tags.',
        },
      },
      common: {
        priority: 'Priority {value}',
        openPlaylist: 'Open playlist',
      },
    },
    es: {
      course: {
        notFound: 'Curso no encontrado.',
        details: {
          institution: 'Institución',
          school: 'Escuela',
          ects: 'ECTS',
          duration: 'Duración',
          durationValue: '{value} semestres',
          language: 'Idioma',
        },
        content: {
          empty: 'Todavía no hay contenido sincronizado para este curso.',
        },
        ucs: {
          empty: 'Aún no hay asignaturas sincronizadas.',
          descriptionFallback: 'Descripción en preparación.',
          semesterEcts: 'Semestre {semester} · {ects} ECTS',
        },
        errors: {
          details: 'Error al cargar los detalles del curso.',
          content: 'No fue posible cargar el contenido sincronizado.',
          ucs: 'No fue posible cargar las asignaturas.',
        },
      },
      uc: {
        notFound: 'Unidad curricular no encontrada.',
        details: {
          course: 'Curso',
          ects: 'ECTS',
          semester: 'Semestre',
          language: 'Idioma',
          prerequisites: 'Requisitos previos',
        },
        content: {
          empty: 'Contenido todavía no disponible.',
        },
        outcomes: {
          empty: 'Sin resultados de aprendizaje registrados.',
        },
        playlists: {
          empty: 'Sin listas de reproducción asociadas.',
        },
        topics: {
          empty: 'Sin temas asociados.',
          summaryFallback: 'Resumen en preparación.',
        },
        errors: {
          details: 'Error al cargar la información de la unidad.',
          content: 'No fue posible cargar el programa sincronizado.',
          outcomes: 'Error al cargar los resultados de aprendizaje.',
          playlists: 'Error al cargar las listas de reproducción.',
          topics: 'Error al cargar los temas.',
        },
      },
      topic: {
        notFound: 'Tema no encontrado.',
        content: {
          empty: 'Contenido en preparación.',
        },
        playlists: {
          empty: 'Sin listas de reproducción registradas.',
        },
        tags: {
          empty: 'Sin etiquetas',
        },
        errors: {
          content: 'No fue posible cargar el contenido del tema.',
          playlists: 'Error al cargar las listas de reproducción.',
          tags: 'Error al cargar las etiquetas.',
        },
      },
      common: {
        priority: 'Prioridad {value}',
        openPlaylist: 'Abrir playlist',
      },
    },
    fr: {
      course: {
        notFound: 'Cours introuvable.',
        details: {
          institution: 'Institution',
          school: 'École',
          ects: 'ECTS',
          duration: 'Durée',
          durationValue: '{value} semestres',
          language: 'Langue',
        },
        content: {
          empty: 'Aucun contenu synchronisé pour ce cours pour le moment.',
        },
        ucs: {
          empty: 'Aucune unité curriculaire synchronisée pour le moment.',
          descriptionFallback: 'Description en cours de rédaction.',
          semesterEcts: 'Semestre {semester} · {ects} ECTS',
        },
        errors: {
          details: 'Échec du chargement des détails du cours.',
          content: 'Impossible de charger le contenu synchronisé.',
          ucs: 'Impossible de charger les unités curriculaires.',
        },
      },
      uc: {
        notFound: 'Unité curriculaire introuvable.',
        details: {
          course: 'Cours',
          ects: 'ECTS',
          semester: 'Semestre',
          language: 'Langue',
          prerequisites: 'Prérequis',
        },
        content: {
          empty: 'Contenu pas encore disponible.',
        },
        outcomes: {
          empty: 'Aucun résultat d’apprentissage enregistré.',
        },
        playlists: {
          empty: 'Aucune playlist associée.',
        },
        topics: {
          empty: 'Aucun sujet associé.',
          summaryFallback: 'Résumé en cours de rédaction.',
        },
        errors: {
          details: 'Échec du chargement des informations de l’unité.',
          content: 'Impossible de charger le programme synchronisé.',
          outcomes: 'Erreur lors du chargement des résultats d’apprentissage.',
          playlists: 'Erreur lors du chargement des playlists.',
          topics: 'Erreur lors du chargement des sujets.',
        },
      },
      topic: {
        notFound: 'Sujet introuvable.',
        content: {
          empty: 'Contenu en cours de rédaction.',
        },
        playlists: {
          empty: 'Aucune playlist enregistrée.',
        },
        tags: {
          empty: 'Aucune étiquette',
        },
        errors: {
          content: 'Impossible de charger le contenu du sujet.',
          playlists: 'Erreur lors du chargement des playlists.',
          tags: 'Erreur lors du chargement des étiquettes.',
        },
      },
      common: {
        priority: 'Priorité {value}',
        openPlaylist: 'Ouvrir la playlist',
      },
    },
  };

  function detectLocale() {
    if (typeof document === 'undefined' || !document.documentElement) {
      return 'pt';
    }
    const langAttr = document.documentElement.lang || '';
    const base = langAttr.toLowerCase().split('-')[0];
    return UI[base] ? base : 'pt';
  }

  const ACTIVE_LOCALE = detectLocale();

  function resolve(dict, parts) {
    return parts.reduce((acc, part) => {
      if (!acc || !Object.prototype.hasOwnProperty.call(acc, part)) {
        return undefined;
      }
      return acc[part];
    }, dict);
  }

  function translateRaw(key, locale) {
    return resolve(UI[locale], key.split('.'));
  }

  function translate(key) {
    const value = translateRaw(key, ACTIVE_LOCALE);
    if (typeof value === 'string') {
      return value;
    }
    const fallback = translateRaw(key, 'pt');
    if (typeof fallback === 'string') {
      return fallback;
    }
    return key;
  }

  function format(key, params = {}) {
    const template = translate(key);
    return template.replace(/\{(\w+)\}/g, (match, token) => {
      if (Object.prototype.hasOwnProperty.call(params, token)) {
        return params[token];
      }
      return match;
    });
  }

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
        throw courseError || new Error(translate('course.notFound'));
      }

      const durationRaw = toText(course.duration_semesters);
      const durationDisplay = durationRaw === '—'
        ? durationRaw
        : format('course.details.durationValue', { value: durationRaw });

      detailsEl.innerHTML = `
        <dt class="col-5">${translate('course.details.institution')}</dt>
        <dd class="col-7">${toText(course.institution)}</dd>
        <dt class="col-5">${translate('course.details.school')}</dt>
        <dd class="col-7">${toText(course.school)}</dd>
        <dt class="col-5">${translate('course.details.ects')}</dt>
        <dd class="col-7">${toText(course.ects_total)}</dd>
        <dt class="col-5">${translate('course.details.duration')}</dt>
        <dd class="col-7">${durationDisplay}</dd>
        <dt class="col-5">${translate('course.details.language')}</dt>
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
        contentEl.innerHTML = `<p class="text-muted mb-0">${translate('course.content.empty')}</p>`;
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
        ucContainer.innerHTML = `<div class="col-12 text-muted">${translate('course.ucs.empty')}</div>`;
        return;
      }

      const basePath = window.location.pathname.endsWith('/')
        ? window.location.pathname
        : window.location.pathname + '/';

      ucList.forEach((uc) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        const ucUrl = `${basePath}uc/${encodeURIComponent(uc.code)}/`;
        const semesterValue = toText(uc.semester);
        const ectsValue = toText(uc.ects);
        let meta = format('course.ucs.semesterEcts', {
          semester: semesterValue,
          ects: ectsValue,
        });
        if (semesterValue === '—' && ectsValue === '—') {
          meta = '—';
        }
        const description = toText(uc.description, translate('course.ucs.descriptionFallback'));
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
      detailsEl.innerHTML = `<div class="text-danger">${translate('course.errors.details')}</div>`;
      contentEl.innerHTML = `<p class="text-danger mb-0">${translate('course.errors.content')}</p>`;
      ucContainer.innerHTML = `<div class="col-12 text-danger">${translate('course.errors.ucs')}</div>`;
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
        throw ucError || new Error(translate('uc.notFound'));
      }

      detailsEl.innerHTML = `
        <dt class="col-5">${translate('uc.details.course')}</dt>
        <dd class="col-7">${toText(uc.course_code)}</dd>
        <dt class="col-5">${translate('uc.details.ects')}</dt>
        <dd class="col-7">${toText(uc.ects)}</dd>
        <dt class="col-5">${translate('uc.details.semester')}</dt>
        <dd class="col-7">${toText(uc.semester)}</dd>
        <dt class="col-5">${translate('uc.details.language')}</dt>
        <dd class="col-7">${toText(uc.language)}</dd>
        <dt class="col-5">${translate('uc.details.prerequisites')}</dt>
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
        contentEl.innerHTML = `<p class="text-muted mb-0">${translate('uc.content.empty')}</p>`;
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
        outcomesEl.innerHTML = `<li class="list-group-item text-muted">${translate('uc.outcomes.empty')}</li>`;
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
        playlistsEl.innerHTML = `<div class="col-12 text-muted">${translate('uc.playlists.empty')}</div>`;
      } else {
        playlists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">${format('common.priority', { value: playlist.priority ?? '-' })}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">${translate('common.openPlaylist')}</a>
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
        topicsEl.innerHTML = `<div class="col-12 text-muted">${translate('uc.topics.empty')}</div>`;
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
          const summary = toText(topic.summary, translate('uc.topics.summaryFallback'));
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h3 class="h6"><a class="text-decoration-none" href="${topicUrl}">${topic.name}</a></h3>
                <p class="mb-0 text-muted">${summary}</p>
              </div>
            </article>
          `;
          topicsEl.appendChild(col);
        });
      }
    } catch (err) {
      console.error('[FACODI] Erro ao carregar UC:', err);
      detailsEl.innerHTML = `<div class="text-danger">${translate('uc.errors.details')}</div>`;
      contentEl.innerHTML = `<p class="text-danger mb-0">${translate('uc.errors.content')}</p>`;
      outcomesEl.innerHTML = `<li class="list-group-item text-danger">${translate('uc.errors.outcomes')}</li>`;
      playlistsEl.innerHTML = `<div class="col-12 text-danger">${translate('uc.errors.playlists')}</div>`;
      topicsEl.innerHTML = `<div class="col-12 text-danger">${translate('uc.errors.topics')}</div>`;
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
        throw topicError || new Error(translate('topic.notFound'));
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
        contentEl.innerHTML = summaryHtml || `<p class="text-muted mb-0">${translate('topic.content.empty')}</p>`;
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
        playlistsEl.innerHTML = `<div class="col-12 text-muted">${translate('topic.playlists.empty')}</div>`;
      } else {
        topicPlaylists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">${format('common.priority', { value: playlist.priority ?? '-' })}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">${translate('common.openPlaylist')}</a>
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
        span.textContent = translate('topic.tags.empty');
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
      contentEl.innerHTML = `<p class="text-danger mb-0">${translate('topic.errors.content')}</p>`;
      playlistsEl.innerHTML = `<div class="col-12 text-danger">${translate('topic.errors.playlists')}</div>`;
      tagsEl.innerHTML = `<span class="badge text-bg-danger">${translate('topic.errors.tags')}</span>`;
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
