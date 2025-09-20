# Contribuindo com o Portal Monynha FACODI

Obrigado por colaborar! Este guia resume o fluxo esperado para manter a qualidade e a experiência consistente do projeto.

## Requisitos locais

1. Node.js 20.11+ e npm 10+.
2. Clone o repositório e rode `npm install`.
3. Valide variáveis: `cp .env.example .env.local` e configure os valores necessários antes de `npm run env:check`.

## Branches e PRs

- Base: `dev`.
- Feature branches: `tipo/descricao-curta` (ex.: `feat/curso-cms`).
- Use Conventional Commits (`feat:`, `fix:`, `chore:`, ...).
- Abra PRs contra `dev` com checklist de scripts (`validate`, `analyze:deps`, `env:check`, `i18n:extract`).
- Inclua evidências (Lighthouse, screenshots, links de staging) quando aplicável.

## Pipeline local

1. `npm run analyze:deps`
2. `npm run lint && npm run typecheck`
3. `npm test`
4. `npm run test:e2e`
5. `npm run build`

> O script `npm run validate` encadeia lint + typecheck + testes unitários. O gancho de pre-commit (Husky) já executa lint, `format:check` e `secretlint`.

## Estilo de código

- Componentes: `PascalCase`; arquivos: `kebab-case`; variáveis/funções: `camelCase`.
- Sempre usar aliases (`@/components`, `@/lib`, ...). Não use imports relativos frágeis (`../../`).
- Prefira funções puras em `src/lib/utils` e mantenha hooks em `src/hooks`.
- Todas as strings visíveis ficam em `src/i18n/*.json` (pt/en/fr/es).

## Testes e cobertura

- Objetivo mínimo: 60% linhas/funções/statements.
- Adicione testes Vitest para novos utilitários/componentes.
- Para fluxos críticos, inclua cenários Playwright.

## Segurança

- Nunca commit de chaves reais. Rode `npm run secretlint` antes de subir.
- Chaves server-only ficam fora de `NEXT_PUBLIC_*`.

## Documentação

- Atualize `CHANGELOG.md` e `ARCHITECTURE.md` quando houver alterações relevantes de arquitetura ou comportamento.
- PRs devem mencionar mudanças de UX, acessibilidade e internacionalização.

Obrigado por ajudar a construir uma experiência Monynha consistente! 💜
