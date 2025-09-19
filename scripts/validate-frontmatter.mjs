#!/usr/bin/env node
import fg from "fast-glob";
import matter from "gray-matter";
import { readFile } from "node:fs/promises";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content", "courses");

function assertArray(value) {
  return Array.isArray(value) ? value : [];
}

function validatePlaylists(items, context) {
  const errors = [];
  items.forEach((item, idx) => {
    if (typeof item?.id !== "string" || item.id.trim() === "") {
      errors.push(`${context}: playlist[${idx}] precisa de um campo 'id' (string).`);
    }
    if (item?.priority != null && Number.isNaN(Number(item.priority))) {
      errors.push(`${context}: playlist[${idx}] possui 'priority' inválido.`);
    }
  });
  return errors;
}

async function main() {
  const files = await fg(["**/*.md"], { cwd: contentRoot, dot: false });
  const errors = [];

  for (const relativeFile of files) {
    const fullPath = path.join(contentRoot, relativeFile);
    const raw = await readFile(fullPath, "utf8");
    const { data } = matter(raw);
    const normalized = relativeFile.replace(/\\/g, "/");
    const baseName = path.posix.basename(normalized);

    if (baseName.startsWith("_")) {
      continue;
    }

    if (normalized.endsWith("index.md")) {
      if (normalized.includes("/uc/")) {
        const required = [
          "title",
          "code",
          "course_code",
          "plan_version",
          "ects",
          "semester",
          "language",
        ];
        required.forEach((field) => {
          if (!data[field]) {
            errors.push(`${normalized}: campo obrigatório '${field}' ausente.`);
          }
        });
        const outcomes = assertArray(data.learning_outcomes);
        if (outcomes.length === 0) {
          errors.push(`${normalized}: adicione pelo menos um item em 'learning_outcomes'.`);
        }
        const playlistErrors = validatePlaylists(assertArray(data.youtube_playlists), normalized);
        errors.push(...playlistErrors);
      } else {
        const required = [
          "title",
          "code",
          "plan_version",
          "degree",
          "ects_total",
          "duration_semesters",
          "institution",
          "school",
          "language",
          "summary",
        ];
        required.forEach((field) => {
          if (!data[field]) {
            errors.push(`${normalized}: campo obrigatório '${field}' ausente.`);
          }
        });
      }
    } else {
      const required = ["title", "slug", "summary"];
      required.forEach((field) => {
        if (!data[field]) {
          errors.push(`${normalized}: campo obrigatório '${field}' ausente.`);
        }
      });
      const tags = assertArray(data.tags);
      if (tags.length === 0) {
        errors.push(`${normalized}: informe pelo menos uma tag.`);
      }
      const playlistErrors = validatePlaylists(assertArray(data.youtube_playlists), normalized);
      errors.push(...playlistErrors);
    }
  }

  if (errors.length > 0) {
    console.error("Falha na validação do frontmatter:\n" + errors.map((err) => `- ${err}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Frontmatter válido para todos os arquivos de conteúdo.");
  }
}

main().catch((error) => {
  console.error("Erro ao validar frontmatter:", error);
  process.exitCode = 1;
});
