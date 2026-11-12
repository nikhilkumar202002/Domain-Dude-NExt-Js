"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainButton from "../../common/MainButton";
import FlowAnimation from "./FlowAnimation";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

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
        <div className="noise"></div>

        <FlowAnimation
          numPaths={80}
          speed={1}
          lineColor="rgba(255, 255, 255, 0.22)"
          particleColor="rgba(255, 255, 255, 0.95)"
          accentParticleColor="rgba(0, 215, 255, 0.95)"
          glowColor="rgba(0, 200, 255, 0.7)"
          opacity={0.88}
        />
        <div className="banner-container">
          <div className="banner-content">
            <h1>
              {splitWords(
                "Leading Website Development & Digital Marketing Agency",
              )}

              <span className="banner-content-highlight block sm:inline">
                {splitWords("In Kochi.")}
              </span>
            </h1>

            <p>
              We crafts stunning websites and data-driven marketing strategies
              that help brands grow online and attract more customers.
            </p>

            {/* <div className="banner-counter">
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
            </div> */}

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
