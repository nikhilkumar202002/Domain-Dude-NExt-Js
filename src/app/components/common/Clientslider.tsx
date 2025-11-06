'use client'

import { useLayoutEffect, useRef } from "react";;
import { gsap } from "gsap";
import "./Styles.css";

    const logos = [
        "/assets/Client Logo/pantryindia-white.png",
        "/assets/Client Logo/rysa-clinic.png",
        "/assets/Client Logo/pantryindia-white.png",
        "/assets/Client Logo/rysa-clinic.png",
        "/assets/Client Logo/pantryindia-white.png",
        "/assets/Client Logo/rysa-clinic.png",
    ];
    

const Clientslider = () => {

    const carouselRef = useRef<HTMLDivElement | null>(null);

     useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = gsap.utils.toArray(".logo-item");
      const totalWidth = (track[0] as HTMLElement).offsetWidth * track.length;

      // Move the entire track from start to end continuously
      gsap.to(".logo-track", {
        x: `-${totalWidth / 2}px`, // move half, then repeat seamlessly
        duration: 20,              // control speed (lower = faster)
        ease: "none",
        repeat: -1,
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
         <section className="logo-carousel" ref={carouselRef}>
      <div className="logo-track">
        {logos.concat(logos).map((src, i) => (
          <div className="logo-item" key={i}>
            <img src={src} alt={`Logo ${i}`} />
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Clientslider