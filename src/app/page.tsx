import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { CourseGrid } from '@/components/sections/course-grid';
import { Features } from '@/components/sections/features';
import { ContactSection } from '@/components/sections/contact';
import { resolveSiteText } from '@/config/i18n';

const site = resolveSiteText();

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: 'https://facodi.pt'
  }
};

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-24">
      <Hero />
      <Features />
      <CourseGrid />
      <ContactSection />
    </div>
  );
}
