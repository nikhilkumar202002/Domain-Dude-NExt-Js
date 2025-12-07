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

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useGSAP(() => {
        const wrapper = document.querySelector("#footer-flow");
        if (wrapper && faqSectionRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: faqSectionRef.current,
                    // Start early (85%) and finish early (55%)
                    start: "top 85%",
                    end: "top 55%",    
                    scrub: true,         
                }
            });
            tl.to(wrapper, { backgroundColor: "#ffffff", ease: "none", duration: 1 })
              .to(".faq-header h2, .faq-header p", { color: "#000000", ease: "none", duration: 1 }, "<");
        }
    }, { scope: faqSectionRef });

    return (
        <section ref={faqSectionRef} className="faq-section py-20 relative z-10"> 
            <div className="container faq-container mx-auto px-6 relative z-20">
                <div className="faq-flex-box grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
                    <div className="faq-left-content sticky top-[150px] z-20">
                        <motion.div 
                            className="faq-header"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            // Wait for white background
                            viewport={{ once: true, margin: "-55% 0px 0px 0px" }}
                            transition={{ duration: 0.8 }}
                        > 
                            <h2 className="text-4xl font-bold leading-tight">
                                Frequently<br /> Asked <br /> 
                                <span className="faq-header-highlight text-[var(--primary)]">Questions</span>
                            </h2>
                            <p className="mt-6 text-lg transition-colors duration-300">
                                At Domain Dude, we Design, Develop, and Deliver digital solutions that help your brand grow.
                            </p>
                        </motion.div>
                    </div>
                    
                    <motion.div 
                        className="faq-accordians flex flex-col gap-6 w-full"
                        initial="hidden"
                        whileInView="visible"
                        // Trigger list slightly after header
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Faq;