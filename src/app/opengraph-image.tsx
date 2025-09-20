import { ImageResponse } from "next/og";

import { designTokens } from "@/lib/data/tokens";

const oklchToHex = (value: string): string => {
  const match = value.match(/oklch\(([^)]+)\)/i);
  if (!match) {
    return value;
  }

  const [lightness, chroma, hue] = match[1].split(/\s+/).map((token) => Number.parseFloat(token));
  if ([lightness, chroma, hue].some((component) => Number.isNaN(component))) {
    return value;
  }

  const angle = (hue * Math.PI) / 180;
  const a = Math.cos(angle) * chroma;
  const b = Math.sin(angle) * chroma;

  const l1 = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const m1 = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const s1 = lightness - 0.0894841775 * a - 1.291485548 * b;

  const l2 = l1 ** 3;
  const m2 = m1 ** 3;
  const s2 = s1 ** 3;

  const rLinear = 4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2;
  const gLinear = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2;
  const bLinear = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s2;

  const toSrgb = (channel: number) => {
    const clipped = Math.min(1, Math.max(0, channel));
    const normalized =
      clipped <= 0.0031308 ? 12.92 * clipped : 1.055 * Math.pow(clipped, 1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, normalized)) * 255);
  };

  const [r, g, bChannel] = [rLinear, gLinear, bLinear].map(toSrgb);
  return `#${[r, g, bChannel].map((component) => component.toString(16).padStart(2, "0")).join("")}`;
};

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  const primary = oklchToHex(designTokens.colors.primary.light);
  const accent = oklchToHex(designTokens.colors.accent.light);
  const gradient = `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          width: "100%",
          height: "100%",
          backgroundImage: gradient,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>Monynha FACODI</div>
        <div style={{ fontSize: 32, maxWidth: 760, lineHeight: 1.4 }}>
          Plataforma viva para currículos digitais, playlists e governança aberta.
        </div>
        <div style={{ fontSize: 24, marginTop: 40 }}>facodi.monynha.com</div>
      </div>
    ),
    size,
  );
}
