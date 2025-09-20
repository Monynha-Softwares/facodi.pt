# FACODI — experiências digitais inclusivas

Portal institucional da FACODI construído com [Next.js 14](https://nextjs.org), Tailwind CSS e componentes inspirados em [shadcn/ui](https://ui.shadcn.com). O foco é apresentar rotas públicas da faculdade, com suporte a tema claro/escuro, textos de navegação multilíngues e formulários acessíveis.

## 🚀 Principais recursos

- **Interface moderna** com tokens centralizados em `src/styles/theme.ts` e `tailwind.config.ts`.
- **Componentes atômicos** (`Button`, `Input`, `Card`) com variáveis de design compartilhadas.
- **Tema claro/escuro** persistente via `localStorage` e toggler no cabeçalho.
- **Configuração i18n** (`pt`, `en`, `es`, `fr`) para labels de navegação, footer e metadados em `src/config/i18n.ts`.
- **Páginas institucionais** (`/`, `/sobre`, `/projetos`, `/contato`) e rota personalizada `/pt/404`.
- **Formulário de contato** com validação cliente, feedback de envio e carregamento dinâmico.
- **Acessibilidade e SEO**: landmarks semânticos, foco visível, sitemap e robots, metadados por página.
- **Qualidade garantida** com TypeScript `strict`, ESLint + Prettier alinhados, Vitest e smoke tests Playwright.

## 🧱 Estrutura

```
src/
├── app/               # Rotas (App Router), metadata, sitemap e robots
│   ├── (site)/        # Páginas públicas (Home, Sobre, Projetos, Contato)
│   ├── globals.css    # Tailwind + variáveis básicas
│   └── layout.tsx     # Providers globais, header/footer
├── components/
│   ├── forms/         # Formulários reutilizáveis
│   ├── layout/        # Navegação, footer, toggles
│   └── ui/            # Componentes atômicos inspirados no shadcn
├── config/            # Configurações de i18n
├── hooks/             # Hooks de contexto (texto do site)
├── lib/               # Utils, providers, helpers
├── styles/            # Fonts e tokens de design
└── tests/             # Testes unitários e E2E (Playwright em tests/e2e)
```

## 🛠️ Preparação

1. Instale o Node.js 20 (ou superior).
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` caso precise adicionar variáveis de ambiente (nenhuma é obrigatória para rodar o projeto).

## 💻 Scripts principais

| Comando                | Descrição                                                    |
| ---------------------- | ------------------------------------------------------------ |
| `npm run dev`          | Inicializa o Next.js em modo desenvolvimento (`http://localhost:3000`). |
| `npm run build`        | Gera a build de produção.                                   |
| `npm run start`        | Sobe o servidor após a build.                               |
| `npm run lint`         | Executa ESLint com as regras do projeto.                    |
| `npm run typecheck`    | Roda o compilador TypeScript em modo verificação.           |
| `npm run format`       | Aplica o Prettier com plugin do Tailwind.                   |
| `npm run test`         | Testes unitários com Vitest + Testing Library.              |
| `npm run test:e2e`     | Smoke tests com Playwright (inicia servidor automático).    |
| `npm run analyze`      | Build com `next-bundle-analyzer` habilitado.                |

## 🎨 Guia de temas

- **Tokens principais:** `src/styles/theme.ts` concentra cores, sombras e raios utilizados por Tailwind via variáveis CSS.
- **Tailwind config:** `tailwind.config.ts` referencia as variáveis para `colors`, `borderRadius`, `boxShadow` e `fontFamily`.
- **Fonts:** `src/styles/fonts.ts` registra Inter (texto) e Sora (display) com `next/font`.
- **Toggle:** `ThemeProvider` (`src/lib/theme-provider.tsx`) aplica o tema escolhido e persiste em `localStorage` (`facodi-theme`).

## 🌐 Guia de i18n

- Definições em `src/config/i18n.ts` (`pt`, `en`, `es`, `fr`).
- `SiteTextProvider` (`src/hooks/use-site-text.tsx`) lê/escreve o idioma atual (`facodi-language`).
- Cabeçalho e rodapé consomem o hook `useSiteText()`; conteúdo editorial permanece em português.
- Metadados por página usam `buildPageMetadata(locale, page)` garantindo consistência.

## ✅ Qualidade e testes

- TypeScript `strict`, imports ordenados e limpeza automática via `eslint-plugin-unused-imports`.
- `vitest.config.ts` configura ambiente `jsdom`, Jest-DOM e coverage V8.
- Testes unitários em `src/tests/*.test.tsx` verificam componentes de UI e utilitários.
- Playwright (`playwright.config.ts`) roda smoke E2E das rotas principais.
- CI sugerido: executar `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` em PRs.

## 🤝 Contribuindo

1. Faça um fork e crie um branch com um commit seguindo o padrão Conventional Commits.
2. Execute os scripts de qualidade antes do PR.
3. Abra o PR descrevendo mudanças, capturas de tela (quando for UI) e testes executados.

## 📄 Licença

Distribuído sob a licença [MIT](./LICENSE).
