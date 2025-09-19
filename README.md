# FACODI — Faculdade Comunitária Digital

FACODI é um portal de ensino superior aberto mantido pela comunidade. Todo o conteúdo editorial é versionado em Markdown e publicado como um site estático em [Hugo](https://gohugo.io) utilizando o tema **Doks**. Uma cópia normalizada das informações vive no banco de dados **Supabase**, que é utilizado para renderizar dados dinâmicos nas páginas de cursos, UCs e tópicos.

---

## ✨ Principais recursos

- 📚 Catálogo de cursos com versões de plano curricular.
- 🧭 Navegação Curso → UC → Tópico com conteúdo em Markdown.
- 🎥 Playlists do YouTube associadas a cada UC/tópico (carregadas do Supabase).
- 🗃️ Sincronização automatizada dos arquivos `.md` para o banco Postgres.
- 🌍 Estrutura preparada para internacionalização (PT padrão, EN fallback).

---

## ⚙️ Como rodar localmente

> Pré-requisitos: Node.js 20+, [Hugo Extended](https://gohugo.io/installation/), Supabase CLI (opcional para executar o banco local).

```bash
# Instalar dependências
npm install

# Executar site em modo de desenvolvimento
npm run dev

# Gerar build estática
npm run build
```

Para que os dados dinâmicos apareçam, exporte as variáveis do Supabase antes de iniciar o servidor:

```bash
export SUPABASE_URL="https://<project>.supabase.co"
export SUPABASE_ANON_KEY="<anon-key>"
```

Para executar as rotinas de sincronização ou validar o conteúdo Markdown:

```bash
# Validação de frontmatter
npm run validate:frontmatter

# Sincronizar Markdown → Supabase (usa SUPABASE_SERVICE_KEY)
npm run sync:supabase
```

---

## 📂 Estrutura do projeto

```
facodi.pt/
├─ content/
│  └─ courses/
│     └─ <curso>/<plano>/
│        ├─ index.md           # Metadados do curso
│        └─ uc/<uc>/
│           ├─ index.md        # Metadados da UC
│           └─ <topico>.md     # Metadados do tópico
├─ layouts/
│  ├─ _default/baseof.html     # Layout base com integração Supabase
│  ├─ home.html                # Página inicial (lista de cursos)
│  ├─ course/single.html       # Template de curso
│  ├─ uc/single.html           # Template de UC
│  └─ topic/single.html        # Template de tópico
├─ static/js/
│  ├─ supabaseClient.js        # Instância do cliente Supabase (browser)
│  └─ loaders.js               # Funções para carregar cursos/UCs/tópicos
├─ supabase/
│  ├─ migrations/              # Schemas + RLS
│  └─ seeds/                   # Dados de exemplo (LESTI)
└─ .github/workflows/
   ├─ validate-md.yml          # Valida frontmatter
   └─ sync-md-to-supabase.yml  # Publica conteúdo no banco
```

---

## 🗄️ Banco de dados Supabase

Os migrations definem os schemas `catalog`, `subjects` e `mapping`, contendo as tabelas:

- `catalog.course`, `catalog.course_content`
- `catalog.uc`, `catalog.uc_content`, `catalog.uc_learning_outcome`
- `subjects.topic`, `subjects.topic_content`, `subjects.topic_tag`
- `mapping.uc_topic`, `mapping.uc_playlist`, `mapping.topic_playlist`

Todas as tabelas possuem RLS habilitado com política de leitura pública (`role anon`) e escrita restrita ao `service_role`.

### Executando localmente

```bash
# Inicializar Supabase local
supabase start

# Aplicar migrations e seeds
supabase db reset
```

Após subir o banco, configure as variáveis `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_KEY` no seu ambiente e/ou nos segredos do GitHub.

---

## 🧪 CI/CD

Dois workflows acompanham o projeto:

1. **`validate-md.yml`** — Executa `npm run validate:frontmatter` em pushes e pull requests.
2. **`sync-md-to-supabase.yml`** — Publica o conteúdo Markdown no banco utilizando `SUPABASE_SERVICE_KEY`. Pode ser disparado manualmente (`workflow_dispatch`) ou em pushes para `main`.

---

## 🤝 Contribuição

1. Faça um fork e crie uma branch com sua feature.
2. Garanta que `npm run validate:frontmatter` e `npm run build` estão passando.
3. Abra um Pull Request descrevendo as mudanças.

Consulte também [`CONTRIBUTING.md`](./CONTRIBUTING.md) para orientações gerais.

---

## 📜 Licença

Distribuído sob a licença [MIT](./LICENSE).
