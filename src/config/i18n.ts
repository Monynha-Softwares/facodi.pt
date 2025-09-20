export type SiteLocale = 'pt' | 'en' | 'es' | 'fr';

type NavigationKeys = 'home' | 'courses' | 'about' | 'contact';

type SiteCopy = {
    locale: SiteLocale;
    localeName: string;
    meta: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
    };
    navigation: Record<NavigationKeys, string>;
    footer: {
        mission: string;
        newsletterTitle: string;
        newsletterDescription: string;
        legal: string;
    };
};

export const defaultLocale: SiteLocale = 'pt';

export const siteCopy: Record<SiteLocale, SiteCopy> = {
    pt: {
        locale: 'pt',
        localeName: 'Português',
        meta: {
            title: 'FACODI — Faculdade Comunitária Digital',
            description: 'Portal educacional gratuito com trilhas universitárias curadas e conteúdos públicos acessíveis.',
            ogTitle: 'FACODI — Educação aberta e colaborativa',
            ogDescription: 'Construa seu percurso superior com playlists, tópicos e materiais selecionados pela comunidade Monynha.'
        },
        navigation: {
            home: 'Início',
            courses: 'Cursos',
            about: 'Sobre',
            contact: 'Contato'
        },
        footer: {
            mission: 'FACODI organiza trilhas superiores com conteúdo aberto para tornar o ensino acessível a todas as pessoas.',
            newsletterTitle: 'Receba novidades',
            newsletterDescription: 'Atualizações sobre novas trilhas, playlists e eventos comunitários.',
            legal: 'FACODI é um projeto aberto criado por Monynha Softwares.'
        }
    },
    en: {
        locale: 'en',
        localeName: 'English',
        meta: {
            title: 'FACODI — Digital Community College',
            description: 'Free learning portal offering curated higher-ed study paths using public and open content.',
            ogTitle: 'FACODI — Open and community-driven education',
            ogDescription: 'Design your academic path with playlists, topics, and curated resources from the Monynha community.'
        },
        navigation: {
            home: 'Home',
            courses: 'Courses',
            about: 'About',
            contact: 'Contact'
        },
        footer: {
            mission: 'FACODI curates open higher education resources so everyone can pursue university-level learning.',
            newsletterTitle: 'Stay in the loop',
            newsletterDescription: 'Updates on new study tracks, playlists, and community events.',
            legal: 'FACODI is an open project crafted by Monynha Softwares.'
        }
    },
    es: {
        locale: 'es',
        localeName: 'Español',
        meta: {
            title: 'FACODI — Facultad Comunitaria Digital',
            description: 'Portal educativo gratuito con rutas universitarias seleccionadas y contenido público accesible.',
            ogTitle: 'FACODI — Educación abierta y comunitaria',
            ogDescription: 'Diseña tu camino universitario con playlists, temas y materiales curados por la comunidad Monynha.'
        },
        navigation: {
            home: 'Inicio',
            courses: 'Cursos',
            about: 'Sobre',
            contact: 'Contacto'
        },
        footer: {
            mission: 'FACODI organiza rutas superiores con contenido abierto para que el aprendizaje sea accesible a todas las personas.',
            newsletterTitle: 'Recibe novedades',
            newsletterDescription: 'Actualizaciones sobre nuevas rutas, playlists y eventos de la comunidad.',
            legal: 'FACODI es un proyecto abierto creado por Monynha Softwares.'
        }
    },
    fr: {
        locale: 'fr',
        localeName: 'Français',
        meta: {
            title: 'FACODI — Faculté Communautaire Numérique',
            description: 'Plateforme éducative gratuite avec des parcours universitaires organisés et du contenu public accessible.',
            ogTitle: 'FACODI — Éducation ouverte et collective',
            ogDescription: 'Construisez votre parcours universitaire avec des playlists, des sujets et des ressources sélectionnées par la communauté Monynha.'
        },
        navigation: {
            home: 'Accueil',
            courses: 'Cours',
            about: 'À propos',
            contact: 'Contact'
        },
        footer: {
            mission: "FACODI organise des parcours supérieurs avec du contenu libre pour rendre l'enseignement accessible à toutes et tous.",
            newsletterTitle: 'Recevoir les nouveautés',
            newsletterDescription: 'Mises à jour sur les nouveaux parcours, playlists et événements de la communauté.',
            legal: 'FACODI est un projet ouvert créé par Monynha Softwares.'
        }
    }
};

export const supportedLocales: SiteLocale[] = Object.keys(siteCopy) as SiteLocale[];

export const getSiteCopy = (locale: SiteLocale = defaultLocale): SiteCopy => siteCopy[locale];
