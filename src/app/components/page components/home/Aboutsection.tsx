"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutText =
  "A creative digital agency from Kochi, blending storytelling, design, and strategy to build memorable brands. We create impactful visuals and data-driven experiences that inspire audiences and drive growth.";

const Aboutsection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(
        ".about-char",
        sectionRef.current,
      );
      if (!chars.length) return;

      gsap.fromTo(
        chars,
        { color: "#3a3a3a" },
        {
          color: "#f5f5f5",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 42%",
            scrub: 0.4,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const words = aboutText.split(" ");

  return (
    <section className="about-scroll-section" ref={sectionRef}>
      <div className="about-scroll-container">
        <div className="about-scroll-copy" aria-label={aboutText}>
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="about-word">
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="about-char">
                  {char}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="about-space">&nbsp;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
