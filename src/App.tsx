import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Philosophy from './components/sections/Philosophy';
import Contact from './components/sections/Contact';
import FloatingLines from './components/ui/FloatingLines';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* Full-page Floating Lines Background — dimmed */}
      <div className="fixed inset-0 z-0" style={{ opacity: 0.45 }}>
        {/* <FloatingLines
          linesGradient={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 10, 6]}
          lineDistance={[5, 4, 6]}
          animationSpeed={0.8}
          interactive={true}
          bendRadius={5.0}
          bendStrength={-0.5}
          parallax={true}
          parallaxStrength={0.15}
          mixBlendMode="screen"
        /> */}
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={8}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          gradientStart="#e945f5"
          gradientMid="#6f6f6f"
          gradientEnd="#6a6a6a"
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Philosophy />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
