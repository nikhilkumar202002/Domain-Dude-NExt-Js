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
    const mm = gsap.matchMedia(); // 1. Initialize MatchMedia

    // 2. Wrap Color Transition in Desktop Media Query
    mm.add("(min-width: 769px)", () => {
        if (wrapper) {
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: containerRef.current,
                start: "top 65%",
                end: "top 35%",   
                scrub: true,
                }
            });
            
            // Only animates to WHITE on desktop
            tl.to(wrapper, { backgroundColor: "#ffffff", duration: 1 })
              .to(".tools-header-left h2, .tools-header-left p, .tools-header-left h4, .tools-header-card h3, .tools-header-card p", { color: "#000000", duration: 1 }, "<");
        }
    });

    // 3. ENTRANCE: Fade In Up (Runs on ALL devices)
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
                toggleActions: "play reverse play reverse"
            }
        }
    );

  }, { scope: containerRef });

  return (
    <section className="tools relative z-10" ref={containerRef}>
   
        <div ref={contentRef} className="tools-container container relative z-20 text-white md:text-inherit">
            <div className="tools-header-flex grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="tools-header-left">
                    {/* Added text-gray classes for mobile default */}
                    <h4 className="text-gray-400 md:text-inherit">Tools We Use</h4>
                    <h2 className="text-white md:text-inherit">Empowering <span className="tools-header-highlight">Digital Growth</span> for Businesses</h2>
                    <p className="text-gray-300 md:text-inherit">At Domain Dude, we rely on industry-leading tools and technologies to deliver high-performance digital solutions.</p>
                </div>
                
                <div className="tools-header-right grid grid-cols-2 gap-4">
                    <div className="tools-header-card">
                        {/* Force text black on cards because they have white/gray bg even on mobile */}
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