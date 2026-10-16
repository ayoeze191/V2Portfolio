import type { Metadata } from "next";
import Nav from "../Component/site/Nav";
import Footer from "../Component/site/Footer";
import Archive from "./Archive";

export const metadata: Metadata = {
  title: "Archive — Ezekiel Olabode",
  description:
    "Every project worth keeping — learning platforms, marketplaces, and the odd weekend build. Web and mobile, 2022 to now.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <Archive />
      <Footer />
    </>
  );
}
