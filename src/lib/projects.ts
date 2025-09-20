export type Project = {
  id: string;
  title: string;
  summary: string;
  status: 'ativo' | 'prototipo' | 'laboratorio';
  link?: string;
};

export const projects: Project[] = [
  {
    id: 'atlas-dados-abertos',
    title: 'Atlas de Dados Abertos',
    summary: 'Monitoramento de dados públicos com painéis interativos e curadoria da comunidade.',
    status: 'ativo',
    link: 'https://github.com/facodi'
  },
  {
    id: 'lab-midia-educativa',
    title: 'Laboratório de Mídia Educativa',
    summary: 'Produção colaborativa de recursos audiovisuais acessíveis para cursos livres e oficinas.',
    status: 'laboratorio'
  },
  {
    id: 'plataforma-mentorias',
    title: 'Plataforma de Mentorias FACODI',
    summary: 'Rede de mentorias entre estudantes e profissionais para projetos open-source e carreiras.',
    status: 'prototipo'
  }
];
