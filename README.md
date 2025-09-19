# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open-source inspirada nos planos curriculares da Universidade do Algarve (UALG).
Nosso objetivo é **democratizar o acesso ao ensino superior** por meio de trilhas de estudo organizadas em cursos, unidades curriculares e playlists do YouTube.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos e currículos completos
- 🎥 Aulas organizadas em **playlists do YouTube**
- 📝 Conteúdo textual em **Markdown versionado**
- 🔑 Autenticação via [Supabase Auth](https://supabase.com)
- 📊 Acompanhamento de progresso por vídeo
- 🌍 Multi-idioma: PT / EN / ES / FR

---

<!-- ## 🏗️ Arquitetura

- **Frontend**: [Next.js 14](https://nextjs.org) (App Router)
- **Banco de Dados**: [PostgreSQL + Supabase](https://supabase.com)
- **Docs**: Arquivos `.md` sincronizados com banco
- **Infra**: Deploy automatizado via [Coolify](https://coolify.io) em servidor Hetzner
- **Design**: UI baseada em [shadcn/ui](https://ui.shadcn.com) + Tailwind + tokens Monynha

--- -->

## 📂 Estrutura do Repositório

```bash
facodi-docs/
├─ README.md
├─ .github/
│ └─ workflows/
│ ├─ validate-md.yml
│ └─ sync-md-to-supabase.yml
├─ config/
│ ├─ _default/
├─ scripts/
├─ package.json
├─ package-lock.json
├─ content/
│ ├─ _index.md
│ └─ courses/
│ └─ LESTI/
│ └─ 2024-2025/
│ ├─ index.md
│ └─ uc/
│ ├─ LESTI-ALG1/
│ │ ├─ index.md
│ │ └─ estruturas-de-dados.md
│ └─ LESTI-BD1/
│ └─ index.md
├─ static/ (opcional: imagens anexas ao conteúdo)
│ └─ courses/
│ └─ ...
└─ schemas/ (opcional: documentação de esquema e seeds)
├─ README.md
├─ mapping.md
└─ examples/
└─ frontmatter-samples.md
````

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências
pnpm install

# Iniciar Supabase local
pnpm supabase start

# Rodar o frontend
pnpm dev --filter=web
```

---

## 🤝 Contribuindo

FACODI é open-source! Você pode contribuir de várias formas:

1. Fork o projeto e abra um Pull Request
2. Relate bugs ou sugira features em [Issues](../../issues)
3. Traduza conteúdos (PT → EN/ES/FR)
4. Ajude a revisar planos curriculares e trilhas de estudo

Consulte nosso guia em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## 👩‍💻 Autores & Créditos

* [Marcelo Santos](https://github.com/marcelosantos) — fundador do projeto
* Comunidade Monynha Softwares
* Base acadêmica: planos curriculares da [UALG](https://www.ualg.pt)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.
Veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

---
