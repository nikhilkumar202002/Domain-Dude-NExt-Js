"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { GoArrowDown } from "react-icons/go";
import MainButton from "../../common/MainButton";
import { workProcessData } from "../../../data/HowWeWorkData";
import Abstract from "../../../../assets/Images/Abstract-card-two.svg"
import Image from "next/image";
import "./About.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Howwework = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // 1. Add the Animation Logic
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that triggers when the section enters the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Starts when top of section hits 80% of viewport
          toggleActions: "play none none reverse",
        },
      });

      // Animate Header (H2 and P)
      tl.from(".second-header > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Animate Cards (Staggered)
      tl.from(".second-cards", {
        y: 60, // Slightly more distance for cards
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2, // Cards appear one after another
      }, "-=0.8"); // Start overlapping with header animation

      // Animate CTA Button
      tl.from(".second-section-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    // 2. Attach ref to the section
    <section className="second-section" ref={sectionRef}>
      <div className="second-container container">
        <div className="second-inner">
          <div className="second-header">
            <h2>How We Work</h2>
            <p>
              We collaborate in three flexible ways, depending on your growth
              stage, marketing needs, and how closely you want Domain Dude
              embedded in your team.
            </p>
          </div>

          <div className="second-card-wrapper grid grid-cols-1 md:grid-cols-3 gap-5 pt-10">
            {workProcessData.map((item) => (
              <div
                key={item.id}
                className="second-cards"
                onMouseMove={handleMouseMove}
              >
                <div className="second-cards-abstract">
                    <Image src={Abstract} alt="Abstract" width={200} height={0}/>
                </div>
                <div className="second-card-header">
                  <h4>{item.step}</h4>
                  <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>

                <div className="second-card-bottom">
                  <span className="second-botton-cta">
                    <GoArrowDown />
                  </span>
                  <div className="second-bottom-accordian">
                    <h4>{item.accordionTitle}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="second-section-cta">
            <MainButton label="Lets Work" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howwework;