"use client";

import { useLayoutEffect, useRef } from "react";
import { GoArrowDown } from "react-icons/go";
import { gsap } from "gsap";
import PortfolioHRslider from "../../common/PortfolioHRslider"; // Ensure this path is correct
import "./Portfolio.css";

const PortfolioBanner = () => {
  const bannerRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- TEXT REVEAL ANIMATION ---
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".word-span", {
        y: 100,
        opacity: 0,
        rotation: 3,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
      })
      .from(".portfolio-banner-header p", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .from(".portfolio-banner-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper">
        <span className="word-span">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <section className="portfolio-banner" ref={bannerRef}>
      {/* 1. BACKGROUND SLIDER */}
      <div className="portfolio-banner-bg">
        <PortfolioHRslider />
      </div>

      {/* 2. RADIAL GRADIENT OVERLAY */}
      <div className="portfolio-radial-overlay"></div>

      {/* 3. NOISE OVERLAY */}
      <div className="noise"></div>
      
      <div className="portfolio-banner-container container">
        <div className="portfolio-banner-content">
          <div className="portfolio-banner-header">
            <h1 ref={textRef}>
              {splitText(
                "Bold digital work that turns ideas into measurable outcomes for ambitious brands"
              )}
            </h1>
            <p>
              Showcasing the websites, brands, and campaigns Domain Dude has crafted for ambitious businesses—each project designed to convert better, rank higher, and drive measurable growth.
            </p>
          </div>

          <div className="portfolio-banner-cta">
            <a href="#">
              <span>
                <GoArrowDown />
              </span>
              <h4>View our work in action</h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioBanner;