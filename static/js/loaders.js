(function () {
    const logPrefix = '[FACODI]';

    const FALLBACK_TRANSLATIONS = {
        'course.noUcs': 'Ainda não adicionamos unidades curriculares por aqui. Bora sugerir playlists e conteúdos para abrir essa trilha?',
        'common.unit': 'unidade',
        'common.units': 'unidades',
        'common.semester': 'Semestre',
        'common.year': 'Ano',
        'common.playlist': 'playlist',
        'common.playlists': 'playlists',
        'common.topic': 'tópico',
        'common.topics': 'tópicos',
        'common.ects': 'ECTS',
        'common.language': 'Idioma',
        'uc.topics': 'Tópicos',
        'uc.noTopics': 'Ainda não temos tópicos conectados. Indica teus conteúdos favoritos para turbinar esta UC!',
        'uc.playlists': 'Playlists',
        'uc.noPlaylists': 'Nenhuma playlist cadastrada por enquanto. Que tal sugerir uma nos canais da FACODI?',
        'uc.learningOutcomes': 'Resultados de Aprendizagem',
        'uc.noLearningOutcomes': 'Ainda estamos construindo os resultados de aprendizagem desta UC com a comunidade.',
        'uc.noPrerequisites': 'Nenhum pré-requisito informado ainda.',
        'topic.noTags': 'Nenhuma tag adicionada ainda. Fala tu, mona, e ajuda a indexar esse conteúdo!',
        'topic.relatedPlaylists': 'Playlists relacionadas',
        'topic.noPlaylists': 'Sem playlists cadastradas por enquanto. Compartilha tua seleção nos canais da FACODI!'
    };

    const getTranslations = () => {
        const script = document.getElementById('facodi-translations');
        if (!script) {
            return {};
        }
        try {
            return JSON.parse(script.textContent || '{}') || {};
        } catch (error) {
            console.warn(`${logPrefix} Falha ao analisar traduções embutidas.`, error);
            return {};
        }
    };

    const translations = getTranslations();

    const getBodyDatasetContext = () => {
        if (typeof document === 'undefined') {
            return {};
        }
        const body = document.body;
        if (!body || !body.dataset) {
            return {};
        }
        const dataset = body.dataset;
        return {
            courseCode: dataset.course || undefined,
            planVersion: dataset.plan || undefined,
            ucCode: dataset.uc || undefined,
            topicSlug: dataset.topic || undefined
        };
    };

    const t = (key, fallback) => {
        if (!key) {
            return typeof fallback === 'string' ? fallback : '';
        }
        if (Object.prototype.hasOwnProperty.call(translations, key)) {
            return translations[key];
        }
        if (fallback !== undefined) {
            return fallback;
        }
        if (Object.prototype.hasOwnProperty.call(FALLBACK_TRANSLATIONS, key)) {
            return FALLBACK_TRANSLATIONS[key];
        }
        return '';
    };

    const escapeHtml = (value) => {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    const formatCount = (count, singularKey, pluralKey) => {
        const singular = t(singularKey, FALLBACK_TRANSLATIONS[singularKey] || singularKey);
        const plural = t(pluralKey, FALLBACK_TRANSLATIONS[pluralKey] || pluralKey);
        const label = count === 1 ? singular : plural;
        return `${count} ${label}`.trim();
    };

    const formatCountHtml = (count, singularKey, pluralKey) => escapeHtml(formatCount(count, singularKey, pluralKey));

    const normalizeSegment = (value) =>
        encodeURIComponent(
            String(value || '')
                .trim()
                .toLowerCase()
        );
    const normalizeTopicSegment = (value) => encodeURIComponent(String(value || '').trim());

    const buildUcUrl = (courseCode, ucCode) => {
        const courseSegment = normalizeSegment(courseCode);
        const ucSegment = normalizeSegment(ucCode);
        if (!courseSegment || !ucSegment) {
            return '#';
        }
        return `/courses/${courseSegment}/uc/${ucSegment}/`;
    };

    const buildTopicUrl = (courseCode, ucCode, slug) => {
        const base = buildUcUrl(courseCode, ucCode);
        const topicSegment = normalizeTopicSegment(slug);
        if (base === '#' || !topicSegment) {
            return '#';
        }
        return `${base}${topicSegment}/`;
    };

    const getClient = () => {
        const client = window.facodiSupabase;
        if (!client) {
            console.info(`${logPrefix} Cliente Supabase indisponível.`);
            return null;
        }
        return client;
    };

    const reapplyManualTranslations = () => {
        if (typeof window === 'undefined') {
            return;
        }
        const applyTranslations = window.facodiApplyTranslations;
        if (typeof applyTranslations === 'function') {
            try {
                applyTranslations();
            } catch (error) {
                console.warn(`${logPrefix} Falha ao reaplicar traduções manuais.`, error);
            }
        }
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

    const renderTags = (tags) => {
        if (!tags || !tags.length) return '';
        return tags
            .map((tag) => `<span class="badge rounded-pill bg-light text-muted me-1 notranslate">${escapeHtml(tag)}</span>`)
            .join('');
    };

    const renderPlaylists = (playlists, options = {}) => {
        const emptyKey = options.emptyKey || 'uc.noPlaylists';
        const emptyText = t(emptyKey, FALLBACK_TRANSLATIONS[emptyKey] || '');
        if (!playlists || !playlists.length) {
            return emptyText ? `<p class="text-muted small" data-i18n="${emptyKey}">${escapeHtml(emptyText)}</p>` : '';
        }
        const items = playlists
            .slice()
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
            .map((playlist) => {
                const rawId = playlist.id || playlist.playlist_id || '';
                const id = rawId ? String(rawId) : '';
                const encodedId = encodeURIComponent(id);
                const label = id || t('common.playlist', FALLBACK_TRANSLATIONS['common.playlist']);
                return `<li class="mb-2"><a class="d-inline-flex align-items-center notranslate" href="https://www.youtube.com/playlist?list=${encodedId}" target="_blank" rel="noopener"><span class="badge bg-danger me-2">YT</span>${escapeHtml(label)}</a></li>`;
            });
        return `<ul class="list-unstyled notranslate">${items.join('')}</ul>`;
    };

    const parseInteger = (value, fallback) => {
        const parsed = Number.parseInt(value, 10);
        return Number.isNaN(parsed) ? fallback : parsed;
    };
    const renderCourseUcs = (courseCode, ucs) => {
        if (!ucs || !ucs.length) {
            const empty = t('course.noUcs', FALLBACK_TRANSLATIONS['course.noUcs']);
            return `<div class="alert alert-warning" role="alert" data-i18n="course.noUcs">${escapeHtml(empty)}</div>`;
        }

        const yearLabelKey = 'common.year';
        const semesterLabelKey = 'common.semester';
        const ectsLabelKey = 'common.ects';
        const languageLabelKey = 'common.language';
        const yearLabel = escapeHtml(t(yearLabelKey, FALLBACK_TRANSLATIONS[yearLabelKey]));
        const semesterLabel = escapeHtml(t(semesterLabelKey, FALLBACK_TRANSLATIONS[semesterLabelKey]));
        const ectsLabel = escapeHtml(t(ectsLabelKey, FALLBACK_TRANSLATIONS[ectsLabelKey]));
        const languageLabel = escapeHtml(t(languageLabelKey, FALLBACK_TRANSLATIONS[languageLabelKey]));

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
            const url = typeof uc.path === 'string' && uc.path ? uc.path : buildUcUrl(courseCode, uc.code);
            const description = uc.description || uc.summary || '';
            const ects = typeof uc.ects === 'number' ? uc.ects : uc.ects || '--';
            const language = uc.language || '--';
            const semesterWithinPlan = uc.semesterGlobal || uc.semester;

            const semesterBadge = semesterWithinPlan
                ? `<span class="course-uc-card__semester"><span data-i18n="${semesterLabelKey}">${semesterLabel}</span> <span class="notranslate">${escapeHtml(String(semesterWithinPlan))}</span></span>`
                : '';
            return `
        <article class="course-uc-card">
          <div class="course-uc-card__meta">
            <span class="course-uc-card__code notranslate">${escapeHtml(uc.code || '')}</span>
            ${semesterBadge}
          </div>
          <h3 class="course-uc-card__title notranslate"><a class="course-uc-card__link notranslate" href="${escapeHtml(url)}">${escapeHtml(uc.name || uc.title || '')}</a></h3>
          ${description ? `<p class="course-uc-card__summary notranslate">${escapeHtml(description)}</p>` : ''}
          <dl class="course-uc-card__details">
            <dt data-i18n="${ectsLabelKey}">${ectsLabel}</dt>
            <dd class="notranslate">${escapeHtml(String(ects))}</dd>
            <dt data-i18n="${languageLabelKey}">${languageLabel}</dt>
            <dd class="notranslate">${escapeHtml(language)}</dd>
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
                <h4 class="course-uc-semester__title"><span data-i18n="${semesterLabelKey}">${semesterLabel}</span> <span class="notranslate">${escapeHtml(String(globalSemesterLabel))}</span></h4>
                <div class="course-uc-grid">${cards}</div>
              </div>
            `;
                    })
                    .join('');

                return `
          <section class="course-uc-year">
            <header class="course-uc-year__header">
              <h3 class="course-uc-year__title"><span data-i18n="${yearLabelKey}">${yearLabel}</span> <span class="notranslate">${escapeHtml(String(year))}</span></h3>
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
            const empty = t('uc.noTopics', FALLBACK_TRANSLATIONS['uc.noTopics']);
            return `<div class="alert alert-info" role="alert"><span data-i18n="uc.noTopics">${escapeHtml(empty)}</span></div>`;
        }
        return `
      <div class="list-group list-group-flush">
        ${topics
            .slice()
            .sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''))
            .map((topic) => {
                const slug = topic.slug || '';
                const url = typeof topic.path === 'string' && topic.path ? topic.path : buildTopicUrl(courseCode, ucCode, slug);
                const summary = topic.summary || '';
                const playlistCount = Array.isArray(topic.playlists) ? topic.playlists.length : (topic.youtube_playlists || []).length;
                const playlistLabelKey = playlistCount === 1 ? 'common.playlist' : 'common.playlists';
                const playlistLabel = t(playlistLabelKey, FALLBACK_TRANSLATIONS[playlistLabelKey]);
                const playlistBadge = playlistCount
                    ? `<span class="badge bg-primary-subtle text-primary"><span class="notranslate">${escapeHtml(String(playlistCount))}</span> <span data-i18n="${playlistLabelKey}">${escapeHtml(playlistLabel)}</span></span>`
                    : '';
                const tagsHtml = renderTags(topic.tags || []);
                return `
              <a class="list-group-item list-group-item-action" href="${escapeHtml(url)}">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 class="h6 mb-1 notranslate">${escapeHtml(topic.name || topic.title || slug)}</h3>
                    ${summary ? `<p class="mb-1 small text-muted notranslate">${escapeHtml(summary)}</p>` : ''}
                  </div>
                  ${playlistBadge}
                </div>
                ${tagsHtml ? `<div class="mt-2">${tagsHtml}</div>` : ''}
              </a>
            `;
            })
            .join('')}
      </div>
    `;
    };

    const renderOutcomes = (outcomes) => {
        if (!outcomes || !outcomes.length) {
            const empty = t('uc.noLearningOutcomes', FALLBACK_TRANSLATIONS['uc.noLearningOutcomes']);
            return `<p class="text-muted small" data-i18n="uc.noLearningOutcomes">${escapeHtml(empty)}</p>`;
        }
        const items = outcomes
            .slice()
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item) => {
                const value = typeof item === 'string' ? item : item.outcome || '';
                return `<li class="mb-2 notranslate">${escapeHtml(value)}</li>`;
            })
            .join('');
        return `<ol class="ps-3 notranslate">${items}</ol>`;
    };

    const firstRow = (data) => {
        if (!data) return null;
        if (Array.isArray(data)) return data.length ? data[0] : null;
        return data;
    };
    async function loadCoursePage(courseCode, planVersion) {
        if (!courseCode || !planVersion) {
            const datasetContext = getBodyDatasetContext();
            courseCode = courseCode || datasetContext.courseCode;
            planVersion = planVersion || datasetContext.planVersion;
        }
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

            const { data: ucRows, error: ucError } = await client.from('catalog.uc').select('code,name,description,ects,semester,language,course_code,prerequisites,year').eq('course_code', courseCode).order('semester', { ascending: true });
            if (ucError) throw ucError;

            if (courseData && courseData.summary) {
                const summaryElement = document.querySelector('[data-facodi-course-summary]');
                if (summaryElement) {
                    summaryElement.textContent = courseData.summary;
                    summaryElement.classList.add('notranslate');
                }
            }

            const count = document.getElementById('course-uc-count');
            if (count) {
                const total = ucRows ? ucRows.length : 0;
                const labelKey = total === 1 ? 'common.unit' : 'common.units';
                const labelText = t(labelKey, FALLBACK_TRANSLATIONS[labelKey] || labelKey);
                count.innerHTML = `<span class="notranslate">${escapeHtml(String(total))}</span> <span data-i18n="${labelKey}">${escapeHtml(labelText)}</span>`;
            }

            const container = document.querySelector('[data-facodi-slot="course-ucs"]');
            if (container) {
                container.innerHTML = renderCourseUcs(courseCode, ucRows || []);
            }
            reapplyManualTranslations();
        } catch (error) {
            console.error(`${logPrefix} Falha ao carregar informações do curso ${courseCode}.`, error);
        }
    }

    async function loadUCPage(ucCode) {
        if (!ucCode) {
            const datasetContext = getBodyDatasetContext();
            ucCode = datasetContext.ucCode || ucCode;
        }
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
                const ucSummaryElement = document.querySelector('.lead.text-muted');
                if (ucSummaryElement) {
                    ucSummaryElement.classList.add('notranslate');
                }
                const learningHeading = t('uc.learningOutcomes', FALLBACK_TRANSLATIONS['uc.learningOutcomes']);
                updateHTML(
                    '#uc-learning-outcomes',
                    `<h2 class="h5" data-i18n="uc.learningOutcomes">${escapeHtml(learningHeading)}</h2>${renderOutcomes(outcomeRows)}`,
                );
                const playlistsHeading = t('uc.playlists', FALLBACK_TRANSLATIONS['uc.playlists']);
                updateHTML(
                    '#uc-playlists',
                    `<h2 class="h5" data-i18n="uc.playlists">${escapeHtml(playlistsHeading)}</h2>${renderPlaylists(playlistRows, { emptyKey: 'uc.noPlaylists' })}`,
                );
                const prerequisitesElement = document.querySelector('[data-facodi-uc-prerequisites]');
                if (prerequisitesElement) {
                    if (Array.isArray(ucData.prerequisites) && ucData.prerequisites.length) {
                        prerequisitesElement.textContent = ucData.prerequisites.join(', ');
                        prerequisitesElement.classList.remove('text-muted');
                        prerequisitesElement.classList.add('notranslate');
                    } else {
                        const emptyText = t('uc.noPrerequisites', FALLBACK_TRANSLATIONS['uc.noPrerequisites']);
                        prerequisitesElement.innerHTML = `<span class="text-muted" data-i18n="uc.noPrerequisites">${escapeHtml(emptyText)}</span>`;
                        prerequisitesElement.classList.add('text-muted');
                        prerequisitesElement.classList.remove('notranslate');
                    }
                }
                const topicsHeading = t('uc.topics', FALLBACK_TRANSLATIONS['uc.topics']);
                const topicsCountKey = topics.length === 1 ? 'common.topic' : 'common.topics';
                const topicsCountLabel = t(topicsCountKey, FALLBACK_TRANSLATIONS[topicsCountKey] || topicsCountKey);
                updateHTML(
                    '#uc-topics',
                    `
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h2 class="h4 mb-0" data-i18n="uc.topics">${escapeHtml(topicsHeading)}</h2>
            <span class="text-muted small"><span class="notranslate">${escapeHtml(String(topics.length))}</span> <span data-i18n="${topicsCountKey}">${escapeHtml(topicsCountLabel)}</span></span>
          </div>
          ${renderUcTopics(ucData.course_code || '', ucData.code, topics)}
        `
                );
            }

            if (contentData && contentData.content_md) {
                updateHTML('#uc-content', renderMarkdown(contentData.content_md));
            }
            reapplyManualTranslations();
        } catch (error) {
            console.error(`${logPrefix} Falha ao carregar dados da UC ${ucCode}.`, error);
        }
    }

    async function loadTopicPage(topicSlug) {
        if (!topicSlug) {
            const datasetContext = getBodyDatasetContext();
            topicSlug = datasetContext.topicSlug || topicSlug;
        }
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
                const topicSummaryElement = document.querySelector('.lead.text-muted');
                if (topicSummaryElement) {
                    topicSummaryElement.classList.add('notranslate');
                }
                const tagContainer = document.querySelector('[data-facodi-slot="topic-tags"]');
                if (tagContainer) {
                    if (tagRows && tagRows.length) {
                        tagContainer.innerHTML = renderTags(tagRows.map((item) => item.tag));
                    } else {
                        const emptyTags = t('topic.noTags', FALLBACK_TRANSLATIONS['topic.noTags']);
                        tagContainer.innerHTML = `<span class="text-muted small" data-i18n="topic.noTags">${escapeHtml(emptyTags)}</span>`;
                    }
                }
            }

            const topicPlaylistsHeading = t('topic.relatedPlaylists', FALLBACK_TRANSLATIONS['topic.relatedPlaylists']);
            updateHTML(
                '#topic-playlists',
                `<h2 class="h5" data-i18n="topic.relatedPlaylists">${escapeHtml(topicPlaylistsHeading)}</h2>${renderPlaylists(playlistRows, { emptyKey: 'topic.noPlaylists' })}`,
            );

            if (contentData && contentData.content_md) {
                updateHTML('#topic-content', renderMarkdown(contentData.content_md));
            }
            reapplyManualTranslations();
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
