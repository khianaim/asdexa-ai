"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;
      if (scrollPosition > threshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    window.location.href = "/dashboard";
  };

  return (
    <motion.section
      className="relative h-[95vh] w-full bg-cover bg-center"
      style={{ backgroundImage: "url(/hero_bg.jpg)" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="home"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#FEFEFE] to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-20">
          {/* Left Column */}
          <motion.div className="flex-1 max-w-xl" variants={itemVariants}>
            <span className="inline-block border border-gray-600 rounded-full px-3 py-1 text-black -mt-20 mb-10 text-base font-light">
              New version 3.0 is out!
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-black/80 font-medium">
              Smarter <br /> Interview Prep. <br /> Backed by AI.
            </h1>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-black mt-10 w-full max-w-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              {[
                { number: "20+", label: "Industries Covered" },
                { number: "1K+", label: "Interview Questions" },
                { number: "95%", label: "Success Rate" },
                { number: "24/7", label: "AI Support" },
              ].map((stat, i) => (
 <motion.div
      key={i}
      className="text-left px-1 sm:px-3 py-2 relative" // add relative for after pseudo-element if needed
      variants={itemVariants}
      style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }} // control vertical padding to shorten divider
    >
                  <h3 className="text-xl sm:text-3xl font-light font-hero text-black/80">
                    {stat.number}
                  </h3>
                  <p className="text-sm sm:text-base text-black mt-1 font-light">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
        <motion.div
  className="flex flex-col justify-center flex-1 min-w-[300px] lg:max-w-[36%]"
  variants={itemVariants}
>
  <p className="text-black font-light text-lg leading-relaxed max-w-xl text-start mb-6">
    Asdexa is your personal interview ally — built to help you speak
    with clarity, confidence, and control. Whether you're pivoting
    careers or chasing your next big role, Asce gives you the
    structure, feedback, and support to shine.
  </p>

  <div className="flex flex-col items-start">
    <Button
      size="lg"
      className="px-8 mt-10 rounded-full hover:scale-[1.03] transition-all duration-300"
      onClick={handleGetStarted}
    >
      <span className="animated-gradient-text font-bold text-lg">
        Get Started
      </span>
    </Button>

              <style jsx>{`
                .animated-gradient-text {
                  background: linear-gradient(270deg, #4f75f3, #eaaaeb, #f0e6ff);
                  background-size: 600% 600%;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: gradientMove 8s ease infinite;
                  display: inline-block;
                }

                @keyframes gradientMove {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
