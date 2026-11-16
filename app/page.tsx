import Nav from "./Component/site/Nav";
import Boot from "./Component/site/Boot";
import Footer from "./Component/site/Footer";
import Hero from "./Component/home/Hero";
import Work from "./Component/home/Work";
// Experience as rollout history lives in ./Component/home/Experience (swap back if preferred).
import Experience from "./Component/home/ExperienceLayers";
import Approach from "./Component/home/Approach";
import Words from "./Component/home/Words";
import Stack from "./Component/home/Stack";
import Contact from "./Component/home/Contact";

export default function Home() {
  return (
    <>
      <Boot />
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
