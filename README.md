# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open-source inspirada nos planos curriculares da Universidade do Algarve (UALG).
Nosso objetivo é **democratizar o acesso ao ensino superior** por meio de trilhas de estudo organizadas em cursos, unidades curriculares e playlists do YouTube.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos e currículos completos
- 🎥 Aulas organizadas em **playlists do YouTube**
- 📝 Conteúdo textual em **Markdown versionado**
- 🔌 Integração com Supabase para dados dinâmicos das páginas
- 🌗 Alternância entre tema claro/escuro com preferência persistente
- 🌍 Interface configurável em Português, Inglês, Francês e Espanhol (conteúdo editorial permanece em PT)

---

## 🏗️ Stack

- **Gerador estático**: [Hugo](https://gohugo.io/) com tema Doks e customizações Monynha
- **Estilos**: SCSS + Bootstrap Utilities + tokens visuais Monynha
- **Integração de dados**: [Supabase](https://supabase.com) via JavaScript no frontend
- **Deploy**: Netlify (ver [`netlify.toml`](./netlify.toml))

## 📂 Estrutura do Repositório

```bash
facodi.pt/
├─ README.md
├─ config/
│  ├─ _default/        # Configurações de idiomas, menus e parâmetros do tema
│  └─ production/      # Overrides para ambientes específicos
├─ content/            # Conteúdo editorial em Markdown (Português)
├─ layouts/            # Templates Hugo customizados para cursos, UCs e tópicos
├─ assets/             # SCSS, JS e imagens da identidade FACODI
├─ static/             # Arquivos estáticos (favicons, JS público, etc.)
├─ supabase/           # Scripts e automações relacionados à sincronização de dados
├─ scripts/            # Utilidades para build e tooling
├─ package.json        # Scripts de desenvolvimento
└─ netlify.toml        # Configuração de deploy
```

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências (requer Node >= 20)
npm install

# Rodar o site estático com Hugo (hot reload)
npm run dev

# Gerar build otimizado para produção
npm run build

# Opcional: aplicar formatação com Prettier
npm run format
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

- [Marcelo Santos](https://github.com/marcelo-m7) — fundador do projeto
- Comunidade Monynha Softwares
- Base acadêmica: planos curriculares da [UALG](https://www.ualg.pt)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.
Veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

---
