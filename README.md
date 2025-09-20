# FACODI Monorepo

Este repositório agora segue a arquitetura de monorepo **Monynha** com Turborepo e PNPM. O objetivo é centralizar os aplicativos da comunidade e os pacotes compartilhados (design system, configuração, i18n e integrações), oferecendo uma base moderna para o portal FACODI.

## Estrutura

```
.
├── apps/
│   └── web-facodi/        # Aplicação Next.js com o App Router
├── packages/
│   ├── ui/                # Componentes shadcn/ui com tokens Monynha
│   ├── config/            # Configurações de marca e preset Tailwind
│   ├── i18n/              # Idiomas suportados e helpers de tradução
│   ├── supabase/          # Cliente e consultas tipadas do Supabase
│   └── env/               # Validação de variáveis de ambiente (Zod)
├── turbo.json             # Pipeline compartilhado do Turborepo
├── pnpm-workspace.yaml    # Workspaces PNPM
└── tsconfig.base.json     # Configuração TypeScript compartilhada
```

## Requisitos

- [PNPM](https://pnpm.io/) >= 8
- Node.js >= 18

## Primeiros passos

```bash
pnpm install
pnpm dev
```

O comando `pnpm dev` executa `turbo run dev --parallel`, levantando a aplicação `web-facodi`.

### Scripts úteis

| Comando              | Descrição                                       |
| -------------------- | ----------------------------------------------- |
| `pnpm dev`           | Executa os servidores de desenvolvimento        |
| `pnpm build`         | Gera builds otimizadas para todos os pacotes    |
| `pnpm lint`          | Executa o ESLint através do Turborepo          |
| `pnpm typecheck`     | Valida os tipos TypeScript                      |
| `pnpm format`        | Espaço reservado para formatadores compartilhados |

## Variáveis de ambiente

A validação das variáveis de ambiente é realizada pelo pacote `@monynha/env` utilizando [Zod](https://github.com/colinhacks/zod). Crie um arquivo `.env` na raiz do projeto com:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Sem esses valores o cliente Supabase tipado não é inicializado. Utilize `SKIP_ENV_VALIDATION=true` apenas em ambientes de teste.

## Design System

A camada de UI utiliza [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) com tokens da identidade Monynha:

- Primária violeta `#7C3AED`
- Secundária azul `#0EA5E9`
- Gradientes e raios arredondados `rounded-2xl`
- Tipografia: Space Grotesk (títulos), Inter (texto) e JetBrains Mono (código)

## Internacionalização

O portal expõe as rotas com o prefixo de idioma (`/[lang]`). Os idiomas disponíveis estão em `packages/i18n`. O idioma padrão é `pt` e pode ser trocado pelo seletor no cabeçalho.

## Integração Supabase

O cliente Supabase tipado fica em `packages/supabase` e utiliza os tipos gerados manualmente a partir do schema de catálogo. Funções utilitárias expõem consultas como `fetchCourses` e `fetchCourseByCode` para o aplicativo Next.

## Contribuindo

1. Garanta que os testes e validações passam (`pnpm lint`, `pnpm typecheck`).
2. Crie commits descritivos seguindo o estilo convencional.
3. Abra um PR descrevendo claramente as mudanças.

## Licença

Distribuído sob a licença [MIT](./LICENSE).
