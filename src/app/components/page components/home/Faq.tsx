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
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useGSAP(() => {
        const wrapper = document.querySelector("#footer-flow");
        
        if (wrapper && faqSectionRef.current) {
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: faqSectionRef.current,
                    start: "top 65%", // Trigger before content fully enters
                    end: "top 35%",    
                    scrub: true,         
                }
            });

            // 1. TIMELINE: Turn Wrapper WHITE and Text BLACK
            tl.to(wrapper, { backgroundColor: "#ffffff", ease: "none", duration: 1 })
              .to(".faq-header h2, .faq-header p", { color: "#000000", ease: "none", duration: 1 }, "<");

            // 2. Reveal Content
            if(contentRef.current) {
                 gsap.fromTo(contentRef.current, 
                    { autoAlpha: 0, y: 50 },
                    { 
                        autoAlpha: 1, 
                        y: 0, 
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: faqSectionRef.current,
                            start: "top 70%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }

            // 3. Header Animation (Specific Bounce)
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
            <div ref={contentRef} className="container faq-container mx-auto px-6 relative z-20">
                <div className="faq-flex-box grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
                    <div className="faq-left-content sticky top-[150px] z-20">
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