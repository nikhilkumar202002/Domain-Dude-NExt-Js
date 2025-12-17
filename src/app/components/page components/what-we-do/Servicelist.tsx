"use client";

import { useLayoutEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceListData } from "../../../data/ServiceData"; 
import "./Service.css";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Servicelist = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the Header Words
      gsap.from(".service-list-header .word-span", {
        y: 50,
        opacity: 0,
        rotation: 3,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".service-list-header",
          start: "top 80%", // Start animation when header is 80% down the viewport
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper 1: Split text into words (using DIVs to avoid CSS conflicts with spans)
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <div key={index} className="word-wrapper">
        <div className="word-span">{word}&nbsp;</div>
      </div>
    ));
  };

  // Helper 2: Split text into letters (for the CTA button)
  const splitLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="letter-flip"
        style={{ transitionDelay: `${index * 0.03}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <section className="service-list" ref={containerRef}>
        <div className="container">
          <div className="service-list-flex flex flex-col md:flex-row gap-10 md:gap-30 items-start">
            
            {/* Header Section - 30% Width (Sticky) */}
            <div className="service-list-header w-full md:w-[30%] sticky top-32">
              {/* Manually constructing H2 to preserve the specific span styling for "Scale." */}
              <h2>
                <div className="word-wrapper"><div className="word-span">Build.&nbsp;</div></div>
                <div className="word-wrapper"><div className="word-span"><span>Scale.</span>&nbsp;</div></div>
                <div className="word-wrapper"><div className="word-span">Market.</div></div>
              </h2>
              
              <div className="pt-4">
                 {/* Wrapping paragraph text in a div to treat it as a block for the word splitter */}
                 <div className="service-desc">
                    {splitWords(
                      "Domain Dude blends strategy, design, development, and performance marketing to grow your brand online, from conversion-focused websites to data-driven campaigns that attract, engage, and convert your ideal audience."
                    )}
                 </div>
              </div>
            </div>

            {/* Content Section - 70% Width */}
            <div className="service-list-content w-full md:w-[70%]">
              
              {serviceListData.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`service-list-card ${
                    index !== serviceListData.length - 1 
                      ? "border-b border-[#ffffff20] pb-10 mb-10" 
                      : ""
                  }`}
                >
                  <div className="service-list-card-header">
                    <h4>{service.id}. {service.title}</h4>
                    <p>{service.description}</p>

                    <div className="service-list-card-keypoints flex gap-2 pt-[20px]">
                      {service.keyPoints.map((point, i) => (
                        <div key={i} className="service-list-card-keypoint">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                 <div className="service-list-card-cta pt-5">
                    <a href="#">
                      <div className="cta-text-wrapper">
                        {splitLetters("Learn More")}
                      </div>
                      <span className="service-list-card-cta-arrows">
                        <MdArrowOutward />
                      </span>
                    </a>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicelist;