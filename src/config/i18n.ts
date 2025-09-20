export type SiteLanguage = 'pt' | 'en' | 'es' | 'fr';

export type MetadataKey = 'home' | 'about' | 'projects' | 'contact' | 'notFound';

export type InterfaceCopy = {
  site: {
    title: string;
    description: string;
    tagline: string;
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    menu: string;
    language: string;
    themeToggle: string;
  };
  footer: {
    mission: string;
    rights: string;
    community: string;
  };
  metadata: Record<MetadataKey, { title: string; description: string }> & {
    defaultTitle: string;
    defaultDescription: string;
  };
  forms: {
    contact: {
      title: string;
      description: string;
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      submit: string;
      success: string;
      error: string;
    };
  };
};

export const defaultLanguage: SiteLanguage = 'pt';

export const supportedLanguages: SiteLanguage[] = ['pt', 'en', 'es', 'fr'];

export const siteTexts: Record<SiteLanguage, InterfaceCopy> = {
  pt: {
    site: {
      title: 'FACODI',
      description: 'Portal comunitário de tecnologia e inovação educacional da FACODI.',
      tagline: 'Educação comunitária, gratuita e aberta.'
    },
    navigation: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
      menu: 'Menu principal',
      language: 'Idioma',
      themeToggle: 'Alternar tema'
    },
    footer: {
      mission: 'Construindo experiências de aprendizagem inclusivas com tecnologia aberta.',
      rights: 'Todos os direitos reservados.',
      community: 'Comunidade FACODI'
    },
    metadata: {
      defaultTitle: 'FACODI — Educação comunitária em tecnologia',
      defaultDescription:
        'Iniciativas, projetos e experiências abertas que conectam pessoas ao futuro da tecnologia.',
      home: {
        title: 'FACODI — Portal comunitário',
        description: 'Conheça iniciativas, projetos e oportunidades da comunidade FACODI.'
      },
      about: {
        title: 'Sobre a FACODI',
        description: 'Nossa missão, valores e princípios para uma educação tecnológica aberta.'
      },
      projects: {
        title: 'Projetos em destaque',
        description: 'Projetos colaborativos, experimentos e tecnologias comunitárias FACODI.'
      },
      contact: {
        title: 'Fale com a FACODI',
        description: 'Envie uma mensagem para cocriar ações educativas com a comunidade.'
      },
      notFound: {
        title: 'Página não encontrada',
        description: 'O cachorro caramelo não encontrou a página que você procurava.'
      }
    },
    forms: {
      contact: {
        title: 'Converse com a gente',
        description:
          'Envie uma mensagem e retornaremos com recursos, calendários e oportunidades de participação.',
        nameLabel: 'Nome completo',
        emailLabel: 'E-mail',
        messageLabel: 'Mensagem',
        submit: 'Enviar mensagem',
        success: 'Recebemos sua mensagem! Responderemos em breve.',
        error: 'Ocorreu um erro ao enviar. Tente novamente.'
      }
    }
  },
  en: {
    site: {
      title: 'FACODI',
      description: 'Community portal for educational technology and open innovation.',
      tagline: 'Community-powered, free and open learning.'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Main navigation',
      language: 'Language',
      themeToggle: 'Toggle theme'
    },
    footer: {
      mission: 'Building inclusive learning experiences with open technology.',
      rights: 'All rights reserved.',
      community: 'FACODI Community'
    },
    metadata: {
      defaultTitle: 'FACODI — Community education in technology',
      defaultDescription:
        'Initiatives, projects and open experiences that connect people to the future of technology.',
      home: {
        title: 'FACODI — Community portal',
        description: 'Discover initiatives, projects and opportunities from the FACODI community.'
      },
      about: {
        title: 'About FACODI',
        description: 'Our mission, values and principles to open up technology education.'
      },
      projects: {
        title: 'Highlighted projects',
        description: 'Collaborative experiments and community-driven technologies from FACODI.'
      },
      contact: {
        title: 'Talk to FACODI',
        description: 'Send a message to co-create educational actions with the community.'
      },
      notFound: {
        title: 'Page not found',
        description: 'Our caramel dog could not find the page you were searching for.'
      }
    },
    forms: {
      contact: {
        title: 'Let’s talk',
        description:
          'Share your message and we will answer with resources, timelines and ways to participate.',
        nameLabel: 'Full name',
        emailLabel: 'Email',
        messageLabel: 'Message',
        submit: 'Send message',
        success: 'We received your message! We will answer soon.',
        error: 'Something went wrong. Please try again.'
      }
    }
  },
  es: {
    site: {
      title: 'FACODI',
      description: 'Portal comunitario de tecnología educativa e innovación abierta.',
      tagline: 'Aprendizaje comunitario, gratuito y abierto.'
    },
    navigation: {
      home: 'Inicio',
      about: 'Sobre',
      projects: 'Proyectos',
      contact: 'Contacto',
      menu: 'Menú principal',
      language: 'Idioma',
      themeToggle: 'Cambiar tema'
    },
    footer: {
      mission: 'Construyendo experiencias de aprendizaje inclusivas con tecnología abierta.',
      rights: 'Todos los derechos reservados.',
      community: 'Comunidad FACODI'
    },
    metadata: {
      defaultTitle: 'FACODI — Educación comunitaria en tecnología',
      defaultDescription:
        'Iniciativas, proyectos y experiencias abiertas que conectan a las personas con el futuro de la tecnología.',
      home: {
        title: 'FACODI — Portal comunitario',
        description: 'Conoce iniciativas, proyectos y oportunidades de la comunidad FACODI.'
      },
      about: {
        title: 'Sobre FACODI',
        description: 'Nuestra misión, valores y principios para abrir la educación tecnológica.'
      },
      projects: {
        title: 'Proyectos destacados',
        description: 'Proyectos colaborativos y tecnologías comunitarias de FACODI.'
      },
      contact: {
        title: 'Habla con FACODI',
        description: 'Envía un mensaje para cocrear acciones educativas con la comunidad.'
      },
      notFound: {
        title: 'Página no encontrada',
        description: 'Nuestro perro caramelo no encontró la página que buscabas.'
      }
    },
    forms: {
      contact: {
        title: 'Conversemos',
        description:
          'Envíanos tu mensaje y responderemos con recursos, calendarios y oportunidades para participar.',
        nameLabel: 'Nombre completo',
        emailLabel: 'Correo electrónico',
        messageLabel: 'Mensaje',
        submit: 'Enviar mensaje',
        success: '¡Recibimos tu mensaje! Responderemos pronto.',
        error: 'Ocurrió un error. Intenta nuevamente.'
      }
    }
  },
  fr: {
    site: {
      title: 'FACODI',
      description: 'Portail communautaire pour la technologie éducative et l’innovation ouverte.',
      tagline: "Apprentissage communautaire, libre et ouvert."
    },
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contact',
      menu: 'Menu principal',
      language: 'Langue',
      themeToggle: 'Changer de thème'
    },
    footer: {
      mission: 'Construire des expériences d’apprentissage inclusives avec des technologies ouvertes.',
      rights: 'Tous droits réservés.',
      community: 'Communauté FACODI'
    },
    metadata: {
      defaultTitle: 'FACODI — Éducation communautaire en technologie',
      defaultDescription:
        "Initiatives, projets et expériences ouvertes qui connectent les personnes à l’avenir de la technologie.",
      home: {
        title: 'FACODI — Portail communautaire',
        description: 'Découvrez les initiatives, projets et opportunités de la communauté FACODI.'
      },
      about: {
        title: 'À propos de FACODI',
        description: 'Notre mission, nos valeurs et nos principes pour ouvrir l’éducation technologique.'
      },
      projects: {
        title: 'Projets à la une',
        description: 'Projets collaboratifs et technologies communautaires de FACODI.'
      },
      contact: {
        title: 'Parlez à FACODI',
        description: 'Envoyez un message pour co-créer des actions éducatives avec la communauté.'
      },
      notFound: {
        title: 'Page introuvable',
        description: "Notre chien caramel n’a pas trouvé la page recherchée."
      }
    },
    forms: {
      contact: {
        title: 'Discutons',
        description:
          'Envoyez-nous votre message et nous répondrons avec des ressources, des calendriers et des opportunités de participation.',
        nameLabel: 'Nom complet',
        emailLabel: 'E-mail',
        messageLabel: 'Message',
        submit: 'Envoyer le message',
        success: 'Nous avons reçu votre message ! Nous répondrons bientôt.',
        error: "Une erreur s'est produite. Veuillez réessayer."
      }
    }
  }
};

export const getMetadata = (language: SiteLanguage, key: MetadataKey) => {
  const copy = siteTexts[language];
  return copy.metadata[key];
};
