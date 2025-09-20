# Arquitetura Monynha FACODI

## Visão geral

- **Framework**: Next.js 14 (App Router) com rotas segmentadas por locale (`/[locale]/...`).
- **Design System**: tokens declarados em `tokens.json`, consumidos por Tailwind via CSS custom properties. Componentes shadcn/ui personalizados garantem acessibilidade AA.
- **Internacionalização**: `TranslationProvider` injeta dicionários (pt/en/fr/es) com fallback `pt`. Scripts de verificação garantem cobertura ≥95% e chaves alinhadas.
- **Temas**: `next-themes` controla `class` (`light`/`dark`) na raiz. Cores OKLCH se adaptam automaticamente via CSS vars.

## Fluxo de dados

1. Layout `[locale]/layout.tsx` carrega dicionário e injeta provedores (tema, tradução).
2. Componentes de página (`page.tsx`) consomem mensagens diretamente ou via hooks.
3. Clients externos (Supabase) residem em `src/lib/clients`, isolando secrets e RLS.
4. Hooks/utilitários mantêm pureza para facilitar testes (Vitest) e tree-shaking (ts-prune/knip).

## Internacionalização e navegação

- Locale atual propaga via contexto e `LanguageSwitcher` atualiza URL (`/${locale}/...`).
- `sitemap.ts` e `robots.ts` geram metadados com todas as combinações de locale.
- 404/500 usam `useTranslations` para mensagens localizadas.

## Qualidade

- Scripts `analyze:deps` + lint/timecheck/test rodados em CI (`.github/workflows`).
- `secretlint` + `.env.example` previnem vazamento de credenciais.
- Cobertura mínima 60% (Vitest + Playwright) e relatório Lighthouse anexado em PRs.

## Próximos passos sugeridos

- Implementar features específicas em `src/features/` (ex.: cursos, playlists) consumindo Supabase.
- Expandir testes E2E para fluxos com autenticação e governança.
- Automatizar releases com changelog e versionamento semântico.
