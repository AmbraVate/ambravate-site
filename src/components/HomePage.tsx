import { useState } from 'react';
import { GlobalLogoHeader } from './GlobalLogoHeader';
import { HeroSection } from './hero/HeroSection';
import { WhoWeAre } from './WhoWeAre';
import { OurServices } from './OurServices';
import { ContactForm } from './ContactForm';

export function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <GlobalLogoHeader sectionTitle={activeSection} />

      <HeroSection />

      <WhoWeAre onEnter={() => setActiveSection('Who We Are')} onLeave={() => setActiveSection(null)} />

      <OurServices onEnter={() => setActiveSection('Our Services')} onLeave={() => setActiveSection(null)}/>

      <ContactForm onEnter={() => setActiveSection(null)} />
    </>
  );
}
