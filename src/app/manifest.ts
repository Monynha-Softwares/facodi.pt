import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Monynha FACODI",
    short_name: "Monynha",
    description:
      "Plataforma Monynha para conteúdos acadêmicos digitais com governança aberta e acessibilidade.",
    start_url: "/pt",
    display: "standalone",
    background_color: "#f4f1ff",
    theme_color: "#5d4eff",
    icons: [{ src: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
