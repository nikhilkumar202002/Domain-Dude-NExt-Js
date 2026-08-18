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
      const titleWords = bannerRef.current?.querySelectorAll(".banner-content .word-span");
      const introText = bannerRef.current?.querySelector(".banner-content > p");
      const bannerCounter = bannerRef.current?.querySelector(".banner-counter");
      const bannerButton = bannerRef.current?.querySelector(".banner-btn");

      if (!titleWords || titleWords.length === 0) {
        return;
      }

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(titleWords, {
        y: 50,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
      });

      const introElements = [introText, bannerCounter, bannerButton].filter(
        Boolean,
      ) as Element[];

      if (introElements.length > 0) {
        tl.from(
          introElements,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.4",
        );
      }
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
