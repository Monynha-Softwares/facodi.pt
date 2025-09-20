# Changelog

Todas as mudanças notáveis deste repositório seguem o formato [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Reestruturação completa para Next.js 14 com design system Monynha (Tailwind + shadcn/ui + lucide).
- Internacionalização pt/en/fr/es com verificação automática de cobertura (≥95%).
- Tokens em `tokens.json`, dark mode por classe e página de showcase (`/[locale]/components`).
- Validação de variáveis com Zod (`npm run env:check`) e clients Supabase tipados.
- Pipelines de qualidade: ESLint, Prettier, secretlint, Husky, lint-staged, depcheck, knip, unimported, ts-prune.
- Testes unitários (Vitest) e E2E (Playwright) com cobertura mínima 60%.
- CI GitHub Actions (`validate`, `build`) e script de relatório Lighthouse.
- Documentação revisada: README, CONTRIBUTING, ARCHITECTURE, CHANGELOG.

### Removed

- Stack Hugo/Doks e assets legados não utilizados.
