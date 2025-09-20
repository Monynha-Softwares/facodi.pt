import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetBrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Monynha — Faculdade de Computação Digital",
  description:
    "Portal Monynha para a Faculdade de Computação Digital: conteúdos acessíveis, agenda acadêmica e recursos estudantis em quatro idiomas.",
  applicationName: "Monynha",
  metadataBase: new URL("https://facodi.monynha.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${jetBrains.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
