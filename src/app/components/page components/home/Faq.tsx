"use client"

import { useState, useRef } from "react";
import { faqData } from "../../../data/Faq"; 
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const faqSectionRef = useRef<HTMLDivElement>(null);
    // Ref for the header animation
    const headerRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // --- Helper: Split text into spans for animation ---
    const splitWords = (text: string) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
                <span className="word-span inline-block">{word}&nbsp;</span>
            </span>
        ));
    };

    useGSAP(() => {
        const wrapper = document.querySelector("#footer-flow");
        const mm = gsap.matchMedia();

        // 1. DESKTOP LOGIC: Animate Background Black -> White
        mm.add("(min-width: 769px)", () => {
            if (wrapper && faqSectionRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: faqSectionRef.current,
                        start: "top 85%",
                        end: "top 55%",    
                        scrub: true,         
                    }
                });
                tl.to(wrapper, { backgroundColor: "#ffffff", ease: "none", duration: 1 })
                  .to(".faq-header h2, .faq-header p", { color: "#000000", ease: "none", duration: 1 }, "<");
            }
        });

        // 2. HEADER TEXT ANIMATION (Word-by-Word)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });

        // A. Animate Heading Words
        tl.from(headerRef.current?.querySelectorAll(".word-span") || [], {
            y: 50,
            opacity: 0,
            rotation: 5,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out"
        })
        // B. Animate Paragraph
        .from(headerRef.current?.querySelector("p") || null, {
            y: 20, opacity: 0, duration: 0.8, ease: "power3.out"
        }, "-=0.4");
        
    }, { scope: faqSectionRef });

    return (
        <section ref={faqSectionRef} className="faq-section py-20 relative z-10 bg-white md:bg-transparent"> 
            
            <div className="container faq-container mx-auto px-6 relative z-20 text-black md:text-inherit">
                
                <div className="faq-flex-box flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start relative">
                    
                    <div className="faq-left-content !relative lg:!sticky lg:top-[150px] z-20 self-start">
                        {/* Changed motion.div to div with ref for GSAP */}
                        <div ref={headerRef} className="faq-header"> 
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-black md:text-inherit">
                                {splitWords("Frequently")} <br /> 
                                {splitWords("Asked")} <br /> 
                                <span className="faq-header-highlight text-[var(--primary)] inline-block">
                                    {splitWords("Questions")}
                                </span>
                            </h2>
                            <p className="mt-6 text-lg transition-colors duration-300 text-gray-700 md:text-inherit">
                                At Domain Dude, we Design, Develop, and Deliver digital solutions that help your brand grow.
                            </p>
                        </div>
                    </div>
                    
                    <motion.div 
                        className="faq-accordians flex flex-col gap-6 w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-55% 0px 0px 0px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        {faqData.map((item, index) => (
                            <motion.div 
                                key={item.id}
                                className={`faq-accordian-items ${activeIndex === index ? "active" : ""}`}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div
                                    className="faq-accoridan-header flex justify-between items-center cursor-pointer relative z-10"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3 className="text-black md:text-inherit">{item.question}</h3>
                                    <span className="faq-accordian-icon">
                                        {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                </div>
                                <AnimatePresence initial={false}>
                                    {activeIndex === index && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <div className="faq-accoridan-content">
                                                <p className="text-gray-600 md:text-[#555]">{item.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Faq;