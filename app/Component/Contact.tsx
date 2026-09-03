"use client";

import { useState, type FormEvent } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import SectionHead from "./SectionHead";
import Footer from "./Footer";
import { SplitReveal, FadeUp } from "./Anim";

const EMAIL = "ayoeze191@gmail.com";

const SOCIALS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/ayoeze191" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/ayoeze191",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com/olabodeezekie11",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHead index="06" title="Contact" aside="Open to work" />

        <SplitReveal as="h2" className="display mb-10">
          Let&apos;s build something
        </SplitReveal>

        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12">
          <FadeUp className="lg:col-span-5 space-y-10" stagger={0.1}>
            <div>
              <p className="lede mb-6">
                Got a product to build, a team to strengthen, or just want to
                compare notes on React Native? My inbox is open.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold tracking-tight break-all hover:text-[var(--accent)] transition-colors"
              >
                {EMAIL}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="mono mb-1.5">Location</p>
                <p className="text-sm">Lagos, Nigeria · WAT</p>
              </div>
              <div>
                <p className="mono mb-1.5">Response time</p>
                <p className="text-sm">Usually within 24 hours</p>
              </div>
            </div>

            <div>
              <p className="mono mb-3">Elsewhere</p>
              <div className="flex flex-col gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow self-start"
                  >
                    <s.icon size={14} />
                    {s.label}
                    <span className="arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp className="lg:col-span-7" y={30}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="mono block mb-2">
                  01 / Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="field"
                  placeholder="Ada Lovelace"
                />
              </div>

              <div>
                <label htmlFor="email" className="mono block mb-2">
                  02 / Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="field"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mono block mb-2">
                  03 / What are you building?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="field resize-none"
                  placeholder="Tell me about the project, the timeline, and where you're stuck."
                />
              </div>

              <button type="submit" className="link-arrow">
                Send message <span className="arrow">→</span>
              </button>
            </form>
          </FadeUp>
        </div>

        <Footer className="mt-24" />
      </div>
    </section>
  );
}
