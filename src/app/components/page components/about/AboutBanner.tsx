"use client";

import { useLayoutEffect, useRef } from "react";
import { GoArrowDown } from "react-icons/go";
import { gsap } from "gsap";
import "./About.css";

const AboutBanner = () => {
  const bannerRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // --- 1. AMBIENT BUBBLE ANIMATION (Marrow Style: Soft & Fluid) ---
      // We start them at random positions and move them continuously
      const animateBubble = (selector: string) => {
        gsap.to(selector, {
          x: gsap.utils.random(-100, width + 100),
          y: gsap.utils.random(-100, height + 100),
          scale: gsap.utils.random(0.8, 1.4),
          duration: gsap.utils.random(15, 25), // Slower, more elegant
          ease: "sine.inOut",
          onComplete: () => animateBubble(selector),
        });
      };

      // Set initial random positions
      gsap.set(".bubble1, .bubble2, .bubble3", {
        x: () => gsap.utils.random(0, width),
        y: () => gsap.utils.random(0, height),
        opacity: 0, // Start hidden for fade-in
      });

      // Fade bubbles in slowly
      gsap.to(".bubble1, .bubble2, .bubble3", {
        opacity: 0.6,
        duration: 2,
        stagger: 0.5,
      });

      animateBubble(".bubble1");
      animateBubble(".bubble2");
      animateBubble(".bubble3");

      // --- 2. TEXT REVEAL ANIMATION (The "Marrow" Text Effect) ---
      // Animate the words sliding up from "invisible" lines
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".word-span", {
        y: 100, // Slide up from bottom
        opacity: 0,
        rotation: 3, // Slight rotation for style
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05, // Stagger each word
      })
      .from(".about-banner-header p", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8") // Overlap slightly
      .from(".about-banner-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text into spans for animation
  const splitText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper">
        <span className="word-span">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <section className="about-banner" ref={bannerRef}>
      <div className="noise"></div>
      
      {/* Background Bubbles */}
      <div className="bubble1"></div>
      <div className="bubble2"></div>
      <div className="bubble3"></div>

      <div className="about-banner-container container">
        <div className="about-banner-content ">
          <div className="about-banner-header">
            <h1 ref={textRef}>
              {splitText(
                "Great brands don’t grow by chance they’re built with strategy, story, and smart marketing."
              )}
            </h1>
            <p>
              Domain Dude partners with ambitious businesses to design
              high-converting websites, SEO-optimized digital experiences, and
              performance-driven campaigns that turn attention into measurable
              growth.
            </p>
          </div>

          <div className="about-banner-cta">
            <a href="#">
              <span>
                <GoArrowDown />
              </span>
              <h4>Start growing today</h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;