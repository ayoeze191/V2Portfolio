import Nav from "./Component/home/Nav";
import Hero from "./Component/home/Hero";
import About from "./Component/home/About";
import Process from "./Component/home/Process";
import Experience from "./Component/home/Experience";
import Work from "./Component/home/Work";
import Stack from "./Component/home/Stack";
import Currently from "./Component/home/Currently";
import Contact from "./Component/home/Contact";
import SiteFooter from "./Component/home/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Process />
      <Experience />
      <Work />
      <Stack />
      <Currently />
      <Contact />
      <SiteFooter />
    </main>
  );
}
