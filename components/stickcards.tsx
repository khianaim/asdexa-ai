// ✅ Sticky Stats Section with Tailwind + GSAP (NO @gsap/react)

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statsCards = [
  {
    title: "Industries Covered",
    copy: "Explore tailored insights across 50+ diverse industries, making your interview prep hyper-relevant.",
  },
  {
    title: "Interview Questions",
    copy: "Practice with over 1,000 expertly curated, role-specific questions built for modern hiring.",
  },
  {
    title: "Success Rate",
    copy: "Our users report a 95% success rate in landing interviews after consistent practice.",
  },
  {
    title: "AI Support",
    copy: "Round-the-clock access to our intelligent interview assistant for ongoing prep and insights.",
  },
];

const StickyStatsSection = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: ".intro",
        pinSpacing: false,
      });

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = card.querySelector(".card-inner");

        if (!isLastCard && cardInner) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 35%",
            endTrigger: ".outro",
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(cardInner, {
            y: `-${(cards.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 35%",
              endTrigger: ".outro",
              end: "top 65%",
              scrub: true,
            },
          });
        }
      });
    }, container);

    return () => ctx.revert(); // clean up
  }, []);

  return (
    <section ref={container} className="relative w-full bg-white py-20">
      <div className="intro text-center max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-black/80 mb-4">
          Results That Speak For Themselves
        </h2>
        <p className="text-base text-black/70 font-light">
          A smarter way to interview, supported by the numbers.
        </p>
      </div>

      <section className="cards space-y-12">
        {statsCards.map((card, i) => (
          <div
            key={i}
            className="card w-full flex justify-center px-6"
            id={`card-${i + 1}`}
          >
            <div className="card-inner w-full max-w-5xl bg-indigo-50 rounded-2xl p-8 flex gap-10 items-start shadow-xl">
              <div className="card-content flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-indigo-900">
                  {card.title}
                </h3>
                <p className="text-black/70 text-base leading-relaxed">
                  {card.copy}
                </p>
              </div>
              <div className="card-img hidden lg:block flex-shrink-0 w-60 aspect-video rounded-lg overflow-hidden bg-indigo-200" />
            </div>
          </div>
        ))}
      </section>

      <div className="outro h-[50vh]" />
    </section>
  );
};

export default StickyStatsSection;
