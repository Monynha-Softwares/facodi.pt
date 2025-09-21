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
- 🌓 Tema claro/escuro com persistência por dispositivo

---

## 🏗️ Arquitetura

- **Site estático**: [Hugo](https://gohugo.io) com tema Doks customizado
- **Estilos**: SCSS + tokens visuais Monynha
- **Scripts**: Vanilla JS para tema, seletor de idioma e integração com Supabase
- **Conteúdo**: Markdown versionado sincronizado com Supabase via GitHub Actions
- **Deploy**: Build estática publicada em infraestrutura Monynha Softwares

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
npm install

# Rodar o site (Hugo)
npm run dev

# Gerar build de produção
npm run build
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

* [Marcelo Santos](https://github.com/marcelo-m7) — fundador do projeto
* Comunidade Monynha Softwares
* Base acadêmica: planos curriculares da [UALG](https://www.ualg.pt)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.
Veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

---
