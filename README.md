# FACODI — Faculdade Comunitária Digital

Portal educacional gratuito que organiza trilhas universitárias abertas com curadoria da comunidade Monynha Softwares. O projeto foi reescrito em **Next.js 14 + TypeScript** com foco em DX, acessibilidade e tokens de design vibrantes.

## ✨ Principais recursos

- UI modular baseada em [shadcn/ui](https://ui.shadcn.com) + Tailwind CSS
- Tokens Monynha para cores, tipografia, radius e sombras com suporte a tema light/dark
- Configuração de idiomas (PT, EN, ES, FR) para metadados, navegação e rodapé
- Formulário de contato funcional no frontend
- Qualidade garantida via lint, typecheck, testes e build estável

## 🧱 Arquitetura do repositório

```
src/
├─ app/                # Rotas do Next.js (App Router)
│  ├─ layout.tsx       # Layout raiz com providers, navbar e footer
│  └─ page.tsx         # Landing page principal
├─ components/
│  ├─ forms/           # Formulários reutilizáveis (ex.: contato)
│  ├─ layout/          # Navbar, Footer e componentes estruturais
│  ├─ providers/       # ThemeProvider e SiteTextProvider
│  ├─ sections/        # Seções da landing page
│  └─ ui/              # Componentes base (Button, Input, Card...)
├─ config/             # Configurações do projeto (ex.: i18n)
├─ hooks/              # Hooks customizados (useSiteText)
├─ lib/                # Utilitários compartilhados
└─ styles/             # Tokens e estilos globais
```

Arquivos públicos importantes:

- `public/robots.txt` e `public/sitemap.xml` para SEO básico
- `src/app/icon.svg` para favicon

## 🎨 Tokens de design

Os tokens vivem em `src/styles/theme.ts` e alimentam Tailwind via variáveis CSS.

- **Paleta vívida:** primária (magenta), secundária (violeta), acento (ciano) e neutros equilibrados para light/dark.
- **Tipografia:** Inter (sans), Space Grotesk (display) e JetBrains Mono (mono) via `next/font`.
- **Radius:** base arredondada (`--radius: 1.25rem`) com botões e cartões `rounded-full` / `rounded-2xl`.
- **Sombras:** `shadow-brand` e `shadow-soft` criam sensação de leveza.

## 🌍 Configuração de idiomas (Site settings)

`src/config/i18n.ts` centraliza os textos institucionais do site (título, descrição, navegação e rodapé) em quatro idiomas. O hook `useSiteText()` expõe `locale`, `setLocale` e `copy`, permitindo trocar o idioma das configurações e persistindo a escolha em `localStorage`.

Conteúdos editoriais permanecem em PT-BR.

## 🚀 Como rodar localmente

1. **Pré-requisitos:** Node.js >= 18.18 (recomenda-se usar `nvm`).
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

   A aplicação estará em `http://localhost:3000`.

## 🧪 Qualidade & scripts úteis

| Script              | Descrição                                     |
| ------------------- | --------------------------------------------- |
| `npm run lint`      | ESLint com zero warnings (`--max-warnings=0`) |
| `npm run typecheck` | Verificação de tipos com `tsc --noEmit`       |
| `npm run test`      | Testes unitários com Vitest                   |
| `npm run build`     | Build de produção do Next.js                  |
| `npm run format`    | Formatação com Prettier                       |

Os testes configurados validam as traduções de `i18n`. Amplie conforme novas features surgirem.

## 🤖 CI

O workflow `.github/workflows/ci.yml` roda lint → typecheck → build em pull requests direcionados à branch `dev`.

## 🤝 Contribuição

- Use commits no padrão [Conventional Commits](https://www.conventionalcommits.org/).
- Evite `console.*` e mantenha acessibilidade (aria-labels, foco visível, landmarks semânticos).
- Abra PRs para `dev` com o pipeline passando.

## 📄 Licença

Projeto distribuído sob a licença [MIT](./LICENSE).
