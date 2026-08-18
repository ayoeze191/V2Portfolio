import type { Metadata } from "next";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Archive from "./Archive";

export const metadata: Metadata = {
  title: "Archive — Ezekiel Olabode",
  description:
    "Every project worth keeping — learning platforms, marketplaces, and the odd weekend build. Web and mobile, 2022 to now.",
};

export default function ProjectsPage() {
  return (
    <main id="top" className="min-h-screen">
      <Header />
      <Archive />
      <div className="shell">
        <Footer className="mb-12" />
      </div>
    </main>
  );
}
