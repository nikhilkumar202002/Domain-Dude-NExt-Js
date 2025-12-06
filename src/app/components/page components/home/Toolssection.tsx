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

  useGSAP(() => {
    const wrapper = document.querySelector("#main-flow");

    // 1. THEME TRANSITION: Black -> White
    // We use scrub here so the color change is tied to the scroll position directly
    if (wrapper) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%", // Trigger slightly earlier than content
          end: "top 35%",   
          scrub: true,
        }
      });
      
      tl.to(wrapper, { backgroundColor: "#ffffff", duration: 1 })
        .to(".tools-header-left h2, .tools-header-left p, .tools-header-left h4, .tools-header-card h3, .tools-header-card p", { color: "#000000", duration: 1 }, "<");
    }

    // 2. ENTRANCE: Fade In Up
    // Critical: Use toggleActions so it replays when scrolling back up
    gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 60 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 70%",
                toggleActions: "play reverse play reverse" // Enables fading in/out on both scroll directions
            }
        }
    );

  }, { scope: containerRef });

  return (
    <section className="tools relative z-10" ref={containerRef}>
        <div ref={contentRef} className="tools-container container relative z-20">
            <div className="tools-header-flex grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="tools-header-left">
                    <h4>Tools We Use</h4>
                    <h2>Empowering <span className="tools-header-highlight">Digital Growth</span> for Businesses</h2>
                    <p>At Domain Dude, we rely on industry-leading tools and technologies to deliver high-performance digital solutions.</p>
                </div>
                
                <div className="tools-header-right grid grid-cols-2 gap-4">
                    <div className="tools-header-card">
                        <h3>99%</h3>
                        <p>Seamless integration</p>
                    </div>
                      <div className="tools-header-card">
                        <h3>40%</h3>
                        <p>Productivity boost</p>
                    </div>
                </div>
            </div>
            <div className="tools-sliders mt-12">
                <Toolsslider/>
            </div>
        </div>
    </section>
  )
}

export default Toolssection