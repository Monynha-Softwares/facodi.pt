import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { CourseHighlightsSection } from '@/components/sections/course-highlights';
import { HeroSection } from '@/components/sections/hero';

export default function HomePage(): JSX.Element {
    return (
        <div className="pb-24">
            <HeroSection />
            <CourseHighlightsSection />
            <AboutSection />
            <ContactSection />
        </div>
    );
}
