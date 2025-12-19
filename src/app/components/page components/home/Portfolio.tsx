"use client";

import "./Home.css";
import Portfolio1 from "../../../../assets/Portfolio/Skybound.jpg";
import Portfolio2 from "../../../../assets/Portfolio/ayursidhi.jpg";
import Portfolio3 from "../../../../assets/Portfolio/lab-8.jpg";
import Portfolio4 from "../../../../assets/Portfolio/paddle-boat.jpg";
import Portfolio5 from "../../../../assets/Portfolio/pantry-india.jpg";
import Portfolio6 from "../../../../assets/Portfolio/thebridgate.jpg";
import Portfolio7 from "../../../../assets/Portfolio/vismaya.jpg";
import MainButton from "../../common/MainButton";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable"; 
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, Draggable);

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);      
  const contentWrapperRef = useRef<HTMLDivElement>(null); 
  
  const portfolioImages = [Portfolio1, Portfolio2, Portfolio3, Portfolio4, Portfolio5, Portfolio6, Portfolio7];
  const rowConfig = [{ duration: 35 }, { duration: 55 }, { duration: 40 }, { duration: 60 }, { duration: 45 }];
  
  const totalRows = [...rowConfig, ...rowConfig, ...rowConfig]; 

  useGSAP(() => {
    const rowTweens: gsap.core.Tween[] = []; 
    const mm = gsap.matchMedia();

    // 1. Setup Infinite Marquee
    rowConfig.forEach((row, i) => {
      const tracks = gsap.utils.toArray(`.track-type-${i}`);
      if (tracks.length > 0) {
        const tween = gsap.to(tracks, { xPercent: -50, repeat: -1, duration: row.duration, ease: "none" });
        rowTweens.push(tween);
      }
    });

    // 2. Desktop Logic (Draggable & Vertical Scroll)
    mm.add("(min-width: 769px)", () => {
        const rowHeight = 220;
        const gap = 15;
        const singleSetHeight = (rowHeight + gap) * rowConfig.length; 
        let currentY = -singleSetHeight; 
        
        gsap.set(contentWrapperRef.current, { y: currentY });

        const proxy = document.createElement("div"); 
        Draggable.create(proxy, {
            trigger: containerRef.current, 
            type: "x,y",
            onPress: () => rowTweens.forEach((t) => t.pause()),
            onDrag: function (this: any) {
                const dx = this.deltaX; 
                rowTweens.forEach((t, i) => {
                const track = document.querySelector(`.track-type-${i}`) as HTMLElement;
                if (!track) return;
                const totalDist = track.offsetWidth / 2;
                const progressChange = -(dx / totalDist);
                t.progress(gsap.utils.wrap(0, 1, t.progress() + progressChange));
                });
                
                const dy = this.deltaY;
                currentY += dy;
                if (currentY > -50) currentY -= singleSetHeight;
                else if (currentY < (-singleSetHeight * 2) + 50) currentY += singleSetHeight;
                gsap.set(contentWrapperRef.current, { y: currentY });
            },
            onDragEnd: () => rowTweens.forEach((t) => t.play()),
        });
    });

    // 3. Mobile Logic
    mm.add("(max-width: 768px)", () => {
          gsap.set(contentWrapperRef.current, { y: 0 });
    });

  }, { scope: containerRef });

  return (
    // Reverted Section to solid black
    <section className="portfolio-section py-20 relative z-10 bg-[#000000]">
      
      {/* Header */}
      <motion.div 
        className="portfolio-section-header mb-15 text-white container mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="tracking-wider">Creative Highlights</h3>
        <h2>A Glimpse Into Our Journey</h2>
      </motion.div>

      {/* --- CONTAINER --- */}
      {/* Applied Radial Gradient HERE */}
      <motion.div 
        ref={containerRef} 
        className="w-full h-[700px] md:h-[1060px] overflow-hidden relative md:cursor-grab md:active:cursor-grabbing"
        style={{
            background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)"
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {/* Top/Bottom Fade Overlays */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#000000] to-transparent z-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#000000] to-transparent z-30 pointer-events-none"></div>

        <div ref={contentWrapperRef} className="flex flex-col gap-[15px] will-change-transform">
          {totalRows.map((row, physicalIndex) => {
            const typeIndex = physicalIndex % 5; 
            const visibilityClass = physicalIndex < 3 ? "block" : "hidden md:block";

            return (
              <div key={physicalIndex} className={`w-full overflow-hidden ${visibilityClass}`}>
                <div className={`track-type-${typeIndex} flex w-fit gap-[15px] will-change-transform`}>
                  {/* Original Set */}
                  {[...portfolioImages, ...portfolioImages].map((img, imgIndex) => (
                    <div key={`orig-${physicalIndex}-${imgIndex}`} className="relative h-[320px] w-[320px] flex-shrink-0 rounded-xl overflow-hidden select-none group">
                      <Image src={img} alt="Portfolio" fill draggable={false} className="object-cover transition-transform duration-500 pointer-events-none group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
                    </div>
                  ))}
                  {/* Duplicate Set for Loop */}
                  {[...portfolioImages, ...portfolioImages].map((img, imgIndex) => (
                      <div key={`dup-${physicalIndex}-${imgIndex}`} className="relative h-[320px] w-[320px] flex-shrink-0 rounded-xl overflow-hidden select-none group">
                      <Image src={img} alt="Portfolio" fill draggable={false} className="object-cover transition-transform duration-500 pointer-events-none group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div 
        className="portfolio-section-btn flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <MainButton label="View All Portfolio" />
      </motion.div>
    </section>
  );
};

export default Portfolio;