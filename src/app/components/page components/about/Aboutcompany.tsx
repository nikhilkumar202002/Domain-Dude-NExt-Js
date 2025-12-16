"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Aboutcompany = () => {
  // --- Video Logic ---
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoSource = "/Videos/domaindude-video.mp4";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // --- Text Animation Logic ---
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Select all the word spans we created
      const words = textRef.current?.querySelectorAll(".word-span");

      if (words) {
        gsap.fromTo(
          words,
          { color: "rgba(255, 255, 255, 0.2)" }, 
          {
            color: "#ffffff", 
            duration: 1,
            stagger: 0.1, 
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%", 
              end: "bottom 55%", 
              scrub: 1, 
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const paragraphText =
    "Domain Dude is a Kochi-based digital agency blending web development, UI/UX design, branding, and performance marketing to build experiences that look good and work even better. The team partners with startups and growing businesses as an embedded creative-tech squad, crafting conversion-focused websites, scroll-stopping content, and data-driven campaigns that turn attention into measurable growth.";

  return (
    <section className="about-company" ref={containerRef}>
      <div className="about-company-container container">
        <div className="about-company-flex grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Video Container */}
          <div className="about-company-video" ref={videoRef}>
            {isVisible ? (
              <video
                className="about-video-player"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="video-placeholder" />
            )}
          </div>

          {/* Text Content */}
          <div className="about-company-content">
            <h4>Who We are</h4>
            <h2>Bold digital <span className="about-company-content-hightlight">storytellers</span> for growing brands</h2>
            
            {/* FIX: Use React.Fragment to place the space OUTSIDE the span */}
            <p ref={textRef}>
              {paragraphText.split(" ").map((word, index) => (
                <React.Fragment key={index}>
                  <span className="word-span">{word}</span>
                  {" "}
                </React.Fragment>
              ))}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Aboutcompany;