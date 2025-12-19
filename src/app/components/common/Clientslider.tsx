"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Styles.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const logos = [
  "/Client Logo/pantryindia-white.png",
  "/Client Logo/rysa-clinic.png",
  "/Client Logo/pantryindia-white.png",
  "/Client Logo/rysa-clinic.png",
  "/Client Logo/pantryindia-white.png",
  "/Client Logo/rysa-clinic.png",
];

const Clientslider = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1. Calculate single set width
    const items = Array.from(track.children) as HTMLElement[];
    const singleSetWidth = items.reduce(
      (sum, el) => sum + el.offsetWidth + 100, 
      0
    );

    // 2. Clone items
    if (track.children.length === logos.length) {
        while (track.scrollWidth < window.innerWidth * 3) {
            items.forEach((el) => {
                const clone = el.cloneNode(true);
                track.appendChild(clone);
            });
        }
    }

    const ctx = gsap.context(() => {
      // --- FADE ANIMATIONS ---
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // --- MARQUEE ANIMATION ---
      marqueeTween.current = gsap.to(track, {
        x: `-=${singleSetWidth}`, 
        // INCREASED DURATION to make it slower (Higher number = Slower speed)
        duration: 50, 
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            return `${parseFloat(x) % singleSetWidth}px`;
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- HOVER HANDLERS ---
  const handleMouseEnter = () => {
    if (marqueeTween.current) marqueeTween.current.timeScale(0.1);
  };

  const handleMouseLeave = () => {
    if (marqueeTween.current) marqueeTween.current.timeScale(1);
  };

  return (
    <div className="py-10 flex-column" ref={sectionRef}>
      <div className="client-header" ref={headerRef}>
        <h4>
          300+ <span>Numbers-driven with benefits list</span>
        </h4>
      </div>
      
      <section 
        className="logo-carousel" 
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overlay overlay-left"></div>
        <div className="overlay overlay-right"></div>

        <div className="logo-track" ref={trackRef}>
          {logos.map((src, i) => (
            <div className="logo-item" key={i}>
              <img src={src} alt={`Logo ${i}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Clientslider;