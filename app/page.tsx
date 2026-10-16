import Nav from "./Component/site/Nav";
import Footer from "./Component/site/Footer";
import Hero from "./Component/home/Hero";
import Work from "./Component/home/Work";
import Experience from "./Component/home/Experience";
import Approach from "./Component/home/Approach";
import Words from "./Component/home/Words";
import Stack from "./Component/home/Stack";
import Contact from "./Component/home/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Approach />
        <Words />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
