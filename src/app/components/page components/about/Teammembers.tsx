"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Image Imports
import Nikhil from "../../../../../public/Teams/nikhil.jpg";
import Prajitha from "../../../../../public/Teams/prajitha.jpg";
import Jasmin from "../../../../../public/Teams/jasmin.jpg";
import Devan from "../../../../../public/Teams/devan.jpg";
import Jose from "../../../../../public/Teams/jose.jpg";
import Jinson from "../../../../../public/Teams/jinson.jpg";
import "./About.css";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Teammembers = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline connected to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animation starts when top of section is 80% down the screen
          toggleActions: "play none none reverse",
        },
      });

      // 1. Animate Header Content (H2 and P)
      tl.from(".team-members-header > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15, // Delay between H2 and P
      });

      // 2. Animate Cards with Staggered Delay
      tl.from(
        ".team-members-card",
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15, // 0.15s delay between each card appearing
        },
        "-=0.8" // Start this animation while the header is still finishing
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="team-members" ref={sectionRef}>
        <div className="team-members-container container">
          <div className="team-members-header">
            <h2>Meet the Team</h2>
            <p>
              We’re a tight-knit crew of designers, developers, strategists, and
              storytellers who bring different skills but share one goal:
              helping your brand win online. Each project pairs you directly
              with the specialists you need most, so you always know who’s
              behind the work and who’s in your corner.
            </p>
          </div>

          <div className="team-members-wrapper grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 items-center">
            {/* Card 1 */}
            <div className="team-members-card">
              <Image src={Devan} alt="Deven Subramaniyan" width={0} height={0} />
              <div className="team-members-details">
                <h3>Deven Subramaniyan</h3>
                <h5>Managing Director</h5>
              </div>
            </div>

            {/* Card 2 */}
            <div className="team-members-card">
              <Image src={Nikhil} alt="Nikhil Kumar s" width={0} height={0} />
              <div className="team-members-details">
                <h3>Nikhil Kumar S</h3>
                <h5>Team Lead, UI/UX Designer, Web Developer</h5>
              </div>
            </div>

            {/* Card 3 */}
            <div className="team-members-card">
              <Image src={Jasmin} alt="Jasmin H" width={0} height={0} />
              <div className="team-members-details">
                <h3>Jasmin H</h3>
                <h5>Sr. Shopify Developer, Wordpress Developer</h5>
              </div>
            </div>

            {/* Card 4 */}
            <div className="team-members-card">
              <Image src={Jinson} alt="Jinson K Sebastian" width={0} height={0} />
              <div className="team-members-details">
                <h3>Jinson K Sebastian</h3>
                <h5>Sr. Backend Developer, Cyber Security, Ethical Hacker</h5>
              </div>
            </div>

            {/* Card 5 */}
            <div className="team-members-card">
              <Image src={Prajitha} alt="Prajitha Prakash" width={0} height={0} />
              <div className="team-members-details">
                <h3>Prajitha Prakash</h3>
                <h5>Administrator, HR</h5>
              </div>
            </div>

            {/* Card 6 */}
            <div className="team-members-card">
              <Image src={Jose} alt="Jose George" width={0} height={0} />
              <div className="team-members-details">
                <h3>Jose George</h3>
                <h5>Digital Marketing</h5>
              </div>
            </div>

            {/* Card 7 (Duplicate Nikhil as per your code) */}
            <div className="team-members-card">
              <Image src={Nikhil} alt="Nikhil Kumar S" width={0} height={0} />
              <div className="team-members-details">
                <h3>Nikhil Kumar S</h3>
                <h5>Team Lead, UI/UX Designer, Web Developer</h5>
              </div>
            </div>

            {/* Card 8 (Duplicate Nikhil as per your code) */}
            <div className="team-members-card">
              <Image src={Nikhil} alt="Nikhil Kumar S" width={0} height={0} />
              <div className="team-members-details">
                <h3>Nikhil Kumar S</h3>
                <h5>Team Lead, UI/UX Designer, Web Developer</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Teammembers;