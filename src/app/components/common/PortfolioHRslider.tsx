"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Portfolio1 from "../../../assets/Portfolio Slider/DESERTROSEFLOWERS.webp";
import Portfolio2 from "../../../assets/Portfolio Slider/Techfuge.webp";
import Portfolio3 from "../../../assets/Portfolio Slider/koffee-junction.webp";
import Portfolio4 from "../../../assets/Portfolio Slider/metaark-online.webp";
import Portfolio5 from "../../../assets/Portfolio Slider/pantryindia.webp";
import "./Styles.css";

const PortfolioHRslider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweens = useRef<gsap.core.Tween[]>([]);

  const images = [Portfolio1, Portfolio2, Portfolio3, Portfolio4, Portfolio5];
  // Duplicate enough times to ensure seamless infinite scroll
  const items = [...images, ...images, ...images, ...images];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tweens.current = [];
      const columns = gsap.utils.toArray<HTMLElement>(".portfolio-col-track");

      columns.forEach((col, i) => {
        // 1. Calculate Distance
        const distance = col.offsetHeight * 0.5;

        // --- SAFETY CHECK FOR MOBILE ---
        // If CSS hides the column (display: none), height is 0. 
        // We skip animating it to avoid bugs.
        if (distance < 1) return; 

        // 2. Define Base Speed
        let baseSpeed = 60; 

        // Vary speed for parallax effect
        if (i === 1 || i === 3) baseSpeed = 30; 
        if (i === 2) baseSpeed = 50; 

        // 3. Calculate Duration
        const duration = distance / baseSpeed;

        // 4. Create Tween
        const t = gsap.to(col, {
          yPercent: -50, 
          ease: "none",
          duration: duration,
          repeat: -1,
        });

        tweens.current.push(t);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover Interactions
  const handleMouseEnter = () => {
    tweens.current.forEach((t) => {
      gsap.to(t, { timeScale: 0.05, duration: 1 }); 
    });
  };

  const handleMouseLeave = () => {
    tweens.current.forEach((t) => {
      gsap.to(t, { timeScale: 1, duration: 1 }); 
    });
  };

  return (
    <div 
      className="portfolio-vertical-wrapper" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {[0, 1, 2, 3, 4].map((colIndex) => (
        <div className="portfolio-col" key={colIndex}>
          <div className="portfolio-col-track">
            {items.map((src, index) => (
              <div className="portfolio-item-vertical" key={index}>
                <Image 
                  src={src} 
                  alt={`Portfolio ${index}`} 
                  className="vertical-img"
                  priority={index < 5} 
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioHRslider;