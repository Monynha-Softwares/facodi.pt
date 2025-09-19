# FACODI — Catálogo de Conteúdo (`facodi-docs`)

Este repositório concentra o conteúdo versionado e a configuração Hugo/Supabase que sustentam o catálogo estático da FACODI. Ele substitui o antigo pacote `facodi.pt`, mantendo apenas Markdown, configurações e automações descritas no plano `facodi-docs`.

A **FACODI** é uma plataforma de aprendizagem aberta que replica planos curriculares da Universidade do Algarve (UAlg) em formato digital. Todo o conteúdo é escrito em Markdown, sincronizado com o Supabase e disponibilizado como um site estático construído com [Hugo](https://gohugo.io/) (tema Doks).

> 🎯 Objetivo: democratizar o acesso ao ensino superior com cursos, unidades curriculares, playlists públicas e conteúdo versionado pela comunidade.

---

## ✨ Principais funcionalidades

- 📚 Catálogo de cursos com planos curriculares completos
- 🎓 Unidades curriculares com ementa, resultados de aprendizagem e tópicos
- 🎥 Playlists abertas do YouTube organizadas por prioridade
- 📝 Conteúdo em Markdown sincronizado automaticamente com o Supabase
- 🌐 Multilíngue (PT, EN, ES e FR, com navegação consistente entre diretórios)

---

## 🧱 Stack

- **Site estático**: Hugo + tema Doks
- **Integração dinâmica**: JavaScript puro consumindo a API do Supabase
- **Base de dados**: PostgreSQL via Supabase (schemas `catalog`, `subjects`, `mapping`)
- **CI/CD**: GitHub Actions para validação de Markdown e sincronização com o banco

---

## 📂 Estrutura do repositório

```bash
facodi-docs/
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
├─ i18n/
│  ├─ pt.toml
│  ├─ en.toml
│  ├─ es.toml
│  └─ fr.toml
├─ layouts/
│  ├─ _default/baseof.html
│  ├─ course/single.html
│  ├─ uc/single.html
│  └─ topic/single.html
├─ static/
│  └─ js/
│     ├─ loaders.js
│     └─ supabaseClient.js
├─ scripts/
│  ├─ validate-frontmatter.js
│  └─ sync-content.mjs
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

## 📐 Arquitetura e separação de responsabilidades

- **Hugo (`facodi-docs`)**: entrega o catálogo estático com i18n, layouts customizados e carregadores JavaScript leves. O build usa apenas variáveis de ambiente fornecidas pela plataforma de deploy, sem chaves persistidas em arquivos de configuração.
- **Portal dinâmico (Next.js)**: continuará responsável por experiências autenticadas e interativas. Ele deverá consumir os mesmos dados do Supabase por meio de chamadas client-side, mantendo a separação entre conteúdo estático e funcionalidades do portal.
- **Automação**: os scripts `validate-frontmatter` e `sync-content` são executados localmente ou via GitHub Actions para garantir que o Markdown siga o esquema Supabase e que a sincronização aconteça apenas a partir do serviço (sem chaves embutidas).

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
