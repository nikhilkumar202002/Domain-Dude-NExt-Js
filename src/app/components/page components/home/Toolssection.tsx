"use client"

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Toolsslider from "../../common/Toolsslider";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Toolssection = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Helper: Split text into spans for animation
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    const wrapper = document.querySelector("#main-flow");
    const mm = gsap.matchMedia();

    // 1. BLACK -> WHITE Background Transition (Desktop Only)
    mm.add("(min-width: 769px)", () => {
        if (wrapper) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    end: "top 25%",   
                    scrub: 0.5,
                }
            });
            
            // Background to White, Text to Black
            tl.to(wrapper, { backgroundColor: "#ffffff", ease: "none" })
              .to(".tools-header-left h2, .tools-header-left p, .tools-header-left h4, .tools-header-card h3, .tools-header-card p", 
                  { color: "#000000", ease: "none" }, 
              "<");
        }
    });

    // 2. ENTRANCE ANIMATION (Replaced generic fade with detailed sequence)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%", // Triggers when content hits 75% of viewport
            toggleActions: "play none none reverse",
        }
    });

    // A. Animate "Tools We Use" label
    tl.from(".tools-header-left h4", {
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out"
    })
    // B. Animate Main Heading Words
    .from(".tools-header-left .word-span", {
        y: 50,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
    }, "-=0.4")
    // C. Animate Paragraph
    .from(".tools-header-left p", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
    }, "-=0.6")
    // D. Animate Right Cards & Slider
    .from(".tools-header-right, .tools-sliders", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section className="tools relative z-10" ref={containerRef}>
        <div ref={contentRef} className="tools-container container relative z-20 text-white md:text-inherit">
            <div className="tools-header-flex grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="tools-header-left">
                    <h4 className="text-gray-400 md:text-inherit">Tools We Use</h4>
                    
                    {/* Updated Heading with splitWords */}
                    <h2 className="text-white md:text-inherit">
                        {splitWords("Empowering")}
                        <span className="tools-header-highlight inline-block">
                             {/* Ensure highlight text is split but keeps its wrapper class */}
                             {splitWords(" Digital Growth")}
                        </span>
                        {splitWords(" for Businesses")}
                    </h2>

                    <p className="text-gray-300 md:text-inherit">At Domain Dude, we rely on industry-leading tools and technologies to deliver high-performance digital solutions.</p>
                </div>
                
                <div className="tools-header-right grid grid-cols-2 gap-4">
                    <div className="tools-header-card">
                        <h3 className="!text-black">99%</h3>
                        <p className="!text-gray-600">Seamless integration</p>
                    </div>
                      <div className="tools-header-card">
                        <h3 className="!text-black">40%</h3>
                        <p className="!text-gray-600">Productivity boost</p>
                    </div>
                </div>
            </div>
            <div className="tools-sliders">
                <Toolsslider/>
            </div>
        </div>
    </section>
  )
}

export default Toolssection