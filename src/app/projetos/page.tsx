import type { Metadata } from 'next';

import { ProjectsView } from '@/components/projects/projects-view';
import { defaultLocale, siteCopy } from '@/config/i18n';

const copy = siteCopy[defaultLocale];

export const metadata: Metadata = {
  title: `${copy.navigation.projects} — FACODI`,
  description: copy.projects.description
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
