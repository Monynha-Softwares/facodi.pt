export type Locale = 'pt' | 'en' | 'es' | 'fr';

export const defaultLocale: Locale = 'pt';

export type SiteCopy = {
  meta: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  footer: {
    title: string;
    description: string;
    rights: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contact: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    success: string;
    error: string;
  };
  projects: {
    title: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  pt: {
    meta: {
      title: 'FACODI — Faculdade Comunitária Digital',
      description:
        'Portal EAD gratuito que transforma currículos oficiais em trilhas de estudo organizadas por cursos, unidades curriculares e tópicos.'
    },
    navigation: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato'
    },
    footer: {
      title: 'FACODI',
      description: 'Trilhas gratuitas baseadas em currículos oficiais para democratizar o ensino superior.',
      rights: 'Monynha Softwares — todos os direitos reservados.'
    },
    hero: {
      title: 'Aprenda com trilhas guiadas pelo currículo oficial',
      subtitle:
        'Transformamos planos de curso em jornadas baseadas em conteúdo público para acelerar o acesso ao ensino superior.',
      ctaPrimary: 'Explorar cursos',
      ctaSecondary: 'Conhecer a Monynha'
    },
    contact: {
      title: 'Fale com a equipe FACODI',
      description: 'Envie sugestões, parcerias ou feedback. Retornamos em até 2 dias úteis.',
      nameLabel: 'Nome',
      emailLabel: 'E-mail',
      messageLabel: 'Mensagem',
      submitLabel: 'Enviar mensagem',
      success: 'Mensagem enviada com sucesso!',
      error: 'Verifique os campos obrigatórios.'
    },
    projects: {
      title: 'Ecosistema Monynha Softwares',
      description:
        'Conheça os produtos e iniciativas que compartilham o mesmo padrão técnico e visual vibrante.'
    },
    about: {
      title: 'Sobre o FACODI',
      description:
        'O FACODI é um portal EAD gratuito que usa conteúdo aberto para criar trilhas inspiradas em currículos acadêmicos.',
      mission:
        'Missão: democratizar o acesso à educação superior com curadoria pública e acompanhamento acessível.',
      vision:
        'Visão: construir uma rede de aprendizagem comunitária vibrante e confiável em toda a lusofonia.'
    }
  },
  en: {
    meta: {
      title: 'FACODI — Community Digital College',
      description:
        'Open-source learning portal that turns official curricula into guided study tracks organized by courses and topics.'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    },
    footer: {
      title: 'FACODI',
      description: 'Open academic roadmaps that make higher education accessible to every learner.',
      rights: 'Monynha Softwares — all rights reserved.'
    },
    hero: {
      title: 'Study with official curriculum guidance',
      subtitle:
        'We transform course syllabi into curated journeys using public content so anyone can learn at their own pace.',
      ctaPrimary: 'Browse courses',
      ctaSecondary: 'Meet Monynha'
    },
    contact: {
      title: 'Talk with the FACODI team',
      description: 'Send suggestions or feedback and we will reply within two business days.',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      submitLabel: 'Send message',
      success: 'Message sent successfully!',
      error: 'Please review the required fields.'
    },
    projects: {
      title: 'Monynha Softwares ecosystem',
      description: 'Discover products and initiatives that share the same vibrant Monynha foundation.'
    },
    about: {
      title: 'About FACODI',
      description:
        'FACODI is a free learning portal that leverages open content to mirror official higher education curricula.',
      mission: 'Mission: democratize higher education with curated public content and lightweight progress tracking.',
      vision: 'Vision: build a vibrant, reliable learning network for Portuguese-speaking communities.'
    }
  },
  es: {
    meta: {
      title: 'FACODI — Facultad Comunitaria Digital',
      description:
        'Portal educativo abierto que convierte planes oficiales en rutas de estudio guiadas por cursos y temas.'
    },
    navigation: {
      home: 'Inicio',
      about: 'Sobre',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    footer: {
      title: 'FACODI',
      description:
        'Rutas académicas abiertas que facilitan el acceso a la educación superior para cualquier persona.',
      rights: 'Monynha Softwares — todos los derechos reservados.'
    },
    hero: {
      title: 'Aprende con guías basadas en planes oficiales',
      subtitle:
        'Convertimos programas académicos en jornadas curadas usando contenido público para acelerar tu aprendizaje.',
      ctaPrimary: 'Explorar cursos',
      ctaSecondary: 'Conoce Monynha'
    },
    contact: {
      title: 'Habla con el equipo FACODI',
      description: 'Envíanos comentarios o alianzas. Respondemos en un máximo de dos días hábiles.',
      nameLabel: 'Nombre',
      emailLabel: 'Correo electrónico',
      messageLabel: 'Mensaje',
      submitLabel: 'Enviar mensaje',
      success: '¡Mensaje enviado con éxito!',
      error: 'Revisa los campos obligatorios.'
    },
    projects: {
      title: 'Ecosistema Monynha Softwares',
      description: 'Descubre productos y contenidos que comparten la misma base vibrante de Monynha.'
    },
    about: {
      title: 'Sobre FACODI',
      description:
        'FACODI es un portal gratuito que aprovecha contenido abierto para reflejar los currículos oficiales.',
      mission:
        'Misión: democratizar el acceso a la educación superior con contenido público organizado y seguimiento ligero.',
      vision:
        'Visión: construir una red de aprendizaje confiable para comunidades hispanohablantes.'
    }
  },
  fr: {
    meta: {
      title: 'FACODI — Faculté Communautaire Digitale',
      description:
        'Portail d’apprentissage libre qui transforme les programmes officiels en parcours guidés par cours et sujets.'
    },
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contact'
    },
    footer: {
      title: 'FACODI',
      description:
        'Parcours académiques ouverts pour rendre l’enseignement supérieur accessible à toutes et tous.',
      rights: 'Monynha Softwares — tous droits réservés.'
    },
    hero: {
      title: 'Apprenez avec des parcours guidés par le programme officiel',
      subtitle:
        'Nous transformons les plans de cours en parcours sélectionnés à partir de contenu public pour accélérer votre apprentissage.',
      ctaPrimary: 'Explorer les cours',
      ctaSecondary: 'Découvrir Monynha'
    },
    contact: {
      title: 'Parlez avec l’équipe FACODI',
      description: 'Envoyez vos retours ou partenariats. Réponse sous deux jours ouvrés.',
      nameLabel: 'Nom',
      emailLabel: 'E-mail',
      messageLabel: 'Message',
      submitLabel: 'Envoyer le message',
      success: 'Message envoyé avec succès !',
      error: 'Merci de vérifier les champs obligatoires.'
    },
    projects: {
      title: 'Écosystème Monynha Softwares',
      description: 'Découvrez les produits et initiatives qui partagent la même base vibrante Monynha.'
    },
    about: {
      title: 'À propos de FACODI',
      description:
        'FACODI est un portail gratuit qui exploite du contenu ouvert pour refléter les programmes d’études officiels.',
      mission:
        'Mission : démocratiser l’accès à l’enseignement supérieur avec du contenu public organisé et un suivi simple.',
      vision:
        'Vision : construire un réseau d’apprentissage dynamique et fiable pour les communautés francophones.'
    }
  }
};
