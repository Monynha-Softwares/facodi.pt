export const languages = ['pt', 'en', 'es', 'fr'] as const;

export type LanguageCode = (typeof languages)[number];

type SectionCopy = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    openGraphTitle: string;
    openGraphDescription: string;
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  footer: {
    rights: string;
    note: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    highlights: string[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    values: string[];
    valueDetails: string[];
  };
  projects: {
    title: string;
    description: string;
    featured: string[];
  };
  contact: {
    title: string;
    description: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    success: string;
  };
  notFound: {
    title: string;
    description: string;
    cta: string;
  };
};

export const siteCopy: Record<LanguageCode, SectionCopy> = {
  pt: {
    meta: {
      title: 'FACODI — Formação, Ação, Comunidade',
      description:
        'Monynha é o novo portal da FACODI para aproximar estudantes, docentes e iniciativas de tecnologia com impacto social.',
      keywords: ['FACODI', 'Monynha', 'formação', 'comunidade', 'tecnologia'],
      openGraphTitle: 'FACODI | Monynha',
      openGraphDescription:
        'Conheça a comunidade FACODI, explore projetos e faça parte da Monynha.',
    },
    navigation: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
    },
    footer: {
      rights: '© {year} FACODI. Todos os direitos reservados.',
      note: 'Feito com carinho por Monynha, abraçando a tecnologia de impacto.',
    },
    home: {
      hero: {
        eyebrow: 'Comunidade viva',
        title: 'Construindo tecnologia com afeto e propósito.',
        description:
          'Somos uma rede de pessoas curiosas, criativas e diversas que desenvolve experiências digitais para transformar realidades. Vem com a gente?',
        primaryCta: 'Explorar projetos',
        secondaryCta: 'Conhecer a FACODI',
      },
      highlights: [
        'Aprendizagem aberta e colaborativa',
        'Mentorias com profissionais da rede FACODI',
        'Programas e eventos para todas as pessoas',
      ],
    },
    about: {
      title: 'Sobre a FACODI',
      description:
        'FACODI é uma comunidade que integra ensino, pesquisa e impacto social. Com o projeto Monynha, damos vida a uma plataforma afetiva e acessível.',
      mission:
        'Acreditamos na potência da tecnologia para cuidar de pessoas e territórios. Incentivamos projetos inclusivos, sustentáveis e de código aberto.',
      values: [
        'Escuta ativa e co-criação com a comunidade',
        'Diversidade como motor de inovação',
        'Transparência, documentação e governança aberta',
      ],
      valueDetails: [
        'Observamos necessidades reais e adaptamos nossas trilhas continuamente.',
        'Criamos programas que acolhem múltiplas vozes e trajetórias.',
        'Compartilhamos processos para fortalecer redes colaborativas.',
      ],
    },
    projects: {
      title: 'Projetos em destaque',
      description:
        'Conheça iniciativas que nasceram na FACODI e estão conectando saberes, cultura e tecnologia.',
      featured: [
        'Observatório Digital de Direitos Humanos',
        'Residência Criativa em Tecnologias Abertas',
        'Plataforma Monynha para gestão comunitária',
      ],
    },
    contact: {
      title: 'Vamos conversar?',
      description:
        'Envie uma mensagem para colaborar, apoiar ou divulgar ações conjuntas. Responderemos o quanto antes.',
      name: 'Nome',
      email: 'E-mail',
      subject: 'Assunto',
      message: 'Mensagem',
      submit: 'Enviar mensagem',
      success: 'Mensagem enviada! Vamos retornar em breve.',
    },
    notFound: {
      title: 'Página não encontrada',
      description: 'Talvez a Monynha esteja reorganizando esta rota. Vamos voltar para o início?',
      cta: 'Voltar à página inicial',
    },
  },
  en: {
    meta: {
      title: 'FACODI — Learning, Action, Community',
      description:
        'Monynha is the new FACODI hub connecting students, mentors and social impact technology initiatives.',
      keywords: ['FACODI', 'Monynha', 'learning', 'community', 'technology'],
      openGraphTitle: 'FACODI | Monynha',
      openGraphDescription: 'Discover the FACODI community and explore projects with purpose.',
    },
    navigation: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    footer: {
      rights: '© {year} FACODI. All rights reserved.',
      note: 'Built with care by Monynha, shaping technology for people.',
    },
    home: {
      hero: {
        eyebrow: 'A living community',
        title: 'Crafting technology with affection and purpose.',
        description:
          'We are a network of curious, creative and diverse people who develop digital experiences to transform realities. Join us!',
        primaryCta: 'Browse projects',
        secondaryCta: 'Meet FACODI',
      },
      highlights: [
        'Open and collaborative learning journeys',
        'Mentorship with professionals from the FACODI network',
        'Programs and events designed for everyone',
      ],
    },
    about: {
      title: 'About FACODI',
      description:
        'FACODI is a community that connects education, research and social impact. Monynha embodies an affective and accessible platform.',
      mission:
        'We believe in the power of technology to care for people and territories. We foster inclusive, sustainable and open source projects.',
      values: [
        'Active listening and co-creation with the community',
        'Diversity as the driver for innovation',
        'Transparency, documentation and open governance',
      ],
      valueDetails: [
        'We prototype with community feedback and measure real outcomes.',
        'Our spaces welcome multiple identities and learning rhythms.',
        'Knowledge lives in the open so others can build on top.',
      ],
    },
    projects: {
      title: 'Featured projects',
      description: 'Initiatives born inside FACODI that connect knowledge, culture and technology.',
      featured: [
        'Digital Observatory for Human Rights',
        'Creative Residency on Open Technologies',
        'Monynha platform for community stewardship',
      ],
    },
    contact: {
      title: "Let's talk?",
      description:
        'Send us a message to collaborate, support or spread the word. We will reply as soon as possible.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send message',
      success: 'Message sent! We will get back to you shortly.',
    },
    notFound: {
      title: 'Page not found',
      description: 'Maybe Monynha is reorganising this route. Shall we go back to the home page?',
      cta: 'Return home',
    },
  },
  es: {
    meta: {
      title: 'FACODI — Aprendizaje, Acción y Comunidad',
      description:
        'Monynha es el nuevo portal de FACODI que conecta estudiantes, mentores e iniciativas tecnológicas con impacto social.',
      keywords: ['FACODI', 'Monynha', 'aprendizaje', 'comunidad', 'tecnología'],
      openGraphTitle: 'FACODI | Monynha',
      openGraphDescription: 'Descubre la comunidad FACODI y explora proyectos con propósito.',
    },
    navigation: {
      home: 'Inicio',
      about: 'Sobre',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    footer: {
      rights: '© {year} FACODI. Todos los derechos reservados.',
      note: 'Hecho con cariño por Monynha para cuidar de las personas.',
    },
    home: {
      hero: {
        eyebrow: 'Comunidad en movimiento',
        title: 'Tecnología con afecto y propósito.',
        description:
          'Somos una red de personas curiosas y diversas que crea experiencias digitales para transformar realidades. ¿Te sumas?',
        primaryCta: 'Ver proyectos',
        secondaryCta: 'Conocer FACODI',
      },
      highlights: [
        'Aprendizajes abiertos y colaborativos',
        'Mentorías con especialistas de la red FACODI',
        'Programas y eventos para todas las personas',
      ],
    },
    about: {
      title: 'Sobre FACODI',
      description:
        'FACODI integra educación, investigación e impacto social. Monynha materializa una plataforma afectiva y accesible.',
      mission:
        'Creemos en la tecnología como cuidado. Impulsamos proyectos inclusivos, sostenibles y de código abierto.',
      values: [
        'Escucha activa y co-creación con la comunidad',
        'Diversidad como motor de innovación',
        'Transparencia, documentación y gobernanza abierta',
      ],
      valueDetails: [
        'Escuchamos el territorio y rediseñamos las experiencias con quienes participan.',
        'Celebramos trayectorias plurales y cultivamos cuidados compartidos.',
        'Documentamos aprendizajes para que otras personas puedan replicarlos.',
      ],
    },
    projects: {
      title: 'Proyectos destacados',
      description: 'Iniciativas de FACODI que conectan saberes, cultura y tecnología.',
      featured: [
        'Observatorio Digital de Derechos Humanos',
        'Residencia Creativa en Tecnologías Abiertas',
        'Plataforma Monynha para gestión comunitaria',
      ],
    },
    contact: {
      title: '¿Conversamos?',
      description:
        'Escríbenos para colaborar, apoyar o difundir acciones conjuntas. Te responderemos pronto.',
      name: 'Nombre',
      email: 'Correo electrónico',
      subject: 'Asunto',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
      success: '¡Mensaje enviado! Responderemos muy pronto.',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'Puede que Monynha esté reorganizando esta ruta. ¿Volvemos al inicio?',
      cta: 'Regresar a inicio',
    },
  },
  fr: {
    meta: {
      title: 'FACODI — Apprentissage, Action et Communauté',
      description:
        'Monynha est le nouveau portail de FACODI qui relie étudiant·es, mentors et initiatives technologiques à impact social.',
      keywords: ['FACODI', 'Monynha', 'communauté', 'technologie', 'impact'],
      openGraphTitle: 'FACODI | Monynha',
      openGraphDescription: 'Découvrez la communauté FACODI et ses projets porteurs de sens.',
    },
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contact',
    },
    footer: {
      rights: '© {year} FACODI. Tous droits réservés.',
      note: 'Créé avec soin par Monynha pour mettre la technologie au service des personnes.',
    },
    home: {
      hero: {
        eyebrow: 'Une communauté vivante',
        title: 'Imaginer des technologies sensibles et utiles.',
        description:
          'Nous sommes un réseau de personnes curieuses et diverses qui conçoit des expériences numériques pour transformer nos réalités. Rejoignez-nous !',
        primaryCta: 'Découvrir les projets',
        secondaryCta: 'Rencontrer FACODI',
      },
      highlights: [
        'Parcours d’apprentissage ouverts et collaboratifs',
        'Mentorat avec des professionnel·les du réseau FACODI',
        'Programmes et événements pour toutes les personnes',
      ],
    },
    about: {
      title: 'À propos de FACODI',
      description:
        'FACODI relie éducation, recherche et impact social. Monynha incarne une plateforme affective et accessible.',
      mission:
        'Nous croyons au pouvoir du numérique pour prendre soin des personnes et des territoires. Nous soutenons des projets inclusifs, durables et open source.',
      values: [
        'Écoute active et co-création avec la communauté',
        'Diversité comme moteur d’innovation',
        'Transparence, documentation et gouvernance ouverte',
      ],
      valueDetails: [
        'Nous faisons évoluer les projets en dialogue permanent avec les participant·es.',
        'Nos parcours célèbrent les identités multiples et les différents rythmes d’apprentissage.',
        'Chaque ressource est publiée pour inspirer d’autres collectifs.',
      ],
    },
    projects: {
      title: 'Projets à la une',
      description: 'Des initiatives FACODI qui relient savoirs, culture et technologie.',
      featured: [
        'Observatoire numérique des droits humains',
        'Résidence créative en technologies ouvertes',
        'Plateforme Monynha pour la gestion communautaire',
      ],
    },
    contact: {
      title: 'On discute ?',
      description:
        'Écrivez-nous pour collaborer, soutenir ou partager des actions communes. Nous répondrons rapidement.',
      name: 'Nom',
      email: 'E-mail',
      subject: 'Sujet',
      message: 'Message',
      submit: 'Envoyer',
      success: 'Message envoyé ! Nous revenons vers vous très vite.',
    },
    notFound: {
      title: 'Page introuvable',
      description: 'Monynha réorganise peut-être cette page. On retourne à l’accueil ?',
      cta: 'Revenir à l’accueil',
    },
  },
};

export const defaultLanguage: LanguageCode = 'pt';
