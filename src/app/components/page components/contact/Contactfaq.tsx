"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqData } from "../../../data/ContactFaqData"; 
import "./Contact.css";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Contactfaq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLElement>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-faq",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".contact-faq-header .word-span", {
        y: 60,
        opacity: 0,
        rotation: 5,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      })
      .from(
        ".contact-faq-accordian-item",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <>
      <section className="contact-faq" ref={containerRef}>
        <div className="contact-faq-container container">
          
          <div className="contact-faq-header">
            <h2 className="contact-faq-title">
              {splitWords("Frequently")}
              <br />
              {/* Ensure this span has the highlight-text class */}
              <span className="highlight-text">{splitWords("Asked")}</span> {splitWords("Questions")}
            </h2>
          </div>

          <div className="contact-faq-accordian">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className={`contact-faq-accordian-item flex justify-between items-start gap-10 md:gap-60 ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="contact-faq-accoridan-left">
                  <h3>{item.id < 10 ? `0${item.id}.` : `${item.id}.`}</h3>
                </div>

                <div className="contact-faq-accoridan-middle">
                  <h3>{item.question}</h3>
                  <div className="faq-answer-wrapper">
                    <p>{item.answer}</p>
                  </div>
                </div>

                <div className="contact-faq-accoridan-right">
                  <span className="faq-icon">
                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contactfaq;