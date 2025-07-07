"use client";

import React from "react";

const clients = [
  "/jobs/google.png",
  "/jobs/dataev.png",
  "/jobs/figma.png",
  "/jobs/coca.png",
   "/jobs/aws.png",
  "/jobs/oracle.png",
  "/jobs/dojo.png",
  "/jobs/confluence.png",

];

export default function ClientMarquee() {
  return (
    <section className="w-full bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Subtitle */}
        <p className="text-base text-black/90 font-light mb-3">
          Users have landed jobs at top companies
        </p>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-between items-center gap-y-6">
          {clients.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 flex items-center justify-center h-12"
            >
              <img
                src={logo}
                alt={`Client ${index}`}
                className="h-8 sm:h-10 object-contain transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
