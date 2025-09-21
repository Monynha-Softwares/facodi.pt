# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open source inspirada nos planos curriculares da Universidade do Algarve (UALG).
Organizamos cursos, unidades curriculares e playlists abertas para democratizar o acesso ao ensino superior com transparência e afeto comunitário.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos com currículos oficiais e versão do plano indicada.
- 🎥 Aulas e materiais organizados em playlists do YouTube e recursos abertos.
- 📝 Conteúdo textual em **Markdown** com versionamento Git.
- 🔗 Integração com Supabase para carregar conteúdos dinâmicos no front-end.
- 🌍 Multi-idioma com **Português** como idioma padrão e inglês como fallback preparado.

---

## 🧱 Arquitetura

- **Static site generator:** [Hugo](https://gohugo.io) com o tema Doks personalizado.
- **Layouts Hugo:** templates dedicados para homepage, cursos (`layouts/courses`), unidades curriculares (`layouts/uc`) e tópicos (`layouts/topic`).
- **Taxonomias & conteúdo:** estrutura `content/courses/<curso>/uc/<uc>/<topico>.md` seguindo as diretrizes do Hugo.
- **Estilos:** SCSS customizado em `assets/scss` com tokens da identidade FACODI.
- **Integração Supabase:** scripts vanilla JS em `static/js` (`supabaseClient.js` e `loaders.js`).

---

## 📂 Estrutura de Diretórios

```bash
facodi.pt/
├─ config/
│  └─ _default/
│     ├─ hugo.toml
│     ├─ languages.toml
│     ├─ params.toml
│     └─ menus/
├─ content/
│  ├─ _index.md            # Homepage (pt)
│  ├─ courses/             # Cursos e UCs (pt)
│  ├─ privacy.md           # Política de privacidade (pt)
│  └─ en/                  # Conteúdo em inglês (fallback)
├─ layouts/                # Templates Hugo customizados
├─ assets/scss/            # Estilos da identidade FACODI
├─ static/js/              # Integração Supabase em JS puro
├─ package.json            # Scripts npm (Hugo build/dev)
└─ hugo_stats.json         # Estatísticas para builds otimizados
```

---

## 🌐 Idiomas

- **Português (pt):** idioma padrão servido na raiz (`/`).
- **English (en):** conteúdo inicial disponível em `/en/` com mensagens de fallback enquanto traduzimos os currículos.
- O seletor de idioma no cabeçalho utiliza as traduções configuradas em `config/_default/languages.toml`.

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências
npm install

# Servir o site em modo desenvolvimento (Hugo)
npm run dev

# Gerar a versão estática otimizada
npm run build
```

> As variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY` podem ser exportadas no ambiente para habilitar o carregamento dinâmico via Supabase.

---

## 🤝 Contribuindo

FACODI é open source! Você pode contribuir de várias formas:

1. Faça um fork do projeto e abra um Pull Request.
2. Relate bugs ou sugira features em [Issues](../../issues).
3. Traduza conteúdos (PT → EN) ou revise planos curriculares.
4. Ajude a organizar playlists abertas e materiais da comunidade.

Consulte o guia em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

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
