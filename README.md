# FACODI — Faculdade Comunitária Digital

**FACODI** é uma plataforma EAD gratuita e open-source inspirada nos planos curriculares da Universidade do Algarve (UALG). Nosso objetivo é **democratizar o acesso ao ensino superior** por meio de trilhas de estudo organizadas em cursos, unidades curriculares e playlists do YouTube.

🚀 Projeto mantido pela [Monynha Softwares](https://monynha.com).

---

## ✨ Funcionalidades

- 📚 Catálogo de cursos com planos curriculares completos;
- 🎓 Unidades curriculares com resultados de aprendizagem e conteúdos em Markdown;
- 🎥 Playlists do YouTube selecionadas pela comunidade para cada tópico;
- 🔁 Sincronização opcional com banco de dados **Supabase** para manter o conteúdo atualizado;
- 🌍 Estrutura preparada para múltiplos idiomas (PT como padrão, EN como fallback).

---

## 🏗️ Stack

- **Site estático**: [Hugo](https://gohugo.io) com o tema [Doks](https://getdoks.org);
- **Estilos**: Bootstrap + SCSS fornecidos pelo tema;
- **Scripts**: JavaScript vanilla com integração opcional ao Supabase;
- **Banco de dados**: [Supabase](https://supabase.com) (PostgreSQL) para replicar o conteúdo do Markdown.

---

## 📂 Estrutura do repositório

```
facodi.pt/
├─ config/
│  └─ _default/        # Configuração do Hugo (idiomas, menus, parâmetros)
├─ content/
│  └─ courses/         # Cursos, UCs e tópicos em Markdown
├─ layouts/            # Templates Hugo (páginas de cursos, UCs e tópicos)
├─ static/js/          # Scripts de integração (Supabase + loaders)
├─ assets/             # SCSS/JS processados pelo tema
├─ package.json        # Scripts utilitários (hugo server/hugo build)
└─ README.md
```

Cada curso segue a estrutura `content/courses/<curso>/<versao>/`. Dentro de cada curso existem as pastas `uc/<CODIGO>/` com `index.md` (informações da UC) e arquivos adicionais para os tópicos.

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt

# Instalar dependências do tema Doks
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O site ficará disponível em `http://localhost:1313`. As alterações nos arquivos Markdown e layouts são recarregadas automaticamente.

### Variáveis de ambiente para Supabase

Para habilitar a leitura de conteúdo diretamente do Supabase, defina as variáveis antes de rodar o Hugo (ou configure-as no ambiente de deploy):

```
export SUPABASE_URL="https://<sua-instancia>.supabase.co"
export SUPABASE_ANON_KEY="<chave_anon_publica>"
```

Sem essas variáveis, o site utiliza apenas os dados estáticos presentes no repositório.

---

## 🤝 Contribuindo

FACODI é open-source! Você pode contribuir de várias formas:

1. Abrindo Pull Requests com correções ou novas páginas;
2. Relatando bugs ou sugerindo funcionalidades em [Issues](../../issues);
3. Traduzindo conteúdos (PT → EN/ES/FR);
4. Revisando planos curriculares e trilhas de estudo.

Consulte nosso guia em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## 👩‍💻 Autores & Créditos

- [Marcelo Santos](https://github.com/marcelosantos) — fundador do projeto
- Comunidade Monynha Softwares
- Base acadêmica: planos curriculares da [UALG](https://www.ualg.pt)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**. Veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.
