import type { Locale } from "./locales";

type MessageKeys =
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta"
  | "courses.title"
  | "courses.empty"
  | "nav.courses"
  | "nav.about"
  | "nav.community"
  | "about.description"
  | "about.community.title"
  | "about.community.body"
  | "about.accessibility.title"
  | "about.accessibility.body";

const dictionary: Record<Locale, Record<MessageKeys, string>> = {
  pt: {
    "hero.title": "Faculdade Comunitária Digital",
    "hero.subtitle":
      "Aprenda tecnologia com materiais feitos por educadoras voluntárias da comunidade Monynha.",
    "hero.cta": "Explorar cursos",
    "courses.title": "Cursos em destaque",
    "courses.empty": "Novos cursos estão chegando em breve!",
    "nav.courses": "Cursos",
    "nav.about": "Sobre",
    "nav.community": "Comunidade",
    "about.description":
      "A FACODI é uma iniciativa da comunidade Monynha para democratizar o acesso à educação tecnológica em língua portuguesa.",
    "about.community.title": "Comunidade aberta",
    "about.community.body":
      "Produzimos cursos gratuitos com o apoio de voluntárias e parceiros que acreditam em conhecimento aberto.",
    "about.accessibility.title": "Metodologia acessível",
    "about.accessibility.body":
      "Os materiais seguem o design system Monynha, garantindo inclusão, contraste e linguagem clara para todas as pessoas.",
  },
  en: {
    "hero.title": "Community Digital College",
    "hero.subtitle":
      "Learn technology with resources created by Monynha community volunteers.",
    "hero.cta": "Browse courses",
    "courses.title": "Featured courses",
    "courses.empty": "New courses are on the way!",
    "nav.courses": "Courses",
    "nav.about": "About",
    "nav.community": "Community",
    "about.description":
      "FACODI is a Monynha community initiative to democratise access to technology education in Portuguese.",
    "about.community.title": "Open community",
    "about.community.body":
      "We publish free courses thanks to volunteers and partners who believe in open knowledge.",
    "about.accessibility.title": "Accessible methodology",
    "about.accessibility.body":
      "Materials follow Monynha's design system to ensure inclusion, contrast and plain language for everyone.",
  },
  es: {
    "hero.title": "Facultad Comunitaria Digital",
    "hero.subtitle":
      "Aprende tecnología con recursos creados por voluntarias de la comunidad Monynha.",
    "hero.cta": "Explorar cursos",
    "courses.title": "Cursos destacados",
    "courses.empty": "¡Nuevos cursos llegan pronto!",
    "nav.courses": "Cursos",
    "nav.about": "Acerca de",
    "nav.community": "Comunidad",
    "about.description":
      "FACODI es una iniciativa de la comunidad Monynha para democratizar el acceso a la educación tecnológica en portugués.",
    "about.community.title": "Comunidad abierta",
    "about.community.body":
      "Publicamos cursos gratuitos gracias a voluntarias y aliadas que creen en el conocimiento abierto.",
    "about.accessibility.title": "Metodología accesible",
    "about.accessibility.body":
      "Los materiales siguen el sistema de diseño Monynha para garantizar inclusión, contraste y lenguaje claro para todas las personas.",
  },
};

export function t(locale: Locale, key: MessageKeys) {
  return dictionary[locale][key];
}

export type { MessageKeys };
