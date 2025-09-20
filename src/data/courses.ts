export interface CourseSummary {
  code: string;
  name: string;
  degree: string;
  duration: string;
  ects: number;
  summary: string;
  highlights: string[];
}

export const featuredCourses: CourseSummary[] = [
  {
    code: 'LESTI',
    name: 'Licenciatura em Engenharia de Sistemas e Tecnologias da Informação',
    degree: 'Bacharelado',
    duration: '6 semestres',
    ects: 180,
    summary:
      'Currículo completo inspirado na UALG com foco em fundamentos sólidos de programação, bases de dados e engenharia de software.',
    highlights: [
      'Trilhas por playlists públicas',
      'Planos curriculares atualizados anualmente',
      'Projetos colaborativos com mentoria da comunidade'
    ]
  },
  {
    code: 'LEMAT',
    name: 'Licenciatura em Matemática Aplicada e Computacional',
    degree: 'Bacharelado',
    duration: '6 semestres',
    ects: 180,
    summary:
      'Formação que integra modelagem matemática, estatística e programação para resolver problemas reais com foco em ciência de dados.',
    highlights: [
      'Ênfase em probabilidade, estatística e otimização',
      'Laboratórios práticos com Python e R',
      'Comunidade ativa para resolução de desafios semanais'
    ]
  },
  {
    code: 'TESP-UX',
    name: 'Tecnólogo em Experiência do Usuário e Produto Digital',
    degree: 'Tecnólogo',
    duration: '4 semestres',
    ects: 120,
    summary:
      'Percurso centrado no usuário com pesquisa qualitativa, design de interface e métricas de produto para apps modernos.',
    highlights: [
      'Workshops com especialistas convidados',
      'Projetos guiados com feedback contínuo',
      'Laboratório de acessibilidade e testes de usabilidade'
    ]
  }
];
