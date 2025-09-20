# FACODI — Faculdade Comunitária Digital

A **FACODI** disponibiliza planos curriculares universitários em formato aberto.
Os conteúdos são escritos em Markdown, sincronizados com Supabase e enriquecidos com playlists educativas.

## ✨ Funcionalidades

- 📚 Catálogo de cursos com versões curriculares
- 🧑‍🎓 Unidades curriculares com resultados de aprendizagem e pré-requisitos
- 🎥 Integração com playlists do YouTube
- 📝 Conteúdo em Markdown carregado dinamicamente (Supabase ou fallback estático)
- 🌍 Preparado para multi-idioma (PT como padrão, EN como reserva)

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Servir o site em http://localhost:1313/
npm run dev

# Gerar versão otimizada para produção (public/)
npm run build
```

Durante o desenvolvimento pode definir as chaves do Supabase via variáveis de ambiente antes de executar o `hugo`:

```bash
export HUGO_PARAMS_FACODI_SUPABASE_URL="https://<project>.supabase.co"
export HUGO_PARAMS_FACODI_SUPABASE_ANONKEY="ey..."
```

Caso os valores não estejam configurados, o frontend usa automaticamente o conteúdo estático renderizado pelo Hugo.

## 📁 Estrutura principal

```
content/
├─ _index.md                      # Home
├─ courses/                       # Catálogo
│  ├─ _index.md                   # Lista de cursos
│  └─ lesti/
│     └─ 2024-2025/
│        ├─ _index.md             # Página do curso (layout "course")
│        └─ uc/
│           ├─ _index.md          # Introdução às UCs
│           ├─ lesti-alg1/
│           │  ├─ _index.md       # Unidade curricular (layout "uc")
│           │  └─ estruturas-de-dados.md # Tópico (layout "topic")
│           └─ lesti-bd1/
│              ├─ _index.md
│              └─ modelacao-de-dados.md
layouts/
├─ _default/baseof.html           # Injeta atributos data-* e partials principais
├─ home.html                      # Página inicial
├─ courses/list.html              # Listagem de cursos
├─ course/list.html               # Página de curso com UC list
├─ uc/list.html                   # Página de UC
└─ topic/single.html              # Página de tópico
static/js/
├─ init.js                        # Bootstrap dos carregadores
├─ loaders.js                     # Lógica de fetch/render
└─ supabaseClient.js              # Cliente Supabase via CDN (esm.sh)
```

## 🧱 Integração com Supabase

Os ficheiros JavaScript em `static/js/` carregam dados do Supabase quando as variáveis de ambiente estão disponíveis.
As páginas Hugo incluem um payload JSON (`<script id="facodi-payload">`) que serve de *fallback* quando o Supabase não está configurado ou ocorre algum erro de rede.

Funções disponíveis em `static/js/loaders.js`:

- `loadCoursePage(courseCode, planVersion)`
- `loadUCPage(ucCode, planVersion)`
- `loadTopicPage(topicSlug)`

Estas funções são chamadas automaticamente consoante os atributos `data-*` presentes no `<body>`.

## 🤝 Contribuição

1. Faça um fork e crie uma branch descritiva.
2. Execute `npm run build` antes de abrir o PR para garantir que o Hugo gera o site sem erros.
3. Certifique-se de que novo conteúdo Markdown segue os front matters descritos em `PLAN.md`.

## 📜 Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).
