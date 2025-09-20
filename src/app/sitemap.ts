import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";

const base = "https://facodi.monynha.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/components"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.7,
    })),
  );
}
