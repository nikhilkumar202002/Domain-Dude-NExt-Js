"use client";

import "./Home.css";
import Portfolio1 from "../../../../assets/Portfolio/Skybound.jpg";
import Portfolio2 from "../../../../assets/Portfolio/ayursidhi.jpg";
import Portfolio3 from "../../../../assets/Portfolio/lab-8.jpg";
import Portfolio4 from "../../../../assets/Portfolio/paddle-boat.jpg";
import Portfolio5 from "../../../../assets/Portfolio/pantry-india.jpg";
import Portfolio6 from "../../../../assets/Portfolio/thebridgate.jpg";
import Portfolio7 from "../../../../assets/Portfolio/vismaya.jpg";
import Abstract from "../../../../assets/Images/Abstract-right.svg";
import MainButton from "../../common/MainButton";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // ENTRANCE ANIMATION: Smooth Fade In
    gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 60 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play reverse play reverse"
            }
        }
    );
  }, { scope: containerRef });

  return (
    <section className="portfolio-section py-20 relative z-10" ref={containerRef}>
      <div className="portfolio-section-bg-image absolute top-0 right-0 -z-10 opacity-20">
        <Image src={Abstract} width={750} height={0} alt="Abstract" />
      </div>
      
      <div ref={contentRef} className="portfolio-container container relative z-20">
        <div className="portfolio-section-header mb-12 text-white">
          <h3 className="opacity-80">Creative Highlights</h3>
          <h2 className="text-4xl font-bold">A Glimpse Into Our Creative Journey</h2>
        </div>

        <div className="portfolio-section-portfolio-rows">
            {/* ROW 1 */}
            <div className="portfolio-section-portfolio-row grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="portfolio-section-col"><div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio1} width={400} height={300} alt="Portfolio1" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div></div>
              <div className="portfolio-section-col flex flex-col gap-5">
                <div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio2} width={400} height={300} alt="Portfolio2" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div>
                <div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio3} width={400} height={300} alt="Portfolio3" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div>
              </div>
              <div className="portfolio-section-col"><div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio4} width={400} height={300} alt="Portfolio4" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div></div>
            </div>
            {/* ROW 2 */}
            <div className="portfolio-section-portfolio-row grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
               <div className="portfolio-section-col"><div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio5} width={400} height={300} alt="Portfolio5" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div></div>
               <div className="portfolio-section-col"><div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio6} width={400} height={300} alt="Portfolio6" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div></div>
               <div className="portfolio-section-col"><div className="portfolio-section-portfolio-item rounded-xl overflow-hidden"><Image src={Portfolio7} width={400} height={300} alt="Portfolio7" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" /></div></div>
            </div>
        </div>
        <div className="portfolio-section-btn flex justify-center mt-10">
          <MainButton label="View All Portfolio" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;