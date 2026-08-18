import About from "./Component/About";
import Contact from "./Component/Contact";
import Experience from "./Component/Experience";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import Projects from "./Component/Projects";
import Recommendations from "./Component/Recomendation";
import TechStack from "./Component/TechStack";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <Header />
      <Hero />
      {/* Section numbering below matches the nav indices in Header.tsx */}
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Recommendations />
      <Contact />
    </main>
  );
}
