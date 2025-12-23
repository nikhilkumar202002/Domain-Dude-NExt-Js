"use client";

import { useLayoutEffect, useRef } from "react";
import { GoArrowDown } from "react-icons/go";
import { gsap } from "gsap";
// Updated Import: Point to the shared CSS Module
import styles from "../Styles/ServiceDetail.module.css"; 

const WebDevelopmentBanner = () => {
  const bannerRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const bubble1Ref = useRef<HTMLDivElement>(null);
  const bubble2Ref = useRef<HTMLDivElement>(null);
  const bubble3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const bubbles = [bubble1Ref.current, bubble2Ref.current, bubble3Ref.current];

      // --- 1. AMBIENT BUBBLE ANIMATION ---
      const animateBubble = (target: any) => {
        if (!target) return;
        gsap.to(target, {
          x: gsap.utils.random(-100, width + 100),
          y: gsap.utils.random(-100, height + 100),
          scale: gsap.utils.random(0.8, 1.4),
          duration: gsap.utils.random(15, 25),
          ease: "sine.inOut",
          onComplete: () => animateBubble(target),
        });
      };

      gsap.set(bubbles, {
        x: () => gsap.utils.random(0, width),
        y: () => gsap.utils.random(0, height),
        opacity: 0,
      });

      gsap.to(bubbles, {
        opacity: 0.6,
        duration: 2,
        stagger: 0.5,
      });

      bubbles.forEach(b => animateBubble(b));

      // --- 2. TEXT REVEAL ANIMATION ---
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".word-span-target", {
        y: 100,
        opacity: 0,
        rotation: 3,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
      })
      .from(paraRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .from(ctaRef.current, {
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
      <span key={index} className={styles.wordWrapper}>
        <span className={`${styles.wordSpan} word-span-target`}>
            {word}&nbsp;
        </span>
      </span>
    ));
  };

  return (
    <section className={styles.banner} ref={bannerRef}>
      <div className={styles.noise}></div>
      
      <div ref={bubble1Ref} className={`${styles.bubble} ${styles.bubble1}`}></div>
      <div ref={bubble2Ref} className={`${styles.bubble} ${styles.bubble2}`}></div>
      <div ref={bubble3Ref} className={`${styles.bubble} ${styles.bubble3}`}></div>

      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 ref={headingRef}>
              {splitText("Web development that’s built to rank and built to convert")}
            </h1>
            <p ref={paraRef}>
              Domain Dude creates high-performance, SEO-optimized websites that load fast, rank better, and convert visitors into customers.
            </p>
          </div>

          <div className={styles.cta} ref={ctaRef}>
            <a href="#">
              <span>
                <GoArrowDown />
              </span>
              <h4>Contact Us Now</h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevelopmentBanner;