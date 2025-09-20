# FACODI — Faculdade Comunitária Digital

O **FACODI** é um portal EAD gratuito que transforma currículos oficiais em trilhas de estudo baseadas em conteúdo público.
Com foco em acessibilidade e consistência visual, o projeto segue o padrão técnico da Monynha Softwares e prioriza DX forte
para facilitar contribuições.

## ✨ Visão Geral

- 📚 Currículos vivos organizados em cursos, unidades curriculares e tópicos
- 🎥 Conteúdo público (YouTube, blogs, podcasts) curado e categorizado
- 🌗 Tema claro/escuro com persistência local
- 🌍 Interface disponível em PT, EN, ES e FR (conteúdo editorial permanece em PT)
- ✅ Qualidade garantida com lint, typecheck, testes unitários e smoke E2E

## 🏛️ Arquitetura

| Camada            | Tecnologia                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| Frontend          | [Next.js 14](https://nextjs.org) (App Router, TypeScript estrito)          |
| Estilização       | [Tailwind CSS](https://tailwindcss.com) + tokens centralizados             |
| Componentes UI    | shadcn/ui adaptado (Button, Input, Card)                                   |
| Tema              | [next-themes](https://github.com/pacocoursey/next-themes) + tokens Monynha |
| Testes unitários  | [Vitest](https://vitest.dev) + Testing Library                             |
| Testes E2E        | [Playwright](https://playwright.dev)                                       |
| Lint / Formatação | ESLint (unused-imports + simple-import-sort) + Prettier                    |

## 📂 Estrutura

```
src/
├─ app/               # Rotas App Router + metadata + assets estáticos
│  ├─ contato/
│  ├─ projetos/
│  ├─ sobre/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ about/
│  ├─ contact/
│  ├─ home/
│  ├─ navigation/
│  ├─ theme/
│  └─ ui/
├─ config/            # Configurações compartilhadas (i18n)
├─ lib/               # Hooks e utilitários (site text, test-utils)
└─ styles/            # Tokens de tema e fontes
```

## 🚀 Começando

```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento
npm run dev

# Build de produção
npm run build

# Análise de bundle (opcional)
npm run analyze

# Lint + Typecheck
npm run lint
npm run typecheck

# Testes unitários
npm test

# Playwright (smoke E2E)
npx playwright install --with-deps
npm run test:e2e
```

## 🎨 Tema & Tokens

- Tokens centralizados em `src/styles/theme.ts`
- Tailwind consome os tokens via CSS custom properties definidos automaticamente
- Utilize `rounded-2xl`, `shadow-soft` e as cores `bg-card`, `text-foreground`, `bg-background` etc.
- Fontes otimizadas com `next/font` (`Plus Jakarta Sans` e `JetBrains Mono`)

## 🌍 Idiomas da Interface

- Configurações em `src/config/i18n.ts`
- Hook `useSiteText()` fornece o locale atual e os textos de interface
- `SiteTextProvider` guarda a escolha no `localStorage` (`facodi:locale`)
- Conteúdo editorial e rotas permanecem em português; apenas rótulos e metadados são traduzidos

## 🧭 Páginas

| Rota       | Descrição                                              |
| ---------- | ------------------------------------------------------ |
| `/`        | Home com hero, diferenciais e resumo do FACODI         |
| `/sobre`   | Visão geral, missão e explicação da Monynha Softwares  |
| `/projetos`| Destaques do ecossistema Monynha                       |
| `/contato` | Formulário funcional (validação com Zod + RHF)         |
| `404`      | Página personalizada em português                      |

## 🧪 Qualidade & CI

- `npm run lint` — ESLint com regras de imports ordenados e proibição de imports não usados
- `npm run typecheck` — TypeScript estrito (`strict: true`)
- `npm test` — Vitest + Testing Library
- `npm run test:e2e` — Playwright (smoke das rotas principais)
- GitHub Actions (`.github/workflows/ci.yml`) garante lint → typecheck → build em pull requests para `dev`/`main`

## 🤝 Contribuindo

1. Crie uma branch a partir de `main`
2. Garanta que lint, typecheck, testes e E2E passam
3. Siga [Conventional Commits](https://www.conventionalcommits.org)
4. Abra um PR com descrição clara das mudanças

## 📄 Licença

Distribuído sob licença [MIT](./LICENSE).
