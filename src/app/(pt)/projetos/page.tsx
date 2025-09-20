import type { Metadata } from 'next';

import { ProjectsContent } from '@/components/sections/projects-content';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata('projects');

export default function ProjectsPage() {
  return <ProjectsContent />;
}
