import About from "./Component/About";
import Contact from "./Component/Contact";
import Experience from "./Component/Experience";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import Projects from "./Component/Projects";
import Recommendations from "./Component/Recomendation";
import TechStackPage from "./Component/TechStack2";

export default function Home() {
  return (
    <main className="min-h-screen   text-white">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStackPage />
      <Recommendations />
      <Contact />
      {/* Other sections will go here later */}
    </main>
  );
}
