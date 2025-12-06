'use client'

import React, { useState, useRef } from "react"; 
import { testimonials } from "../../../data/Testimonialdata"; 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Google from "../../../../assets/Icons/google.svg";
import Star from "../../../../assets/Icons/star.svg";
import "./Home.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"; 
import { Autoplay, Navigation } from "swiper/modules"; 

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/autoplay"; 

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // 1. INITIALIZE FOOTER FLOW (Black)
    const wrapper = document.querySelector("#footer-flow");
    if(wrapper) {
        gsap.to(wrapper, { backgroundColor: "#000000", duration: 0.1, overwrite: "auto" });
    }

    // 2. EXIT ANIMATION: Fade out to FAQ
    if (contentRef.current) {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -50,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "bottom 70%", // Start fading out earlier
                end: "bottom 20%",
                scrub: true,
            }
        });
    }

  }, { scope: sectionRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="testimonial-section text-white py-20 relative z-10" ref={sectionRef}>
      <div ref={contentRef} className="container testimonial-container relative z-20"> 
        <div className="testimonial-header mb-12">
             <h3 className="text-xl opacity-80 mb-2">Stories of Satisfaction</h3>
            <h2 className="text-4xl font-bold">Discover why clients love working with us.</h2>
        </div>
        <div className="testimonial-wrapper">
            <Swiper
                onSwiper={setSwiperRef}
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true} 
                speed={800}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
                                <p className="text-gray-300 leading-relaxed">{item.content}</p>
                            </div>
                            <div className="testimonial-card-footer mt-auto">
                                <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                <p className="text-sm text-gray-400">{item.role}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>      
        <div className="testimonial-footer-flex flex justify-between items-center mt-10">
            <div className="testimonial-footer-arrow flex gap-4">
                <button className="left-arrow bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all text-white" onClick={() => swiperRef?.slidePrev()} type="button">
                    <IoIosArrowBack size={24}/>
                </button>
                <button className="right-arrow bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all text-white" onClick={() => swiperRef?.slideNext()} type="button">
                    <IoIosArrowForward size={24}/>
                </button>
            </div>
             <div className="testimonial-footer-google flex items-center gap-3" onMouseMove={handleMouseMove}>
                <span className="google-icon bg-white p-2 rounded-full">
                    <Image width={24} height={24} alt="Google Reviews" src={Google}/>
                </span>
                <span className="google-review-text text-sm">
                    <div className="opacity-70">Read us on Google Reviews</div>
                    <div className="star flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                             <span key={i}><Image width={12} height={12} alt="Star" src={Star}/></span>
                        ))}
                    </div>
                </span>
            </div>
        </div>      
      </div>
    </section>
  )
}

export default Testimonial;