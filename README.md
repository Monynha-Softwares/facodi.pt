# FACODI — Faculdade Comunitária Digital

A **FACODI** é uma plataforma de aprendizagem aberta que replica planos curriculares da Universidade do Algarve (UAlg) em formato digital. Todo o conteúdo é escrito em Markdown, sincronizado com o Supabase e disponibilizado como um site estático construído com [Hugo](https://gohugo.io/) (tema Doks).

> 🎯 Objetivo: democratizar o acesso ao ensino superior com cursos, unidades curriculares, playlists públicas e conteúdo versionado pela comunidade.

---

## ✨ Principais funcionalidades

- 📚 Catálogo de cursos com planos curriculares completos
- 🎓 Unidades curriculares com ementa, resultados de aprendizagem e tópicos
- 🎥 Playlists abertas do YouTube organizadas por prioridade
- 📝 Conteúdo em Markdown sincronizado automaticamente com o Supabase
- 🌐 Multilíngue (PT, EN, ES e FR)

---

## 🧱 Stack

- **Site estático**: Hugo + tema Doks
- **Integração dinâmica**: JavaScript puro consumindo a API do Supabase
- **Base de dados**: PostgreSQL via Supabase (schemas `catalog`, `subjects`, `mapping`)
- **CI/CD**: GitHub Actions para validação de Markdown e sincronização com o banco

---

## 🧭 Separação de responsabilidades

- **Hugo (`facodi.pt`)**: mantém o catálogo estático em Markdown, gera as páginas multilíngues e apenas injeta as variáveis públicas do Supabase recebidas no ambiente de deploy.
- **Supabase**: armazena o conteúdo normalizado (cursos, UCs, tópicos, playlists) e expõe APIs autenticadas por `anon`/`service`. As chaves continuam definidas exclusivamente como _secrets_.
- **Portal Next.js (futuro)**: consumirá esses dados de forma dinâmica, com autenticação e experiências interativas sem misturar runtime React com o build do Hugo.

Essa divisão garante que o catálogo estático permaneça simples, seguro e versionável, enquanto o portal evolui com funcionalidades ricas sobre a mesma base de dados.

---

## 📂 Estrutura do repositório

```bash
facodi.pt/
├─ README.md
├─ config/
│  └─ _default/
├─ content/
│  ├─ pt/
│  │  ├─ _index.md
│  │  └─ courses/
│  │     └─ LESTI/
│  │        └─ 2024-2025/
│  │           ├─ index.md           # Curso
│  │           └─ uc/
│  │              └─ LESTI-ALG1/
│  │                 ├─ index.md     # Unidade curricular
│  │                 └─ estruturas-de-dados.md  # Tópico
│  ├─ en/_index.md
│  ├─ es/_index.md
│  └─ fr/_index.md
├─ layouts/
│  ├─ _default/baseof.html
│  ├─ course/single.html
│  ├─ uc/single.html
│  └─ topic/single.html
├─ static/
│  └─ js/
│     ├─ loaders.js
│     └─ supabaseClient.js
├─ supabase/
│  ├─ migrations/
│  │  └─ ... sql
│  └─ seed.sql
└─ .github/
   └─ workflows/
      ├─ sync-md-to-supabase.yml
      └─ validate-md.yml
```

---

## 🛠️ Scripts disponíveis

| Script | Descrição |
| ------ | --------- |
| `npm run dev` | Inicia `hugo server -D` com *hot reload* |
| `npm run build` | Gera os artefatos estáticos com `hugo` |
| `npm run lint:content` | Valida o frontmatter dos arquivos Markdown |
| `npm run sync:content` | Sincroniza Markdown → Supabase (usa `SUPABASE_SERVICE_KEY`) |

---

## 🚀 Desenvolvimento local

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente** (exemplo usando Linux/macOS):
   ```bash
   export SUPABASE_URL="https://<seu-projeto>.supabase.co"
   export SUPABASE_ANON_KEY="<chave-publica>"
   export SUPABASE_SERVICE_KEY="<chave-service-role>"
   ```

3. **Suba o servidor Hugo:**
   ```bash
   npm run dev
   ```

4. **(Opcional) Sincronize conteúdo com o banco:**
   ```bash
   npm run sync:content
   ```

> As chaves **anon** e **service** também são usadas nos workflows do GitHub (definidas como *repository secrets*).

---

## 🧪 Qualidade e CI

- `validate-md.yml`: valida campos obrigatórios do frontmatter em cada PR.
- `sync-md-to-supabase.yml`: executa o script de sincronização (`npm run sync:content`) sempre que a branch principal recebe alterações.

Ambos os workflows exigem as variáveis `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_KEY` configuradas como *secrets*.

---

## 🤝 Como contribuir

1. Faça um fork do repositório
2. Crie uma branch com a sua contribuição
3. Garanta que os testes/scripts passam
4. Abra um Pull Request descrevendo as mudanças

Consulte também [`CONTRIBUTING.md`](./CONTRIBUTING.md) para orientações gerais.

---

## 👥 Créditos

- Projeto mantido pela [Monynha Softwares](https://monynha.com)
- Conteúdo inspirado nos planos curriculares da [Universidade do Algarve](https://www.ualg.pt)
- Comunidade FACODI ❤️

---

## 📜 Licença

Distribuído sob a licença [MIT](./LICENSE).
