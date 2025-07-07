"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Using this platform, I felt more confident and prepared. I landed my dream job with less stress and better prep.",
    name: "Alex Morgan",
    role: "Product Manager · Hired via AI Interview Prep",
  },
  {
    quote:
      "The AI insights were shockingly accurate. I learned my weak spots and improved after just a few sessions.",
    name: "Jamie Lee",
    role: "UX Designer · Career switcher",
  },
  {
    quote:
      "This turned my interview anxiety into a structured game plan. The feedback felt personal and actionable.",
    name: "Ravi Singh",
    role: "Data Analyst · Graduate hire",
  },
  {
    quote:
      "The AI-powered interview prep was a game-changer. Landed my dream job at a top tech company!",
    name: "Sarah Chen",
    role: "Software Engineer at Tech Giant Co.",
  },
  {
    quote:
      "The industry insights helped me pivot my career successfully. The salary data was spot-on!",
    name: "Michael Rodriguez",
    role: "Product Manager at StartUp Inc.",
  },
  {
    quote:
      "My resume's ATS score improved significantly. Got more interviews in two weeks than in six months!",
    name: "Priya Patel",
    role: "Marketing Director at Global Corp",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { quote, name, role } = testimonials[index];

  return (
    <div
      className="max-w-4xl w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-14 text-black font-sans
                 shadow-2xl transition-opacity duration-1000 ease-in-out"
      key={index} // Helps React animate cleanly when index changes
    >
      <blockquote className="text-left italic text-xl leading-relaxed mb-6">
        “{quote}”
      </blockquote>
      <p className="font-semibold text-left text-base">{name}</p>
      <p className="text-left text-base opacity-70">{role}</p>
    </div>
  );
}
