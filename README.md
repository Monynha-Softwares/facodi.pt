# Monynha FACODI Portal

Portal estático progressivo para a Faculdade de Computação Digital (FACODI), baseado em Next.js 14 com design system Monynha, internacionalização em quatro idiomas e integração segura com Supabase.

## Stack

- [Next.js 14](https://nextjs.org/) com App Router e suporte a `app/` multi-locale.
- [TypeScript](https://www.typescriptlang.org/) em modo `strict`.
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [lucide-react](https://lucide.dev/).
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + [Playwright](https://playwright.dev/).
- [Supabase JS](https://supabase.com/docs/reference/javascript) com validação de variáveis via Zod.
- Ferramentas de qualidade: ESLint, Prettier, secretlint, Husky, lint-staged, depcheck, knip, unimported e ts-prune.

## Pré-requisitos

- Node.js 20.11 ou superior
- npm 10+

## Instalação

```bash
npm install
npm run env:check
```

## Scripts principais

| Script                                    | Descrição                                                |
| ----------------------------------------- | -------------------------------------------------------- |
| `npm run dev`                             | Inicia o servidor de desenvolvimento (porta 3000).       |
| `npm run build`                           | Gera build de produção.                                  |
| `npm start`                               | Sobe o build de produção.                                |
| `npm run lint`                            | Executa ESLint com regras de import, unused e Next.      |
| `npm run typecheck`                       | Verificação TypeScript sem emissão.                      |
| `npm run format` / `npm run format:check` | Formata ou checa estilo com Prettier.                    |
| `npm test`                                | Executa Vitest com cobertura mínima (60%).               |
| `npm run test:e2e`                        | Executa testes Playwright (necessita build em execução). |
| `npm run validate`                        | `lint && typecheck && test -u`.                          |
| `npm run analyze:deps`                    | `depcheck`, `knip`, `unimported` e `ts-prune`.           |
| `npm run env:check`                       | Valida variáveis obrigatórias com Zod.                   |
| `npm run i18n:extract`                    | Verifica cobertura (≥95%) e alinhamento das traduções.   |
| `npm run secretlint`                      | Scanner de segredos (pre-commit + CI).                   |
| `npm run lighthouse`                      | Gera relatório Lighthouse em `reports/lighthouse`.       |

## Estrutura de pastas

```
src/
  app/              # Rotas App Router com suporte a locales (pt/en/fr/es)
  components/       # Componentes compartilhados (layout, navegação, UI shadcn)
  features/         # Espaço para domínios específicos (ex.: cursos, playlists)
  hooks/            # Hooks reutilizáveis
  lib/
    clients/        # Integrações (Supabase, etc)
    data/           # Tokens e dados estáticos
    i18n/           # Configuração de idiomas e utilitários
    utils/          # Helpers puros
  styles/           # Camada base Tailwind + tokens OKLCH
  i18n/             # Dicionários JSON por idioma
  types/            # Tipagens compartilhadas
```

## Design System Monynha

- `tokens.json` centraliza cores (OKLCH), tipografia, espaçamentos e raios.
- `tailwind.config.ts` consome tokens via CSS variables e `class` mode para dark theme.
- Componentes base (`Button`, `Input`, `Card`, `Dialog`, `Tooltip`) seguem shadcn/ui.
- Página `/[locale]/components` demonstra tokens, interações e boas práticas.

## Internacionalização

- Arquivos JSON em `src/i18n/{pt,en,fr,es}.json`.
- `TranslationProvider` expõe `t(path)` e `messages` com coverage garantida por `npm run i18n:extract`.
- Switcher visível no header com fallback automático para `pt`.

## Qualidade e segurança

- Husky (pre-commit) executa `lint`, `format:check` e `secretlint`.
- Secretlint + `.env.example` garantem que segredos reais não chegam ao repositório.
- `scripts/env-check.ts` falha quando variáveis obrigatórias estão ausentes.
- `analyze:deps` mantém inventário limpo (`depcheck`, `knip`, `unimported`, `ts-prune`).

## Testes

- Unitários: Vitest + Testing Library em componentes e utils críticos.
- E2E: Playwright cobre hero principal e troca de idiomas.
- Cobertura mínima configurada em 60% (linhas, funções, statements).

## Documentação adicional

- [CONTRIBUTING](./CONTRIBUTING.md) — fluxo de branches, commits e PRs.
- [ARCHITECTURE](./ARCHITECTURE.md) — visão de módulos, tokens e decisões.
- [CHANGELOG](./CHANGELOG.md) — registro contínuo de melhorias (formato Keep a Changelog).

## Licença

[MIT](./LICENSE)
