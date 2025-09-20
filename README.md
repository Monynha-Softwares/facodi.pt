# FACODI · Portal aberto pela Monynha Softwares

FACODI (Faculdade Comunitária Digital) é um portal EAD gratuito que transforma currículos oficiais em trilhas de estudo baseadas em conteúdo público (como aulas no YouTube). O objetivo é democratizar o acesso a jornadas superiores com curadoria comunitária, organização por cursos/disciplinas/tópicos e acompanhamento leve de progresso.

A Monynha Softwares é o guarda-chuva de produtos, plataformas e documentação que compartilham o mesmo DNA técnico e visual. O foco é oferecer experiências minimalistas, vibrantes, acessíveis e fáceis de manter. O FACODI herda essa base para garantir consistência e velocidade de evolução em todo o ecossistema.

## ⚙️ Stack principal

- [Next.js 14 (App Router)](https://nextjs.org/) com TypeScript estrito e aliases `@/`
- [Tailwind CSS](https://tailwindcss.com/) com tokens centralizados em `src/styles/theme.ts`
- Componentes atômicos inspirados em [shadcn/ui](https://ui.shadcn.com/) (`Button`, `Input`, `Card`, etc.)
- Tema claro/escuro com persistência via `next-themes`
- Internacionalização de interface em PT/EN/ES/FR via `src/config/i18n.ts` + hook `useSiteText`
- Qualidade contínua: ESLint + Prettier + TypeScript + Vitest + Playwright + GitHub Actions

## 📁 Estrutura

```
src/
├─ app/                # Rotas App Router (/(pt)/{page}, sitemap, robots, not-found)
├─ components/
│  ├─ contact/         # Formulário e interações da página de contato
│  ├─ navigation/      # Header, footer, language switcher
│  ├─ providers/       # Providers de tema e textos
│  ├─ sections/        # Blocos semânticos (hero, destaques, etc.)
│  └─ ui/              # Componentes atômicos (Button, Input, Card...)
├─ config/i18n.ts      # Copys do site em PT (default), EN, ES, FR
├─ lib/                # Utilitários, metadados e hooks
├─ styles/             # Tokens Monynha + Tailwind globals
└─ test/               # Setup e helpers para testes unitários
```

## 🚀 Como rodar

```bash
npm install
npm run dev         # servidor Next.js com hot reload
npm run build       # build de produção
npm run start       # servidor de produção
```

### Qualidade

```bash
npm run lint        # ESLint (com unused-imports + ordenação)
npm run typecheck   # TypeScript estrito
npm run test        # Vitest + Testing Library
npm run test:e2e    # Playwright (precisa do `npx playwright install --with-deps` antes)
npm run analyze     # next-bundle-analyzer (variável ANALYZE=true)
```

Ferramentas de limpeza:

```bash
npm run depcheck    # detectar dependências não usadas
npm run knip        # mapear código TypeScript não referenciado
npm run ts-prune    # localizar exports mortos
```

## 🎨 Guia rápido de tema

Os tokens da identidade Monynha vivem em `src/styles/theme.ts` e são convertidos em variáveis CSS em `src/styles/globals.css`. A configuração do Tailwind (`tailwind.config.ts`) consome essas variáveis, garantindo coerência entre componentes.

Principais tokens disponíveis:

- `--color-background`, `--color-foreground`, `--color-accent`, `--color-highlight`
- `--radius-xl`, `--radius-2xl` (com foco em cantos arredondados `rounded-2xl`)
- Sombras suaves: `--shadow-soft` (cards/hero) e `--shadow-focus` (acessibilidade de foco)

Os componentes atômicos (`src/components/ui/`) já aplicam essas decisões. Para novos blocos, reutilize a função utilitária `cn` (`src/lib/utils.ts`) e mantenha as classes utilitárias do Tailwind ordenadas pelo Prettier plugin.

## 🌐 Guia rápido de i18n

- As traduções de interface ficam em `src/config/i18n.ts`, com o português como idioma padrão.
- O provider `SiteTextProvider` (`src/components/providers/site-text-provider.tsx`) persiste a escolha do usuário em `localStorage` e expõe o hook `useSiteText()`.
- `LanguageSwitcher` consome esse hook para alternar o idioma sem recarregar a página.
- Conteúdos editoriais (posts, trilhas) permanecem em PT; a i18n cobre rótulos, navegação, metadados e chamadas de interface.

## ♿️ Acessibilidade & SEO

- Landmarks (`header`, `main`, `footer`) e foco visível padronizado (`focus-visible`, `.focus-ring`).
- Contraste AA com tokens claros/escuros e animações suaves.
- Metadados por página (`createPageMetadata`) e `sitemap.xml`/`robots.txt` automáticos via App Router.

## 🔄 CI

`.github/workflows/ci.yml` executa em PRs e pushes para `main`/`develop`:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run test:e2e`
5. `npm run build`

## 🙌 Contribuindo

- Use commits no padrão **Conventional Commits** (`feat:`, `fix:`, `chore:`...)
- Execute os scripts de qualidade antes de abrir PRs
- Respeite os tokens e componentes compartilhados para manter a coesão Monynha

Boas contribuições! 🐶💜
