# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open-source inspirada nos planos curriculares da Universidade do Algarve (UALG).
Nosso objetivo é **democratizar o acesso ao ensino superior** por meio de trilhas de estudo organizadas em cursos, unidades curriculares e playlists do YouTube.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos com planos curriculares completos
- 🎥 Trilhas de estudo integradas a playlists abertas no YouTube
- 📝 Conteúdo editorial em Markdown versionado no repositório
- 🗄️ Integração opcional com Supabase para carregar dados dinâmicos
- 🌍 Interface multilíngue (Português padrão + EN/ES/FR) com seletor de idioma
- 🌗 Alternância entre tema claro/escuro com persistência da preferência do usuário
- 🐙 Link direto para o repositório da Monynha Softwares no GitHub

---

## 🏗️ Stack & Organização

- **Gerador estático:** [Hugo](https://gohugo.io/) com tema [Doks](https://getdoks.org/) customizado
- **Estilos:** SCSS + utilitários Bootstrap com tokens visuais da Monynha
- **Scripts:** JavaScript vanilla (`assets/js/custom.js` e `static/js/*.js`)
- **Dados dinâmicos (opcional):** [Supabase](https://supabase.com) consumido no navegador
- **Automação:** scripts npm para desenvolvimento, build e formatação (Prettier)

---

## 📂 Estrutura do Repositório

```bash
facodi.pt/
├─ assets/                # SCSS e JS compilados pelo pipeline do Hugo
├─ config/                # Configurações Hugo (idiomas, menus, parâmetros)
├─ content/               # Conteúdo editorial em Markdown
├─ i18n/                  # Arquivos JSON com traduções de interface
├─ layouts/               # Templates Hugo personalizados (home, cursos, UCs, tópicos)
├─ static/
│  └─ js/                 # Integração Supabase e carregadores dinâmicos
├─ scripts/               # Utilitários (ex.: instalação do Hugo)
├─ package.json
└─ README.md
```

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento (http://localhost:1313)
npm run dev

# Gerar build estático (pasta public/)
npm run build

# Ajustar formatação automática
npm run format
```

Para consumir dados reais do Supabase, defina as variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY` antes de executar o build ou o servidor local. Caso contrário, o site usa apenas o conteúdo estático em Markdown.

---

## 🌍 Internacionalização & Tema

- Idioma padrão configurado em `config/_default/hugo.toml` (`defaultContentLanguage = "pt"`).
- Suporte a `pt`, `en`, `fr` e `es` descrito em `config/_default/languages.toml` e `config/_default/menus/`.
- Strings de interface ficam centralizadas em `i18n/*.json`. Elas são disponibilizadas ao JavaScript via `<script id="facodi-translations">`.
- O seletor de idioma e o alternador de tema estão no componente `layouts/_partials/header/header.html`.
- Persistência do tema claro/escuro é feita por `assets/js/custom.js` utilizando `localStorage`.
- Scripts dinâmicos (`static/js/loaders.js`) reaproveitam as traduções para mensagens carregadas do Supabase.

---

## 🤝 Contribuindo

FACODI é open-source! Você pode contribuir de várias formas:

1. Abra um Pull Request com melhorias ou correções (use `npm run format` antes de submeter).
2. Relate bugs ou sugira features em [Issues](../../issues).
3. Traduza strings de interface (`i18n/*.json`).
4. Ajude a revisar planos curriculares, trilhas e conteúdos em Markdown.

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
