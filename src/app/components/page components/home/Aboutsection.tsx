"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainButton from "../../common/MainButton";
import Image from "next/image";
import Abstract from "../../../../assets/Images/Abstract-right.svg";

gsap.registerPlugin(ScrollTrigger);

const Aboutsection = () => {

  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const leftRef = useRef(null);

 useEffect(() => {
  // LEFT CONTENT
  gsap.fromTo(
    leftRef.current,
    {
      opacity: 0,
      x: -40,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 85%",
      },
    }
  );

  // CARDS + DOTS (already added before)
  cardsRef.current.forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      dotsRef.current[i],
      { scale: 0.4, opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          onEnter: () => {
            dotsRef.current.forEach((d) => d.classList.remove("active"));
            dotsRef.current[i].classList.add("active");
          },
        },
      }
    );
  });
}, []);

  return (
    <>
      <section className="about-main">
        <div className="about-section-bg-image">
          <Image src={Abstract} width={750} height={0} alt="Abstract" />
        </div>
        <div className="about-container container">
          <div className="about-flex grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div className="about-left-content" ref={leftRef}>
              <h3>About Us</h3>
              <h2>Brand Experiences That Actually Move Metrics.</h2>
              <p>
                A creative digital agency from Kochi, driven by storytellers,
                designers, and growth strategists. We build unforgettable brand
                experiences, craft visuals that inspire, and create strategies
                that spark real growth. Our approach blends creativity with
                data-driven insights, ensuring every idea delivers impact. We
                don’t just help brands grow — we help them become brands people
                remember. From web experiences and content to campaigns and
                performance marketing, we align everything to clear business
                goals. We move fast, stay curious, and partner with brands that
                are ready to think beyond the usual.
              </p>
              <div className="about-btn">
                <MainButton label="Study More" />
              </div>
            </div>
            <div className="about-right">
              <div className="about-content-cards">
                <div className="about-box-vertical-line"></div>
                <div className="about-cards">
                  <div className="about-card-flex" ref={(el) => (cardsRef.current[0] = el)}>
                    <div className="about-card-dot active" ref={(el) => (dotsRef.current[0] = el)}></div>
                    <div className="about-card-one">
                      <h3>Origin / Why We Exist</h3>
                      <p>
                        This should explain the core problem you saw in the
                        market and the conviction that drove you to start the
                        agency. Keep it specific generic “passion for
                        creativity” is useless.
                      </p>
                    </div>
                  </div>

                  <div className="about-card-flex" ref={(el) => (cardsRef.current[1] = el)}>
                    <div className="about-card-dot" ref={(el) => (dotsRef.current[1] = el)}></div>
                    <div className="about-card-one about-card-common about-card-two mt-4">
                      <h3>How We Think</h3>
                      <p>
                        Show the philosophy that shapes your work. Not
                        buzzwords—actual operating principles that guide
                        decisions.
                      </p>
                    </div>
                  </div>

                  <div className="about-card-flex" ref={(el) => (cardsRef.current[2] = el)}>
                    <div className="about-card-dot" ref={(el) => (dotsRef.current[2] = el)}></div>
                    <div className="about-card-one about-card-common about-card-three mt-4">
                      <h3>How We Work</h3>
                      <p>
                        Outline your workflow, collaboration model, and what
                        clients can expect. This removes ambiguity and signals
                        professionalism.
                      </p>
                    </div>
                  </div>

                  <div className="about-card-flex" ref={(el) => (cardsRef.current[3] = el)}>
                    <div className="about-card-dot" ref={(el) => (dotsRef.current[3] = el)}></div>
                    <div className="about-card-one about-card-common about-card-four mt-4">
                      <h3>The Impact</h3>
                      <p>
                        Close with proof of value—what results you consistently
                        deliver, the transformations clients get, or what makes
                        your output distinct.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutsection;
