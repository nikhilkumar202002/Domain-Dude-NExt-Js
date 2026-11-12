"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutText =
  "A creative digital agency from Kochi, driven by storytellers, designers, and growth strategists. We build unforgettable brand experiences, craft visuals that inspire, and create strategies that spark real growth. Our approach blends creativity with data-driven insights, ensuring every idea delivers impact. We do not just help brands grow we help them become brands people remember.";

const Aboutsection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const iconRefs = useRef<SVGSVGElement[]>([]);

  useGSAP(() => {
    const words = wordsRef.current;

    gsap.fromTo(
      words,
      { color: "#3a3a3a" },
      {
        color: "#f5f5f5",
        ease: "none",
        stagger: 0.035,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 42%",
          scrub: 1,
        },
      },
    );

    gsap.to(iconRefs.current, {
      rotate: 360,
      ease: "none",
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <section className="about-scroll-section" ref={sectionRef}>
      <div className="about-scroll-container">
        <div className="about-scroll-copy" aria-label={aboutText}>
          {aboutText.split(" ").map((word, index) => (
            <span key={`${word}-${index}`}>
              <span
                ref={(element) => {
                  if (element) wordsRef.current[index] = element;
                }}
              >
                {word}{" "}
              </span>
              {(index === 14 || index === 45) && (
                <svg
                  ref={(element) => {
                    if (element) iconRefs.current.push(element);
                  }}
                  className="about-scroll-icon"
                  viewBox="0 0 50 50"
                  aria-hidden="true"
                >
                  <path d="M25 3v44M3 25h44M9.5 9.5l31 31M40.5 9.5l-31 31" />
                </svg>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
