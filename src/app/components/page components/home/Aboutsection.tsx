"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutText =
  "At Domain Dude, we believe in a world where technology inspires people, connects them, and drives meaningful experiences - and we're here to build it.";

const Aboutsection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const words = wordsRef.current.filter(Boolean);

      gsap.fromTo(
        words,
        { color: "#3a3a3a" },
        {
          color: "#f5f5f5",
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 48%",
            scrub: 1,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section className="about-scroll-section" ref={sectionRef}>
      <div className="about-scroll-container">
        <div className="about-scroll-copy" aria-label={aboutText}>
          {aboutText.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              ref={(element) => {
                if (element) wordsRef.current[index] = element;
              }}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
