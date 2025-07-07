"use client";

import React, {useEffect, useRef} from "react";
import HeroSection from "@/components/hero";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer/footer";
import HowItWorks from "@/components/howitworks";

/*Motion varaibles*/
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SectionMotion = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* FEATURES SECTION */}
<SectionMotion>
  <>
  <section className="w-full px-6 pt-24 pb-24 bg-white mt-10" id="features">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl sm:text-5xl text-black/80 font-medium">
          Interview Smarter. Get Hired Faster.
        </h2>
        <p className="text-base text-black/90 font-light mt-4 max-w-3xl mx-auto leading-relaxed">
          Everything you need to practice smarter, build confidence, and land the job — powered by AI.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl -mt-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {[
          {
            icon: "🧠",
            title: "AI-Powered Career Guidance",
            description:
              "Get personalized career advice and insights powered by advanced AI technology.",
          },
          {
            icon: "💼",
            title: "Interview Preparation",
            description:
              "Practice with role-specific questions and get instant feedback to improve your performance.",
          },
          {
            icon: "📊",
            title: "Industry Insights",
            description:
              "Stay ahead with real-time industry trends, salary data, and market analysis.",
          },
          {
            icon: "📄",
            title: "Smart Resume Creation",
            description: "Generate ATS-optimized resumes with AI assistance.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl border border-indigo-100 hover:shadow-md hover:border-indigo-300 transition duration-300 p-6 flex flex-col items-start"
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.015 }}
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[#4f58bc] mb-2">
              {feature.title}
            </h3>
            <p className="text-base text-black/90 font-light leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
    {/* <div className="mt-3">
      <ClientMarquee />
    </div> */}
  </section>
  </>
</SectionMotion>

      {/* How It Works Section */}
      <HowItWorks/>

  
      {/* Footer- Testimonial Section */}
      <Footer/>
      
    </>
  );
}
