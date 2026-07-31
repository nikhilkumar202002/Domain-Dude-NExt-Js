"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainButton from "../../common/MainButton";

gsap.registerPlugin(ScrollTrigger);

const Aboutsection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const splitWords = (text: string) =>
    text.split(" ").map((word, index) => (
      <span
        key={index}
        className="word-wrapper inline-block overflow-hidden align-top"
      >
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));

  useGSAP(
    () => {
      const wrapper = document.querySelector("#main-flow");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (!wrapper || !containerRef.current) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(wrapper, {
              backgroundColor: "#000000",
              duration: 1,
              overwrite: "auto",
            }),
          onEnterBack: () =>
            gsap.to(wrapper, {
              backgroundColor: "#000000",
              duration: 1,
              overwrite: "auto",
            }),
          onLeaveBack: () =>
            gsap.to(wrapper, {
              backgroundColor: "#000000",
              duration: 1,
              overwrite: "auto",
            }),
        });
      });

      if (contentRef.current && containerRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 60%",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (labelRef.current && bodyRef.current) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        timeline
          .from(labelRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          })
          .from(
            bodyRef.current.querySelectorAll(".word-span"),
            {
              y: 50,
              opacity: 0,
              rotation: 5,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.05,
            },
            "-=0.4",
          )
          .from(
            bodyRef.current.querySelectorAll("p, .about-btn"),
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.6",
          );
      }

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section className="about-main relative z-10" ref={containerRef}>
      <div ref={contentRef} className="about-container">
        <div className="about-section-label" ref={labelRef}>
          <span>About Us</span>
        </div>

        <div className="about-content-box" ref={bodyRef}>
          <div className="about-upper">
            <h2>
              {splitWords("Brand")}
              <span className="heading-highlight inline-block">
                {splitWords(" Experiences")}
              </span>
              {splitWords(" That Actually Move Metrics.")}
            </h2>
          </div>

          <div className="about-divider-row">
            <div className="about-horizontal-line" aria-hidden="true" />
            <div className="about-btn">
              <MainButton label="Study More" />
            </div>
          </div>

          <div className="about-lower">
            <span className="about-pointer" aria-hidden="true">↳</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
