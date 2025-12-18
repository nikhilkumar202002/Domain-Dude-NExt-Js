"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../../../data/PortfolioData"; // Import the data
import "./Portfolio.css";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Portfoliolist = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation (Word Reveal)
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: ".portfolio-list-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tlHeader
        .from(".portfolio-list-header .word-span", {
          y: 50,
          opacity: 0,
          rotation: 3,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
        })
        .from(
          ".portfolio-list-header p",
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // 2. Portfolio Cards Animation (Staggered Batch)
      const cards = gsap.utils.toArray(".portfolio-card");
      
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2, 
        scrollTrigger: {
          trigger: ".portfolio-card-wrapper",
          start: "top 85%", 
          toggleActions: "play none none reverse",
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text for animation
  const splitText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <>
      <section className="portfolio-list-section" ref={containerRef}>
        <div className="portfolio-list-container container">
          
     <div className="portfolio-list-header">
  <h2>
    {splitText("Show, don’t tell:")}
    <br />
    {splitText("experience")}{" "}
    {/* usage of the specific highlight class */}
    <span className="highlight">{splitText("our work")}</span>{" "}
    {splitText("visually")}
  </h2>
  <p>
    Explore a curated visual showcase of Domain Dude’s best projects—live
    websites, brand identities, and campaign creatives brought together to
    highlight real results, clean execution, and bold digital storytelling.
  </p>
</div>

          <div className="portfolio-card-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-20">
            {portfolioData.map((item) => (
              <div className="portfolio-card" key={item.id}>
                <div className="portfolio-card-image">
                  <Image 
                    alt={item.title} 
                    src={item.image} 
                    className="w-full h-auto" 
                    placeholder="blur" // Optional: nice loading effect
                  />
                  <div className="portfolio-card-keys">
                    {item.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="portfolio-card-content">
                  <h3>{item.title}</h3>
                  <h2>{item.description}</h2>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Portfoliolist;