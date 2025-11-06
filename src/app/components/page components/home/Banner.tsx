"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import MainButton from "../../common/MainButton";
import "./Home.css";

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const random = gsap.utils.random;

      gsap.to(".bubble1", {
        x: 100,
        y: -80,
        scale: 1.05,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".bubble2", {
        x: -120,
        y: 90,
        scale: 0.95,
        duration: 5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      const wander = () => {
        gsap.to(".bubble3", {
          x: random(-140, 140),
          y: random(-100, 100),
          scale: random(0.9, 1.1),
          duration: random(3, 5),
          ease: "sine.inOut",
          onComplete: wander,
        });
      };
      wander();

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(".bubble1", {
          xPercent: x * 6,
          yPercent: y * 6,
          duration: 0.8,
          ease: "power2.out",
        });
        gsap.to(".bubble2", {
          xPercent: x * -8,
          yPercent: y * -8,
          duration: 0.9,
          ease: "power2.out",
        });
        gsap.to(".bubble3", {
          xPercent: x * 10,
          yPercent: y * 10,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 🌟 4. Fade-up content animation
      gsap.from(".banner-content > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.3,
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="banner" ref={bannerRef}>
        <div className="noise"></div>
        <div className="bubble1"></div>
        <div className="bubble2"></div>
        <div className="bubble3"></div>
        <div className="banner-container container">
          <div className="banner-content">
            <h1>
              Leading Website Development & Digital Marketing Agency{" "}
              <span className="banner-content-highlight">In Kochi.</span>
            </h1>
            <p>
              We crafts stunning websites and data-driven marketing strategies
              that help brands grow online and attract more customers.
            </p>
            <div className="banner-counter">
              <h3>Trusted by 100+ Brands Worldwide</h3>
              <div className="banner-counters">
                <div className="banner-counters-item">
                  <h4>11+</h4>
                  <p>Years of Experience</p>
                </div>

                <div className="vertical-line"></div>
                <div className="banner-counters-item">
                  <p>Global Clients</p>
                </div>
                <div className="vertical-line"></div>

                <div className="banner-counters-item">
                  <p>360° Digital Solutions</p>
                </div>
              </div>
            </div>
            <div className="banner-btn">
              <MainButton label="Let’s Build Something" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
