"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-32 px-6 max-w-5xl mx-auto text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 inline-block rounded-full border border-teal-500/30 px-5 py-2 text-sm text-teal-400"
      >
        Open to new opportunities
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-6xl md:text-7xl font-bold leading-tight mb-6"
      >
        Hello, I&apos;m <span className="text-teal-400">Ezekiel</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
      >
        Software Engineer crafting exceptional web and mobile experiences
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 bg-white text-black hover:bg-gray-100"
          >
            View My Projects <ArrowRight className="ml-2" />
          </Button>
        </motion.a>

        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-white/30 hover:bg-white/10"
          >
            Learn More About Me
          </Button>
        </motion.a>
      </motion.div>
    </section>
  );
}
