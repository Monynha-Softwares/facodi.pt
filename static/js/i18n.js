(function () {
  const DEFAULT_LANG = 'pt';
  const SUPPORTED_LANGS = ['pt', 'en', 'es', 'fr'];
  const LOCALE_MAP = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR'
  };

  const translations = {
    pt: {
      'nav.openMain': 'Abrir menu principal',
      'nav.openMenu': 'Abrir menu',
      'nav.closeMenu': 'Fechar menu',
      'nav.cta': 'Explorar trilhas',
      'menu.home': 'Início',
      'menu.courses': 'Cursos',
      'menu.roadmap': 'Roadmap',
      'language.label': 'Selecionar idioma',
      'language.pt': 'Português',
      'language.en': 'Inglês',
      'language.es': 'Espanhol',
      'language.fr': 'Francês',
      'hero.badge': 'Ensino superior acessível, aberto e comunitário',
      'hero.title': 'FACODI — Faculdade Comunitária Digital',
      'hero.lead': 'Organizamos currículos de licenciaturas e recheamos cada unidade com playlists abertas para que qualquer pessoa estude, compartilhe e brilhe junto com a comunidade.',
      'hero.primaryCta': 'Explorar trilhas',
      'hero.secondaryCta': 'Conheça o ecossistema Monynha Softwares',
      'hero.meta.openLabel': 'Aberta e gratuita',
      'hero.meta.openText': 'Currículos oficiais e materiais públicos sem paywall, do jeitinho que a comunidade merece.',
      'hero.meta.communityLabel': 'Comunidade Monynha',
      'hero.meta.communityText': 'Curadoria colaborativa com orgulho, diversidade e transparência.',
      'hero.statsLabel': 'Em números comunitários',
      'hero.stats.courses': '<strong class="notranslate">{count}</strong> cursos oficiais organizados',
      'hero.stats.ucs': '<strong class="notranslate">{count}</strong> unidades curriculares com playlists e materiais livres',
      'hero.stats.progress': 'Progresso marcado por quem estuda e versões rastreáveis para todo mundo confiar.',
      'hero.cardFoot': 'Criado pela <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> para democratizar tecnologia, combater hipocrisia e amplificar quem aprende fora do padrão.',
      'features.eyebrow': 'Experiência FACODI',
      'features.title': 'Experiência FACODI na palma da mão',
      'features.subtitle': 'Tecnologia aberta para organizar o currículo, apoiar quem estuda e valorizar cada contribuição da comunidade.',
      'features.map.title': 'Mapa curricular interativo',
      'features.map.description': 'Navegue por cursos, semestres e disciplinas com uma visão organizada dos currículos oficiais.',
      'features.playlists.title': 'Playlists integradas',
      'features.playlists.description': 'Cada unidade curricular recebe playlists do YouTube e materiais públicos selecionados pela comunidade.',
      'features.progress.title': 'Marcação de progresso',
      'features.progress.description': 'Acompanhe o que já foi estudado e celebre cada módulo concluído no seu tempo.',
      'features.diversity.title': 'Curadoria diversa',
      'features.diversity.description': 'Um coletivo vibrante garante acessibilidade, linguagem acolhedora e representatividade real.',
      'courses.eyebrow': 'Currículos abertos',
      'courses.title': 'Cursos em destaque na comunidade FACODI',
      'courses.subtitle': 'Currículos oficiais de licenciaturas e áreas afins com unidades curriculares, playlists abertas e resultados de aprendizagem organizados.',
      'courses.viewAll': 'Ver todos os cursos',
      'courses.plan': 'Plano {plan}',
      'courses.stats.ects': '<strong class="notranslate">{ects}</strong> ECTS',
      'courses.stats.duration': '<strong class="notranslate">{semesters}</strong> semestres',
      'courses.stats.code': 'Código <span class="notranslate">{code}</span>',
      'courses.ucSummary': '<span class="notranslate">{count}</span> unidades curriculares já mapeadas pela comunidade',
      'journey.eyebrow': 'Trilha comunitária',
      'journey.title': 'Como rola a jornada FACODI',
      'journey.subtitle': 'Da escolha do curso até a celebração do progresso, cada passo foi pensado para apoiar quem aprende, quem ensina e quem curte compartilhar conhecimento.',
      'journey.steps.first': 'Escolha um currículo oficial e visualize semestres, cargas horárias, versões e contexto institucional.',
      'journey.steps.second': 'Mergulhe nas unidades curriculares com resultados de aprendizagem, tópicos relacionados e playlists abertas.',
      'journey.steps.third': 'Marque o progresso, compartilhe materiais com a comunidade e mantenha vivo o histórico de revisões.',
      'manifesto.eyebrow': 'Manifesto Monynha Softwares',
      'manifesto.title': 'Democratizar tecnologia, combater hipocrisia e dar voz a quem cria fora do padrão',
      'manifesto.description': 'A FACODI nasce desse compromisso político-social: usar tecnologia acessível para abrir caminhos na educação superior, respeitando diversidade cultural e celebrando conhecimentos populares.',
      'manifesto.cta': 'Conheça o manifesto completo',
      'cta.title': 'Bora colar com a FACODI?',
      'cta.description': 'Traga playlists, PDFs públicos, artigos e ideias para fortalecer a faculdade comunitária digital e deixar o currículo cada vez mais diverso.',
      'cta.primary': 'Ver cursos e unidades curriculares',
      'cta.secondary': 'Falar com a Monynha e sugerir materiais',
      'course.plan': 'Plano {plan}',
      'course.details.degree': 'Grau',
      'course.details.ects': 'ECTS totais',
      'course.details.durationLabel': 'Duração',
      'course.details.duration': '<span class="notranslate">{value}</span> semestres',
      'course.details.language': 'Idioma',
      'course.details.institution': 'Instituição',
      'course.details.school': 'Escola',
      'course.ucTitle': 'Unidades Curriculares',
      'course.ucCount': '<span class="notranslate">{count}</span> unidades curriculares',
      'course.ucEmpty': 'Ainda não adicionamos unidades curriculares por aqui. Bora sugerir playlists e conteúdos para abrir essa trilha?',
      'course.yearTitle': 'Ano <span class="notranslate">{year}</span>',
      'course.semesterTitle': 'Semestre <span class="notranslate">{semester}</span>',
      'course.ucCard.semester': 'Semestre <span class="notranslate">{semester}</span>',
      'course.ucCard.ects': 'ECTS',
      'course.ucCard.language': 'Idioma',
      'uc.semester': 'Semestre <span class="notranslate">{semester}</span>',
      'uc.details.ects': 'ECTS',
      'uc.details.language': 'Idioma',
      'uc.details.prerequisites': 'Pré-requisitos',
      'uc.details.noPrerequisites': 'Nenhum pré-requisito informado ainda.',
      'uc.topicsTitle': 'Tópicos',
      'uc.topicsCount': '<span class="notranslate">{count}</span> tópicos',
      'uc.topicsEmpty': 'Ainda não temos tópicos conectados. Indica teus conteúdos favoritos para turbinar esta UC!',
      'uc.topicPlaylists': '<span class="notranslate">{count}</span> playlists',
      'uc.outcomesTitle': 'Resultados de Aprendizagem',
      'uc.outcomesEmpty': 'Ainda estamos construindo os resultados de aprendizagem desta UC com a comunidade.',
      'uc.playlistsTitle': 'Playlists',
      'uc.playlistsEmpty': 'Nenhuma playlist cadastrada por enquanto. Que tal sugerir uma nos canais da FACODI?',
      'topic.tagsEmpty': 'Nenhuma tag adicionada ainda. Fala tu, mona, e ajuda a indexar esse conteúdo!',
      'topic.playlistsTitle': 'Playlists relacionadas',
      'topic.playlistsEmpty': 'Sem playlists cadastradas por enquanto. Compartilha tua seleção nos canais da FACODI!'
    },
    en: {
      'nav.openMain': 'Open main menu',
      'nav.openMenu': 'Open menu',
      'nav.closeMenu': 'Close menu',
      'nav.cta': 'Explore tracks',
      'menu.home': 'Home',
      'menu.courses': 'Courses',
      'menu.roadmap': 'Roadmap',
      'language.label': 'Select language',
      'language.pt': 'Portuguese',
      'language.en': 'English',
      'language.es': 'Spanish',
      'language.fr': 'French',
      'hero.badge': 'Accessible, open and community-driven higher education',
      'hero.title': 'FACODI — Digital Community College',
      'hero.lead': 'We organize degree curricula and pack every unit with open playlists so anyone can study, share and shine with the community.',
      'hero.primaryCta': 'Explore tracks',
      'hero.secondaryCta': 'Discover the Monynha Softwares ecosystem',
      'hero.meta.openLabel': 'Open and free',
      'hero.meta.openText': 'Official curricula and public materials without paywalls, just the way the community deserves.',
      'hero.meta.communityLabel': 'Monynha community',
      'hero.meta.communityText': 'Collaborative curation with pride, diversity and transparency.',
      'hero.statsLabel': 'Community numbers',
      'hero.stats.courses': '<strong class="notranslate">{count}</strong> official courses organized',
      'hero.stats.ucs': '<strong class="notranslate">{count}</strong> course units with playlists and open resources',
      'hero.stats.progress': 'Progress tracked by learners and version history everyone can trust.',
      'hero.cardFoot': 'Created by <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> to democratize technology, fight hypocrisy and amplify those who learn outside the standard.',
      'features.eyebrow': 'FACODI experience',
      'features.title': 'FACODI in the palm of your hand',
      'features.subtitle': 'Open technology to organize curricula, support learners and value every community contribution.',
      'features.map.title': 'Interactive curriculum map',
      'features.map.description': 'Navigate courses, semesters and subjects with a clear view of the official curricula.',
      'features.playlists.title': 'Integrated playlists',
      'features.playlists.description': 'Each course unit receives YouTube playlists and public materials curated by the community.',
      'features.progress.title': 'Progress tracking',
      'features.progress.description': 'Follow what you have already studied and celebrate every module completed at your own pace.',
      'features.diversity.title': 'Diverse curation',
      'features.diversity.description': 'A vibrant collective guarantees accessibility, welcoming language and real representation.',
      'courses.eyebrow': 'Open curricula',
      'courses.title': 'Featured courses in the FACODI community',
      'courses.subtitle': 'Official curricula for teaching degrees and related areas with course units, open playlists and organized learning outcomes.',
      'courses.viewAll': 'See all courses',
      'courses.plan': 'Plan {plan}',
      'courses.stats.ects': '<strong class="notranslate">{ects}</strong> ECTS',
      'courses.stats.duration': '<strong class="notranslate">{semesters}</strong> semesters',
      'courses.stats.code': 'Code <span class="notranslate">{code}</span>',
      'courses.ucSummary': '<span class="notranslate">{count}</span> course units already mapped by the community',
      'journey.eyebrow': 'Community journey',
      'journey.title': 'How the FACODI journey works',
      'journey.subtitle': 'From choosing a course to celebrating progress, every step is designed to support learners, mentors and everyone who shares knowledge.',
      'journey.steps.first': 'Choose an official curriculum and view semesters, workloads, versions and institutional context.',
      'journey.steps.second': 'Dive into course units with learning outcomes, related topics and open playlists.',
      'journey.steps.third': 'Track progress, share resources with the community and keep the revision history alive.',
      'manifesto.eyebrow': 'Monynha Softwares manifesto',
      'manifesto.title': 'Democratize technology, fight hypocrisy and give voice to those who create outside the norm',
      'manifesto.description': 'FACODI was born from this social-political commitment: use accessible technology to open pathways in higher education, respect cultural diversity and celebrate grassroots knowledge.',
      'manifesto.cta': 'Read the full manifesto',
      'cta.title': 'Join FACODI',
      'cta.description': 'Bring playlists, public PDFs, articles and ideas to strengthen the digital community college and keep the curriculum ever more diverse.',
      'cta.primary': 'Browse courses and course units',
      'cta.secondary': 'Talk to Monynha and suggest resources',
      'course.plan': 'Plan {plan}',
      'course.details.degree': 'Degree',
      'course.details.ects': 'Total ECTS',
      'course.details.durationLabel': 'Duration',
      'course.details.duration': '<span class="notranslate">{value}</span> semesters',
      'course.details.language': 'Language',
      'course.details.institution': 'Institution',
      'course.details.school': 'School',
      'course.ucTitle': 'Course units',
      'course.ucCount': '<span class="notranslate">{count}</span> course units',
      'course.ucEmpty': 'We have not added course units here yet. Suggest playlists and resources to open this track!',
      'course.yearTitle': 'Year <span class="notranslate">{year}</span>',
      'course.semesterTitle': 'Semester <span class="notranslate">{semester}</span>',
      'course.ucCard.semester': 'Semester <span class="notranslate">{semester}</span>',
      'course.ucCard.ects': 'ECTS',
      'course.ucCard.language': 'Language',
      'uc.semester': 'Semester <span class="notranslate">{semester}</span>',
      'uc.details.ects': 'ECTS',
      'uc.details.language': 'Language',
      'uc.details.prerequisites': 'Prerequisites',
      'uc.details.noPrerequisites': 'No prerequisites informed yet.',
      'uc.topicsTitle': 'Topics',
      'uc.topicsCount': '<span class="notranslate">{count}</span> topics',
      'uc.topicsEmpty': 'We do not have connected topics yet. Share your favourite resources to boost this course unit!',
      'uc.topicPlaylists': '<span class="notranslate">{count}</span> playlists',
      'uc.outcomesTitle': 'Learning outcomes',
      'uc.outcomesEmpty': 'We are still building the learning outcomes for this course unit with the community.',
      'uc.playlistsTitle': 'Playlists',
      'uc.playlistsEmpty': 'No playlists yet. How about suggesting one on FACODI channels?',
      'topic.tagsEmpty': 'No tags added yet. Speak up and help index this content!',
      'topic.playlistsTitle': 'Related playlists',
      'topic.playlistsEmpty': 'No playlists registered yet. Share your selection on FACODI channels!'
    },
    es: {
      'nav.openMain': 'Abrir menú principal',
      'nav.openMenu': 'Abrir menú',
      'nav.closeMenu': 'Cerrar menú',
      'nav.cta': 'Explorar rutas',
      'menu.home': 'Inicio',
      'menu.courses': 'Cursos',
      'menu.roadmap': 'Hoja de ruta',
      'language.label': 'Seleccionar idioma',
      'language.pt': 'Portugués',
      'language.en': 'Inglés',
      'language.es': 'Español',
      'language.fr': 'Francés',
      'hero.badge': 'Educación superior accesible, abierta y comunitaria',
      'hero.title': 'FACODI — Facultad Comunitaria Digital',
      'hero.lead': 'Organizamos planes de estudio de licenciaturas y llenamos cada unidad con playlists abiertas para que cualquiera estudie, comparta y brille junto a la comunidad.',
      'hero.primaryCta': 'Explorar rutas',
      'hero.secondaryCta': 'Conoce el ecosistema Monynha Softwares',
      'hero.meta.openLabel': 'Abierta y gratuita',
      'hero.meta.openText': 'Currículos oficiales y materiales públicos sin paywall, como la comunidad merece.',
      'hero.meta.communityLabel': 'Comunidad Monynha',
      'hero.meta.communityText': 'Curaduría colaborativa con orgullo, diversidad y transparencia.',
      'hero.statsLabel': 'Números comunitarios',
      'hero.stats.courses': '<strong class="notranslate">{count}</strong> cursos oficiales organizados',
      'hero.stats.ucs': '<strong class="notranslate">{count}</strong> unidades curriculares con playlists y materiales libres',
      'hero.stats.progress': 'Progreso marcado por quienes estudian y versiones rastreables para que todas confíen.',
      'hero.cardFoot': 'Creado por <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> para democratizar la tecnología, combatir la hipocresía y amplificar a quienes aprenden fuera del estándar.',
      'features.eyebrow': 'Experiencia FACODI',
      'features.title': 'La experiencia FACODI en tus manos',
      'features.subtitle': 'Tecnología abierta para organizar el currículo, apoyar a quienes aprenden y valorar cada aporte de la comunidad.',
      'features.map.title': 'Mapa curricular interactivo',
      'features.map.description': 'Navega por cursos, semestres y asignaturas con una visión organizada de los currículos oficiales.',
      'features.playlists.title': 'Playlists integradas',
      'features.playlists.description': 'Cada unidad curricular recibe playlists de YouTube y materiales públicos seleccionados por la comunidad.',
      'features.progress.title': 'Marcado de progreso',
      'features.progress.description': 'Sigue lo que ya estudiaste y celebra cada módulo completado a tu ritmo.',
      'features.diversity.title': 'Curaduría diversa',
      'features.diversity.description': 'Un colectivo vibrante garantiza accesibilidad, lenguaje acogedor y verdadera representación.',
      'courses.eyebrow': 'Currículos abiertos',
      'courses.title': 'Cursos destacados en la comunidad FACODI',
      'courses.subtitle': 'Currículos oficiales de licenciaturas y áreas afines con unidades curriculares, playlists abiertas y resultados de aprendizaje organizados.',
      'courses.viewAll': 'Ver todos los cursos',
      'courses.plan': 'Plan {plan}',
      'courses.stats.ects': '<strong class="notranslate">{ects}</strong> ECTS',
      'courses.stats.duration': '<strong class="notranslate">{semesters}</strong> semestres',
      'courses.stats.code': 'Código <span class="notranslate">{code}</span>',
      'courses.ucSummary': '<span class="notranslate">{count}</span> unidades curriculares mapeadas por la comunidad',
      'journey.eyebrow': 'Travesía comunitaria',
      'journey.title': 'Cómo se vive la jornada FACODI',
      'journey.subtitle': 'Desde elegir el curso hasta celebrar el progreso, cada paso apoya a quien aprende, enseña y comparte conocimiento.',
      'journey.steps.first': 'Elige un currículo oficial y visualiza semestres, cargas horarias, versiones y contexto institucional.',
      'journey.steps.second': 'Sumérgete en las unidades curriculares con resultados de aprendizaje, temas relacionados y playlists abiertas.',
      'journey.steps.third': 'Marca el progreso, comparte materiales con la comunidad y mantén vivo el historial de revisiones.',
      'manifesto.eyebrow': 'Manifiesto Monynha Softwares',
      'manifesto.title': 'Democratizar la tecnología, combatir la hipocresía y dar voz a quienes crean fuera del patrón',
      'manifesto.description': 'FACODI nace de este compromiso socio-político: usar tecnología accesible para abrir caminos en la educación superior, respetando la diversidad cultural y celebrando saberes populares.',
      'manifesto.cta': 'Lee el manifiesto completo',
      'cta.title': '¿Te sumas a FACODI?',
      'cta.description': 'Trae playlists, PDFs públicos, artículos e ideas para fortalecer la facultad comunitaria digital y hacer el currículo más diverso.',
      'cta.primary': 'Ver cursos y unidades curriculares',
      'cta.secondary': 'Habla con Monynha y sugiere materiales',
      'course.plan': 'Plan {plan}',
      'course.details.degree': 'Grado',
      'course.details.ects': 'ECTS totales',
      'course.details.durationLabel': 'Duración',
      'course.details.duration': '<span class="notranslate">{value}</span> semestres',
      'course.details.language': 'Idioma',
      'course.details.institution': 'Institución',
      'course.details.school': 'Escuela',
      'course.ucTitle': 'Unidades curriculares',
      'course.ucCount': '<span class="notranslate">{count}</span> unidades curriculares',
      'course.ucEmpty': 'Aún no añadimos unidades curriculares aquí. ¡Sugiere playlists y contenidos para abrir esta ruta!',
      'course.yearTitle': 'Año <span class="notranslate">{year}</span>',
      'course.semesterTitle': 'Semestre <span class="notranslate">{semester}</span>',
      'course.ucCard.semester': 'Semestre <span class="notranslate">{semester}</span>',
      'course.ucCard.ects': 'ECTS',
      'course.ucCard.language': 'Idioma',
      'uc.semester': 'Semestre <span class="notranslate">{semester}</span>',
      'uc.details.ects': 'ECTS',
      'uc.details.language': 'Idioma',
      'uc.details.prerequisites': 'Prerrequisitos',
      'uc.details.noPrerequisites': 'Aún no se informaron prerrequisitos.',
      'uc.topicsTitle': 'Temas',
      'uc.topicsCount': '<span class="notranslate">{count}</span> temas',
      'uc.topicsEmpty': 'Todavía no tenemos temas conectados. ¡Comparte tus contenidos favoritos para potenciar esta unidad!',
      'uc.topicPlaylists': '<span class="notranslate">{count}</span> playlists',
      'uc.outcomesTitle': 'Resultados de aprendizaje',
      'uc.outcomesEmpty': 'Seguimos construyendo los resultados de aprendizaje de esta unidad con la comunidad.',
      'uc.playlistsTitle': 'Playlists',
      'uc.playlistsEmpty': 'Ninguna playlist registrada por ahora. ¿Qué tal sugerir una en los canales de FACODI?',
      'topic.tagsEmpty': 'Aún no hay etiquetas añadidas. ¡Ayuda a indexar este contenido!',
      'topic.playlistsTitle': 'Playlists relacionadas',
      'topic.playlistsEmpty': 'Sin playlists registradas por ahora. ¡Comparte tu selección en los canales de FACODI!'
    },
    fr: {
      'nav.openMain': 'Ouvrir le menu principal',
      'nav.openMenu': 'Ouvrir le menu',
      'nav.closeMenu': 'Fermer le menu',
      'nav.cta': 'Explorer les parcours',
      'menu.home': 'Accueil',
      'menu.courses': 'Cours',
      'menu.roadmap': 'Feuille de route',
      'language.label': 'Choisir la langue',
      'language.pt': 'Portugais',
      'language.en': 'Anglais',
      'language.es': 'Espagnol',
      'language.fr': 'Français',
      'hero.badge': 'Enseignement supérieur accessible, ouvert et communautaire',
      'hero.title': 'FACODI — Faculté Communautaire Digitale',
      'hero.lead': 'Nous organisons les programmes de licence et remplissons chaque unité de playlists ouvertes pour que toute personne puisse étudier, partager et briller avec la communauté.',
      'hero.primaryCta': 'Explorer les parcours',
      'hero.secondaryCta': 'Découvrir l’écosystème Monynha Softwares',
      'hero.meta.openLabel': 'Ouverte et gratuite',
      'hero.meta.openText': 'Programmes officiels et ressources publiques sans paywall, comme la communauté le mérite.',
      'hero.meta.communityLabel': 'Communauté Monynha',
      'hero.meta.communityText': 'Curation collaborative avec fierté, diversité et transparence.',
      'hero.statsLabel': 'Chiffres communautaires',
      'hero.stats.courses': '<strong class="notranslate">{count}</strong> cursus officiels organisés',
      'hero.stats.ucs': '<strong class="notranslate">{count}</strong> unités curriculaires avec playlists et ressources libres',
      'hero.stats.progress': 'Progrès signalé par celles et ceux qui étudient, avec des versions traçables pour toute la communauté.',
      'hero.cardFoot': 'Créé par <a href="https://monynha.com" target="_blank" rel="noopener">Monynha Softwares</a> pour démocratiser la technologie, combattre l’hypocrisie et amplifier celles et ceux qui apprennent hors des normes.',
      'features.eyebrow': 'Expérience FACODI',
      'features.title': 'FACODI au bout des doigts',
      'features.subtitle': 'Une technologie ouverte pour organiser le cursus, soutenir les apprenant·e·s et valoriser chaque contribution de la communauté.',
      'features.map.title': 'Carte curriculaire interactive',
      'features.map.description': 'Parcourez cours, semestres et disciplines avec une vue claire des programmes officiels.',
      'features.playlists.title': 'Playlists intégrées',
      'features.playlists.description': 'Chaque unité curriculaire reçoit des playlists YouTube et des ressources publiques sélectionnées par la communauté.',
      'features.progress.title': 'Suivi du progrès',
      'features.progress.description': 'Suivez ce que vous avez déjà étudié et célébrez chaque module terminé à votre rythme.',
      'features.diversity.title': 'Curation diversifiée',
      'features.diversity.description': 'Un collectif vibrant garantit accessibilité, langage accueillant et représentation réelle.',
      'courses.eyebrow': 'Curriculums ouverts',
      'courses.title': 'Cours à la une dans la communauté FACODI',
      'courses.subtitle': 'Programmes officiels de licences et domaines connexes avec unités curriculaires, playlists ouvertes et résultats d’apprentissage organisés.',
      'courses.viewAll': 'Voir tous les cours',
      'courses.plan': 'Plan {plan}',
      'courses.stats.ects': '<strong class="notranslate">{ects}</strong> ECTS',
      'courses.stats.duration': '<strong class="notranslate">{semesters}</strong> semestres',
      'courses.stats.code': 'Code <span class="notranslate">{code}</span>',
      'courses.ucSummary': '<span class="notranslate">{count}</span> unités curriculaires déjà cartographiées par la communauté',
      'journey.eyebrow': 'Parcours communautaire',
      'journey.title': 'Comment se déroule le parcours FACODI',
      'journey.subtitle': 'Du choix du cours à la célébration du progrès, chaque étape soutient celles et ceux qui apprennent, enseignent et partagent les savoirs.',
      'journey.steps.first': 'Choisissez un programme officiel et visualisez semestres, charges horaires, versions et contexte institutionnel.',
      'journey.steps.second': 'Plongez dans les unités curriculaires avec résultats d’apprentissage, sujets liés et playlists ouvertes.',
      'journey.steps.third': 'Marquez votre progression, partagez des ressources avec la communauté et gardez l’historique des révisions vivant.',
      'manifesto.eyebrow': 'Manifeste Monynha Softwares',
      'manifesto.title': 'Démocratiser la technologie, combattre l’hypocrisie et donner la parole à celles et ceux qui créent hors des standards',
      'manifesto.description': 'FACODI naît de cet engagement socio-politique : utiliser une technologie accessible pour ouvrir des chemins dans l’enseignement supérieur, respecter la diversité culturelle et célébrer les savoirs populaires.',
      'manifesto.cta': 'Découvrir le manifeste complet',
      'cta.title': 'Prendre part à FACODI',
      'cta.description': 'Apportez playlists, PDF publics, articles et idées pour renforcer la faculté communautaire numérique et rendre le cursus toujours plus diversifié.',
      'cta.primary': 'Voir les cours et unités curriculaires',
      'cta.secondary': 'Parler à Monynha et proposer des ressources',
      'course.plan': 'Plan {plan}',
      'course.details.degree': 'Diplôme',
      'course.details.ects': 'ECTS totaux',
      'course.details.durationLabel': 'Durée',
      'course.details.duration': '<span class="notranslate">{value}</span> semestres',
      'course.details.language': 'Langue',
      'course.details.institution': 'Institution',
      'course.details.school': 'École',
      'course.ucTitle': 'Unités curriculaires',
      'course.ucCount': '<span class="notranslate">{count}</span> unités curriculaires',
      'course.ucEmpty': 'Nous n’avons pas encore ajouté d’unités curriculaires ici. Proposez des playlists et contenus pour ouvrir ce parcours !',
      'course.yearTitle': 'Année <span class="notranslate">{year}</span>',
      'course.semesterTitle': 'Semestre <span class="notranslate">{semester}</span>',
      'course.ucCard.semester': 'Semestre <span class="notranslate">{semester}</span>',
      'course.ucCard.ects': 'ECTS',
      'course.ucCard.language': 'Langue',
      'uc.semester': 'Semestre <span class="notranslate">{semester}</span>',
      'uc.details.ects': 'ECTS',
      'uc.details.language': 'Langue',
      'uc.details.prerequisites': 'Prérequis',
      'uc.details.noPrerequisites': 'Aucun prérequis indiqué pour l’instant.',
      'uc.topicsTitle': 'Sujets',
      'uc.topicsCount': '<span class="notranslate">{count}</span> sujets',
      'uc.topicsEmpty': 'Pas encore de sujets connectés. Partagez vos contenus favoris pour dynamiser cette unité !',
      'uc.topicPlaylists': '<span class="notranslate">{count}</span> playlists',
      'uc.outcomesTitle': 'Résultats d’apprentissage',
      'uc.outcomesEmpty': 'Nous construisons encore les résultats d’apprentissage de cette unité avec la communauté.',
      'uc.playlistsTitle': 'Playlists',
      'uc.playlistsEmpty': 'Aucune playlist pour le moment. Pourquoi ne pas en suggérer une sur les canaux FACODI ?',
      'topic.tagsEmpty': 'Aucune étiquette ajoutée pour l’instant. Aidez à indexer ce contenu !',
      'topic.playlistsTitle': 'Playlists associées',
      'topic.playlistsEmpty': 'Pas encore de playlists. Partagez votre sélection sur les canaux FACODI !'
    }
  };

  function getTranslation(lang, key) {
    const langDict = translations[lang] || {};
    if (Object.prototype.hasOwnProperty.call(langDict, key)) {
      return langDict[key];
    }
    const fallback = translations[DEFAULT_LANG] || {};
    return fallback[key] || null;
  }

  function parseVars(el) {
    const raw = el.dataset.i18nVars;
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function replacePlaceholders(text, vars) {
    if (!vars) {
      return text;
    }
    let output = text;
    for (const [key, value] of Object.entries(vars)) {
      const replacement = String(value);
      output = output.replace(new RegExp(`{${key}}`, 'g'), replacement);
    }
    return output;
  }

  function applyAttributes(el, lang, vars) {
    const attrData = el.dataset.i18nAttr;
    if (!attrData) {
      return;
    }
    attrData.split(',').forEach((pair) => {
      const [attrName, attrKey] = pair.split(':').map((part) => part.trim());
      if (!attrName || !attrKey) {
        return;
      }
      const value = getTranslation(lang, attrKey);
      if (!value) {
        return;
      }
      const formatted = replacePlaceholders(value, vars);
      el.setAttribute(attrName, formatted);
    });
  }

  function applyElement(el, lang) {
    const key = el.dataset.i18n;
    const vars = parseVars(el);
    if (key) {
      const translation = getTranslation(lang, key);
      if (translation) {
        const formatted = replacePlaceholders(translation, vars);
        if (el.dataset.i18nHtml === 'true') {
          el.innerHTML = formatted;
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = formatted;
        } else {
          el.textContent = formatted;
        }
      }
    }
    applyAttributes(el, lang, vars);
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach((el) => applyElement(el, lang));
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      if (!el.dataset.i18n) {
        applyElement(el, lang);
      }
    });
  }

  const googleState = {
    loaded: false,
    loading: false,
    callbacks: []
  };

  function ensureGoogleTranslate(callback) {
    if (googleState.loaded) {
      callback();
      return;
    }
    googleState.callbacks.push(callback);
    if (googleState.loading) {
      return;
    }
    googleState.loading = true;
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=facodiGoogleTranslateInit';
    script.async = true;
    document.body.appendChild(script);
  }

  function triggerGoogleTranslate(lang) {
    ensureGoogleTranslate(() => {
      const attempt = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (!combo) {
          window.requestAnimationFrame(attempt);
          return;
        }
        if (combo.value !== lang) {
          combo.value = lang;
          combo.dispatchEvent(new Event('change'));
        }
      };
      attempt();
    });
  }

  function resetGoogleTranslate() {
    if (!googleState.loaded) {
      return;
    }
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) {
      return;
    }
    combo.value = '';
    combo.dispatchEvent(new Event('change'));
  }

  window.facodiGoogleTranslateInit = function () {
    googleState.loaded = true;
    googleState.loading = false;
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'pt',
          autoDisplay: false,
          includedLanguages: SUPPORTED_LANGS.filter((lang) => lang !== 'pt').join(',')
        },
        'facodi-google-translate'
      );
    }
    const callbacks = googleState.callbacks.slice();
    googleState.callbacks.length = 0;
    callbacks.forEach((cb) => cb());
  };

  function updateDocumentLanguage(lang) {
    const locale = LOCALE_MAP[lang] || lang;
    document.documentElement.setAttribute('lang', locale);
  }

  function applyLanguage(lang) {
    let nextLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    if (nextLang !== DEFAULT_LANG && !translations[nextLang]) {
      nextLang = DEFAULT_LANG;
    }
    localStorage.setItem('facodi-language', nextLang);
    applyTranslations(nextLang);
    updateDocumentLanguage(nextLang);
    if (nextLang === DEFAULT_LANG) {
      resetGoogleTranslate();
    } else {
      triggerGoogleTranslate(nextLang);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('[data-language-select]');
    const stored = localStorage.getItem('facodi-language');
    const initial = SUPPORTED_LANGS.includes(stored || '') ? stored : DEFAULT_LANG;
    if (select) {
      select.value = initial;
      select.addEventListener('change', (event) => {
        applyLanguage(event.target.value);
      });
    }
    applyLanguage(initial || DEFAULT_LANG);
  });
})();
