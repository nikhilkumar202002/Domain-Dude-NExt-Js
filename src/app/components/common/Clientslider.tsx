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

useLayoutEffect(() => {
  const track = trackRef.current;
  if (!track) return;

  // FADE-UP ANIMATIONS
  gsap.from(sectionRef.current, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
    },
  });

  gsap.from(headerRef.current, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 75%",
    },
  });

  gsap.from(carouselRef.current, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 70%",
    },
  });

  // MARQUEE ANIMATION (UNCHANGED)
  const items = Array.from(track.children) as HTMLElement[];
  const totalWidth = items.reduce(
    (sum, el) => sum + el.offsetWidth + 80,
    0
  );

  while (track.scrollWidth < window.innerWidth * 2) {
    items.forEach((el) => {
      const clone = el.cloneNode(true);
      track.appendChild(clone);
    });
  }

  const ctx = gsap.context(() => {
    gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % -totalWidth}px`,
      },
    });
  }, trackRef);

  return () => ctx.revert();
}, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children) as HTMLElement[];

    // Total width of all logo items including gap
    const totalWidth = items.reduce(
      (sum, el) => sum + el.offsetWidth + 80, // gap = 80px (as per your CSS)
      0
    );

    // Duplicate logos enough times to cover the visible area
    while (track.scrollWidth < window.innerWidth * 2) {
      items.forEach((el) => {
        const clone = el.cloneNode(true);
        track.appendChild(clone);
      });
    }

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: `-=${totalWidth}`,
        duration: 25, // speed
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % -totalWidth}px`,
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container py-10 flex-column" ref={sectionRef}>
      <div className="client-header" ref={headerRef}>
        <h4>300+ <span>Numbers-driven with benefits list</span></h4>
      </div>
      <section className="logo-carousel" ref={carouselRef}>
        {/* Overlays */}
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
