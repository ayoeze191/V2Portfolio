"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";

const EMAIL = "ayoeze191@gmail.com";

const SOCIALS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/ayoeze191" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/ayoeze191",
  },
  {
    icon: FaXTwitter,
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
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Ready to build something <span className="wonk">remarkable</span>?
        </>
      }
      intro="Got a product to build, a team to strengthen, or just want to argue about schema design? My inbox is open — I usually reply within a day."
    >
      <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.08)}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <motion.a
            variants={item}
            href={`mailto:${EMAIL}`}
            className="card group"
          >
            <p className="tag mb-2">Email me</p>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight break-all group-hover:text-[var(--accent)] transition-colors">
              {EMAIL}
            </span>
          </motion.a>

          <motion.div variants={item} className="card-flat">
            <div className="grid grid-cols-2 gap-y-5">
              <div>
                <p className="tag mb-1.5">Location</p>
                <p className="body-sm">Lagos, Nigeria · WAT</p>
              </div>
              <div>
                <p className="tag mb-1.5">Response</p>
                <p className="body-sm">Within 24 hours</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3 mt-6 pt-5 border-t border-[var(--border)]">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social"
                >
                  <s.icon size={13} aria-hidden="true" />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          onSubmit={handleSubmit}
          className="lg:col-span-7 card space-y-4"
        >
          <motion.div variants={item} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="label block mb-2">
                Your name
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
              <label htmlFor="email" className="label block mb-2">
                Email
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
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="message" className="label block mb-2">
              What are you building?
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="field resize-none"
              placeholder="Tell me about the project, the timeline, and where you're stuck."
            />
          </motion.div>

          <motion.div variants={item}>
            <button type="submit" className="btn btn-primary">
              Send message <span className="arrow">→</span>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </Section>
  );
}
