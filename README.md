# FACODI · Monynha

Portal institucional da FACODI reconstruído com **Next.js 14**, tema visual Monynha e foco em acessibilidade, performance e colaboração. O projeto organiza conteúdos de cursos, projetos e iniciativas comunitárias em um ambiente responsivo, multilíngue e com suporte a tema claro/escuro persistente.

## ✨ Destaques

- UI atômica baseada em [Tailwind CSS](https://tailwindcss.com) + componentes inspirados em [shadcn/ui](https://ui.shadcn.com)
- Tokens de design centralizados (`src/styles/theme.ts`) + integração direta no `tailwind.config.ts`
- i18n configurável em quatro idiomas (`src/config/i18n.ts`) com consumo via `useSiteText()`
- Tema claro/escuro com armazenamento no `localStorage` e alternância instantânea (`next-themes`)
- Rotas principais: `/`, `/sobre`, `/projetos`, `/contato` e `/404`
- SEO pronto com `metadata`, `sitemap.xml` e `robots.txt`
- Testes unitários (Vitest + Testing Library) e smoke E2E (Playwright)
- CI-ready: scripts para lint, typecheck e build utilizados no GitHub Actions

## 🧱 Tecnologias principais

- [Next.js 14 (App Router)](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/) com `strict` e aliases `@/*`
- [Tailwind CSS](https://tailwindcss.com/) + PostCSS + `class-variance-authority`
- [next-themes](https://github.com/pacocoursey/next-themes) para gerenciamento de tema
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)

## 🚀 Como começar

```bash
# 1. Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

### Scripts úteis

| Comando             | Descrição                                                        |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Inicia o ambiente de desenvolvimento com Next.js                 |
| `npm run build`     | Gera build de produção                                           |
| `npm run start`     | Serve a build de produção                                        |
| `npm run lint`      | Executa ESLint com regras alinhadas ao Prettier e import order   |
| `npm run typecheck` | Valida a base TypeScript em modo `--noEmit`                      |
| `npm run test`      | Roda testes unitários (Vitest)                                   |
| `npm run test:e2e`  | Executa os testes E2E (Playwright)                               |
| `npm run analyze`   | Build com `@next/bundle-analyzer` para inspecionar pacotes       |

> O comando `npm run prepare` instala os navegadores do Playwright automaticamente após `npm install`.

## 🗂️ Estrutura principal

```
src/
├─ app/                 # Rotas Next.js (App Router)
│  ├─ layout.tsx        # Layout raiz com provedores de tema e idioma
│  ├─ page.tsx          # Home
│  ├─ sobre/…           # Página "Sobre"
│  ├─ projetos/…        # Página "Projetos" (import dinâmico)
│  ├─ contato/…         # Página "Contato" (import dinâmico)
│  ├─ (pt)/404/…        # Página dedicada /404
│  ├─ not-found.tsx     # Fallback 404 do App Router
│  ├─ sitemap.ts        # Sitemap dinâmico
│  └─ robots.ts         # Regras de indexação
├─ components/
│  ├─ layout/           # Header e Footer reutilizáveis
│  ├─ providers/        # Provedores de tema e idioma
│  ├─ sections/         # Blocos de página (Home, Sobre, Projetos, Contato, 404)
│  └─ ui/               # Componentes atômicos (Button, Input, Card, Textarea)
├─ config/i18n.ts       # Fonte única das traduções de interface
├─ lib/utils.ts         # Helpers (ex.: `cn`)
└─ styles/
   ├─ globals.css       # Tailwind + estilos base (focus, fonte, body)
   └─ theme.ts          # Tokens Monynha (cores, raios, sombras, storage keys)
```

## 🎨 Guia rápido de tema e tokens

- `src/styles/theme.ts` contém o objeto `themeTokens` com paleta, raios e sombras.
- `tailwind.config.ts` importa esses tokens para `extend.colors`, `borderRadius` e `boxShadow`.
- Para adicionar um novo token, defina em `theme.ts` e utilize via classes Tailwind (`bg-brand-600`, `shadow-soft`, `rounded-2xl`, etc.).
- Fontes: `Plus Jakarta Sans` (base) e `Space Grotesk` (display) com classes utilitárias (`font-sans`, `font-display`).

## 🌍 Guia rápido de i18n

- `src/config/i18n.ts` lista os idiomas suportados (`languages`), o idioma padrão (`defaultLanguage`) e os textos de interface por rota.
- Utilize o hook `useSiteText()` dentro de componentes cliente para acessar os textos do idioma ativo.
- O idioma padrão é PT-BR e é persistido em `localStorage` (`LANGUAGE_STORAGE_KEY`).
- Para adicionar ou ajustar textos, atualize a estrutura correspondente (meta, navigation, home, about, etc.) no arquivo de config.

## ✅ Qualidade & testes

- `npm run lint` executa ESLint com `eslint-plugin-unused-imports`, import order e integração com Prettier.
- `npm run typecheck` garante TypeScript estrito.
- `npm run test` roda os testes unitários configurados em `vitest.config.ts` (`jsdom` + Jest DOM).
- `npm run test:e2e` executa smoke tests no Playwright (`tests/e2e/smoke.spec.ts`). O servidor Next sobe automaticamente antes dos testes.

## 🤝 Contribuindo

1. Faça um fork, crie uma branch e commit com [Conventional Commits](https://www.conventionalcommits.org/).
2. Garanta que `lint`, `typecheck`, `test` e `test:e2e` passam.
3. Abra o Pull Request com descrição das alterações e testes executados.

Sinta-se à vontade para abrir issues com melhorias, novas traduções ou ajustes de acessibilidade.

---

Projetado com carinho pela comunidade **Monynha** 💜
