"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import MainButton from "../../common/MainButton";
import "./Home.css";

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // Helper function to split text into words wrapped in spans
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper">
        <span className="word-span">{word}&nbsp;</span>
      </span>
    ));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 🌟 NEW: Word-by-Word Animation Sequence ---
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Animate the Title Words
      tl.from(".banner-animation-disabled", {
        y: 50, // Move up from 50px down
        opacity: 0,
        rotation: 5, // Slight rotation for style
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04, // Delay between each word
      });

      // 2. Animate the Paragraph, Counter, and Button (fade up after title)
      tl.from(
        ".banner-animation-disabled",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4",
      ); // Start this slightly before the word animation finishes
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="banner" ref={bannerRef}>
        <video
          className="banner-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/banner-video.mp4" type="video/mp4" />
        </video>
        <div className="banner-video-overlay" aria-hidden="true" />
        <div className="noise"></div>
        <div className="banner-container">
          <div className="banner-content">
            <h1>
              {/* Apply splitWords to the main text */}
              {splitWords(
                "Leading Website Development & Digital Marketing Agency",
              )}

              {/* Apply splitWords to the highlight text separately so it keeps the class */}
              <span className="banner-content-highlight block sm:inline">
                {splitWords("In Kochi.")}
              </span>
            </h1>

            <p>
              We crafts stunning websites and data-driven marketing strategies
              that help brands grow online and attract more customers.
            </p>

            <div className="banner-counter">
              <h3>Trusted by 100+ Brands Worldwide</h3>
              <div className="banner-counters">
                <div className="banner-counters-item">
                  <h4>11+</h4>
                  <p>Years of Experience</p>
                </div>

                <div className="vertical-line"></div>
                <div className="banner-counters-item">
                  <p>Global Clients</p>
                </div>
                <div className="vertical-line"></div>

                <div className="banner-counters-item">
                  <p>360° Digital Solutions</p>
                </div>
              </div>
            </div>

            <div className="banner-btn">
              <MainButton label="Let’s Build Something" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Banner;
