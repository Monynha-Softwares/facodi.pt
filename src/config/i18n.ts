export type SiteLocale = 'pt' | 'en' | 'es' | 'fr';

export interface SiteNavigationLabels {
  home: string;
  courses: string;
  roadmap: string;
  contact: string;
  language: string;
  theme: string;
}

export interface SiteFooterLabels {
  mission: string;
  community: string;
  copyright: string;
}

export interface SiteMetaLabels {
  title: string;
  description: string;
  keywords: string;
}

export interface SiteLabels {
  title: string;
  description: string;
  tagline: string;
  heroCta: string;
  nav: SiteNavigationLabels;
  footer: SiteFooterLabels;
  meta: SiteMetaLabels;
}

export const defaultLocale: SiteLocale = 'pt';

export const siteText: Record<SiteLocale, SiteLabels> = {
  pt: {
    title: 'FACODI — Faculdade Comunitária Digital',
    description:
      'Trilhas superiores abertas com curadoria da Monynha. Aprenda no seu ritmo com conteúdos públicos, comunidades acolhedoras e acompanhamento transparente.',
    tagline: 'Ensino superior acessível, aberto e comunitário.',
    heroCta: 'Explorar trilhas',
    nav: {
      home: 'Início',
      courses: 'Cursos',
      roadmap: 'Roadmap',
      contact: 'Contato',
      language: 'Idioma',
      theme: 'Tema'
    },
    footer: {
      mission: 'Construído em comunidade para democratizar o acesso ao ensino superior.',
      community: 'Junte-se à comunidade',
      copyright: 'Monynha Softwares · FACODI © '
    },
    meta: {
      title: 'FACODI — Faculdade Comunitária Digital',
      description:
        'Cursos gratuitos, currículos vivos e playlists públicas organizadas para quem quer começar uma graduação em tecnologia.',
      keywords: 'educação aberta, cursos gratuitos, playlists, faculdade digital, monynha'
    }
  },
  en: {
    title: 'FACODI — Digital Community College',
    description:
      'Curated higher-education learning paths in Portuguese powered by public resources and community mentoring.',
    tagline: 'Accessible, joyful and community-driven higher education.',
    heroCta: 'Browse learning paths',
    nav: {
      home: 'Home',
      courses: 'Courses',
      roadmap: 'Roadmap',
      contact: 'Contact',
      language: 'Language',
      theme: 'Theme'
    },
    footer: {
      mission: 'Built by the Monynha collective to open-source higher education.',
      community: 'Join the community',
      copyright: 'Monynha Softwares · FACODI © '
    },
    meta: {
      title: 'FACODI — Digital Community College',
      description:
        'Free study tracks, curated playlists and a vibrant Portuguese-speaking community to help you start a tech degree.',
      keywords: 'open education, playlists, community college, monynha'
    }
  },
  es: {
    title: 'FACODI — Facultad Comunitaria Digital',
    description:
      'Planes de estudio superiores en portugués con contenidos públicos, mentoría y seguimiento sencillo.',
    tagline: 'Educación superior abierta con vibras comunitarias.',
    heroCta: 'Explorar recorridos',
    nav: {
      home: 'Inicio',
      courses: 'Cursos',
      roadmap: 'Hoja de ruta',
      contact: 'Contacto',
      language: 'Idioma',
      theme: 'Tema'
    },
    footer: {
      mission: 'Comunidad que abre las puertas de la universidad a más personas.',
      community: 'Únete a la comunidad',
      copyright: 'Monynha Softwares · FACODI © '
    },
    meta: {
      title: 'FACODI — Facultad Comunitaria Digital',
      description:
        'Currículos gratuitos y playlists públicas organizadas para iniciar una carrera tecnológica con apoyo colectivo.',
      keywords: 'educación abierta, playlists, comunidad, monynha'
    }
  },
  fr: {
    title: 'FACODI — Faculté Communautaire Digitale',
    description:
      'Parcours supérieurs en portugais avec contenus publics, mentorat communautaire et suivi transparent.',
    tagline: 'L’apprentissage supérieur ouvert, inclusif et communautaire.',
    heroCta: 'Découvrir les parcours',
    nav: {
      home: 'Accueil',
      courses: 'Cours',
      roadmap: 'Feuille de route',
      contact: 'Contact',
      language: 'Langue',
      theme: 'Thème'
    },
    footer: {
      mission: 'Une communauté qui ouvre les portes de l’université.',
      community: 'Rejoindre la communauté',
      copyright: 'Monynha Softwares · FACODI © '
    },
    meta: {
      title: 'FACODI — Faculté Communautaire Digitale',
      description:
        'Programmes gratuits, playlists organisées et mentorat collectif pour démarrer une carrière technologique.',
      keywords: 'éducation ouverte, playlists, communauté, monynha'
    }
  }
};

export const supportedLocales: SiteLocale[] = ['pt', 'en', 'es', 'fr'];

export function resolveSiteText(locale: SiteLocale = defaultLocale): SiteLabels {
  return siteText[locale] ?? siteText[defaultLocale];
}
