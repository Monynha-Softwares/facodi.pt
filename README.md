# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open-source inspirada nos planos curriculares da Universidade do Algarve (UALG). Nosso objetivo é **democratizar o acesso ao ensino superior** por meio de trilhas de estudo organizadas em cursos, unidades curriculares e playlists públicas.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos com currículos oficiais versionados
- 🎯 Unidades curriculares com tópicos, resultados de aprendizagem e playlists
- 🎥 Integração com playlists do YouTube e carregamento dinâmico via Supabase
- 🗂️ Taxonomias (tags) para navegar conteúdos relacionados
- 🌍 Multi-idioma: **Português** (padrão) com fallback em **Inglês** preparado

---

## 🧱 Stack

- **Gerador estático**: [Hugo](https://gohugo.io) + tema Doks
- **Dados dinâmicos**: [Supabase](https://supabase.com) consumido via JavaScript em `static/js`
- **Estilo**: componentes Bootstrap providos pelo tema + classes personalizadas
- **Deploy**: pronto para Netlify, Cloudflare Pages ou qualquer provedor de conteúdo estático

---

## 📂 Estrutura do repositório

```text
facodi.pt/
├─ config/                 # Configurações Hugo (site, idiomas, parâmetros)
├─ content/
│  ├─ _index.md            # Home PT-BR
│  ├─ courses/             # Cursos, UCs e tópicos em português
│  └─ en/                  # Conteúdos traduzidos (home, catálogo, páginas legais)
├─ layouts/                # Templates Hugo personalizados (home, courses, uc, topic)
├─ i18n/                   # Arquivos de tradução (pt/en)
├─ static/js/              # Integração Supabase (cliente e carregadores)
├─ assets/                 # Estilos e recursos adicionais
├─ package.json            # Scripts `npm run dev` / `npm run build`
└─ netlify.toml            # Configuração de build para deploy
```

Cada curso possui a estrutura `content/courses/<curso>/uc/<uc>/<topico>.md`, conforme recomendado pelo Hugo. Os arquivos ingleses em `content/en/` servem como fallback e indicam quando o conteúdo completo está disponível apenas em português.

---

## 🚀 Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências do tema Doks e Hugo
npm install

# Rodar o servidor com conteúdo em rascunho
npm run dev

# Gerar build estático otimizado
npm run build
```

Os principais scripts disponíveis são:

| Script          | Comando interno                | Descrição                          |
|-----------------|--------------------------------|------------------------------------|
| `npm run dev`   | `hugo server --disableFastRender --noHTTPCache` | Servidor local em modo watch      |
| `npm run build` | `hugo --minify --gc`           | Build final para produção          |

---

## 🌍 Internacionalização

- `config/_default/languages.toml` define **Português** como idioma padrão e **Inglês** como fallback.
- Textos fixos das interfaces ficam em `i18n/pt.yaml` e `i18n/en.yaml`.
- Páginas traduzidas utilizam a chave `translationKey` no front matter para relacionar versões PT/EN.
- Caso um conteúdo ainda não tenha tradução, o layout exibe mensagens amigáveis sugerindo a troca de idioma.

Para adicionar uma nova tradução:

1. Crie o arquivo em `content/<idioma>/…` com a mesma `translationKey` do conteúdo original.
2. Adicione as strings necessárias em `i18n/<idioma>.yaml`.
3. Verifique no menu se o idioma aparece corretamente.

---

## 🧾 Conteúdo dinâmico (Supabase)

Os arquivos em `static/js/` consomem dados do Supabase quando a página possui atributos `data-course`, `data-uc` ou `data-topic` definidos no elemento `<body>`. Configure as variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY` via variáveis de ambiente ou em `config/_default/params.toml` para habilitar o carregamento dinâmico.

---

## 🤝 Contribuindo

FACODI é open-source! Você pode contribuir de várias formas:

1. Faça fork do projeto e abra um Pull Request.
2. Relate bugs ou sugira features em [Issues](../../issues).
3. Traduza conteúdos (PT ↔ EN) e atualize os arquivos em `i18n/`.
4. Ajude a revisar planos curriculares, playlists e tópicos sugeridos pela comunidade.

Consulte nosso guia em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## 👩‍💻 Autores & Créditos

- [Marcelo Santos](https://github.com/marcelo-m7) — fundador do projeto
- Comunidade Monynha Softwares
- Base acadêmica: planos curriculares da [UALG](https://www.ualg.pt)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**. Consulte o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

---
