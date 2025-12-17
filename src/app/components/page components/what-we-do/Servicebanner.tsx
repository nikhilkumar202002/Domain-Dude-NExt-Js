"use client";

import { useLayoutEffect, useRef } from "react";
import { GoArrowDown } from "react-icons/go";
import { gsap } from "gsap";
import "./Service.css";

const ServiceBanner = () => {
  const bannerRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // --- 1. AMBIENT BUBBLE ANIMATION ---
      const animateBubble = (selector: string) => {
        gsap.to(selector, {
          x: gsap.utils.random(-100, width + 100),
          y: gsap.utils.random(-100, height + 100),
          scale: gsap.utils.random(0.8, 1.4),
          duration: gsap.utils.random(15, 25),
          ease: "sine.inOut",
          onComplete: () => animateBubble(selector),
        });
      };

      // Set initial random positions
      gsap.set(".bubble1, .bubble2, .bubble3", {
        x: () => gsap.utils.random(0, width),
        y: () => gsap.utils.random(0, height),
        opacity: 0, 
      });

      // Fade bubbles in
      gsap.to(".bubble1, .bubble2, .bubble3", {
        opacity: 0.6,
        duration: 2,
        stagger: 0.5,
      });

      animateBubble(".bubble1");
      animateBubble(".bubble2");
      animateBubble(".bubble3");

      // --- 2. TEXT REVEAL ANIMATION ---
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".word-span", {
        y: 100,
        opacity: 0,
        rotation: 3,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
      })
      .from(".service-banner-header p", { // Updated selector
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .from(".service-banner-cta", { // Updated selector
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
    <section className="service-banner" ref={bannerRef}>
      <div className="noise"></div>
      
      {/* Background Bubbles */}
      <div className="bubble1"></div>
      <div className="bubble2"></div>
      <div className="bubble3"></div>

      <div className="service-banner-container container">
        <div className="service-banner-content">
          <div className="service-banner-header">
            <h1 ref={textRef}>
              {splitText(
                "Building bold, conversion-focused digital brands that actually grow and stand out online"
              )}
            </h1>
            <p>
              Domain Dude partners with ambitious businesses to design high-converting websites, memorable brand identities, and performance-led marketing campaigns that turn online attention into real, measurable growth.
            </p>
          </div>

          <div className="service-banner-cta">
            <a href="#">
              <span>
                <GoArrowDown />
              </span>
              <h4>Optimize my website today</h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;