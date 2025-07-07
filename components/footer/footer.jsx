"use client";

import { useEffect, useRef } from "react";
import FooterTestimonials from "./testimonial";
import TestimonialCarousel from "./testimonial";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const Footer = () => {
  const footerRef = useRef(null);
  const explosionContainerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const explosionContainer = explosionContainerRef.current;
    if (!footer || !explosionContainer) return;

    let hasExploded = false;

    const config = {
      gravity: 0.25,
      friction: 0.99,
      imageSize: 150,
      horizontalForce: 20,
      verticalForce: 15,
      rotationSpeed: 10,
      resetDelay: 500,
    };

    const imagePaths = [
      "/testimonials/user.jpg",
      "/testimonials/user2.jpg",
      "/testimonials/user3.jpg",
      "/testimonials/user4.jpg",
      "/testimonials/user5.jpg",
      "/testimonials/user6.jpg",
    ];

    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const createParticles = () => {
      explosionContainer.innerHTML = "";
      imagePaths.forEach((src) => {
        const particle = document.createElement("img");
        particle.src = src;
        particle.classList.add("explosion-particle-img");
        particle.style.width = `${config.imageSize}px`;
        explosionContainer.appendChild(particle);
      });
    };

    class Particle {
      constructor(element) {
        this.element = element;
        this.x = 0;
        this.y = 0;
        this.vx = (Math.random() - 0.5) * config.horizontalForce;
        this.vy = -config.verticalForce - Math.random() * 10;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
      }

      update() {
        this.vy += config.gravity;
        this.vx *= config.friction;
        this.vy *= config.friction;
        this.rotationSpeed *= config.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
    }

    const explode = () => {
      if (hasExploded) return;
      hasExploded = true;
      createParticles();

      const particleElements = explosionContainer.querySelectorAll(".explosion-particle-img");
      const particles = Array.from(particleElements).map(
        (element) => new Particle(element)
      );

      let animationId;

      const animate = () => {
        particles.forEach((particle) => particle.update());
        animationId = requestAnimationFrame(animate);
        if (
          particles.every(
            (particle) => particle.y > explosionContainer.offsetHeight / 2
          )
        ) {
          cancelAnimationFrame(animationId);
        }
      };

      animate();
    };

    const checkFooterPosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top > viewportHeight + 100) {
        hasExploded = false;
      }

      if (!hasExploded && footerRect.top <= viewportHeight + 250) {
        explode();
      }
    };

    let checkTimeout;
    const onScroll = () => {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(checkFooterPosition, 5);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", () => {
      hasExploded = false;
    });

    createParticles();
    setTimeout(checkFooterPosition, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", () => {
        hasExploded = false;
      });
    };
  }, []);

  return (
    <motion.footer
      ref={footerRef}
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-screen h-[85svh] text-white p-8 flex flex-col justify-between items-center overflow-hidden"
      style={{
        backgroundImage: "url(/hero_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFEFE] to-transparent z-10" />
      <div
        className="explosion-container absolute bottom-0 left-0 w-full h-[200%] pointer-events-none overflow-hidden z-50"
        ref={explosionContainerRef}
      />

      <div className="relative z-20 w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Still hesitant? See what our users say!
        </h2>

        <div className="mt-14">
          <TestimonialCarousel />
        </div>

        <div className="copyright-info flex justify-center gap-8 text-black/80 mt-8">
          <p>© 2025 Asdexa</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
