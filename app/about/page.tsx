import type { Metadata } from "next";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Ezekiel Olabode",
  description:
    "Full-stack engineer in Lagos building products end to end since 2021 — React and React Native on top of Node.js and Django, with a bias for systems that scale. Currently at Roov Africa.",
};

export default function AboutPage() {
  return (
    <main id="top" className="min-h-screen">
      <Header />
      <AboutContent />
      <div className="shell">
        <Footer className="mb-12" />
      </div>
    </main>
  );
}
