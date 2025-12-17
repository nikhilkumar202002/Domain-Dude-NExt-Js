"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Techscroll from "../../common/Toolsslider";
import "./Service.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Servicetechstack = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".tech-tools-header .word-span", {
        y: 50,
        opacity: 0,
        rotation: 3,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".tech-tools-header",
          start: "top 80%", 
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <div key={index} className="word-wrapper">
        <div className="word-span">{word}&nbsp;</div>
      </div>
    ));
  };

  return (
    <>
      <section className="tech-tools" ref={containerRef}>
        <div className="tech-tools-container container">
          <div className="tech-tools-header">

            <h2>{splitWords("Tech stack that powers your growth.")}</h2>
            
            <div className="tech-desc">
              {splitWords(
                "Domain Dude ships modern, scalable solutions using a battle-tested stack across frontend, backend, design, and marketing analytics."
              )}
            </div>
          </div>

          <div className="tech-tools-slider">
            <Techscroll />
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicetechstack;