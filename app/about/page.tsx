import type { Metadata } from "next";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Ezekiel Olabode",
  description:
    "Backend engineer in Lagos, building Node.js and Django services, Postgres schemas, auth, payments and queue workers since 2021. Currently at Roov Africa.",
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
