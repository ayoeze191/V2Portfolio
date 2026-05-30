"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState, type ElementType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiExpress,
  SiFirebase,
  SiVuedotjs,
  SiDjango,
  SiFramer,
  SiThreedotjs,
  SiJavascript,
  SiRedux,
  SiGraphql,
  SiPrisma,
  SiRedis,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { FaMobileAlt, FaPython } from "react-icons/fa";

interface TechItem {
  name: string;
  icon: ElementType;
}

const techStacks: TechItem[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React Native", icon: FaMobileAlt },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "Python", icon: FaPython },
  { name: "Django", icon: SiDjango },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "Redux", icon: SiRedux },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Prisma", icon: SiPrisma },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Firebase", icon: SiFirebase },
  { name: "Docker", icon: SiDocker },
  // { name: "AWS", icon: SiAmazon },
  { name: "Git", icon: SiGit },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Vercel", icon: SiVercel },
  { name: "Netlify", icon: SiNetlify },
];

// Orbiting Icon Component - circles around the card!
function OrbitingIcon({
  icon: Icon,
  delay,
  duration,
  radius,
  startAngle,
  size = "w-8 h-8 md:w-10 md:h-10",
}: {
  icon: ElementType;
  delay: number;
  duration: number;
  radius: number;
  startAngle: number;
  size?: string;
}) {
  const [angle, setAngle] = useState(startAngle);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + 1);
    }, duration * 10);
    return () => clearInterval(interval);
  }, [duration]);

  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      className={`absolute ${size} text-gray-500/40 hover:text-[#4A9B8E]/60 transition-colors duration-300`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
}

export default function TechStackPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 800,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive radius based on screen size
  const getRadius = () => {
    if (windowWidth < 640) return 140;
    if (windowWidth < 768) return 180;
    if (windowWidth < 1024) return 220;
    return 280;
  };

  const radius = getRadius();

  // 12 icons orbiting around the card
  const orbitingIcons = [
    {
      icon: SiReact,
      delay: 0,
      duration: 20,
      startAngle: 0,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: SiNextdotjs,
      delay: 1,
      duration: 25,
      startAngle: 30,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: SiNodedotjs,
      delay: 2,
      duration: 18,
      startAngle: 60,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: SiTypescript,
      delay: 0.5,
      duration: 22,
      startAngle: 90,
      radius,
      size: "w-7 h-7 md:w-9 md:h-9",
    },
    {
      icon: SiDocker,
      delay: 1.5,
      duration: 28,
      startAngle: 120,
      radius,
      size: "w-9 h-9 md:w-11 md:h-11",
    },
    {
      icon: SiMongodb,
      delay: 2.5,
      duration: 24,
      startAngle: 150,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: SiTailwindcss,
      delay: 0.8,
      duration: 30,
      startAngle: 180,
      radius,
      size: "w-7 h-7 md:w-9 md:h-9",
    },
    {
      icon: SiGit,
      delay: 1.8,
      duration: 26,
      startAngle: 210,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: SiFirebase,
      delay: 3,
      duration: 21,
      startAngle: 240,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: SiVuedotjs,
      delay: 0.3,
      duration: 32,
      startAngle: 270,
      radius,
      size: "w-7 h-7 md:w-9 md:h-9",
    },
    {
      icon: SiPostgresql,
      delay: 2.2,
      duration: 27,
      startAngle: 300,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
    {
      icon: FaMobileAlt,
      delay: 1.2,
      duration: 23,
      startAngle: 330,
      radius,
      size: "w-8 h-8 md:w-10 md:h-10",
    },
  ];

  const firstRow = techStacks.slice(0, 14);
  const secondRow = techStacks.slice(14);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Stack
            <br />
            <span className="text-[#4A9B8E]">I&apos;ve got you covered</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From frontend frameworks to backend systems, databases to DevOps
            tools.
          </p>
        </motion.div>

        {/* Tech Grid - Exact Render.com style */}
        <div ref={sectionRef} className="space-y-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3"
          >
            {firstRow.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A9B8E]/20 to-[#4A9B8E]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-[#111111] border border-[#222222] hover:border-[#4A9B8E]/50 rounded-xl p-5 flex items-center justify-center transition-all duration-200 cursor-pointer min-h-[90px]">
                  <tech.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-200" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3"
          >
            {secondRow.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A9B8E]/20 to-[#4A9B8E]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-[#111111] border border-[#222222] hover:border-[#4A9B8E]/50 rounded-xl p-5 flex items-center justify-center transition-all duration-200 cursor-pointer min-h-[90px]">
                  <tech.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-200" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section with ORBITING Icons - Exactly like Render.com */}
        <div className="relative mt-32 mb-12">
          {/* Orbiting Icons Container */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {orbitingIcons.map((icon, idx) => (
              <OrbitingIcon key={idx} {...icon} radius={radius} />
            ))}
          </div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="relative z-10"
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A9B8E] to-[#3D8276] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

              <div className="relative bg-[#111111] border border-[#222222] rounded-2xl p-12 text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Come and build with me
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm md:text-base">
                    Let&apos;s create something amazing together.
                  </p>
                  <a
                    href="#contact"
                    className="group/btn inline-flex items-center gap-2 bg-[#4A9B8E] hover:bg-[#3D8276] text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 shadow-lg shadow-[#4A9B8E]/20 hover:shadow-xl hover:shadow-[#4A9B8E]/30"
                  >
                    Start building
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
