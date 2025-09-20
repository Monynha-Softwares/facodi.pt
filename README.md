# FACODI — Faculdade Comunitária Digital

Portal educacional gratuito mantido pela **Monynha Softwares**. A aplicação foi reconstruída com foco em DX, acessibilidade e tokens de design consistentes inspirados no visual vibrante da Monynha.

## ✨ Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs) com React 18 e TypeScript (`strict` habilitado)
- Tailwind CSS com tokens definidos em [`src/styles/theme.ts`](./src/styles/theme.ts)
- Componentes base inspirados em [shadcn/ui](https://ui.shadcn.com) (`Button`, `Input`, `Card`, `Navbar`, `Footer` etc.)
- Tema light/dark com [next-themes](https://github.com/pacocoursey/next-themes) e persistência em `localStorage`
- i18n apenas para configurações/rotulagem via [`src/config/i18n.ts`](./src/config/i18n.ts)
- Qualidade garantida com ESLint (`--max-warnings=0`), TypeScript `--noEmit`, Vitest + Testing Library e build estável

## 🚀 Como rodar localmente

```bash
# 1. Requisitos
# - Node.js >= 20
# - npm >= 10

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev

# 4. Scripts de qualidade
npm run lint
npm run typecheck
npm run test
npm run build
```

A aplicação ficará disponível em `http://localhost:3000`.

## 🗂️ Estrutura

```
src/
├─ app/             # Rotas App Router, metadados, sitemap e robots
│  ├─ layout.tsx    # Providers globais (tema + textos), skip link e shells
│  ├─ page.tsx      # Landing page (Hero, Features, Cursos, Contato)
│  ├─ courses/      # Página de catálogo
│  ├─ roadmap/      # Roadmap público
│  ├─ contact/      # Página dedicada ao formulário de contato
│  ├─ globals.css   # Base Tailwind + tokens CSS
│  ├─ sitemap.ts    # Sitemap automático
│  └─ robots.ts     # Regras de indexação
├─ components/
│  ├─ layout/       # Navbar, Footer, ThemeToggle, LanguageSwitcher
│  ├─ sections/     # Hero, Features, CourseGrid, ContactSection
│  └─ ui/           # Button, Input, Card, Textarea
├─ config/          # i18n das configurações do site
├─ data/            # Conteúdos mockados (cursos em destaque)
├─ hooks/           # `useSiteText`
├─ providers/       # Providers de tema e textos
├─ styles/          # Tokens Monynha (`theme.ts`)
└─ lib/             # Utilidades (`cn`)
```

## 🎨 Tokens Monynha

Os tokens globais ficam em [`src/styles/theme.ts`](./src/styles/theme.ts) e são aplicados pelo Tailwind via [`tailwind.config.ts`](./tailwind.config.ts).

- **Paleta**: primária roxo elétrico, secundária azul vívido, acentos quentes e neutros frios
- **Tipografia**: `Inter` (corpo), `Space Grotesk` (display), `JetBrains Mono` (mono)
- **Raios**: `rounded-2xl` predominante e variantes até `rounded-[3rem]`
- **Sombras**: camadas suaves com roxos/azuis translúcidos
- **Tema**: light/dark com CSS vars (`--color-*`) + toggle persistente (`ThemeToggle`)

## 🌍 i18n de configurações

- Arquivo central: [`src/config/i18n.ts`](./src/config/i18n.ts)
- Idiomas: `pt` (default), `en`, `es`, `fr`
- Apenas rótulos de interface/meta (conteúdo editorial permanece em PT)
- `SiteTextProvider` lê/preenche localStorage, atualiza `lang` do `<html>` e expõe o hook [`useSiteText`](./src/hooks/use-site-text.ts)
- `LanguageSwitcher` consome o provider e permite troca instantânea de idioma

## 📮 Formulário de contato

- Localizado na landing e na rota `/contact`
- Validação básica client-side e feedback de envio
- Simula processamento assíncrono (placeholder até integração com backend)

## ✅ Checks obrigatórios

| Comando | Descrição |
| ------- | --------- |
| `npm run lint` | ESLint (Next + Tailwind + A11y) com `--max-warnings=0` |
| `npm run typecheck` | TypeScript com `strict: true` |
| `npm run test` | Vitest + Testing Library |
| `npm run build` | Build Next.js |

A pipeline de CI executa `lint → typecheck → test → build` em PRs direcionados para `dev`.

## 🤝 Contribuição

1. Crie uma branch a partir de `dev`
2. Garanta commits no padrão **Conventional Commits**
3. Rode todos os scripts de qualidade antes de abrir PR
4. Descreva mudanças e anexos visuais quando alterar UI

Vamos construir uma educação digital acessível e vibrante! 💜
