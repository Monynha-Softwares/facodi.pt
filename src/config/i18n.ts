export type Locale = 'pt' | 'en' | 'es' | 'fr'

export const defaultLocale: Locale = 'pt'

export const locales: Locale[] = ['pt', 'en', 'es', 'fr']

export type RouteKey = 'home' | 'about' | 'projects' | 'contact' | 'notFound'

type PageMetaKey = 'home' | 'about' | 'projects' | 'contact'

type LocaleMessages = {
  siteTitle: string
  siteDescription: string
  navigation: Record<RouteKey, string>
  footer: {
    rights: string
  }
  metadata: Record<PageMetaKey, { title: string; description: string }>
}

export const messages: Record<Locale, LocaleMessages> = {
  pt: {
    siteTitle: 'FACODI — Faculdade de Codificação Digital',
    siteDescription:
      'Faculdade de tecnologia aberta com foco em experiências digitais inclusivas e acessíveis.',
    navigation: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
      notFound: 'Página não encontrada'
    },
    footer: {
      rights: '© 2024 FACODI. Todos os direitos reservados.'
    },
    metadata: {
      home: {
        title: 'FACODI — Experiências digitais inclusivas',
        description:
          'Conheça a FACODI, iniciativas tecnológicas colaborativas e projetos focados em impacto social.'
      },
      about: {
        title: 'Sobre a FACODI',
        description:
          'Saiba mais sobre o propósito, valores e a equipe que constrói a Faculdade de Codificação Digital.'
      },
      projects: {
        title: 'Projetos FACODI',
        description:
          'Exploramos soluções digitais em código aberto para educação, inclusão e inovação social.'
      },
      contact: {
        title: 'Contato FACODI',
        description:
          'Fale com a FACODI, envie sugestões e participe da construção de experiências digitais acessíveis.'
      }
    }
  },
  en: {
    siteTitle: 'FACODI — Digital Coding College',
    siteDescription:
      'Open technology college focused on inclusive and accessible digital experiences.',
    navigation: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      notFound: 'Page not found'
    },
    footer: {
      rights: '© 2024 FACODI. All rights reserved.'
    },
    metadata: {
      home: {
        title: 'FACODI — Inclusive digital experiences',
        description:
          'Discover FACODI, collaborative technology initiatives and projects focused on social impact.'
      },
      about: {
        title: 'About FACODI',
        description:
          'Learn more about the purpose, values and the team behind the Digital Coding College.'
      },
      projects: {
        title: 'FACODI Projects',
        description:
          'We explore open-source digital solutions for education, inclusion and social innovation.'
      },
      contact: {
        title: 'Contact FACODI',
        description:
          'Get in touch with FACODI, send suggestions and join the build of accessible digital experiences.'
      }
    }
  },
  es: {
    siteTitle: 'FACODI — Facultad de Codificación Digital',
    siteDescription:
      'Facultad de tecnología abierta enfocada en experiencias digitales inclusivas y accesibles.',
    navigation: {
      home: 'Inicio',
      about: 'Sobre',
      projects: 'Proyectos',
      contact: 'Contacto',
      notFound: 'Página no encontrada'
    },
    footer: {
      rights: '© 2024 FACODI. Todos los derechos reservados.'
    },
    metadata: {
      home: {
        title: 'FACODI — Experiencias digitales inclusivas',
        description:
          'Conoce FACODI, iniciativas tecnológicas colaborativas y proyectos centrados en el impacto social.'
      },
      about: {
        title: 'Sobre FACODI',
        description:
          'Descubre el propósito, los valores y el equipo que impulsa la Facultad de Codificación Digital.'
      },
      projects: {
        title: 'Proyectos FACODI',
        description:
          'Exploramos soluciones digitales de código abierto para educación, inclusión e innovación social.'
      },
      contact: {
        title: 'Contacto FACODI',
        description:
          'Comunícate con FACODI, envía sugerencias y participa en experiencias digitales accesibles.'
      }
    }
  },
  fr: {
    siteTitle: 'FACODI — Faculté de Codage Numérique',
    siteDescription:
      'Faculté de technologie ouverte dédiée à des expériences numériques inclusives et accessibles.',
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contact',
      notFound: 'Page introuvable'
    },
    footer: {
      rights: '© 2024 FACODI. Tous droits réservés.'
    },
    metadata: {
      home: {
        title: 'FACODI — Expériences numériques inclusives',
        description:
          'Découvrez FACODI, initiatives technologiques collaboratives et projets à impact social.'
      },
      about: {
        title: 'À propos de FACODI',
        description:
          'En savoir plus sur la mission, les valeurs et l’équipe qui construit la Faculté de Codage Numérique.'
      },
      projects: {
        title: 'Projets FACODI',
        description:
          'Nous explorons des solutions numériques open source pour l’éducation, l’inclusion et l’innovation sociale.'
      },
      contact: {
        title: 'Contact FACODI',
        description:
          'Contactez FACODI, envoyez des suggestions et participez à la création d’expériences numériques accessibles.'
      }
    }
  }
}

export const buildPageMetadata = (locale: Locale, page: PageMetaKey) => {
  const language = locales.includes(locale) ? locale : defaultLocale
  return messages[language].metadata[page]
}
