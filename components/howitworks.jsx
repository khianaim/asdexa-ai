"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Sign Up & Personalize",
    description:
      "Create your account and tell us your career goals, experience level, and desired roles.",
  },
  {
    title: "AI-Powered Interview Prep",
    description:
      "Practice unlimited, role-specific mock interviews with real-time feedback.",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor performance trends and confidence levels after each session.",
  },
  {
    title: "Get Hired Faster",
    description:
      "Apply with confidence using your refined skills, smart resume, and industry insights.",
  },
];

const HowItWorks = () => {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            progressLineRef.current.style.height = `${self.progress * 100}%`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-16 bg-white" ref={containerRef}>
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-4xl text-black/80 font-medium mb-2">How It Works</h2>
        <p className="text-black/60 text-lg font-light">
          Four simple steps to accelerate your career growth
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Static gray line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-gray-200 rounded-full z-0" />

        {/* Scroll-progress animated line */}
        <div
          ref={progressLineRef}
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-[4px] bg-black rounded-full z-10"
          style={{ height: "0%" }}
        />

        <div className="flex flex-col space-y-24">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative z-20 flex flex-col md:flex-row items-center md:items-start ${
                  isLeft ? "md:flex-row-reverse" : ""
                } md:justify-between gap-6 px-6`}
              >
                {/* Connector dot */}
                <div className="hidden md:block w-6 h-6 rounded-full bg-black border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 top-1 z-20" />

                <div className="w-full md:w-[45%]">
                  <h3 className="text-2xl font-semibold text-[#4f58bc] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-black/70 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
