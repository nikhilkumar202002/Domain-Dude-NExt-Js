"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; 
import MainButton from "../../common/MainButton";

gsap.registerPlugin(ScrollTrigger);

const Aboutsection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); 
  const leftRef = useRef<HTMLDivElement | null>(null);
  
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Helper: Split text into spans for animation
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    const wrapper = document.querySelector("#main-flow");
    const mm = gsap.matchMedia();
    
    // 1. BACKGROUND COLOR MANAGEMENT (Desktop Only)
    // On mobile, this code is skipped, so the background stays the default (Black).
    mm.add("(min-width: 769px)", () => {
      if (wrapper && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 60%", 
          end: "bottom 40%", 
          onEnter: () => gsap.to(wrapper, { backgroundColor: "#000000", duration: 1, overwrite: 'auto' }),
          onEnterBack: () => gsap.to(wrapper, { backgroundColor: "#000000", duration: 1, overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(wrapper, { backgroundColor: "#000000", duration: 1, overwrite: 'auto' }) 
        });
      }
    });

    // 2. THEME TRANSITION (Exit Animation)
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
            }
        });
    }

    // 3. LEFT CONTENT ANIMATION (Word-by-Word + Staggered Fade)
    if (leftRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      tl.from(leftRef.current.querySelector("h3"), {
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out"
      })
      .from(leftRef.current.querySelectorAll(".word-span"), {
        y: 50,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05, 
      }, "-=0.4")
      .from(leftRef.current.querySelectorAll("p, .about-btn"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }, "-=0.6");
    }

    // 4. CARDS ANIMATION
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%" }
        }
      );
      
      if (dotsRef.current[i]) {
        gsap.fromTo(dotsRef.current[i],
          { scale: 0.4, opacity: 0.4 },
          {
            scale: 1, opacity: 1, duration: 0.4, ease: "power2.out",
            scrollTrigger: {
              trigger: card, start: "top 75%",
              onEnter: () => {
                dotsRef.current.forEach((d) => d?.classList.remove("active"));
                dotsRef.current[i]?.classList.add("active");
              },
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section className="about-main relative z-10" ref={containerRef}>
      <div ref={contentRef} className="about-container container">
        <div className="about-flex grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          
          <div className="about-left-content" ref={leftRef}>
            <h3>About Us</h3>
            <h2>
              {splitWords("Brand")}
              <span className="heading-highlight inline-block">
                 {splitWords(" Experiences")}
              </span>
              {splitWords(" That Actually Move Metrics.")}
            </h2>

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
                <div className="about-card-flex" ref={(el) => { cardsRef.current[0] = el; }}>
                  <div className="about-card-dot active" ref={(el) => { dotsRef.current[0] = el; }}></div>
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

                <div className="about-card-flex" ref={(el) => { cardsRef.current[1] = el; }}>
                  <div className="about-card-dot" ref={(el) => { dotsRef.current[1] = el; }}></div>
                  <div className="about-card-one about-card-common about-card-two mt-4">
                    <h3>How We Think</h3>
                    <p>
                      Show the philosophy that shapes your work. Not
                      buzzwords—actual operating principles that guide
                      decisions.
                    </p>
                  </div>
                </div>

                <div className="about-card-flex" ref={(el) => { cardsRef.current[2] = el; }}>
                  <div className="about-card-dot" ref={(el) => { dotsRef.current[2] = el; }}></div>
                  <div className="about-card-one about-card-common about-card-three mt-4">
                    <h3>How We Work</h3>
                    <p>
                      Outline your workflow, collaboration model, and what
                      clients can expect. This removes ambiguity and signals
                      professionalism.
                    </p>
                  </div>
                </div>

                <div className="about-card-flex" ref={(el) => { cardsRef.current[3] = el; }}>
                  <div className="about-card-dot" ref={(el) => { dotsRef.current[3] = el; }}></div>
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
  );
};

export default Aboutsection;