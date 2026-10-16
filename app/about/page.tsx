import type { Metadata } from "next";
import Nav from "../Component/site/Nav";
import Footer from "../Component/site/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Ezekiel Olabode",
  description:
    "Full-stack engineer in Lagos building products end to end since 2021 — React and React Native on top of Node.js and Django, with a bias for systems that scale. Currently at Roov Africa.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutContent />
      <Footer />
    </>
  );
}
