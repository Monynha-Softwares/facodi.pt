#!/usr/bin/env node
import fg from "fast-glob";
import matter from "gray-matter";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_KEY para sincronizar o conteúdo.");
  process.exit(1);
}

const client = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
const contentRoot = path.join(process.cwd(), "content", "courses");

const courses = [];
const courseContents = [];
const ucs = [];
const ucContents = [];
const ucOutcomes = [];
const ucPlaylists = [];
const ucTopics = [];
const topics = [];
const topicContents = [];
const topicTags = [];
const topicPlaylists = [];

const ucDirMap = new Map();

function assertArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeContent(content) {
  return content.trim();
}

async function loadIndexFiles() {
  const files = await fg(["**/index.md"], { cwd: contentRoot, dot: false });
  for (const relativeFile of files) {
    const normalized = relativeFile.replace(/\\/g, "/");
    const fullPath = path.join(contentRoot, relativeFile);
    const raw = await readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    if (normalized.includes("/uc/")) {
      const ucData = {
        code: data.code,
        course_code: data.course_code,
        plan_version: data.plan_version,
        name: data.title,
        description: data.description ?? data.summary ?? "",
        ects: data.ects ?? null,
        semester: data.semester ?? null,
        language: data.language ?? null,
        prerequisites: assertArray(data.prerequisites ?? []),
      };
      ucs.push(ucData);
      ucContents.push({ uc_code: data.code, content_md: normalizeContent(content) });
      const dir = path.posix.dirname(normalized);
      ucDirMap.set(dir, {
        code: data.code,
        course_code: data.course_code,
        plan_version: data.plan_version,
      });
      assertArray(data.learning_outcomes).forEach((outcome, index) => {
        ucOutcomes.push({ uc_code: data.code, outcome, order: index + 1 });
      });
      assertArray(data.youtube_playlists).forEach((playlist) => {
        if (playlist?.id) {
          ucPlaylists.push({ uc_code: data.code, playlist_id: playlist.id, priority: playlist.priority ?? null });
        }
      });
    } else {
      const courseData = {
        code: data.code,
        plan_version: data.plan_version,
        name: data.title,
        degree: data.degree ?? null,
        ects_total: data.ects_total ?? null,
        duration_semesters: data.duration_semesters ?? null,
        institution: data.institution ?? null,
        school: data.school ?? null,
        language: data.language ?? null,
        summary: data.summary ?? "",
      };
      courses.push(courseData);
      courseContents.push({ course_code: data.code, plan_version: data.plan_version, content_md: normalizeContent(content) });
    }
  }
}

async function loadTopicFiles() {
  const files = await fg(["**/*.md", "!**/index.md"], { cwd: contentRoot, dot: false });
  for (const relativeFile of files) {
    const normalized = relativeFile.replace(/\\/g, "/");
    const fullPath = path.join(contentRoot, relativeFile);
    const raw = await readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const ucDir = path.posix.dirname(normalized);
    const ucInfo = ucDirMap.get(ucDir);
    if (!ucInfo) {
      console.warn(`Ignorando tópico ${normalized}: UC associada não encontrada.`);
      continue;
    }
    topics.push({ slug: data.slug, name: data.title, summary: data.summary ?? "" });
    topicContents.push({ topic_slug: data.slug, content_md: normalizeContent(content) });
    assertArray(data.tags).forEach((tag) => {
      topicTags.push({ topic_slug: data.slug, tag });
    });
    assertArray(data.youtube_playlists).forEach((playlist) => {
      if (playlist?.id) {
        topicPlaylists.push({ topic_slug: data.slug, playlist_id: playlist.id, priority: playlist.priority ?? null });
      }
    });
    ucTopics.push({ uc_code: ucInfo.code, topic_slug: data.slug });
  }
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const groupKey = item[key];
    if (!groupKey) return acc;
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

async function replaceRows(table, keyField, groups) {
  for (const [key, rows] of Object.entries(groups)) {
    await client.from(table).delete().eq(keyField, key);
    if (rows.length > 0) {
      const { error } = await client.from(table).insert(rows);
      if (error) throw error;
    }
  }
}

async function sync() {
  await loadIndexFiles();
  await loadTopicFiles();

  if (courses.length > 0) {
    const { error } = await client.from("catalog.course").upsert(courses, { onConflict: "code,plan_version" });
    if (error) throw error;
  }
  if (courseContents.length > 0) {
    const { error } = await client
      .from("catalog.course_content")
      .upsert(courseContents, { onConflict: "course_code,plan_version" });
    if (error) throw error;
  }
  if (ucs.length > 0) {
    const { error } = await client.from("catalog.uc").upsert(ucs, { onConflict: "code" });
    if (error) throw error;
  }
  if (ucContents.length > 0) {
    const { error } = await client.from("catalog.uc_content").upsert(ucContents, { onConflict: "uc_code" });
    if (error) throw error;
  }
  if (topics.length > 0) {
    const { error } = await client.from("subjects.topic").upsert(topics, { onConflict: "slug" });
    if (error) throw error;
  }
  if (topicContents.length > 0) {
    const { error } = await client.from("subjects.topic_content").upsert(topicContents, { onConflict: "topic_slug" });
    if (error) throw error;
  }

  await replaceRows("catalog.uc_learning_outcome", "uc_code", groupBy(ucOutcomes, "uc_code"));
  await replaceRows("mapping.uc_playlist", "uc_code", groupBy(ucPlaylists, "uc_code"));
  await replaceRows("mapping.uc_topic", "uc_code", groupBy(ucTopics, "uc_code"));
  await replaceRows("subjects.topic_tag", "topic_slug", groupBy(topicTags, "topic_slug"));
  await replaceRows("mapping.topic_playlist", "topic_slug", groupBy(topicPlaylists, "topic_slug"));

  console.log("Sincronização concluída com sucesso.");
}

sync().catch((error) => {
  console.error("Erro ao sincronizar conteúdo com o Supabase:", error);
  process.exitCode = 1;
});
