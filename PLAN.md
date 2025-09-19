# FACODI — Estrutura proposta do repositório `facodi-docs` e conteúdo dos arquivos de configuração

> **Objetivo**: manter todo o conteúdo académico em Markdown, versionado e pronto para sincronização com o Supabase (Postgres). Este repositório é **só de conteúdo** + **configs de sincronização/validação**.

---

## 1) Estrutura de pastas (árvore)

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
```

---

## 2) Convenção de front‑matter (YAML) dos `.md`

### 2.1 Curso (`content/courses/<curso>/<versao>/index.md`)

```yaml
---
code: "LESTI"
title: "Licenciatura em Engenharia de Sistemas e Tecnologias da Informação"
degree: "bachelor" # bachelor|master|integrated_master|phd|other
ects_total: 180
duration_semesters: 6
plan_version: "2024/2025"
institution: "UAlg"
school: "EST"
language: "pt"
summary: "Descrição do curso, objetivos e perfil de saída."
seo:
  title: "LESTI — UAlg"
  description: "Plano curricular, UCs e trilhas de estudo"
---

Corpo do Markdown com apresentação do curso.
```

### 2.2 UC (`content/courses/<curso>/<versao>/uc/<uc_code>/index.md`)

```yaml
---
code: "LESTI-ALG1"
title: "Algoritmos e Estruturas de Dados I"
description: "Introdução a algoritmos e estruturas de dados."
ects: 6
semester: 1
language: "pt"
prerequisites: ["LESTI-MAT1"]
learning_outcomes:
  - "Compreender complexidade de algoritmos"
  - "Implementar estruturas básicas (listas, pilhas, filas)"
youtube_playlists:
  - id: "PL_abc123" # playlistId do YouTube
    priority: 1
  - id: "PL_def456"
    priority: 2
topics:
  - slug: "estruturas-de-dados"
  - slug: "analise-de-algoritmos"
---

Ementa detalhada, metodologia, bibliografia.
```

### 2.3 Tópico da UC (`content/courses/<curso>/<versao>/uc/<uc_code>/<topic>.md`)

```yaml
---
slug: "estruturas-de-dados"
title: "Estruturas de Dados"
summary: "Conceitos e aplicações."
youtube_playlists:
  - id: "PL_topico_01"
    priority: 1
tags: ["estrutura", "listas", "pilhas"]
---

Conteúdo específico do tópico.
```

> **Nota**: o corpo Markdown de cada ficheiro será persistido no Postgres (coluna `content_md`) para renderização no portal.

---

### 3.3 `.gitignore`

```gitignore
node_modules/
.DS_Store
.env
.env.local
.cache/
```

### 3.9 `config/sync.config.json`

```json
{
  "supabaseUrl": "${SUPABASE_URL}",
  "supabaseAnonKey": "${SUPABASE_ANON_KEY}",
  "schemas": {
    "uc": {
      "match": "content/courses/*/*/uc/*/index.md",
      "mapFrontmatter": {
        "code": "catalog.uc.code",
        "title": "catalog.uc.name",
        "description": "catalog.uc.description",
        "ects": "catalog.uc.ects",
        "semester": "catalog.uc.semester",
        "language": "catalog.uc.language",
        "prerequisites": "catalog.uc.prerequisites",
        "learning_outcomes": "catalog.uc_learning_outcome[]",
        "youtube_playlists": "mapping.uc_playlist[]",
        "topics": "mapping.uc_topic[]"
      },
      "contentField": "catalog.uc_content.content_md"
    },
    "topic": {
      "match": "content/courses/*/*/uc/*/*.md",
      "mapFrontmatter": {
        "slug": "subjects.topic.slug",
        "title": "subjects.topic.name",
        "tags": "subjects.topic_tag[]",
        "youtube_playlists": "mapping.topic_playlist[]"
      },
      "contentField": "subjects.topic_content.content_md"
    }
  }
}
```

> **Observação**: este arquivo mapeia *front‑matter* → colunas no Postgres e define onde o corpo do Markdown é persistido.

### 3.10 `.github/workflows/validate-md.yml`

```yaml
name: Validate Markdown
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run validate
```

### 3.11 `.github/workflows/sync-md-to-supabase.yml`

```yaml
name: Sync MD → Supabase
on:
  push:
    branches: [ main ]
    paths:
      - 'content/**.md'
      - 'config/**'

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Run sync
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
        run: npm run sync:md:db
```

### 3.12 `scripts/utils/supabase.ts`

```ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = () => {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
};
```

---

## 4) Boas práticas

* **Single Source of Truth**: o `.md` é a fonte de verdade editorial; o DB reflete e indexa.
* **PRs obrigatórios**: mudanças estruturais (novas UCs, playlists) passam por revisão via PR.
* **Validação**: o CI bloqueia merges se `lint:md` ou mapeamentos obrigatórios faltarem (ex.: `code`, `plan_version`).
* **Sincronização reversa**: toda ação editorial feita via portal (p.ex. aprovar playlist) deve abrir PR para manter o repositório fiel.
* **i18n**: usar `config/i18n.json` para sinalizar idiomas; variações por idioma podem viver em caminhos paralelos (`content/en/...`).

---

## 5) Variáveis de ambiente (para CI/scripts)

Crie um `.env.local` (não commitado) com:

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
```

No GitHub, configure **Actions Secrets** com as mesmas chaves.

---

## 6) Próximos passos

1. Popular `content/` com os primeiros cursos/UCs.
2. Implementar o `upsertUC` e o upsert de tópicos/playlists.
3. Ligar o `youtube-refresh.ts` à Edge Function/cron.
4. Activar os *workflows* e testar a sincronização ponta‑a‑ponta.
