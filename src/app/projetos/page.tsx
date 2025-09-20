import dynamic from 'next/dynamic';

import { defaultLanguage, siteCopy } from '@/config/i18n';

import type { Metadata } from 'next';

const copy = siteCopy[defaultLanguage];

export const metadata: Metadata = {
  title: `${copy.projects.title} · FACODI`,
  description: copy.projects.description,
};

const ProjectsContent = dynamic(
  () => import('@/components/sections/projects-content').then((mod) => mod.ProjectsContent),
  {
    loading: () => (
      <div className="mx-auto max-w-6xl px-4 py-16 text-muted-light dark:text-muted-dark">
        Carregando projetos...
      </div>
    ),
    ssr: false,
  },
);

export default function ProjectsPage() {
  return <ProjectsContent />;
}
