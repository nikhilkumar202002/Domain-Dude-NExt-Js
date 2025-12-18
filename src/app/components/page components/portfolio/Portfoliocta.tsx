"use client";

import { useLayoutEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portfolio.css";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Portfoliocta = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".portfolio-cta-flex",
          start: "top 80%", // Start animation when top of section hits 80% of viewport
          toggleActions: "play none none reverse",
        },
      });

      // 1. Header Word Reveal (Same as Banner)
      tl.from(".portfolio-cta-header .word-span", {
        y: 50,
        opacity: 0,
        rotation: 3,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      })
      // 2. Paragraph Fade Up
      .from(
        ".portfolio-cta-header p",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // 3. Button Fade Up
      .from(
        ".service-list-card-cta",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper 1: Split Header into Words (for GSAP animation)
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  // Helper 2: Split Button Text into Letters (for Hover animation)
  const splitLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="letter-flip"
        style={{ transitionDelay: `${index * 0.03}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <section className="portfolio-cta" ref={containerRef}>
        <div className="portfolio-cta-container container">
          <div className="portfolio-cta-flex">
            
            {/* Top Left Content */}
            <div className="portfolio-cta-header">
              <h2>
                {splitWords(
                  "Bold digital work that turns ideas into measurable outcomes for ambitious brands"
                )}
              </h2>
              <p>
                Explore how Domain Dude blends strategy, design, and performance
                marketing to ship high-converting websites, standout branding,
                and scroll-stopping campaigns that actually move the numbers.
              </p>
            </div>

            {/* Bottom Right Button */}
            <div className="service-list-card-cta pt-5">
              <a href="#">
                <div className="cta-text-wrapper">
                  {splitLetters("Enquire Now")}
                </div>
                <span className="service-list-card-cta-arrows">
                  <MdArrowOutward />
                </span>
              </a>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfoliocta;