# FACODI Portal

Plataforma web moderna para apresentar iniciativas, projetos e formas de participação da comunidade FACODI. O portal foi reescrito em Next.js com foco em acessibilidade, performance e DX.

## ✨ Principais características

- **Next.js 14 + App Router** com TypeScript `strict` e aliases `@/`.
- **Tailwind CSS** com tokens centralizados em [`src/styles/theme.ts`](src/styles/theme.ts) e integração com componentes inspirados no shadcn/ui (`Button`, `Input`, `Card`, etc.).
- **Tema claro/escuro** persistido com `next-themes` e interruptor acessível.
- **Suporte a múltiplos idiomas** (PT, EN, ES, FR) para elementos de interface via [`src/config/i18n.ts`](src/config/i18n.ts) e hook `useSiteText()`.
- **Páginas principais**: Home, Sobre, Projetos, Contato e página 404 personalizada.
- **Formulário de contato** funcional no frontend com validação básica.
- **Boas práticas de acessibilidade** (landmarks, foco visível, contraste AA, textos alternativos).
- **SEO** via `Metadata`, Open Graph e rotas `sitemap.xml`/`robots.txt` automáticas.
- **Qualidade**: ESLint + Prettier integrados, Vitest com Testing Library e smoke tests Playwright.
- **DX**: script opcional de bundle analyzer, componentes reutilizáveis, imports ordenados automaticamente.

## 🚀 Começando

1. **Instale dependências**:
   ```bash
   npm install
   ```
2. **Variáveis de ambiente**: crie `.env.local` se precisar adicionar chaves (nenhuma é obrigatória para o MVP).
3. **Scripts principais**:
   | Comando                 | Descrição |
   |-------------------------|-----------|
   | `npm run dev`           | inicia o servidor Next.js em modo desenvolvimento.
   | `npm run build`         | gera build de produção.
   | `npm run start`         | executa a aplicação buildada.
   | `npm run lint`          | roda ESLint com Prettier (inclui `unused-imports` e ordenação).
   | `npm run lint:fix`      | corrige lint automaticamente quando possível.
   | `npm run typecheck`     | valida tipos com `tsc --noEmit`.
   | `npm run test`          | executa testes unitários com Vitest.
   | `npm run test:watch`    | Vitest em modo watch.
   | `npm run test:e2e`      | smoke tests Playwright (sobe `next dev` automaticamente).
   | `npm run analyze`       | build de produção com `@next/bundle-analyzer` habilitado.

> **Dica**: antes de rodar `npm run test:e2e` localmente execute `npx playwright install` para baixar os navegadores.

## 🧱 Estrutura de pastas

```
src/
├─ app/               # rotas App Router, metadata e layout
├─ components/
│  ├─ layout/         # cabeçalho, rodapé e utilidades visuais
│  ├─ sections/       # blocos de página (hero, formulários, etc.)
│  └─ ui/             # componentes atômicos (Button, Input, Card, ...)
├─ config/            # i18n e configurações globais
├─ hooks/             # hooks como useSiteText
├─ lib/               # utilidades e dados mockados
└─ styles/            # tokens e estilos globais
```

## 🎨 Tema e tokens

- Tokens de cor, raio (`rounded-2xl` por padrão) e sombras estão em [`src/styles/theme.ts`](src/styles/theme.ts).
- `themeCssVariables` injeta as variáveis CSS no `<head>` (veja [`src/components/theme-styles.tsx`](src/components/theme-styles.tsx)).
- Customizações do Tailwind vivem em [`tailwind.config.ts`](tailwind.config.ts) e consomem os mesmos tokens.
- Para novos componentes, prefira utilizar os utilitários já presentes (`shadow-soft`, `bg-hero-gradient`, `font-heading`).

## 🌐 Idiomas

- A configuração fica em [`src/config/i18n.ts`](src/config/i18n.ts): título do site, descrição, navegação, metadados e textos do formulário.
- Use o hook [`useSiteText`](src/hooks/use-site-text.tsx) para acessar `copy`, `language` e `setLanguage`.
- O idioma padrão é PT e é persistido em `localStorage`.
- Conteúdo editorial (parágrafos longos, descrições de projetos) permanece em português, mas labels e navegação acompanham o idioma escolhido.

## ✅ Qualidade e CI

- `eslint-plugin-unused-imports` remove/importa automaticamente itens não utilizados.
- `eslint-plugin-simple-import-sort` mantém imports ordenados.
- Testes unitários cobrem componentes de UI e o hook de i18n.
- Smoke tests Playwright garantem renderização das rotas principais e página 404.
- Workflow [`ci.yml`](.github/workflows/ci.yml) roda lint → typecheck → testes (unit + e2e) → build em PRs para `dev`.
- Commits devem seguir o padrão **Conventional Commits** (`feat:`, `fix:`, `chore:`, ...).

## 📄 Licença

Projeto licenciado sob [MIT](LICENSE).
