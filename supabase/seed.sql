begin;

insert into catalog.course (code, plan_version, name, degree, ects_total, duration_semesters, institution, school, language, summary)
values (
  'LESTI',
  '2024/2025',
  'Licenciatura em Engenharia de Sistemas e Tecnologias da Informação',
  'bachelor',
  180,
  6,
  'Universidade do Algarve',
  'Escola Superior de Tecnologia',
  'pt',
  'Curso voltado para o desenvolvimento de soluções digitais com forte base em engenharia, programação e sistemas de informação.'
)
on conflict (code, plan_version) do update set
  name = excluded.name,
  degree = excluded.degree,
  ects_total = excluded.ects_total,
  duration_semesters = excluded.duration_semesters,
  institution = excluded.institution,
  school = excluded.school,
  language = excluded.language,
  summary = excluded.summary,
  updated_at = timezone('utc', now());

insert into catalog.course_content (course_code, plan_version, content_md)
values (
  'LESTI',
  '2024/2025',
  $$## Visão Geral

A licenciatura em Engenharia de Sistemas e Tecnologias da Informação (LESTI) combina uma base sólida em matemática e programação com disciplinas de análise e conceção de sistemas.

O plano 2024/2025 enfatiza competências práticas e colaboração em projetos reais, com foco em soluções abertas e acessíveis.$$ 
)
on conflict (course_code, plan_version) do update set
  content_md = excluded.content_md,
  updated_at = timezone('utc', now());

insert into catalog.uc (code, course_code, course_plan_version, name, description, ects, semester, language, prerequisites)
values (
  'LESTI-ALG1',
  'LESTI',
  '2024/2025',
  'Algoritmos e Estruturas de Dados I',
  'Introdução aos fundamentos de algoritmos, análise de complexidade e estruturas de dados lineares.',
  6,
  1,
  'pt',
  array['LESTI-MAT1']
)
on conflict (code) do update set
  course_code = excluded.course_code,
  course_plan_version = excluded.course_plan_version,
  name = excluded.name,
  description = excluded.description,
  ects = excluded.ects,
  semester = excluded.semester,
  language = excluded.language,
  prerequisites = excluded.prerequisites,
  updated_at = timezone('utc', now());

insert into catalog.uc_content (uc_code, content_md)
values (
  'LESTI-ALG1',
  $$## Ementa

- Conceitos básicos de algoritmos e notação assintótica.
- Estruturas de dados lineares: arrays, listas ligadas, pilhas e filas.
- Introdução a árvores e tabelas de dispersão.
- Estratégias iterativas e recursivas de resolução de problemas.$$ 
)
on conflict (uc_code) do update set
  content_md = excluded.content_md,
  updated_at = timezone('utc', now());

-- Limpa resultados antes de inserir seeds for uc learning outcomes and playlists
delete from catalog.uc_learning_outcome where uc_code = 'LESTI-ALG1';
insert into catalog.uc_learning_outcome (uc_code, outcome, "order") values
  ('LESTI-ALG1', 'Compreender a análise de complexidade de algoritmos.', 1),
  ('LESTI-ALG1', 'Implementar estruturas de dados lineares em diferentes linguagens.', 2),
  ('LESTI-ALG1', 'Selecionar a estrutura de dados mais adequada para um problema.', 3);

delete from mapping.uc_playlist where uc_code = 'LESTI-ALG1';
insert into mapping.uc_playlist (uc_code, playlist_id, priority) values
  ('LESTI-ALG1', 'PLlestiALG1Aulas', 1),
  ('LESTI-ALG1', 'PLlestiALG1Exercicios', 2);

-- Insert topic and its related data BEFORE mapping.uc_topic to satisfy FK
insert into subjects.topic (slug, name, summary)
values ('estruturas-de-dados', 'Estruturas de Dados', 'Conceitos fundamentais de armazenamento e manipulação eficiente de dados.')
on conflict (slug) do update set
  name = excluded.name,
  summary = excluded.summary,
  updated_at = timezone('utc', now());

insert into subjects.topic_content (topic_slug, content_md)
values (
  'estruturas-de-dados',
  $$As estruturas de dados definem como a informação é organizada na memória e determinam o desempenho dos algoritmos que as manipulam.

Neste tópico abordamos listas ligadas, pilhas, filas, árvores e mapas, destacando cenários de aplicação e implicações na complexidade temporal.$$ 
)
on conflict (topic_slug) do update set
  content_md = excluded.content_md,
  updated_at = timezone('utc', now());

delete from subjects.topic_tag where topic_slug = 'estruturas-de-dados';
insert into subjects.topic_tag (topic_slug, tag) values
  ('estruturas-de-dados', 'estruturas'),
  ('estruturas-de-dados', 'listas'),
  ('estruturas-de-dados', 'pilhas');

delete from mapping.topic_playlist where topic_slug = 'estruturas-de-dados';
insert into mapping.topic_playlist (topic_slug, playlist_id, priority) values
  ('estruturas-de-dados', 'PLtopicosEstruturas', 1);

-- Now insert mapping between UC and topic (topic exists at this point)
delete from mapping.uc_topic where uc_code = 'LESTI-ALG1';
insert into mapping.uc_topic (uc_code, topic_slug) values
  ('LESTI-ALG1', 'estruturas-de-dados');

commit;
