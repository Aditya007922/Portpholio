import { useCallback, useState } from 'react';
import { EmberCanvas } from './components/EmberCanvas';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsRow } from './components/MetricsRow';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { CredentialsSection } from './components/CredentialsSection';
import { StackSection } from './components/StackSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [, setPreloaded] = useState(false);

  const handlePreloadComplete = useCallback(() => {
    setPreloaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      <Preloader onComplete={handlePreloadComplete} />
      <EmberCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <MetricsRow />
        <ProjectsSection />
        <AboutSection />
        <CredentialsSection />
        <StackSection />
        <ContactSection />
      </main>
    </div>
  );
}
