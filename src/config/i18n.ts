export type Locale = 'pt' | 'en' | 'es' | 'fr';

export type NavigationKey = 'home' | 'about' | 'projects' | 'contact';

export interface SiteMetadata {
  title: string;
  description: string;
}

export interface SiteCopy {
  site: {
    title: string;
    tagline: string;
    description: string;
  };
  navigation: Record<NavigationKey, string>;
  footer: {
    mission: string;
    rights: string;
    contactCta: string;
  };
  metadata: {
    home: SiteMetadata;
    about: SiteMetadata;
    projects: SiteMetadata;
    contact: SiteMetadata;
    notFound: SiteMetadata;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: Array<{ title: string; description: string }>;
  };
  about: {
    intro: string;
    mission: string;
    values: Array<{ title: string; description: string }>;
  };
  projects: {
    intro: string;
    cards: Array<{ title: string; description: string; linkLabel: string }>;
  };
  contact: {
    intro: string;
    success: string;
    error: string;
  };
}

export const defaultLocale: Locale = 'pt';

export const siteText: Record<Locale, SiteCopy> = {
  pt: {
    site: {
      title: 'FACODI',
      tagline: 'Educação comunitária, gratuita e aberta',
      description:
        'Portal EAD que transforma currículos oficiais em trilhas de estudo com curadoria comunitária e acesso público.',
    },
    navigation: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
    },
    footer: {
      mission:
        'O FACODI democratiza o acesso a currículos superiores com trilhas públicas, curadoria da comunidade e acompanhamento de progresso.',
      rights: 'Monynha Softwares · Todos os direitos reservados.',
      contactCta: 'Fale com a equipe Monynha Softwares',
    },
    metadata: {
      home: {
        title: 'FACODI · Trilhas abertas para aprender em comunidade',
        description:
          'Construa sua jornada acadêmica com conteúdos públicos organizados por cursos, disciplinas e tópicos e avance no seu ritmo.',
      },
      about: {
        title: 'Sobre o FACODI',
        description:
          'Conheça a visão da Monynha Softwares para democratizar currículos superiores com trilhas abertas e acessíveis.',
      },
      projects: {
        title: 'Projetos Monynha',
        description:
          'Produtos digitais que compartilham o mesmo DNA visual, técnico e comunitário do FACODI.',
      },
      contact: {
        title: 'Entre em contato',
        description: 'Envie uma mensagem para colaborar com o FACODI ou trazer novas parcerias.',
      },
      notFound: {
        title: 'Página não encontrada',
        description:
          'Ops, essa página fugiu pro quintal. Volte para a home e continue explorando trilhas.',
      },
    },
    home: {
      heroTitle: 'Curadoria pública para transformar currículos em trajetórias reais',
      heroSubtitle:
        'O FACODI conecta disciplinas oficiais a playlists públicas para que qualquer pessoa possa estudar, revisitar e acompanhar o progresso com autonomia.',
      primaryCta: 'Explorar trilhas',
      secondaryCta: 'Conhecer projetos',
      highlights: [
        {
          title: 'Cachorro caramelo mentor',
          description:
            'Nosso mascote orienta cada jornada com empatia e a vibração da Monynha Softwares.',
        },
        {
          title: 'Playlists abertas',
          description:
            'Integração com conteúdos gratuitos (YouTube, podcasts, artigos) organizados por tópicos.',
        },
        {
          title: 'Acompanhamento leve',
          description:
            'Visualize seu progresso e retome de onde parou, sem precisar criar contas complexas.',
        },
      ],
    },
    about: {
      intro:
        'O FACODI nasceu para aproximar currículos superiores das comunidades que constroem tecnologia em português.',
      mission:
        'Transformar currículos oficiais em trilhas acessíveis, vibrantes e com documentação clara para manter a consistência do ecossistema Monynha.',
      values: [
        {
          title: 'Acessibilidade radical',
          description:
            'Design acessível, contraste AA e experiência inclusiva com narrativas em múltiplos idiomas.',
        },
        {
          title: 'Comunidade ativa',
          description:
            'Curadoria coletiva, feedback contínuo e histórias que valorizam o mascote caramelo.',
        },
        {
          title: 'DX primeiro',
          description:
            'Automação, qualidade de código e documentação pronta para evoluir novos produtos Monynha.',
        },
      ],
    },
    projects: {
      intro:
        'Cada produto Monynha Softwares compartilha a mesma base visual e técnica para criar uma experiência coesa.',
      cards: [
        {
          title: 'Tech Blog Monynha',
          description:
            'Artigos, resumos e estudos guiados pelo nosso mascote caramelo sobre tecnologia e comunidade.',
          linkLabel: 'Ler o blog',
        },
        {
          title: 'Plataforma FACODI',
          description:
            'Portal EAD com trilhas curadas, playlists públicas e monitoramento de aprendizado.',
          linkLabel: 'Explorar FACODI',
        },
        {
          title: 'Monynha Docs',
          description:
            'Documentação compartilhada com tokens de design, componentes reutilizáveis e guias rápidos.',
          linkLabel: 'Abrir documentação',
        },
      ],
    },
    contact: {
      intro:
        'Mande uma mensagem para compartilhar feedbacks, parcerias ou histórias da comunidade caramelo.',
      success: 'Mensagem enviada! Retornaremos em breve com novidades da matilha Monynha.',
      error: 'Não conseguimos enviar agora. Tente novamente em instantes.',
    },
  },
  en: {
    site: {
      title: 'FACODI',
      tagline: 'Community-powered, free and open education',
      description:
        'An open learning portal that turns academic curricula into curated study paths fueled by public content.',
    },
    navigation: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    footer: {
      mission:
        'FACODI opens academic roadmaps with community curation, gentle progress tracking and accessible storytelling.',
      rights: 'Monynha Softwares · All rights reserved.',
      contactCta: 'Reach the Monynha Softwares crew',
    },
    metadata: {
      home: {
        title: 'FACODI · Open study paths for every learner',
        description:
          'Follow curated study tracks mapped from real curricula and powered by community selected public content.',
      },
      about: {
        title: 'About FACODI',
        description:
          'Understand how Monynha Softwares reimagines academic journeys with playful accessibility.',
      },
      projects: {
        title: 'Monynha Projects',
        description:
          'A family of products crafted with the same vibrant DX and inclusive design as FACODI.',
      },
      contact: {
        title: 'Get in touch',
        description: 'Send us a note to collaborate, sponsor a trail or share your learning story.',
      },
      notFound: {
        title: 'Page not found',
        description: 'This page ran to chase a stick. Let’s head back home and keep exploring.',
      },
    },
    home: {
      heroTitle: 'Curated public playlists to unlock academic journeys',
      heroSubtitle:
        'FACODI links official courses to community-picked resources so anyone can learn, revisit and track their progress.',
      primaryCta: 'Browse paths',
      secondaryCta: 'Discover projects',
      highlights: [
        {
          title: 'Caramel mentor',
          description: 'Our mascot guides every journey with warmth and Monynha’s vibrant tone.',
        },
        {
          title: 'Open playlists',
          description: 'YouTube, podcasts and articles organized by course, subject and topic.',
        },
        {
          title: 'Progress awareness',
          description: 'Lightweight check-ins to remember what you’ve covered without friction.',
        },
      ],
    },
    about: {
      intro:
        'FACODI was born to bring academic roadmaps closer to Portuguese-speaking communities.',
      mission:
        'Turn official curricula into joyful, accessible tracks with a shared Monynha documentation backbone.',
      values: [
        {
          title: 'Radical accessibility',
          description: 'AA contrast, semantic structure and narratives that welcome everyone.',
        },
        {
          title: 'Active community',
          description: 'Co-created curation with the caramel dog as storyteller and guardian.',
        },
        {
          title: 'DX-first mindset',
          description: 'Automations and reusable components that help every Monynha product grow.',
        },
      ],
    },
    projects: {
      intro: 'Every Monynha Softwares initiative shares the same vibrant toolkit for consistency.',
      cards: [
        {
          title: 'Monynha Tech Blog',
          description:
            'Articles and curated summaries guided by the caramel mentor about tech and community.',
          linkLabel: 'Read the blog',
        },
        {
          title: 'FACODI Platform',
          description: 'A curated study portal with open playlists and gentle progress tracking.',
          linkLabel: 'Explore FACODI',
        },
        {
          title: 'Monynha Docs',
          description:
            'Shared documentation with tokens, reusable components and quickstart guides.',
          linkLabel: 'View docs',
        },
      ],
    },
    contact: {
      intro: 'Drop a message to collaborate, support or share the community spirit.',
      success: 'Message received! The Monynha crew will get back soon.',
      error: 'We could not send it right now. Please try again shortly.',
    },
  },
  es: {
    site: {
      title: 'FACODI',
      tagline: 'Educación abierta impulsada por la comunidad',
      description:
        'Portal de aprendizaje que transforma planes oficiales en rutas de estudio con contenido público seleccionado.',
    },
    navigation: {
      home: 'Inicio',
      about: 'Acerca',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    footer: {
      mission:
        'FACODI abre recorridos académicos con curaduría colectiva y seguimiento sencillo del progreso.',
      rights: 'Monynha Softwares · Todos los derechos reservados.',
      contactCta: 'Habla con el equipo Monynha Softwares',
    },
    metadata: {
      home: {
        title: 'FACODI · Rutas de estudio abiertas',
        description:
          'Sigue caminos formativos mapeados a partir de planes reales y contenidos públicos elegidos por la comunidad.',
      },
      about: {
        title: 'Sobre FACODI',
        description:
          'Conoce la visión de Monynha Softwares para democratizar la educación superior.',
      },
      projects: {
        title: 'Proyectos Monynha',
        description: 'Una familia de productos con el mismo ADN vibrante, accesible y técnico.',
      },
      contact: {
        title: 'Ponte en contacto',
        description: 'Envíanos tu mensaje para colaborar o sumar nuevas alianzas.',
      },
      notFound: {
        title: 'Página no encontrada',
        description: 'Uy, esta página salió a pasear. Regresemos al inicio para seguir explorando.',
      },
    },
    home: {
      heroTitle: 'Playlists públicas para impulsar trayectorias académicas',
      heroSubtitle:
        'FACODI enlaza cursos oficiales con recursos gratuitos para aprender a tu ritmo y recordar tu progreso.',
      primaryCta: 'Explorar rutas',
      secondaryCta: 'Ver proyectos',
      highlights: [
        {
          title: 'Mentor caramelo',
          description: 'El perrito guía cada estudio con cariño y energía Monynha.',
        },
        {
          title: 'Contenido abierto',
          description: 'Videos, podcasts y artículos organizados por curso y temática.',
        },
        {
          title: 'Seguimiento sencillo',
          description: 'Registra avances sin fricción y retoma cuando quieras.',
        },
      ],
    },
    about: {
      intro: 'FACODI nació para acercar los planes universitarios a las comunidades latinas.',
      mission:
        'Convertir programas oficiales en rutas accesibles con documentación compartida del ecosistema Monynha.',
      values: [
        {
          title: 'Accesibilidad total',
          description: 'Contraste AA, semántica y experiencia pensada para todes.',
        },
        {
          title: 'Comunidad viva',
          description: 'Curaduría colectiva con el perrito caramelo como embajador.',
        },
        {
          title: 'DX como base',
          description: 'Automatizaciones y componentes reutilizables para crecer sostenidamente.',
        },
      ],
    },
    projects: {
      intro: 'Los productos Monynha comparten herramientas y lenguaje para mantener coherencia.',
      cards: [
        {
          title: 'Blog Tecnológico Monynha',
          description: 'Artículos guiados por el perrito sobre tecnología y comunidad.',
          linkLabel: 'Leer el blog',
        },
        {
          title: 'Plataforma FACODI',
          description: 'Portal con rutas curadas, playlists públicas y seguimiento amigable.',
          linkLabel: 'Explorar FACODI',
        },
        {
          title: 'Monynha Docs',
          description: 'Documentación compartida con tokens de diseño y guías rápidas.',
          linkLabel: 'Abrir docs',
        },
      ],
    },
    contact: {
      intro: 'Comparte tus ideas, alianzas o historias de aprendizaje con la comunidad caramelo.',
      success: '¡Mensaje enviado! Pronto responderemos con novedades.',
      error: 'No pudimos enviarlo ahora. Intenta de nuevo en unos minutos.',
    },
  },
  fr: {
    site: {
      title: 'FACODI',
      tagline: 'Éducation libre portée par la communauté',
      description:
        'Portail d’apprentissage qui transforme les programmes officiels en parcours guidés par du contenu public.',
    },
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contact',
    },
    footer: {
      mission:
        'FACODI ouvre des parcours universitaires avec une curation collective et un suivi de progression tout en douceur.',
      rights: 'Monynha Softwares · Tous droits réservés.',
      contactCta: 'Parlez avec l’équipe Monynha Softwares',
    },
    metadata: {
      home: {
        title: 'FACODI · Parcours d’étude ouverts',
        description:
          'Suivez des parcours issus de programmes réels, nourris de ressources publiques choisies par la communauté.',
      },
      about: {
        title: 'À propos de FACODI',
        description:
          'Découvrez la vision de Monynha Softwares pour démocratiser les études supérieures.',
      },
      projects: {
        title: 'Projets Monynha',
        description: 'Des produits alignés sur le même design vibrant, accessible et cohérent.',
      },
      contact: {
        title: 'Entrer en contact',
        description: 'Envoyez-nous un message pour collaborer ou imaginer un nouveau partenariat.',
      },
      notFound: {
        title: 'Page introuvable',
        description: 'Oups, cette page est partie jouer. Revenons à l’accueil pour poursuivre.',
      },
    },
    home: {
      heroTitle: 'Playlists publiques pour révéler chaque parcours académique',
      heroSubtitle:
        'FACODI relie les cours officiels à des ressources gratuites afin que chacun apprenne à son rythme.',
      primaryCta: 'Explorer les parcours',
      secondaryCta: 'Voir les projets',
      highlights: [
        {
          title: 'Mentor caramel',
          description: 'Notre mascotte accompagne chaque étape avec énergie et bienveillance.',
        },
        {
          title: 'Ressources ouvertes',
          description: 'Vidéos, podcasts et articles organisés par cours et thématique.',
        },
        {
          title: 'Suivi léger',
          description: 'Retrouvez vos avancées facilement et continuez quand vous voulez.',
        },
      ],
    },
    about: {
      intro: 'FACODI rapproche les programmes universitaires des communautés francophones.',
      mission:
        'Transformer les programmes officiels en parcours accessibles avec la documentation partagée Monynha.',
      values: [
        {
          title: 'Accessibilité prioritaire',
          description: 'Structure sémantique, contraste AA et expérience inclusive.',
        },
        {
          title: 'Communauté engagée',
          description: 'Curation collective et storytelling avec le chien caramel.',
        },
        {
          title: 'Expérience développeur',
          description:
            'Automatisations et composants réutilisables pour faire grandir l’écosystème.',
        },
      ],
    },
    projects: {
      intro: 'Toute la galaxie Monynha partage un socle technique et visuel commun.',
      cards: [
        {
          title: 'Blog Tech Monynha',
          description:
            'Articles et résumés guidés par la mascotte caramel autour de la tech et des communautés.',
          linkLabel: 'Lire le blog',
        },
        {
          title: 'Plateforme FACODI',
          description: 'Portail d’étude avec playlists ouvertes et suivi amical du progrès.',
          linkLabel: 'Explorer FACODI',
        },
        {
          title: 'Monynha Docs',
          description: 'Documentation mutualisée avec tokens de design et guides express.',
          linkLabel: 'Consulter la doc',
        },
      ],
    },
    contact: {
      intro: 'Écrivez-nous pour collaborer, soutenir ou raconter votre parcours.',
      success: 'Message bien reçu ! L’équipe Monynha revient rapidement.',
      error: 'Impossible d’envoyer maintenant. Réessayez dans quelques instants.',
    },
  },
};
