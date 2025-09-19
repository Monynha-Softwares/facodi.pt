#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

const CONTENT_ROOT = path.resolve('content');
const SUPPORTED_LANGS = ['pt', 'en', 'es', 'fr'];
const LANGUAGE_PRIORITY = {
  pt: 0,
  en: 1,
  es: 2,
  fr: 3,
};
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Defina SUPABASE_URL e SUPABASE_SERVICE_KEY para sincronizar o conteúdo.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false,
  },
});

const courseRecords = new Map();
const courseContents = new Map();
const ucRecords = new Map();
const ucContents = new Map();
const ucOutcomes = new Map();
const ucPlaylists = new Map();
const ucTopics = new Map();
const topicRecords = new Map();
const topicContents = new Map();
const topicTags = new Map();
const topicPlaylists = new Map();

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function walk(dir, lang) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, lang);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      await parseMarkdown(fullPath, lang);
    }
  }
}

function normalizePlanFromDir(dirName) {
  if (!dirName) return dirName;
  if (dirName.includes('/')) return dirName;
  return dirName.replace('-', '/');
}

function getPriority(language, fallbackLang) {
  const normalized = (language || '').toLowerCase();
  if (normalized) {
    const base = normalized.split('-')[0];
    if (LANGUAGE_PRIORITY[base] !== undefined) {
      return LANGUAGE_PRIORITY[base];
    }
  }
  const fallback = (fallbackLang || '').toLowerCase();
  if (LANGUAGE_PRIORITY[fallback] !== undefined) {
    return LANGUAGE_PRIORITY[fallback];
  }
  return 99;
}

function setBest(map, key, value, priority) {
  if (value === undefined || value === null) {
    return;
  }
  const existing = map.get(key);
  if (!existing || priority <= existing.priority) {
    map.set(key, { priority, value });
  }
}

function mapToArray(map) {
  return Array.from(map.values()).map((entry) => entry.value);
}

function flattenMapValues(map) {
  const result = [];
  map.forEach(({ value }) => {
    if (Array.isArray(value)) {
      result.push(...value);
    } else if (value) {
      result.push(value);
    }
  });
  return result;
}

async function parseMarkdown(fullPath, lang) {
  const langRoot = path.join(CONTENT_ROOT, lang);
  const relPath = toPosix(path.relative(langRoot, fullPath));
  if (!relPath || relPath === '_index.md' || !relPath.startsWith('courses/')) {
    return;
  }

  const raw = await fs.readFile(fullPath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data || {};
  const content = parsed.content.trim();
  const priority = getPriority(data.language, lang);

  if (/^courses\/[^/]+\/[^/]+\/index\.md$/i.test(relPath)) {
    const segments = relPath.split('/');
    const codeFromPath = segments[1];
    const planDir = segments[2];
    const code = data.code || codeFromPath;
    const planVersion = data.plan_version || normalizePlanFromDir(planDir);
    const record = {
      code,
      plan_version: planVersion,
      name: data.title || '',
      degree: data.degree || '',
      ects_total: data.ects_total ?? null,
      duration_semesters: data.duration_semesters ?? null,
      institution: data.institution || null,
      school: data.school || null,
      language: data.language || lang,
      summary: data.summary || null,
    };
    const key = `${record.code}__${record.plan_version}`;
    setBest(courseRecords, key, record, priority);
    setBest(
      courseContents,
      key,
      {
        course_code: record.code,
        plan_version: record.plan_version,
        content_md: content,
      },
      priority,
    );
  } else if (/^courses\/[^/]+\/[^/]+\/uc\/[^/]+\/index\.md$/i.test(relPath)) {
    const segments = relPath.split('/');
    const courseCodeFromPath = segments[1];
    const planDir = segments[2];
    const ucCodeFromPath = segments[4];
    const planVersion = normalizePlanFromDir(data.plan_version || planDir);
    const courseCode = data.course_code || courseCodeFromPath;
    const ucCode = data.code || ucCodeFromPath;

    const ucRecord = {
      code: ucCode,
      course_code: courseCode,
      course_plan_version: planVersion,
      name: data.title || '',
      description: data.description || null,
      ects: data.ects ?? null,
      semester: data.semester ?? null,
      language: data.language || lang,
      prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : [],
    };

    setBest(ucRecords, ucCode, ucRecord, priority);
    setBest(
      ucContents,
      ucCode,
      {
        uc_code: ucCode,
        content_md: content,
      },
      priority,
    );

    const outcomes = [];
    if (Array.isArray(data.learning_outcomes)) {
      data.learning_outcomes.forEach((outcome, index) => {
        if (typeof outcome === 'string' && outcome.trim().length > 0) {
          outcomes.push({
            uc_code: ucCode,
            outcome,
            order: index + 1,
          });
        }
      });
    }
    setBest(ucOutcomes, ucCode, outcomes, priority);

    const playlists = [];
    if (Array.isArray(data.youtube_playlists)) {
      data.youtube_playlists.forEach((playlist) => {
        if (playlist && playlist.id) {
          playlists.push({
            uc_code: ucCode,
            playlist_id: playlist.id,
            priority: playlist.priority ?? null,
          });
        }
      });
    }
    setBest(ucPlaylists, ucCode, playlists, priority);

    const topics = [];
    if (Array.isArray(data.topics)) {
      data.topics.forEach((topic) => {
        const slug = typeof topic === 'string' ? topic : topic && topic.slug;
        if (slug) {
          topics.push({
            uc_code: ucCode,
            topic_slug: slug,
          });
        }
      });
    }
    setBest(ucTopics, ucCode, topics, priority);
  } else if (/^courses\/[^/]+\/[^/]+\/uc\/[^/]+\/[^/]+\.md$/i.test(relPath)) {
    const fileName = path.basename(relPath);
    if (fileName.toLowerCase() === 'index.md') {
      return;
    }
    const segments = relPath.split('/');
    const ucCodeFromPath = segments[4];
    const slugFromPath = fileName.replace(/\.md$/, '');

    const slug = data.slug || slugFromPath;
    const topicRecord = {
      slug,
      name: data.title || slug,
      summary: data.summary || null,
    };

    setBest(topicRecords, slug, topicRecord, priority);
    setBest(
      topicContents,
      slug,
      {
        topic_slug: slug,
        content_md: content,
      },
      priority,
    );

    const tags = [];
    if (Array.isArray(data.tags)) {
      data.tags.forEach((tag) => {
        if (typeof tag === 'string' && tag.trim().length > 0) {
          tags.push({ topic_slug: slug, tag });
        }
      });
    }
    setBest(topicTags, slug, tags, priority);

    const playlists = [];
    if (Array.isArray(data.youtube_playlists)) {
      data.youtube_playlists.forEach((playlist) => {
        if (playlist && playlist.id) {
          playlists.push({
            topic_slug: slug,
            playlist_id: playlist.id,
            priority: playlist.priority ?? null,
          });
        }
      });
    }
    setBest(topicPlaylists, slug, playlists, priority);
  }
}

async function upsert(table, rows, options = {}) {
  if (!rows.length) return;
  const { error } = await supabase.from(table).upsert(rows, options);
  if (error) {
    throw new Error(`Erro ao sincronizar ${table}: ${error.message}`);
  }
}

async function insert(table, rows) {
  if (!rows.length) return;
  const { error } = await supabase.from(table).insert(rows);
  if (error) {
    throw new Error(`Erro ao inserir em ${table}: ${error.message}`);
  }
}

async function purge(table, column, values) {
  if (!values.length) return;
  for (const value of values) {
    const { error } = await supabase.from(table).delete().eq(column, value);
    if (error) {
      throw new Error(`Erro ao limpar ${table} (${column}=${value}): ${error.message}`);
    }
  }
}

async function main() {
  for (const lang of SUPPORTED_LANGS) {
    const langRoot = path.join(CONTENT_ROOT, lang);
    try {
      const stats = await fs.stat(langRoot);
      if (!stats.isDirectory()) {
        continue;
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        continue;
      }
      throw err;
    }
    await walk(langRoot, lang);
  }

  console.log('🔄 Iniciando sincronização com Supabase…');

  const courseRecordArray = mapToArray(courseRecords);
  const courseContentArray = mapToArray(courseContents);
  const ucRecordArray = mapToArray(ucRecords);
  const ucContentArray = mapToArray(ucContents);
  const topicRecordArray = mapToArray(topicRecords);
  const topicContentArray = mapToArray(topicContents);

  const ucOutcomesArray = flattenMapValues(ucOutcomes);
  const ucPlaylistsArray = flattenMapValues(ucPlaylists);
  const ucTopicsArray = flattenMapValues(ucTopics);
  const topicTagsArray = flattenMapValues(topicTags);
  const topicPlaylistsArray = flattenMapValues(topicPlaylists);

  await upsert('catalog.course', courseRecordArray, { onConflict: 'code,plan_version' });
  await upsert('catalog.course_content', courseContentArray, { onConflict: 'course_code,plan_version' });
  await upsert('catalog.uc', ucRecordArray, { onConflict: 'code' });
  await upsert('catalog.uc_content', ucContentArray, { onConflict: 'uc_code' });
  await upsert('subjects.topic', topicRecordArray, { onConflict: 'slug' });
  await upsert('subjects.topic_content', topicContentArray, { onConflict: 'topic_slug' });

  const ucCodes = Array.from(ucRecords.keys());
  await purge('catalog.uc_learning_outcome', 'uc_code', ucCodes);
  await purge('mapping.uc_playlist', 'uc_code', ucCodes);
  await purge('mapping.uc_topic', 'uc_code', ucCodes);

  await insert('catalog.uc_learning_outcome', ucOutcomesArray);
  await insert('mapping.uc_playlist', ucPlaylistsArray);
  await insert('mapping.uc_topic', ucTopicsArray);

  const topicSlugs = Array.from(topicRecords.keys());
  await purge('subjects.topic_tag', 'topic_slug', topicSlugs);
  await purge('mapping.topic_playlist', 'topic_slug', topicSlugs);

  await insert('subjects.topic_tag', topicTagsArray);
  await insert('mapping.topic_playlist', topicPlaylistsArray);

  console.log('✅ Sincronização concluída com sucesso.');
}

main().catch((err) => {
  console.error('❌ Falha na sincronização:', err.message);
  process.exit(1);
});
