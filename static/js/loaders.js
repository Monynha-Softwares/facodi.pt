(function () {
    const logPrefix = '[FACODI]';

    let translations = {};
    const translationElement = document.getElementById('facodi-translations');
    if (translationElement) {
        try {
            translations = JSON.parse(translationElement.textContent || '{}');
        } catch (error) {
            console.error(`${logPrefix} Falha ao interpretar as traduções da interface.`, error);
        }
    }

    const t = (key, fallback) => {
        const value = translations[key];
        if (typeof value === 'string') {
            return value;
        }
        return typeof fallback === 'string' ? fallback : key;
    };

    const formatCount = (count, singularKey, pluralKey, fallbackSingular, fallbackPlural) => {
        const singular = t(singularKey, fallbackSingular);
        const plural = t(pluralKey, fallbackPlural);
        return `${count} ${count === 1 ? singular : plural}`;
    };

    const formatLabelWithValue = (key, value, fallback) => `${t(key, fallback)} ${value}`;

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

    const renderPlaylists = (playlists, emptyKey, emptyFallback) => {
        if (!playlists || !playlists.length) {
            const message = t(emptyKey, emptyFallback || 'Sem playlists cadastradas.');
            return `<p class="text-muted small">${message}</p>`;
        }
        const items = playlists
            .slice()
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
            .map((playlist) => {
                const id = playlist.id || playlist.playlist_id || '';
                const label = id || t('common.playlist', 'Playlist');
                return `<li class="mb-2"><a class="d-inline-flex align-items-center" href="https://www.youtube.com/playlist?list=${id}" target="_blank" rel="noopener"><span class="badge bg-danger me-2">YT</span>${label}</a></li>`;
            });
        return `<ul class="list-unstyled">${items.join('')}</ul>`;
    };

    const renderTags = (tags) => {
        if (!tags || !tags.length) return '';
        return tags.map((tag) => `<span class="badge rounded-pill bg-light text-muted me-1">${tag}</span>`).join('');
    };

    const buildUcUrl = (courseCode, ucCode) => {
        if (!courseCode || !ucCode) return '#';
        return `/courses/${courseCode.toLowerCase()}/uc/${ucCode.toLowerCase()}/`;
    };

    const parseInteger = (value, fallback) => {
        const parsed = Number.parseInt(value, 10);
        return Number.isNaN(parsed) ? fallback : parsed;
    };

    const renderCourseUcs = (courseCode, ucs) => {
        if (!ucs || !ucs.length) {
            const message = t('course.noUcs', 'Ainda não adicionamos unidades curriculares por aqui. Bora sugerir playlists e conteúdos para abrir essa trilha?');
            return `<div class="alert alert-warning" role="alert">${message}</div>`;
        }

        const grouped = new Map();
        const yearOrder = [];

        ucs.forEach((uc) => {
            const semesterGlobal = parseInteger(uc.semester, 1);
            const derivedYear = Math.floor((semesterGlobal - 1) / 2) + 1;
            const year = parseInteger(uc.year, derivedYear);
            const semesterWithinYear = ((((semesterGlobal - 1) % 2) + 2) % 2) + 1;

            if (!grouped.has(year)) {
                grouped.set(year, new Map());
                yearOrder.push(year);
            }
            const semesterMap = grouped.get(year);
            if (!semesterMap.has(semesterWithinYear)) {
                semesterMap.set(semesterWithinYear, []);
            }
            semesterMap.get(semesterWithinYear).push({ ...uc, semesterGlobal });
        });

        yearOrder.sort((a, b) => a - b);

        const renderCard = (uc) => {
            const url = uc.path || buildUcUrl(courseCode, uc.code);
            const description = uc.description || uc.summary || '';
            const ects = typeof uc.ects === 'number' ? uc.ects : uc.ects || '--';
            const language = uc.language || '--';
            const semesterLabel = uc.semesterGlobal || uc.semester;

            return `
        <article class="course-uc-card">
          <div class="course-uc-card__meta">
            <span class="course-uc-card__code">${uc.code || ''}</span>
            ${semesterLabel ? `<span class="course-uc-card__semester">${formatLabelWithValue('common.semester', semesterLabel, 'Semestre')}</span>` : ''}
          </div>
          <h3 class="course-uc-card__title"><a class="course-uc-card__link" href="${url}">${uc.name || uc.title || ''}</a></h3>
          ${description ? `<p class="course-uc-card__summary">${description}</p>` : ''}
          <dl class="course-uc-card__details">
            <dt>${t('common.ects', 'ECTS')}</dt>
            <dd>${ects}</dd>
            <dt>${t('common.language', 'Idioma')}</dt>
            <dd>${language}</dd>
          </dl>
        </article>
      `;
        };

        const sections = yearOrder
            .map((year) => {
                const semesterMap = grouped.get(year);
                const semesterSections = [1, 2]
                    .map((sem) => {
                        const list = semesterMap.get(sem);
                        if (!list || !list.length) return '';
                        const globalSemesterLabel = (year - 1) * 2 + sem;
                        const cards = list
                            .slice()
                            .sort((a, b) => (a.code || '').localeCompare(b.code || ''))
                            .map(renderCard)
                            .join('');
                        return `
              <div class="course-uc-semester">
                <h4 class="course-uc-semester__title">${formatLabelWithValue('common.semester', globalSemesterLabel, 'Semestre')}</h4>
                <div class="course-uc-grid">${cards}</div>
              </div>
            `;
                    })
                    .join('');

                return `
          <section class="course-uc-year">
            <header class="course-uc-year__header">
              <h3 class="course-uc-year__title">${formatLabelWithValue('common.year', year, 'Ano')}</h3>
            </header>
            ${semesterSections}
          </section>
        `;
            })
            .join('');

        return sections;
    };

    const renderUcTopics = (courseCode, ucCode, topics) => {
        if (!topics || !topics.length) {
            const message = t('uc.noTopics', 'Nenhum tópico cadastrado ainda.');
            return `<div class="alert alert-info" role="alert">${message}</div>`;
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
                const playlistBadge = playlistCount ? `<span class="badge bg-primary-subtle text-primary">${formatCount(playlistCount, 'common.playlist', 'common.playlists', 'playlist', 'playlists')}</span>` : '';
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
            const message = t('uc.noLearningOutcomes', 'Nenhum resultado definido.');
            return `<p class="text-muted small">${message}</p>`;
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
            let courseQuery = client.from('catalog.course').select('code,name,degree,ects_total,duration_semesters,plan_version,institution,school,language,summary').eq('code', courseCode);
            if (planVersion) {
                courseQuery = courseQuery.eq('plan_version', planVersion);
            }
            courseQuery = courseQuery.limit(1);
            const { data: courseRows, error: courseError } = await courseQuery;
            if (courseError) throw courseError;
            const courseData = firstRow(courseRows);

            const { data: ucRows, error: ucError } = await client.from('catalog.uc').select('code,name,description,ects,semester,language,course_code,prerequisites').eq('course_code', courseCode).order('semester', { ascending: true });
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
                count.textContent = formatCount(total, 'common.unit', 'common.units', 'unidade', 'unidades');
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
            const { data: ucRows, error: ucError } = await client.from('catalog.uc').select('code,name,description,ects,semester,language,prerequisites,course_code').eq('code', ucCode).limit(1);
            if (ucError) throw ucError;
            const ucData = firstRow(ucRows);

            const { data: contentRows } = await client.from('catalog.uc_content').select('content_md').eq('uc_code', ucCode).limit(1);
            const contentData = firstRow(contentRows);

            const { data: outcomeRows } = await client.from('catalog.uc_learning_outcome').select('outcome,order').eq('uc_code', ucCode).order('order', { ascending: true });

            const { data: playlistRows } = await client.from('mapping.uc_playlist').select('playlist_id,priority').eq('uc_code', ucCode).order('priority', { ascending: true });

            const { data: topicMappings } = await client.from('mapping.uc_topic').select('topic_slug').eq('uc_code', ucCode);

            let topics = [];
            if (topicMappings && topicMappings.length) {
                const slugs = topicMappings.map((item) => item.topic_slug).filter(Boolean);
                if (slugs.length) {
                    const { data: topicRows } = await client.from('subjects.topic').select('slug,name,summary').in('slug', slugs);
                    const { data: topicPlaylistRows } = await client.from('mapping.topic_playlist').select('topic_slug,playlist_id,priority').in('topic_slug', slugs);
                    const { data: topicTagRows } = await client.from('subjects.topic_tag').select('topic_slug,tag').in('topic_slug', slugs);

                    topics = (topicRows || []).map((topic) => {
                        const slug = topic.slug;
                        const playlists = (topicPlaylistRows || []).filter((item) => item.topic_slug === slug);
                        const tags = (topicTagRows || []).filter((item) => item.topic_slug === slug).map((item) => item.tag);
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
                updateHTML('#uc-learning-outcomes', `<h2 class="h5">${t('uc.learningOutcomes', 'Resultados de Aprendizagem')}</h2>${renderOutcomes(outcomeRows)}`);
                updateHTML('#uc-playlists', `<h2 class="h5">${t('uc.playlists', 'Playlists')}</h2>${renderPlaylists(playlistRows, 'uc.noPlaylists', 'Nenhuma playlist cadastrada por enquanto. Que tal sugerir uma nos canais da FACODI?')}`);
                const prerequisitesElement = document.querySelector('[data-facodi-uc-prerequisites]');
                if (prerequisitesElement) {
                    if (Array.isArray(ucData.prerequisites) && ucData.prerequisites.length) {
                        prerequisitesElement.textContent = ucData.prerequisites.join(', ');
                    } else {
                        prerequisitesElement.innerHTML = `<span class="text-muted">${t('uc.noPrerequisites', 'Nenhum pré-requisito informado ainda.')}</span>`;
                    }
                }
                const topicsCount = topics.length;
                updateHTML(
                    '#uc-topics',
                    `
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h2 class="h4 mb-0">${t('uc.topics', 'Tópicos')}</h2>
            <span class="text-muted small">${formatCount(topicsCount, 'common.topic', 'common.topics', 'tópico', 'tópicos')}</span>
          </div>
          ${renderUcTopics(ucData.course_code || '', ucData.code, topics)}
        `
                );
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
            const { data: topicRows, error: topicError } = await client.from('subjects.topic').select('slug,name,summary').eq('slug', topicSlug).limit(1);
            if (topicError) throw topicError;
            const topicData = firstRow(topicRows);

            const { data: contentRows } = await client.from('subjects.topic_content').select('content_md').eq('topic_slug', topicSlug).limit(1);
            const contentData = firstRow(contentRows);

            const { data: playlistRows } = await client.from('mapping.topic_playlist').select('playlist_id,priority').eq('topic_slug', topicSlug).order('priority', { ascending: true });

            const { data: tagRows } = await client.from('subjects.topic_tag').select('tag').eq('topic_slug', topicSlug);

            if (topicData) {
                updateText('.lead.text-muted', topicData.summary || '');
                const tagContainer = document.querySelector('[data-facodi-slot="topic-tags"]');
                if (tagContainer) {
                    tagContainer.innerHTML = tagRows && tagRows.length ? renderTags(tagRows.map((item) => item.tag)) : `<span class="text-muted small">${t('topic.noTags', 'Nenhuma tag adicionada ainda. Fala tu, mona, e ajuda a indexar esse conteúdo!')}</span>`;
                }
            }

            if (playlistRows) {
                updateHTML('#topic-playlists', `<h2 class="h5">${t('topic.relatedPlaylists', 'Playlists relacionadas')}</h2>${renderPlaylists(playlistRows, 'topic.noPlaylists', 'Sem playlists cadastradas por enquanto. Compartilha tua seleção nos canais da FACODI!')}`);
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
