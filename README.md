# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open-source inspirada nos planos curriculares da Universidade do Algarve (UALG).
Nosso objetivo é **democratizar o acesso ao ensino superior** por meio de trilhas de estudo organizadas em cursos, unidades curriculares e playlists do YouTube.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos e currículos completos
- 🎥 Aulas organizadas em **playlists do YouTube**
- 📝 Conteúdo textual em **Markdown versionado**
- 🌙 Alternância de tema (claro/escuro) com persistência da preferência
- 🌍 Interface multi-idioma (PT como padrão + EN / ES / FR configurados)
- 🔌 Integração com [Supabase](https://supabase.com) para carregar dados dinâmicos

---

## 🏗️ Arquitetura

- **Frontend**: [Hugo](https://gohugo.io) com tema [Doks](https://getdoks.com)
- **UI/Estilo**: SCSS customizado com tokens Monynha + componentes Bootstrap
- **Integração dinâmica**: Vanilla JS (Supabase JS + Marked) carregando cursos/UCs/tópicos
- **Banco de Dados**: [Supabase](https://supabase.com) (PostgreSQL) com RLS ativado
- **Conteúdo**: Markdown versionado em `content/` sincronizado com Supabase
- **Deploy**: Empacotamento estático via `hugo --minify` (utilizável em Netlify, Vercel, etc.)

## 📂 Estrutura do Repositório

```bash
facodi.pt/
├─ README.md
├─ AGENTS.md
├─ package.json / package-lock.json
├─ config/
│   └─ _default/              # Configurações do Hugo (idiomas, parâmetros, menus)
├─ layouts/                   # Templates Hugo (home, cursos, UCs, tópicos)
│   └─ _partials/             # Cabeçalho, rodapé e scripts compartilhados
├─ content/
│   └─ courses/               # Conteúdo em Markdown (cursos, UCs, tópicos)
├─ static/
│   └─ js/                    # Clientes Supabase + carregadores dinâmicos
├─ assets/                    # SCSS e JS processados pelo Hugo Pipes
├─ supabase/                  # Schemas e automações de sincronização
└─ .github/workflows/         # Workflows de validação e sync para o banco
```

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências
npm install

# Rodar o site em modo desenvolvimento
npm run dev

# (Opcional) Build otimizado para produção
npm run build

# (Opcional) Formatar arquivos com Prettier
npm run format
```

> ℹ️ Para consumir dados dinâmicos do Supabase no ambiente local, defina as variáveis
> `SUPABASE_URL` e `SUPABASE_ANON_KEY` (por exemplo, via `.env` ou variáveis de ambiente) antes de rodar `npm run dev`.

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

- [Marcelo Santos](https://github.com/marcelo-m7) — fundador do projeto
- Comunidade Monynha Softwares
- Base acadêmica: planos curriculares da [UALG](https://www.ualg.pt)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.
Veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

---
