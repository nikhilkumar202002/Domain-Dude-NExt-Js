'use client'

import React, { useState } from "react"; 
import { testimonials } from "../../../data/Testimonialdata"; 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Google from "../../../../assets/Icons/google.svg";
import Star from "../../../../assets/Icons/star.svg";
import "./Home.css";
import Image from "next/image";

// Import Swiper Core, Modules, and specific CSS
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"; 
import { Autoplay, Navigation } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/autoplay"; 

const Testimonial = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="testimonial-section">
      <div className="container testimonial-container"> 
        
        <div className="testimonial-header">
             <h3>Stories of Satisfaction</h3>
            <h2>Discover why clients love working with us.</h2>
        </div>

        <div className="testimonial-wrapper">
            <Swiper
                onSwiper={setSwiperRef}
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1} // Default fallback
                loop={true} 
                speed={800}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                // --- UPDATED BREAKPOINTS HERE ---
                breakpoints={{
                    // 0px and up (Mobile): Shows 1.5 cards
                    0: { 
                        slidesPerView: 1.3, 
                        spaceBetween: 20 
                    },
                    // 640px and up (Large Mobile/Tablet): Shows 2 cards
                    640: { 
                        slidesPerView: 2, 
                        spaceBetween: 20 
                    },
                    // 1024px and up (Desktop): Shows 3 cards
                    1024: { 
                        slidesPerView: 3, 
                        spaceBetween: 20 
                    },
                    // 1400px and up (Large Desktop): Shows 4 cards
                    1400: { 
                        slidesPerView: 4, 
                        spaceBetween: 20 
                    },
                }}
                className="testimonial-swiper"
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content"> 
                                <p>{item.content}</p>
                            </div>
                            <div className="testimonial-card-footer">
                                <h4>{item.name}</h4>
                                <p>{item.role}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>      

        <div className="testimonial-footer-flex">
            {/* Custom Arrows */}
            <div className="testimonial-footer-arrow">
                <button 
                    className="left-arrow" 
                    onClick={() => swiperRef?.slidePrev()}
                    type="button" 
                >
                    <IoIosArrowBack/>
                </button>
                <button 
                    className="right-arrow" 
                    onClick={() => swiperRef?.slideNext()}
                    type="button"
                >
                    <IoIosArrowForward/>
                </button>
            </div>

            <div className="testimonial-footer-google" onMouseMove={handleMouseMove}>
                <span className="google-icon">
                    <Image width={35} height={35} alt="Google Reviews" src={Google}/>
                </span>
                <span className="google-review-text">
                    Read us on Google Reviews
                    <div className="star">
                        {[...Array(5)].map((_, i) => (
                             <span key={i}><Image width={15} height={15} alt="Star" src={Star}/></span>
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