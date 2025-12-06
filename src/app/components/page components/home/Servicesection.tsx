"use client";

import { useState, useRef } from "react";
import { LuGlobeLock, LuMonitorSmartphone, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { GoArrowUpRight } from "react-icons/go";
import { FiFigma, FiDatabase } from "react-icons/fi";
import { MdOutlineVideoSettings, MdOutlineCampaign } from "react-icons/md";
import Image from "next/image";
import Abtractcardone from "../../../../assets/Images/Abstract-card-one.svg";
import MainButton from "../../common/MainButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const Servicesection = () => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const wrapper = document.querySelector("#main-flow");

    // 1. THEME TRANSITION: White -> Black
    if (wrapper) {
      gsap.to(wrapper, {
        backgroundColor: "#000000",
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%", 
          end: "top 35%",
          scrub: true, // Smooth scrubbing
        }
      });
    }

    // 2. ENTRANCE ANIMATION
    gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 60 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play reverse play reverse"
            }
        }
    );

  }, { scope: sectionRef });

  const services = [
    { id: 1, title: "Web Development", desc: "Build powerful websites...", icon: <LuGlobeLock /> },
    { id: 2, title: "Digital Marketing", desc: "Boost your online presence...", icon: <MdOutlineVideoSettings /> },
    { id: 3, title: "UI/UX Designing", desc: "Deliver engaging experiences...", icon: <FiFigma /> },
    { id: 4, title: "App Development", desc: "Create scalable apps...", icon: <LuMonitorSmartphone /> },
    { id: 5, title: "SEO Optimization", desc: "Rank higher on search...", icon: <FiDatabase /> },
    { id: 6, title: "Brand Strategy", desc: "Define your unique brand...", icon: <MdOutlineCampaign /> },
  ];

  return (
    <section className="service-section text-white relative z-10" ref={sectionRef}>
        <div ref={contentRef} className="service-container container relative z-20">
            <div className="service-section-header mb-12">
                <h3>What we do?</h3>
                <h2>Creative and Performance, Aligned to Your Business Goals</h2>
            </div>

            <div className="service-section-card-wrapper group relative">
                <button onClick={() => swiperRef?.slidePrev()} className="custom-swiper-btn prev-btn absolute left-0 z-10 top-1/2"><LuChevronLeft /></button>
                <button onClick={() => swiperRef?.slideNext()} className="custom-swiper-btn next-btn absolute right-0 z-10 top-1/2"><LuChevronRight /></button>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    onSwiper={setSwiperRef}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={false}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    className="service-swiper"
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={service.id}>
                            <div className="service-section-card p-6 border border-zinc-800 bg-zinc-900/50 rounded-xl hover:border-white transition-all duration-300">
                                <div className={`service-section-card-abtract ${index % 2 !== 0 ? "opacity-50" : ""}`}>
                                    <Image src={Abtractcardone} alt="Abstract" width={380} height={0} />
                                </div>
                                <div className="service-section-card-content relative z-10">
                                    <div className="service-section-card-icon text-4xl mb-4 text-[var(--primary)]">{service.icon}</div>
                                    <div className="service-section-card-body">
                                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-gray-400 mb-4">{service.desc}</p>
                                        <a href="#" className="flex items-center gap-2 text-sm font-semibold hover:text-[var(--primary)]">Read More <span><GoArrowUpRight/></span></a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="service-section-btn flex justify-center mt-12">
                <MainButton label="Explore Our Services" />
            </div>
        </div>
    </section>
  );
};

export default Servicesection;