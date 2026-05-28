"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";

interface Recommendation {
  id: number;
  name: string;
  title: string;
  company: string;
  recommendation: string;
  rating: number;
  avatar?: string;
  date: string;
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    name: "David Asaolu",
    title: "Freelancer",
    company: "Upwork",
    recommendation:
      "I had the pleasure of working with Ezekiel, and I can confidently say he is an exceptional frontend developer. His expertise in React, React Native, and TypeScript is evident in how efficiently he builds scalable and high-performance applications. What sets Ezekiel apart is his problem-solving ability and attention to detail. Whether it’s optimizing UI components or implementing complex state management, he always ensures a seamless user experience. Beyond his technical skills, Ezekiel is a collaborative team player with a strong work ethic. He communicates ideas clearly, takes ownership of tasks, and is always eager to learn and improve. If you're looking for a skilled and dedicated frontend developer, I highly recommend Ezekiel",
    rating: 5,
    date: "March 2025",
  },
  {
    id: 3,
    name: "Adegoke Damilare",
    title: "CTO",
    company: "Learnpally",
    recommendation:
      "I've collaborated with Bode on multiple projects. He's a quick learner, writes clean code, and is always willing to help teammates. His full-stack skills are impressive, and he delivers on time consistently.",
    rating: 5,
    date: "January 2025",
  },
];

export default function Recommendations() {
  return (
    <section id="recommendations" className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Do not just take my word for it — here is what colleagues, managers,
            and clients have to say about working with me.
          </p>
        </motion.div>

        {/* Cards Grid - Simple 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass border border-white/10 rounded-2xl p-6 hover:border-teal-400/40 transition-all duration-300 flex flex-col h-full"
            >
              <RecommendationCard rec={rec} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual Recommendation Card
function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;
  const shouldTruncate = rec.recommendation.length > maxLength;
  const displayText = isExpanded
    ? rec.recommendation
    : rec.recommendation.slice(0, maxLength);

  return (
    <>
      {/* Quote Icon */}
      <Quote className="text-teal-400/30 w-10 h-10 mb-4" />

      {/* Recommendation Text */}
      <p className="text-gray-300 leading-relaxed flex-1 text-sm">
        {displayText}
        {shouldTruncate && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-teal-400 hover:text-teal-300 ml-1 inline-block text-xs"
          >
            ...read more
          </button>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-teal-400 hover:text-teal-300 ml-1 block mt-2 text-xs"
          >
            show less
          </button>
        )}
      </p>

      {/* Rating Stars */}
      <div className="flex gap-1 my-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rec.rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Person Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
          {rec.avatar ? (
            <img
              src={rec.avatar}
              alt={rec.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white text-sm truncate">
            {rec.name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {rec.title} at {rec.company}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{rec.date}</p>
        </div>
      </div>
    </>
  );
}
