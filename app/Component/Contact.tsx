"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6 text-center"
        >
          Let&apos;s Work Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 mb-16 text-center max-w-2xl mx-auto"
        >
          I&apos;m currently open to new opportunities, exciting projects, and
          meaningful conversations in tech.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "ayoeze191@gmail.com",
                  action: "mailto:ayoeze191@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Lagos, Nigeria",
                  action: null,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+234 812 345 6789",
                  action: "tel:+2348123456789",
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Within 24 hours",
                  action: null,
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.action}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="glass border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:border-teal-400/40 transition-all group cursor-pointer block"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition">
                    <item.icon className="text-teal-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {[
                {
                  icon: FaGithub,
                  link: "https://github.com/ayoeze191",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  link: "https://linkedin.com/in/ayoeze191",
                  label: "LinkedIn",
                },
                {
                  icon: FaTwitter,
                  link: "https://twitter.com/olabodeezekie11",
                  label: "Twitter",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-400/50 transition-all"
                >
                  <social.icon
                    size={22}
                    className="text-gray-400 hover:text-teal-400"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass border border-white/10 rounded-2xl p-6 space-y-5"
          >
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition"
                placeholder="hello@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 py-6 text-lg"
            >
              <Send className="mr-2 h-5 w-5" /> Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
