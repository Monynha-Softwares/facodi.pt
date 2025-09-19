insert into catalog.course (code, plan_version, name, degree, ects_total, duration_semesters, institution, school, language, summary)
values (
  'LESTI',
  '2024/2025',
  'Licenciatura em Engenharia de Software e Tecnologia de Informação',
  'bachelor',
  180,
  6,
  'Universidade do Algarve',
  'Escola Superior de Tecnologia',
  'pt',
  'Curso focado em formar profissionais capazes de projetar, implementar e manter sistemas de software com foco em impacto social.'
)
on conflict (code, plan_version) do update set
  name = excluded.name,
  degree = excluded.degree,
  ects_total = excluded.ects_total,
  duration_semesters = excluded.duration_semesters,
  institution = excluded.institution,
  school = excluded.school,
  language = excluded.language,
  summary = excluded.summary;

insert into catalog.course_content (course_code, plan_version, content_md)
values (
  'LESTI',
  '2024/2025',
  $$O plano curricular foi adaptado para oferecer uma experiência aberta e colaborativa. Cada unidade curricular possui playlists, tópicos e resultados de aprendizagem acompanhados por voluntários da comunidade.$$)
on conflict (course_code, plan_version) do update set
  content_md = excluded.content_md;

insert into catalog.uc (code, course_code, plan_version, name, description, ects, semester, language, prerequisites)
values (
  'LESTI-ALG1',
  'LESTI',
  '2024/2025',
  'Algoritmos I',
  'Introdução a análise e implementação de algoritmos fundamentais.',
  6,
  1,
  'pt',
  '{}'
)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  ects = excluded.ects,
  semester = excluded.semester,
  language = excluded.language,
  prerequisites = excluded.prerequisites;

insert into catalog.uc_content (uc_code, content_md)
values (
  'LESTI-ALG1',
  $$Esta unidade curricular introduz fundamentos de algoritmos, estruturando a aprendizagem com foco em resolução de problemas e uso de linguagens de programação de alto nível.$$)
on conflict (uc_code) do update set
  content_md = excluded.content_md;

delete from catalog.uc_learning_outcome where uc_code = 'LESTI-ALG1';
insert into catalog.uc_learning_outcome (uc_code, outcome, "order")
values
  ('LESTI-ALG1', 'Aplicar princípios de análise de algoritmos para resolver problemas estruturados.', 1),
  ('LESTI-ALG1', 'Comparar estruturas de dados básicas identificando vantagens e limitações.', 2),
  ('LESTI-ALG1', 'Implementar algoritmos iterativos e recursivos utilizando boas práticas de código.', 3);

delete from mapping.uc_playlist where uc_code = 'LESTI-ALG1';
insert into mapping.uc_playlist (uc_code, playlist_id, priority)
values ('LESTI-ALG1', 'PL123456789ALG1', 1);

insert into subjects.topic (slug, name, summary)
values ('estruturas-de-dados', 'Estruturas de Dados', 'Introdução a listas, pilhas, filas e árvores para organizar informação.')
on conflict (slug) do update set
  name = excluded.name,
  summary = excluded.summary;

insert into subjects.topic_content (topic_slug, content_md)
values ('estruturas-de-dados', $$Aprofundamos listas ligadas, pilhas, filas e árvores binárias, sempre relacionando a escolha da estrutura ao tipo de problema a ser resolvido.$$)
on conflict (topic_slug) do update set
  content_md = excluded.content_md;

delete from subjects.topic_tag where topic_slug = 'estruturas-de-dados';
insert into subjects.topic_tag (topic_slug, tag)
values
  ('estruturas-de-dados', 'algoritmos'),
  ('estruturas-de-dados', 'estrutura-de-dados');

delete from mapping.uc_topic where uc_code = 'LESTI-ALG1';
insert into mapping.uc_topic (uc_code, topic_slug)
values ('LESTI-ALG1', 'estruturas-de-dados');

delete from mapping.topic_playlist where topic_slug = 'estruturas-de-dados';
insert into mapping.topic_playlist (topic_slug, playlist_id, priority)
values ('estruturas-de-dados', 'PL987654321TOPICO', 1);
