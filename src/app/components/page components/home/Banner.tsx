"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainButton from "../../common/MainButton";
import FlowAnimation from "./FlowAnimation";
import { usePreloader } from "../../../context/PreloaderContext";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { isPreloaderComplete } = usePreloader();

  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper">
        <span className="word-span">{word}&nbsp;</span>
      </span>
    ));
  };

  useLayoutEffect(() => {
    const titleWords = bannerRef.current?.querySelectorAll(".banner-content .word-span");
    const introText = bannerRef.current?.querySelector(".banner-content > p");
    const bannerButton = bannerRef.current?.querySelector(".banner-btn");

    if (!titleWords || titleWords.length === 0) {
      return;
    }

    // Keep hidden until preloader is complete
    if (!isPreloaderComplete) {
      gsap.set(titleWords, { y: 50, opacity: 0, rotation: 5 });
      if (introText) gsap.set(introText, { y: 30, opacity: 0 });
      if (bannerButton) gsap.set(bannerButton, { y: 30, opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(titleWords, {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.04,
      });

      const introElements = [introText, bannerButton].filter(
        Boolean,
      ) as Element[];

      if (introElements.length > 0) {
        tl.to(
          introElements,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.45",
        );
      }
    }, bannerRef);

    return () => ctx.revert();
  }, [isPreloaderComplete]);

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
