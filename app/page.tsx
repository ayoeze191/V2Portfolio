import About from "./Component/About";
import Contact from "./Component/Contact";
import Experience from "./Component/Experience";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import Projects from "./Component/Projects";
import TechStack from "./Component/TechStack";

export default function Home() {
  return (
    <main className="min-h-screen  bg-[#050505] text-white">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Contact />
      {/* Other sections will go here later */}
    </main>
  );
}
