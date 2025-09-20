import type { Metadata } from 'next';

import { HeroSection } from '@/components/sections/hero';
import { HighlightsSection } from '@/components/sections/highlights';
import { HomeProjectsTeaser } from '@/components/sections/home-projects';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata('home');

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <HighlightsSection />
      <HomeProjectsTeaser />
    </div>
  );
}
