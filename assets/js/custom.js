const STORAGE_KEYS = {
    theme: 'facodi-theme',
    language: 'facodi-language'
};

const docEl = document.documentElement;

const languageConfigElement = document.getElementById('facodi-language-config');
let supportedLanguages = ['pt', 'en', 'fr', 'es'];
let defaultLanguage = 'pt';

if (languageConfigElement) {
    try {
        const parsed = JSON.parse(languageConfigElement.dataset.supportedLanguages || '[]');
        if (Array.isArray(parsed) && parsed.length) {
            supportedLanguages = parsed.map((lang) => String(lang).toLowerCase());
        }
    } catch (error) {
        supportedLanguages = ['pt', 'en', 'fr', 'es'];
    }
    if (languageConfigElement.dataset.defaultLanguage) {
        defaultLanguage = String(languageConfigElement.dataset.defaultLanguage).toLowerCase();
    }
}

if (!supportedLanguages.includes(defaultLanguage)) {
    supportedLanguages.unshift(defaultLanguage);
}

declareTranslations();

function declareTranslations() {
    const translations = {
        pt: {
            nav: {
                menuToggleLabel: 'Abrir menu principal',
                menuToggle: 'Abrir menu',
                close: 'Fechar',
                home: 'Início',
                courses: 'Cursos',
                roadmap: 'Roadmap',
                primaryCta: 'Explorar trilhas',
                toggleTheme: 'Alternar modo de cor',
                toggleThemeLabel: 'Alternar modo de cor',
                github: 'Abrir repositório no GitHub'
            },
            home: {
                hero: {
                    badge: 'Ensino superior acessível, aberto e comunitário',
                    title: 'FACODI — Faculdade Comunitária Digital',
                    description: 'Organizamos currículos de licenciaturas e recheamos cada unidade com playlists abertas para que qualquer pessoa estude, compartilhe e brilhe junto com a comunidade.',
                    primaryCta: 'Explorar trilhas',
                    secondaryCta: 'Conheça o ecossistema Monynha Softwares',
                    meta: {
                        access: {
                            badge: 'Aberta e gratuita',
                            text: 'Currículos oficiais e materiais públicos sem paywall, do jeitinho que a comunidade merece.'
                        },
                        community: {
                            badge: 'Comunidade Monynha',
                            text: 'Curadoria colaborativa com orgulho, diversidade e transparência.'
                        }
                    },
                    cardLabel: 'Em números comunitários',
                    stats: {
                        courses: '<strong>{{count}}</strong> cursos oficiais organizados',
                        ucs: '<strong>{{count}}</strong> unidades curriculares com playlists e materiais livres',
                        progress: 'Progresso marcado por quem estuda e versões rastreáveis para todo mundo confiar.'
                    },
                    cardFoot: 'Criado pela <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> para democratizar tecnologia, combater hipocrisia e amplificar quem aprende fora do padrão.'
                },
                features: {
                    eyebrow: 'Experiência FACODI',
                    title: 'Experiência FACODI na palma da mão',
                    subtitle: 'Tecnologia aberta para organizar o currículo, apoiar quem estuda e valorizar cada contribuição da comunidade.',
                    item1: {
                        title: 'Mapa curricular interativo',
                        description: 'Navegue por cursos, semestres e disciplinas com uma visão organizada dos currículos oficiais.'
                    },
                    item2: {
                        title: 'Playlists integradas',
                        description: 'Cada unidade curricular recebe playlists do YouTube e materiais públicos selecionados pela comunidade.'
                    },
                    item3: {
                        title: 'Marcação de progresso',
                        description: 'Acompanhe o que já foi estudado e celebre cada módulo concluído no seu tempo.'
                    },
                    item4: {
                        title: 'Curadoria diversa',
                        description: 'Um coletivo vibrante garante acessibilidade, linguagem acolhedora e representatividade real.'
                    }
                },
                courses: {
                    eyebrow: 'Currículos abertos',
                    title: 'Cursos em destaque na comunidade FACODI',
                    subtitle: 'Currículos oficiais de licenciaturas e áreas afins com unidades curriculares, playlists abertas e resultados de aprendizagem organizados.',
                    link: 'Ver todos os cursos',
                    card: {
                        plan: 'Plano {{plan}}',
                        ects: '<strong>{{value}}</strong> ECTS',
                        semesters: '<strong>{{value}}</strong> semestres',
                        code: 'Código {{value}}',
                        ucs: '{{count}} unidades curriculares já mapeadas pela comunidade'
                    }
                },
                journey: {
                    eyebrow: 'Trilha comunitária',
                    title: 'Como rola a jornada FACODI',
                    subtitle: 'Da escolha do curso até a celebração do progresso, cada passo foi pensado para apoiar quem aprende, quem ensina e quem curte compartilhar conhecimento.',
                    step1: 'Escolha um currículo oficial e visualize semestres, cargas horárias, versões e contexto institucional.',
                    step2: 'Mergulhe nas unidades curriculares com resultados de aprendizagem, tópicos relacionados e playlists abertas.',
                    step3: 'Marque o progresso, compartilhe materiais com a comunidade e mantenha vivo o histórico de revisões.'
                },
                manifesto: {
                    eyebrow: 'Manifesto Monynha Softwares',
                    title: 'Democratizar tecnologia, combater hipocrisia e dar voz a quem cria fora do padrão',
                    description: 'A FACODI nasce desse compromisso político-social: usar tecnologia acessível para abrir caminhos na educação superior, respeitando diversidade cultural e celebrando conhecimentos populares.',
                    link: 'Conheça o manifesto completo'
                },
                cta: {
                    title: 'Bora colar com a FACODI?',
                    description: 'Traga playlists, PDFs públicos, artigos e ideias para fortalecer a faculdade comunitária digital e deixar o currículo cada vez mais diverso.',
                    primary: 'Ver cursos e unidades curriculares',
                    secondary: 'Falar com a Monynha e sugerir materiais'
                }
            },
            catalog: {
                title: 'Catálogo de Cursos',
                lead: 'Escolha um curso e bora trilhar a FACODI com currículo oficial, playlists abertas e muito afeto comunitário.',
                empty: 'Ainda não temos cursos publicados por aqui. Chama a comunidade e vamos catalogar juntes!',
                plan: 'Plano {{value}}',
                degreeLabel: 'Grau',
                ectsLabel: 'ECTS',
                durationLabel: 'Duração',
                durationValue: '{{value}} semestres',
                open: 'Ver currículo completo'
            },
            course: {
                planBadge: 'Plano {{value}}',
                meta: {
                    degree: 'Grau',
                    ects: 'ECTS totais',
                    duration: 'Duração',
                    durationValue: '{{value}} semestres',
                    language: 'Idioma',
                    institution: 'Instituição',
                    school: 'Escola'
                },
                ucs: {
                    heading: 'Unidades Curriculares',
                    count: '{{count}} {{unit}}',
                    empty: 'Ainda não adicionamos unidades curriculares por aqui. Bora sugerir playlists e conteúdos para abrir essa trilha?',
                    year: 'Ano {{value}}',
                    semester: 'Semestre {{value}}',
                    card: {
                        semester: 'Semestre {{value}}',
                        ects: 'ECTS',
                        language: 'Idioma'
                    }
                }
            },
            uc: {
                semesterBadge: 'Semestre {{value}}',
                meta: {
                    ects: 'ECTS',
                    language: 'Idioma',
                    prerequisites: 'Pré-requisitos',
                    prerequisitesEmpty: 'Nenhum pré-requisito informado ainda.'
                },
                topics: {
                    heading: 'Tópicos',
                    count: '{{value}} tópicos',
                    empty: 'Ainda não temos tópicos conectados. Indica teus conteúdos favoritos para turbinar esta UC!',
                    playlistCount: '{{value}} playlists',
                    tagsEmpty: 'Nenhuma tag adicionada ainda. Fala tu, mona, e ajuda a indexar esse conteúdo!'
                },
                outcomes: {
                    heading: 'Resultados de Aprendizagem',
                    empty: 'Ainda estamos construindo os resultados de aprendizagem desta UC com a comunidade.'
                },
                playlists: {
                    heading: 'Playlists',
                    empty: 'Nenhuma playlist cadastrada por enquanto. Que tal sugerir uma nos canais da FACODI?'
                }
            },
            topic: {
                tagsEmpty: 'Nenhuma tag adicionada ainda. Fala tu, mona, e ajuda a indexar esse conteúdo!',
                playlists: {
                    heading: 'Playlists relacionadas',
                    empty: 'Sem playlists cadastradas por enquanto. Compartilha tua seleção nos canais da FACODI!'
                }
            }
        },
        en: {
            nav: {
                menuToggleLabel: 'Open main menu',
                menuToggle: 'Open menu',
                close: 'Close',
                home: 'Home',
                courses: 'Courses',
                roadmap: 'Roadmap',
                primaryCta: 'Explore tracks',
                toggleTheme: 'Toggle color mode',
                toggleThemeLabel: 'Toggle color mode',
                github: 'Open repository on GitHub'
            },
            home: {
                hero: {
                    badge: 'Accessible, open and community-driven higher education',
                    title: 'FACODI — Digital Community College',
                    description: 'We organise licensure curricula and fill each unit with open playlists so anyone can study, share and shine with the community.',
                    primaryCta: 'Explore tracks',
                    secondaryCta: 'Discover the Monynha Softwares ecosystem',
                    meta: {
                        access: {
                            badge: 'Open and free',
                            text: 'Official curricula and public materials with zero paywall — just how the community likes it.'
                        },
                        community: {
                            badge: 'Monynha community',
                            text: 'Collaborative curation with pride, diversity and transparency.'
                        }
                    },
                    cardLabel: 'Community highlights',
                    stats: {
                        courses: '<strong>{{count}}</strong> official courses organised',
                        ucs: '<strong>{{count}}</strong> course units with playlists and open materials',
                        progress: 'Progress tracked by learners and version history everyone can trust.'
                    },
                    cardFoot: 'Created by <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> to democratise technology, challenge hypocrisy and amplify learners beyond the norm.'
                },
                features: {
                    eyebrow: 'FACODI experience',
                    title: 'The FACODI experience in your hands',
                    subtitle: 'Open technology to organise curricula, support learners and value every contribution from the community.',
                    item1: {
                        title: 'Interactive curriculum map',
                        description: 'Browse courses, semesters and subjects with a clear view of official curricula.'
                    },
                    item2: {
                        title: 'Integrated playlists',
                        description: 'Each course unit receives YouTube playlists and public materials curated by the community.'
                    },
                    item3: {
                        title: 'Progress tracking',
                        description: 'Keep an eye on what you have already studied and celebrate each module at your own pace.'
                    },
                    item4: {
                        title: 'Diverse curation',
                        description: 'A vibrant collective ensures accessibility, welcoming language and real representation.'
                    }
                },
                courses: {
                    eyebrow: 'Open curricula',
                    title: 'Featured courses from the FACODI community',
                    subtitle: 'Official licensure curricula with course units, open playlists and organised learning outcomes.',
                    link: 'View all courses',
                    card: {
                        plan: 'Plan {{plan}}',
                        ects: '<strong>{{value}}</strong> ECTS',
                        semesters: '<strong>{{value}}</strong> semesters',
                        code: 'Code {{value}}',
                        ucs: '{{count}} course units already mapped by the community'
                    }
                },
                journey: {
                    eyebrow: 'Community journey',
                    title: 'How the FACODI journey flows',
                    subtitle: 'From choosing a course to celebrating progress, every step supports learners, mentors and knowledge sharers.',
                    step1: 'Choose an official curriculum and review semesters, workloads, versions and institutional context.',
                    step2: 'Dive into course units with learning outcomes, related topics and open playlists.',
                    step3: 'Mark progress, share materials with the community and keep the revision history alive.'
                },
                manifesto: {
                    eyebrow: 'Monynha Softwares manifesto',
                    title: 'Democratising technology, fighting hypocrisy and uplifting those who create beyond the norm',
                    description: 'FACODI stands on this social-political commitment: using accessible tech to open pathways in higher education while honouring cultural diversity and celebrating popular knowledge.',
                    link: 'Read the full manifesto'
                },
                cta: {
                    title: 'Join the FACODI movement',
                    description: 'Share playlists, public PDFs, articles and ideas to strengthen the community college and make the curriculum even more diverse.',
                    primary: 'Browse courses and course units',
                    secondary: 'Talk to Monynha and suggest new materials'
                }
            },
            catalog: {
                title: 'Course catalogue',
                lead: 'Pick a course and walk the FACODI path with official curricula, open playlists and plenty of community care.',
                empty: 'We have not published any courses yet. Rally the community so we can map them together!',
                plan: 'Plan {{value}}',
                degreeLabel: 'Degree',
                ectsLabel: 'ECTS',
                durationLabel: 'Duration',
                durationValue: '{{value}} semesters',
                open: 'View full curriculum'
            },
            course: {
                planBadge: 'Plan {{value}}',
                meta: {
                    degree: 'Degree',
                    ects: 'Total ECTS',
                    duration: 'Duration',
                    durationValue: '{{value}} semesters',
                    language: 'Language',
                    institution: 'Institution',
                    school: 'School'
                },
                ucs: {
                    heading: 'Course units',
                    count: '{{count}} {{unit}}',
                    empty: 'We have not added course units here yet. Suggest playlists and resources to open this track!',
                    year: 'Year {{value}}',
                    semester: 'Semester {{value}}',
                    card: {
                        semester: 'Semester {{value}}',
                        ects: 'ECTS',
                        language: 'Language'
                    }
                }
            },
            uc: {
                semesterBadge: 'Semester {{value}}',
                meta: {
                    ects: 'ECTS',
                    language: 'Language',
                    prerequisites: 'Prerequisites',
                    prerequisitesEmpty: 'No prerequisites provided yet.'
                },
                topics: {
                    heading: 'Topics',
                    count: '{{value}} topics',
                    empty: 'No topics connected yet. Share your favourite resources to power up this unit!',
                    playlistCount: '{{value}} playlists',
                    tagsEmpty: 'No tags added yet. Help us index this content!'
                },
                outcomes: {
                    heading: 'Learning outcomes',
                    empty: 'We are still building the learning outcomes for this course unit with the community.'
                },
                playlists: {
                    heading: 'Playlists',
                    empty: 'No playlists added yet. Share your picks on FACODI channels!'
                }
            },
            topic: {
                tagsEmpty: 'No tags added yet. Help us index this content!',
                playlists: {
                    heading: 'Related playlists',
                    empty: 'No playlists yet. Share your selection with the FACODI community!'
                }
            }
        },
        fr: {
            nav: {
                menuToggleLabel: 'Ouvrir le menu principal',
                menuToggle: 'Ouvrir le menu',
                close: 'Fermer',
                home: 'Accueil',
                courses: 'Cours',
                roadmap: 'Feuille de route',
                primaryCta: 'Explorer les parcours',
                toggleTheme: 'Basculer le mode de couleur',
                toggleThemeLabel: 'Basculer le mode de couleur',
                github: 'Ouvrir le dépôt sur GitHub'
            },
            home: {
                hero: {
                    badge: 'Enseignement supérieur accessible, ouvert et communautaire',
                    title: 'FACODI — Faculté Communautaire Numérique',
                    description: 'Nous organisons les cursus de licences et enrichissons chaque unité avec des playlists ouvertes pour que chacun·e étudie, partage et brille avec la communauté.',
                    primaryCta: 'Explorer les parcours',
                    secondaryCta: "Découvrir l'écosystème Monynha Softwares",
                    meta: {
                        access: {
                            badge: 'Ouverte et gratuite',
                            text: 'Des cursus officiels et des ressources publiques sans paywall, comme la communauté le mérite.'
                        },
                        community: {
                            badge: 'Communauté Monynha',
                            text: 'Une curation collaborative empreinte de fierté, de diversité et de transparence.'
                        }
                    },
                    cardLabel: 'En chiffres communautaires',
                    stats: {
                        courses: '<strong>{{count}}</strong> cours officiels organisés',
                        ucs: '<strong>{{count}}</strong> unités curriculaires avec playlists et ressources libres',
                        progress: 'Progression suivie par les apprenant·es et versions traçables pour une confiance partagée.'
                    },
                    cardFoot: 'Créé par <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> pour démocratiser la technologie, combattre l’hypocrisie et amplifier les voix qui apprennent hors des normes.'
                },
                features: {
                    eyebrow: 'Expérience FACODI',
                    title: 'L’expérience FACODI au bout des doigts',
                    subtitle: 'Une technologie ouverte pour organiser les cursus, soutenir les apprenant·es et valoriser chaque contribution de la communauté.',
                    item1: {
                        title: 'Carte curriculaire interactive',
                        description: 'Parcourez cours, semestres et disciplines avec une vue claire des cursus officiels.'
                    },
                    item2: {
                        title: 'Playlists intégrées',
                        description: 'Chaque unité reçoit des playlists YouTube et des ressources publiques sélectionnées par la communauté.'
                    },
                    item3: {
                        title: 'Suivi des progrès',
                        description: 'Suivez ce que vous avez étudié et célébrez chaque module à votre rythme.'
                    },
                    item4: {
                        title: 'Curation inclusive',
                        description: 'Un collectif vibrant garantit accessibilité, langage accueillant et représentations authentiques.'
                    }
                },
                courses: {
                    eyebrow: 'Cursus ouverts',
                    title: 'Cours mis en avant par la communauté FACODI',
                    subtitle: 'Des cursus officiels de licences avec unités, playlists ouvertes et résultats d’apprentissage organisés.',
                    link: 'Voir tous les cours',
                    card: {
                        plan: 'Plan {{plan}}',
                        ects: '<strong>{{value}}</strong> ECTS',
                        semesters: '<strong>{{value}}</strong> semestres',
                        code: 'Code {{value}}',
                        ucs: '{{count}} unités curriculaires déjà cartographiées par la communauté'
                    }
                },
                journey: {
                    eyebrow: 'Parcours communautaire',
                    title: 'Le chemin FACODI en action',
                    subtitle: 'Du choix du cursus à la célébration des progrès, chaque étape soutient celles et ceux qui apprennent, enseignent et partagent le savoir.',
                    step1: 'Choisissez un cursus officiel et visualisez semestres, charges horaires, versions et contexte institutionnel.',
                    step2: 'Explorez les unités avec résultats d’apprentissage, sujets associés et playlists ouvertes.',
                    step3: 'Marquez vos progrès, partagez des ressources avec la communauté et gardez l’historique des révisions vivant.'
                },
                manifesto: {
                    eyebrow: 'Manifeste Monynha Softwares',
                    title: 'Démocratiser la technologie, combattre l’hypocrisie et donner la parole à celles et ceux qui créent hors cadre',
                    description: 'FACODI naît de cet engagement socio-politique : utiliser une tech accessible pour ouvrir des chemins dans l’enseignement supérieur, tout en respectant la diversité culturelle et en célébrant les savoirs populaires.',
                    link: 'Découvrir le manifeste complet'
                },
                cta: {
                    title: 'On rejoint FACODI ?',
                    description: 'Partagez playlists, PDF publics, articles et idées pour renforcer la faculté communautaire digitale et diversifier encore le curriculum.',
                    primary: 'Voir les cours et unités curriculaires',
                    secondary: 'Contacter Monynha et suggérer des ressources'
                }
            },
            catalog: {
                title: 'Catalogue des cours',
                lead: 'Choisissez un cours et parcourez FACODI avec un cursus officiel, des playlists ouvertes et toute la bienveillance de la communauté.',
                empty: 'Aucun cours n’est encore publié. Mobilisons la communauté pour les cartographier ensemble !',
                plan: 'Plan {{value}}',
                degreeLabel: 'Diplôme',
                ectsLabel: 'ECTS',
                durationLabel: 'Durée',
                durationValue: '{{value}} semestres',
                open: 'Voir le curriculum complet'
            },
            course: {
                planBadge: 'Plan {{value}}',
                meta: {
                    degree: 'Diplôme',
                    ects: 'ECTS totaux',
                    duration: 'Durée',
                    durationValue: '{{value}} semestres',
                    language: 'Langue',
                    institution: 'Institution',
                    school: 'École'
                },
                ucs: {
                    heading: 'Unités curriculaires',
                    count: '{{count}} {{unit}}',
                    empty: 'Nous n’avons pas encore ajouté d’unités curriculaires ici. Proposez playlists et ressources pour ouvrir cette piste !',
                    year: 'Année {{value}}',
                    semester: 'Semestre {{value}}',
                    card: {
                        semester: 'Semestre {{value}}',
                        ects: 'ECTS',
                        language: 'Langue'
                    }
                }
            },
            uc: {
                semesterBadge: 'Semestre {{value}}',
                meta: {
                    ects: 'ECTS',
                    language: 'Langue',
                    prerequisites: 'Prérequis',
                    prerequisitesEmpty: 'Aucun prérequis indiqué pour le moment.'
                },
                topics: {
                    heading: 'Sujets',
                    count: '{{value}} sujets',
                    empty: 'Pas encore de sujets associés. Partagez vos ressources favorites pour booster cette unité !',
                    playlistCount: '{{value}} playlists',
                    tagsEmpty: 'Aucune étiquette ajoutée pour l’instant. Aidez-nous à indexer ce contenu !'
                },
                outcomes: {
                    heading: "Résultats d'apprentissage",
                    empty: "Nous construisons encore les résultats d'apprentissage de cette unité avec la communauté."
                },
                playlists: {
                    heading: 'Playlists',
                    empty: 'Aucune playlist pour le moment. Partagez vos sélections sur les canaux FACODI !'
                }
            },
            topic: {
                tagsEmpty: 'Aucune étiquette ajoutée pour le moment. Aidez-nous à indexer ce contenu !',
                playlists: {
                    heading: 'Playlists associées',
                    empty: 'Pas encore de playlists. Partagez votre sélection avec la communauté FACODI !'
                }
            }
        },
        es: {
            nav: {
                menuToggleLabel: 'Abrir menú principal',
                menuToggle: 'Abrir menú',
                close: 'Cerrar',
                home: 'Inicio',
                courses: 'Cursos',
                roadmap: 'Hoja de ruta',
                primaryCta: 'Explorar rutas',
                toggleTheme: 'Cambiar modo de color',
                toggleThemeLabel: 'Cambiar modo de color',
                github: 'Abrir el repositorio en GitHub'
            },
            home: {
                hero: {
                    badge: 'Educación superior accesible, abierta y comunitaria',
                    title: 'FACODI — Facultad Comunitaria Digital',
                    description: 'Organizamos currículos de licenciaturas y llenamos cada unidad con playlists abiertas para que cualquiera estudie, comparta y brille con la comunidad.',
                    primaryCta: 'Explorar rutas',
                    secondaryCta: 'Conoce el ecosistema Monynha Softwares',
                    meta: {
                        access: {
                            badge: 'Abierta y gratuita',
                            text: 'Currículos oficiales y materiales públicos sin paywall, como la comunidad merece.'
                        },
                        community: {
                            badge: 'Comunidad Monynha',
                            text: 'Curaduría colaborativa con orgullo, diversidad y transparencia.'
                        }
                    },
                    cardLabel: 'En números comunitarios',
                    stats: {
                        courses: '<strong>{{count}}</strong> cursos oficiales organizados',
                        ucs: '<strong>{{count}}</strong> unidades curriculares con listas y materiales abiertos',
                        progress: 'Progreso marcado por quienes estudian y versiones trazables para confiar.'
                    },
                    cardFoot: 'Creado por <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> para democratizar la tecnología, combatir la hipocresía y amplificar a quienes aprenden fuera de la norma.'
                },
                features: {
                    eyebrow: 'Experiencia FACODI',
                    title: 'La experiencia FACODI en tus manos',
                    subtitle: 'Tecnología abierta para organizar el currículo, apoyar a quienes estudian y valorar cada aporte de la comunidad.',
                    item1: {
                        title: 'Mapa curricular interactivo',
                        description: 'Navega por cursos, semestres y asignaturas con una vista clara de los currículos oficiales.'
                    },
                    item2: {
                        title: 'Playlists integradas',
                        description: 'Cada unidad curricular recibe playlists de YouTube y materiales públicos seleccionados por la comunidad.'
                    },
                    item3: {
                        title: 'Marcación de progreso',
                        description: 'Sigue lo que ya has estudiado y celebra cada módulo a tu ritmo.'
                    },
                    item4: {
                        title: 'Curaduría diversa',
                        description: 'Un colectivo vibrante garantiza accesibilidad, lenguaje acogedor y representación real.'
                    }
                },
                courses: {
                    eyebrow: 'Currículos abiertos',
                    title: 'Cursos destacados por la comunidad FACODI',
                    subtitle: 'Currículos oficiales con unidades curriculares, playlists abiertas y resultados de aprendizaje organizados.',
                    link: 'Ver todos los cursos',
                    card: {
                        plan: 'Plan {{plan}}',
                        ects: '<strong>{{value}}</strong> ECTS',
                        semesters: '<strong>{{value}}</strong> semestres',
                        code: 'Código {{value}}',
                        ucs: '{{count}} unidades curriculares ya mapeadas por la comunidad'
                    }
                },
                journey: {
                    eyebrow: 'Recorrido comunitario',
                    title: 'Cómo se vive la jornada FACODI',
                    subtitle: 'Desde elegir el curso hasta celebrar el progreso, cada paso apoya a quienes aprenden, enseñan y comparten conocimiento.',
                    step1: 'Elige un currículo oficial y revisa semestres, cargas horarias, versiones y contexto institucional.',
                    step2: 'Sumérgete en las unidades curriculares con resultados de aprendizaje, temas relacionados y playlists abiertas.',
                    step3: 'Marca el progreso, comparte materiales con la comunidad y mantén vivo el historial de revisiones.'
                },
                manifesto: {
                    eyebrow: 'Manifiesto Monynha Softwares',
                    title: 'Democratizar la tecnología, combatir la hipocresía y dar voz a quienes crean fuera del estándar',
                    description: 'FACODI nace de este compromiso sociopolítico: usar tecnología accesible para abrir caminos en la educación superior, respetando la diversidad cultural y celebrando los saberes populares.',
                    link: 'Conoce el manifiesto completo'
                },
                cta: {
                    title: '¿Te sumas a FACODI?',
                    description: 'Trae playlists, PDF públicos, artículos e ideas para fortalecer la facultad comunitaria digital y hacer el currículo cada vez más diverso.',
                    primary: 'Ver cursos y unidades curriculares',
                    secondary: 'Habla con Monynha y sugiere materiales'
                }
            },
            catalog: {
                title: 'Catálogo de cursos',
                lead: 'Elige un curso y recorre FACODI con currículo oficial, playlists abiertas y mucho cariño comunitario.',
                empty: 'Todavía no publicamos cursos aquí. ¡Llama a la comunidad y vamos a catalogarlos juntes!',
                plan: 'Plan {{value}}',
                degreeLabel: 'Grado',
                ectsLabel: 'ECTS',
                durationLabel: 'Duración',
                durationValue: '{{value}} semestres',
                open: 'Ver plan de estudios completo'
            },
            course: {
                planBadge: 'Plan {{value}}',
                meta: {
                    degree: 'Grado',
                    ects: 'ECTS totales',
                    duration: 'Duración',
                    durationValue: '{{value}} semestres',
                    language: 'Idioma',
                    institution: 'Institución',
                    school: 'Escuela'
                },
                ucs: {
                    heading: 'Unidades curriculares',
                    count: '{{count}} {{unit}}',
                    empty: 'Aún no añadimos unidades curriculares aquí. Sugiere playlists y contenidos para abrir esta ruta.',
                    year: 'Año {{value}}',
                    semester: 'Semestre {{value}}',
                    card: {
                        semester: 'Semestre {{value}}',
                        ects: 'ECTS',
                        language: 'Idioma'
                    }
                }
            },
            uc: {
                semesterBadge: 'Semestre {{value}}',
                meta: {
                    ects: 'ECTS',
                    language: 'Idioma',
                    prerequisites: 'Prerrequisitos',
                    prerequisitesEmpty: 'Aún no se informó ningún prerrequisito.'
                },
                topics: {
                    heading: 'Temas',
                    count: '{{value}} temas',
                    empty: 'Todavía no tenemos temas conectados. ¡Comparte tus contenidos favoritos para potenciar esta unidad!',
                    playlistCount: '{{value}} playlists',
                    tagsEmpty: 'Aún no se añadieron etiquetas. ¡Ayuda a indexar este contenido!'
                },
                outcomes: {
                    heading: 'Resultados de aprendizaje',
                    empty: 'Seguimos construyendo los resultados de aprendizaje de esta unidad junto a la comunidad.'
                },
                playlists: {
                    heading: 'Playlists',
                    empty: 'Ninguna playlist por ahora. ¡Comparte tu selección en los canales de FACODI!'
                }
            },
            topic: {
                tagsEmpty: 'Aún no se añadieron etiquetas. ¡Ayuda a indexar este contenido!',
                playlists: {
                    heading: 'Playlists relacionadas',
                    empty: 'Sin playlists por el momento. ¡Comparte tu selección con la comunidad FACODI!'
                }
            }
        }
    };
    let currentLanguage = defaultLanguage;

    function normalizeLanguage(value) {
        if (!value) return null;
        const normalized = String(value).toLowerCase();
        if (supportedLanguages.includes(normalized)) {
            return normalized;
        }
        const primary = normalized.split('-')[0];
        if (supportedLanguages.includes(primary)) {
            return primary;
        }
        return null;
    }

    function getTranslation(lang, key) {
        const paths = key.split('.');
        const fallbackChain = Array.from(new Set([lang, defaultLanguage, 'pt'])).filter(Boolean);

        for (const candidate of fallbackChain) {
            let ref = translations[candidate];
            let found = true;
            for (const segment of paths) {
                if (ref && Object.prototype.hasOwnProperty.call(ref, segment)) {
                    ref = ref[segment];
                } else {
                    found = false;
                    break;
                }
            }
            if (found && typeof ref === 'string') {
                return ref;
            }
        }

        return null;
    }

    function formatTemplate(template, vars) {
        if (!template) return '';
        return template.replace(/{{\s*(\w+)\s*}}/g, (_, token) => {
            if (vars && Object.prototype.hasOwnProperty.call(vars, token)) {
                const value = vars[token];
                return value === undefined || value === null ? '' : String(value);
            }
            return '';
        });
    }

    function parseVars(raw) {
        if (!raw) return {};
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                return parsed;
            }
        } catch (error) {
            return {};
        }
        return {};
    }

    function getPluralUnit(lang, count) {
        const value = Number(count) || 0;
        const isSingular = Math.abs(value) === 1;

        switch (lang) {
            case 'en':
                return isSingular ? 'unit' : 'units';
            case 'fr':
                return isSingular ? 'unité' : 'unités';
            case 'es':
                return isSingular ? 'unidad' : 'unidades';
            default:
                return isSingular ? 'unidade' : 'unidades';
        }
    }

    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach((element) => {
            const key = element.dataset.i18n;
            if (!key) return;

            const translation = getTranslation(lang, key);
            if (!translation) return;

            const vars = parseVars(element.dataset.i18nVars);

            if (key === 'course.ucs.count') {
                vars.unit = getPluralUnit(lang, vars.count);
            }

            const formatted = formatTemplate(translation, vars);
            const targetAttr = element.dataset.i18nAttr;

            if (targetAttr) {
                element.setAttribute(targetAttr, formatted);
            } else {
                element.innerHTML = formatted;
            }
        });
    }

    function detectLanguage() {
        const searchParams = new URLSearchParams(window.location.search);
        const fromQuery = normalizeLanguage(searchParams.get('lang'));
        if (fromQuery) {
            return { lang: fromQuery, persist: true };
        }

        const stored = normalizeLanguage(localStorage.getItem(STORAGE_KEYS.language));
        if (stored) {
            return { lang: stored, persist: false };
        }

        const navigatorLanguage = normalizeLanguage((navigator.languages && navigator.languages[0]) || navigator.language);

        return { lang: navigatorLanguage || defaultLanguage, persist: false };
    }

    function setLanguage(lang, persist = true) {
        const normalized = normalizeLanguage(lang) || defaultLanguage;
        docEl.lang = normalized;
        docEl.dataset.language = normalized;
        applyTranslations(normalized);
        currentLanguage = normalized;
        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEYS.language, normalized);
            } catch (error) {
                /* noop */
            }
        }
        return normalized;
    }

    function initLanguage() {
        const { lang, persist } = detectLanguage();
        setLanguage(lang, persist);
        window.facodiLanguage = {
            get: () => currentLanguage,
            set: (nextLang) => setLanguage(nextLang, true)
        };
    }

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEYS.theme);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateThemeToggleButtons(theme) {
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.setAttribute('data-theme-state', theme);
            button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        });
    }

    function applyTheme(theme) {
        const normalized = theme === 'dark' ? 'dark' : 'light';
        docEl.dataset.theme = normalized;
        try {
            localStorage.setItem(STORAGE_KEYS.theme, normalized);
        } catch (error) {
            /* noop */
        }
        updateThemeToggleButtons(normalized);
        return normalized;
    }

    function initThemeToggle() {
        const initialTheme = applyTheme(getPreferredTheme());
        updateThemeToggleButtons(initialTheme);

        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.addEventListener('click', () => {
                const nextTheme = docEl.dataset.theme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
            });
        });

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (event) => {
            const stored = localStorage.getItem(STORAGE_KEYS.theme);
            if (!stored) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initLanguage();
    });
}
