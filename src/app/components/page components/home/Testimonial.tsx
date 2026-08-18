"use client";

import React, { useState, useRef } from "react"; 
import { testimonials } from "../../../data/Testimonialdata"; 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Google from "../../../../assets/Icons/google.svg";
import Star from "../../../../assets/Icons/star.svg";
import "./Home.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, Navigation } from "swiper/modules"; 
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/autoplay"; 

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperInstance | null>(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  // Ref for the header animation
  const headerRef = useRef<HTMLDivElement>(null);
  const shouldLoop = testimonials.length > 4;

  // --- Helper: Split text into spans for animation ---
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });

    // A. Animate "Stories of Satisfaction"
    tl.from(headerRef.current?.querySelector("h3") || null, {
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out"
    })
    // B. Animate Main Heading Words
    .from(headerRef.current?.querySelectorAll(".word-span") || [], {
        y: 50,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
    }, "-=0.4");


    if (contentRef.current) {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -50,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "bottom 70%", 
                end: "bottom 20%",
                scrub: true,
            }
        });
    }
  }, { scope: sectionRef });

  return (
    <section id="testimonials" className="testimonial-section text-white py-20 relative z-10" ref={sectionRef}>
      <div ref={contentRef} className="testimonial-container relative z-20"> 
        
        {/* Changed to standard div with ref for GSAP */}
        <div ref={headerRef} className="container testimonial-header mb-12">
             <h3 className="text-xl opacity-80 mb-2">Stories of Satisfaction</h3>
             <h2 className="text-4xl font-bold">
                {splitWords("Discover why ")}
                <span className="heading-highlight inline-block">
                    {splitWords("clients love")}
                </span> 
                <br />
                {splitWords("working with us.")}
             </h2>
        </div>

        <motion.div 
            className="container testimonial-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <Swiper
                onSwiper={setSwiperRef}
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop={shouldLoop}
                rewind={!shouldLoop}
                speed={800}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                    0: { slidesPerView: 1.3, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1400: { slidesPerView: 4, spaceBetween: 20 },
                }}
                className="testimonial-swiper"
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id} className="!h-auto !flex">
                        <div className="testimonial-card bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl h-full flex flex-col">
                            <div className="testimonial-card-content mb-6 flex-grow">
                                <div
                                    className="testimonial-card-stars flex gap-1 mb-4"
                                    aria-label={`${item.rating ?? 5} out of 5 stars`}
                                >
                                    {[...Array(item.rating ?? 5)].map((_, i) => (
                                        <span key={i}>
                                            <Image width={14} height={14} alt="" src={Star} />
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{item.content}</p>
                            </div>
                            <div className="testimonial-card-footer mt-auto">
                                <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                {item.role.trim() ? (
                                    <p className="text-sm text-gray-400">{item.role}</p>
                                ) : null}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>      
        
        <div className="container testimonial-footer-flex flex justify-between items-center mt-10">
            <div className="testimonial-footer-arrow flex gap-4">
                <button className="left-arrow bg-white/10 hover:bg-white/20 p-3 rounded-full text-white" onClick={() => swiperRef?.slidePrev()}>
                    <IoIosArrowBack size={24}/>
                </button>
                <button className="right-arrow bg-white/10 hover:bg-white/20 p-3 rounded-full text-white" onClick={() => swiperRef?.slideNext()}>
                    <IoIosArrowForward size={24}/>
                </button>
            </div>
             <motion.div 
                className="testimonial-footer-google flex items-center gap-3" 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
             >
                <span className="google-icon bg-white p-2 rounded-full">
                    <Image width={24} height={24} alt="Google" src={Google}/>
                </span>
                <span className="google-review-text text-sm">
                    <div className="opacity-70">Read us on Google Reviews</div>
                    <div className="star flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (<span key={i}><Image width={12} height={12} alt="Star" src={Star}/></span>))}
                    </div>
                </span>
            </motion.div>
        </div>      
      </div>
    </section>
  )
}

export default Testimonial;
