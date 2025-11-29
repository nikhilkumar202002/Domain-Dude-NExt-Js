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
    const triggerItemRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useGSAP(() => {
        const wrapper = document.querySelector(".theme-transition-wrapper");
        
        if (wrapper && faqSectionRef.current) {
            
            // --- SEQUENCED TIMELINE ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: faqSectionRef.current,
                    // Start earlier (top 75%) so user sees change immediately upon entering
                    start: "top 75%", 
                    // End when the section is near the top
                    end: "top 20%",    
                    scrub: 1,         
                }
            });

            // 1. INITIAL SETUP: Force content to be hidden (autoAlpha handles opacity + visibility)
            gsap.set(".faq-accordians", { autoAlpha: 0 });

            // 2. TIMELINE SEQUENCE
            // 0% -> 50% of scroll: Fade Background to White & Text to Black
            tl.to(wrapper, { backgroundColor: "#ffffff", ease: "none", duration: 1 })
              .to(".faq-header h2, .faq-header p", { color: "#000000", ease: "none", duration: 1 }, "<");

            // 50% -> 100% of scroll: Fade Content In
            // The '+0.1' delay ensures it waits until background is done
            tl.to(".faq-accordians", { 
                autoAlpha: 1, // Changes opacity to 1 and visibility to visible
                ease: "power2.out", 
                duration: 1 
            }, ">"); // '>' means start after previous animation finishes


            // --- 3. Left Header Bounce (Triggered by 3rd Accordion) ---
            if (triggerItemRef.current) {
                 gsap.fromTo(".faq-header", 
                    { y: 50, autoAlpha: 0 }, 
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: triggerItemRef.current,
                            start: "top 85%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }
        }

    }, { scope: faqSectionRef });

    return (
        <section ref={faqSectionRef} className="faq-section py-20 relative z-10"> 
            <div className="container faq-container mx-auto px-6">
                
                <div className="faq-flex-box grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
                    
                    {/* Left Side - Sticky Header */}
                    <div className="faq-left-content sticky top-[150px] z-20">
                        {/* Start hidden (autoAlpha: 0 in GSAP handles this) */}
                        <div className="faq-header opacity-0"> 
                            <h2 className="text-4xl font-bold leading-tight">
                                Frequently<br /> Asked <br /> 
                                <span className="faq-header-highlight text-[var(--primary)]">Questions</span>
                            </h2>
                            <p className="mt-6 text-lg transition-colors duration-300">
                                At Domain Dude, we Design, Develop, and Deliver digital solutions that help your brand grow.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Accordions */}
                    {/* REMOVED 'opacity-0' class. GSAP .set() handles hiding it now. */}
                    <div className="faq-accordians flex flex-col gap-6 w-full">
                        {faqData.map((item, index) => (
                            <div 
                                key={item.id}
                                ref={index === 2 ? triggerItemRef : null} 
                                className={`faq-accordian-items ${activeIndex === index ? "active" : ""}`}
                            >
                                <div
                                    className="faq-accoridan-header flex justify-between items-center cursor-pointer relative z-10"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3>{item.question}</h3>
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
                                                <p>{item.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq;