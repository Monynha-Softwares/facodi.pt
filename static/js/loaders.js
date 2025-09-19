(function () {
  const translations = {
    pt: {
      common: {
        dash: '—',
        playlistPriority: (value, dash) => `Prioridade ${value === null || value === undefined || value === '' ? dash : value}`,
        openPlaylist: 'Abrir playlist',
      },
      course: {
        notFound: 'Curso não encontrado.',
        labels: {
          institution: 'Instituição',
          school: 'Escola',
          ects: 'ECTS',
          duration: 'Duração',
          language: 'Idioma',
        },
        formatDuration: (value, dash) => (value && value !== dash ? `${value} semestres` : dash),
        contentMissing: 'Ainda não há conteúdo sincronizado para este curso.',
        ucsEmpty: 'Nenhuma unidade curricular sincronizada.',
        formatUcMeta: (semester, ects, dash) => {
          const semDisplay = semester && semester !== dash ? `${semester}º semestre` : null;
          const ectsDisplay = ects && ects !== dash ? `${ects} ECTS` : null;
          if (semDisplay && ectsDisplay) {
            return `${semDisplay} · ${ectsDisplay}`;
          }
          return semDisplay || ectsDisplay || dash;
        },
        ucDescriptionFallback: 'Descrição em preparação.',
        loadErrors: {
          details: 'Falha ao carregar detalhes do curso.',
          content: 'Não foi possível carregar o conteúdo sincronizado.',
          ucs: 'Não foi possível carregar as unidades curriculares.',
        },
      },
      uc: {
        notFound: 'UC não encontrada.',
        labels: {
          course: 'Curso',
          ects: 'ECTS',
          semester: 'Semestre',
          language: 'Idioma',
          prerequisites: 'Pré-requisitos',
        },
        contentMissing: 'Conteúdo ainda não disponível.',
        outcomesEmpty: 'Nenhum resultado cadastrado.',
        playlistsEmpty: 'Sem playlists associadas.',
        topicsEmpty: 'Sem tópicos associados.',
        topicSummaryFallback: 'Resumo em preparação.',
        loadErrors: {
          details: 'Falha ao carregar informações da UC.',
          content: 'Não foi possível carregar a ementa sincronizada.',
          outcomes: 'Erro ao carregar resultados de aprendizagem.',
          playlists: 'Erro ao carregar playlists.',
          topics: 'Erro ao carregar tópicos.',
        },
      },
      topic: {
        notFound: 'Tópico não encontrado.',
        contentFallback: 'Conteúdo em preparação.',
        playlistsEmpty: 'Sem playlists cadastradas.',
        tagsEmpty: 'Sem etiquetas',
        loadErrors: {
          content: 'Não foi possível carregar o conteúdo do tópico.',
          playlists: 'Erro ao carregar playlists.',
          tags: 'Erro ao carregar tags.',
        },
      },
    },
    en: {
      common: {
        dash: '—',
        playlistPriority: (value, dash) => `Priority ${value === null || value === undefined || value === '' ? dash : value}`,
        openPlaylist: 'Open playlist',
      },
      course: {
        notFound: 'Course not found.',
        labels: {
          institution: 'Institution',
          school: 'School',
          ects: 'ECTS',
          duration: 'Duration',
          language: 'Language',
        },
        formatDuration: (value, dash) => (value && value !== dash ? `${value} semesters` : dash),
        contentMissing: 'There is no synchronized content for this course yet.',
        ucsEmpty: 'No curricular units synced.',
        formatUcMeta: (semester, ects, dash) => {
          const semDisplay = semester && semester !== dash ? `Semester ${semester}` : null;
          const ectsDisplay = ects && ects !== dash ? `${ects} ECTS` : null;
          if (semDisplay && ectsDisplay) {
            return `${semDisplay} · ${ectsDisplay}`;
          }
          return semDisplay || ectsDisplay || dash;
        },
        ucDescriptionFallback: 'Description in progress.',
        loadErrors: {
          details: 'Failed to load course details.',
          content: 'The synchronized content could not be loaded.',
          ucs: 'Unable to load curricular units.',
        },
      },
      uc: {
        notFound: 'Course unit not found.',
        labels: {
          course: 'Course',
          ects: 'ECTS',
          semester: 'Semester',
          language: 'Language',
          prerequisites: 'Prerequisites',
        },
        contentMissing: 'Content not available yet.',
        outcomesEmpty: 'No learning outcomes registered.',
        playlistsEmpty: 'No playlists associated.',
        topicsEmpty: 'No related topics.',
        topicSummaryFallback: 'Summary in progress.',
        loadErrors: {
          details: 'Failed to load unit information.',
          content: 'The synchronized syllabus could not be loaded.',
          outcomes: 'Error loading learning outcomes.',
          playlists: 'Error loading playlists.',
          topics: 'Error loading topics.',
        },
      },
      topic: {
        notFound: 'Topic not found.',
        contentFallback: 'Content in progress.',
        playlistsEmpty: 'No playlists registered.',
        tagsEmpty: 'No tags',
        loadErrors: {
          content: 'The topic content could not be loaded.',
          playlists: 'Error loading playlists.',
          tags: 'Error loading tags.',
        },
      },
    },
    es: {
      common: {
        dash: '—',
        playlistPriority: (value, dash) => `Prioridad ${value === null || value === undefined || value === '' ? dash : value}`,
        openPlaylist: 'Abrir playlist',
      },
      course: {
        notFound: 'Curso no encontrado.',
        labels: {
          institution: 'Institución',
          school: 'Escuela',
          ects: 'ECTS',
          duration: 'Duración',
          language: 'Idioma',
        },
        formatDuration: (value, dash) => (value && value !== dash ? `${value} semestres` : dash),
        contentMissing: 'Aún no hay contenido sincronizado para este curso.',
        ucsEmpty: 'Ninguna unidad curricular sincronizada.',
        formatUcMeta: (semester, ects, dash) => {
          const semDisplay = semester && semester !== dash ? `Semestre ${semester}` : null;
          const ectsDisplay = ects && ects !== dash ? `${ects} ECTS` : null;
          if (semDisplay && ectsDisplay) {
            return `${semDisplay} · ${ectsDisplay}`;
          }
          return semDisplay || ectsDisplay || dash;
        },
        ucDescriptionFallback: 'Descripción en preparación.',
        loadErrors: {
          details: 'Error al cargar los detalles del curso.',
          content: 'No se pudo cargar el contenido sincronizado.',
          ucs: 'No se pudieron cargar las unidades curriculares.',
        },
      },
      uc: {
        notFound: 'Unidad curricular no encontrada.',
        labels: {
          course: 'Curso',
          ects: 'ECTS',
          semester: 'Semestre',
          language: 'Idioma',
          prerequisites: 'Requisitos previos',
        },
        contentMissing: 'Contenido todavía no disponible.',
        outcomesEmpty: 'Ningún resultado registrado.',
        playlistsEmpty: 'Sin playlists asociadas.',
        topicsEmpty: 'Sin temas asociados.',
        topicSummaryFallback: 'Resumen en preparación.',
        loadErrors: {
          details: 'Error al cargar la información de la unidad.',
          content: 'No se pudo cargar el programa sincronizado.',
          outcomes: 'Error al cargar los resultados de aprendizaje.',
          playlists: 'Error al cargar las playlists.',
          topics: 'Error al cargar los temas.',
        },
      },
      topic: {
        notFound: 'Tema no encontrado.',
        contentFallback: 'Contenido en preparación.',
        playlistsEmpty: 'Sin playlists registradas.',
        tagsEmpty: 'Sin etiquetas',
        loadErrors: {
          content: 'No se pudo cargar el contenido del tema.',
          playlists: 'Error al cargar las playlists.',
          tags: 'Error al cargar las etiquetas.',
        },
      },
    },
    fr: {
      common: {
        dash: '—',
        playlistPriority: (value, dash) => `Priorité ${value === null || value === undefined || value === '' ? dash : value}`,
        openPlaylist: 'Ouvrir la playlist',
      },
      course: {
        notFound: 'Cours introuvable.',
        labels: {
          institution: 'Institution',
          school: 'École',
          ects: 'ECTS',
          duration: 'Durée',
          language: 'Langue',
        },
        formatDuration: (value, dash) => (value && value !== dash ? `${value} semestres` : dash),
        contentMissing: 'Il n\'y a pas encore de contenu synchronisé pour ce cours.',
        ucsEmpty: 'Aucune unité d\'enseignement synchronisée.',
        formatUcMeta: (semester, ects, dash) => {
          const semDisplay = semester && semester !== dash ? `Semestre ${semester}` : null;
          const ectsDisplay = ects && ects !== dash ? `${ects} ECTS` : null;
          if (semDisplay && ectsDisplay) {
            return `${semDisplay} · ${ectsDisplay}`;
          }
          return semDisplay || ectsDisplay || dash;
        },
        ucDescriptionFallback: 'Description en préparation.',
        loadErrors: {
          details: 'Impossible de charger les détails du cours.',
          content: 'Impossible de charger le contenu synchronisé.',
          ucs: 'Impossible de charger les unités d\'enseignement.',
        },
      },
      uc: {
        notFound: 'Unité d\'enseignement introuvable.',
        labels: {
          course: 'Cours',
          ects: 'ECTS',
          semester: 'Semestre',
          language: 'Langue',
          prerequisites: 'Prérequis',
        },
        contentMissing: 'Contenu indisponible pour le moment.',
        outcomesEmpty: 'Aucun résultat enregistré.',
        playlistsEmpty: 'Aucune playlist associée.',
        topicsEmpty: 'Aucun sujet associé.',
        topicSummaryFallback: 'Résumé en préparation.',
        loadErrors: {
          details: 'Impossible de charger les informations de l\'unité.',
          content: 'Impossible de charger le programme synchronisé.',
          outcomes: 'Erreur lors du chargement des résultats.',
          playlists: 'Erreur lors du chargement des playlists.',
          topics: 'Erreur lors du chargement des sujets.',
        },
      },
      topic: {
        notFound: 'Sujet introuvable.',
        contentFallback: 'Contenu en préparation.',
        playlistsEmpty: 'Aucune playlist enregistrée.',
        tagsEmpty: 'Aucune étiquette',
        loadErrors: {
          content: 'Impossible de charger le contenu du sujet.',
          playlists: 'Erreur lors du chargement des playlists.',
          tags: 'Erreur lors du chargement des étiquettes.',
        },
      },
    },
  };

  function getMessages() {
    if (typeof document === 'undefined') {
      return translations.pt;
    }
    const langAttr = document.documentElement ? document.documentElement.lang : 'pt';
    const langKey = langAttr ? langAttr.toLowerCase().split('-')[0] : 'pt';
    return translations[langKey] || translations.pt;
  }

  const messages = getMessages();
  const dash = messages.common.dash || '—';

  function getClient() {
    if (!window.facodi || !window.facodi.supabase) {
      console.warn('[FACODI] Supabase client unavailable.');
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
    return '<p>' + escaped.replace(/
{2,}/g, '</p><p>').replace(/
/g, '<br />') + '</p>';
  }

  function toText(value, fallback = dash) {
    if (Array.isArray(value)) {
      return value.length ? value.join(', ') : fallback;
    }
    if (value === null || value === undefined || value === '') {
      return fallback;
    }
    return value;
  }

  function formatPlaylistPriority(value) {
    return messages.common.playlistPriority(value, dash);
  }

  function formatCourseDuration(value) {
    return messages.course.formatDuration(value, dash);
  }

  function formatUcMeta(semester, ects) {
    return messages.course.formatUcMeta(semester, ects, dash);
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
        throw courseError || new Error(messages.course.notFound);
      }

      const durationText = toText(course.duration_semesters);
      detailsEl.innerHTML = `
        <dt class="col-5">${messages.course.labels.institution}</dt>
        <dd class="col-7">${toText(course.institution)}</dd>
        <dt class="col-5">${messages.course.labels.school}</dt>
        <dd class="col-7">${toText(course.school)}</dd>
        <dt class="col-5">${messages.course.labels.ects}</dt>
        <dd class="col-7">${toText(course.ects_total)}</dd>
        <dt class="col-5">${messages.course.labels.duration}</dt>
        <dd class="col-7">${formatCourseDuration(durationText)}</dd>
        <dt class="col-5">${messages.course.labels.language}</dt>
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
        contentEl.innerHTML = `<p class="text-muted mb-0">${messages.course.contentMissing}</p>`;
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
        ucContainer.innerHTML = `<div class="col-12 text-muted">${messages.course.ucsEmpty}</div>`;
        return;
      }

      const basePath = window.location.pathname.endsWith('/')
        ? window.location.pathname
        : window.location.pathname + '/';

      ucList.forEach((uc) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        const ucUrl = `${basePath}uc/${encodeURIComponent(uc.code)}/`;
        const semesterText = toText(uc.semester);
        const ectsText = toText(uc.ects);
        const meta = formatUcMeta(semesterText, ectsText);
        const description = toText(uc.description, messages.course.ucDescriptionFallback);
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
      console.error('[FACODI] Failed to load course:', err);
      detailsEl.innerHTML = `<div class="text-danger">${messages.course.loadErrors.details}</div>`;
      contentEl.innerHTML = `<p class="text-danger mb-0">${messages.course.loadErrors.content}</p>`;
      ucContainer.innerHTML = `<div class="col-12 text-danger">${messages.course.loadErrors.ucs}</div>`;
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
        throw ucError || new Error(messages.uc.notFound);
      }

      detailsEl.innerHTML = `
        <dt class="col-5">${messages.uc.labels.course}</dt>
        <dd class="col-7">${toText(uc.course_code)}</dd>
        <dt class="col-5">${messages.uc.labels.ects}</dt>
        <dd class="col-7">${toText(uc.ects)}</dd>
        <dt class="col-5">${messages.uc.labels.semester}</dt>
        <dd class="col-7">${toText(uc.semester)}</dd>
        <dt class="col-5">${messages.uc.labels.language}</dt>
        <dd class="col-7">${toText(uc.language)}</dd>
        <dt class="col-5">${messages.uc.labels.prerequisites}</dt>
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
        contentEl.innerHTML = `<p class="text-muted mb-0">${messages.uc.contentMissing}</p>`;
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
        outcomesEl.innerHTML = `<li class="list-group-item text-muted">${messages.uc.outcomesEmpty}</li>`;
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
        playlistsEl.innerHTML = `<div class="col-12 text-muted">${messages.uc.playlistsEmpty}</div>`;
      } else {
        playlists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          const priorityLabel = formatPlaylistPriority(playlist.priority);
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">${priorityLabel}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">${messages.common.openPlaylist}</a>
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
        topicsEl.innerHTML = `<div class="col-12 text-muted">${messages.uc.topicsEmpty}</div>`;
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
          const summaryText = toText(topic.summary, messages.uc.topicSummaryFallback);
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h3 class="h6"><a class="text-decoration-none" href="${topicUrl}">${topic.name}</a></h3>
                <p class="mb-0 text-muted">${summaryText}</p>
              </div>
            </article>
          `;
          topicsEl.appendChild(col);
        });
      }
    } catch (err) {
      console.error('[FACODI] Failed to load course unit:', err);
      detailsEl.innerHTML = `<div class="text-danger">${messages.uc.loadErrors.details}</div>`;
      contentEl.innerHTML = `<p class="text-danger mb-0">${messages.uc.loadErrors.content}</p>`;
      outcomesEl.innerHTML = `<li class="list-group-item text-danger">${messages.uc.loadErrors.outcomes}</li>`;
      playlistsEl.innerHTML = `<div class="col-12 text-danger">${messages.uc.loadErrors.playlists}</div>`;
      topicsEl.innerHTML = `<div class="col-12 text-danger">${messages.uc.loadErrors.topics}</div>`;
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
        throw topicError || new Error(messages.topic.notFound);
      }

      const { data: topicContent, error: topicContentError } = await client
        .from('subjects.topic_content')
        .select('content_md')
        .eq('topic_slug', topicSlug)
        .maybeSingle();

      if (topicContentError) {
        throw topicContentError;
      }

      const summaryText = toText(topic.summary, '');
      const summaryHtml = summaryText ? `<p class="fw-semibold">${summaryText}</p>` : '';

      if (topicContent && topicContent.content_md) {
        contentEl.innerHTML = summaryHtml + renderMarkdown(topicContent.content_md);
      } else {
        contentEl.innerHTML = summaryHtml || `<p class="text-muted mb-0">${messages.topic.contentFallback}</p>`;
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
        playlistsEl.innerHTML = `<div class="col-12 text-muted">${messages.topic.playlistsEmpty}</div>`;
      } else {
        topicPlaylists.forEach((playlist) => {
          const col = document.createElement('div');
          col.className = 'col-md-6';
          const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlist_id)}`;
          const priorityLabel = formatPlaylistPriority(playlist.priority);
          col.innerHTML = `
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <p class="text-muted small mb-2">${priorityLabel}</p>
                <a class="btn btn-outline-primary btn-sm" href="${playlistUrl}" target="_blank" rel="noopener">${messages.common.openPlaylist}</a>
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
        span.textContent = messages.topic.tagsEmpty;
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
      console.error('[FACODI] Failed to load topic:', err);
      contentEl.innerHTML = `<p class="text-danger mb-0">${messages.topic.loadErrors.content}</p>`;
      playlistsEl.innerHTML = `<div class="col-12 text-danger">${messages.topic.loadErrors.playlists}</div>`;
      tagsEl.innerHTML = `<span class="badge text-bg-danger">${messages.topic.loadErrors.tags}</span>`;
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
