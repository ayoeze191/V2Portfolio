import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { projects } from "../../data/projects";
import CaseStudy from "./CaseStudy";

type Params = { params: Promise<{ slug: string }> };

/** Every case study is known at build time — no runtime lookups. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Not found — Ezekiel Olabode" };

  const title = `${project.title} — Case study`;

  return {
    title: `${title} | Ezekiel Olabode`,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      images: project.image ? [{ url: project.image.src }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  return (
    <main id="top" className="min-h-screen">
      <Header />
      <CaseStudy
        project={projects[index]}
        // Wraps around, so the trail never dead-ends.
        prev={projects[(index - 1 + projects.length) % projects.length]}
        next={projects[(index + 1) % projects.length]}
      />
      <div className="shell">
        <Footer className="mb-12" />
      </div>
    </main>
  );
}
