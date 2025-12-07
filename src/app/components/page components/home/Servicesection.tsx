"use client";

import { useState, useRef } from "react";
import {
  LuGlobeLock,
  LuMonitorSmartphone,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
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
import { motion } from "framer-motion"; 
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const Servicesection = () => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const sectionRef = useRef(null);

  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  useGSAP(
    () => {
      const wrapper = document.querySelector("#main-flow");
      
      // THEME TRANSITION: White -> Black
      if (wrapper) {
        // FIX: Use fromTo to enforce the color range (White to Black)
        // This ensures that when scrolling UP, it transitions exactly back to White.
        gsap.fromTo(wrapper, 
          { backgroundColor: "#ffffff" },
          {
            backgroundColor: "#000000",
            color: "#ffffff",
            overwrite: "auto",
            immediateRender: false, // Important to prevent premature color locking
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const services = [
    { id: 1, title: "Web Development", desc: "Build powerful, responsive, and high-performance websites tailored to your business needs.", icon: <LuGlobeLock /> },
    { id: 2, title: "Digital Marketing", desc: "Boost your online presence with targeted marketing strategies that drive real engagement.", icon: <MdOutlineVideoSettings /> },
    { id: 3, title: "UI/UX Designing", desc: "Deliver engaging experiences with intuitive interfaces designed for maximum user satisfaction.", icon: <FiFigma /> },
    { id: 4, title: "App Development", desc: "Create scalable and feature-rich mobile applications for both Android and iOS platforms.", icon: <LuMonitorSmartphone /> },
    { id: 5, title: "SEO Optimization", desc: "Rank higher on search engines with advanced SEO techniques tailored to your industry.", icon: <FiDatabase /> },
    { id: 6, title: "Brand Strategy", desc: "Define your unique brand identity with strategic planning and creative positioning.", icon: <MdOutlineCampaign /> },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="service-section text-white relative z-10" ref={sectionRef}>
      <div className="service-container container relative z-20">
        
        <motion.div 
          className="service-section-header mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-55% 0px 0px 0px" }}
          variants={fadeInUp}
        >
          <h3>What we do?</h3>
          <h2>Creative and Performance, Aligned to Your Business Goals</h2>
        </motion.div>

        <motion.div 
            className="service-section-card-wrapper group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-55% 0px 0px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => swiperRef?.slidePrev()}
            disabled={disablePrev}
            className={`custom-swiper-btn prev-btn absolute left-0 z-10 top-1/2 ${disablePrev ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-white/20"}`}
          >
            <LuChevronLeft />
          </button>

          <button
            onClick={() => swiperRef?.slideNext()}
            disabled={disableNext}
            className={`custom-swiper-btn next-btn absolute right-0 z-10 top-1/2 ${disableNext ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-white/20"}`}
          >
            <LuChevronRight />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              setSwiperRef(swiper);
              const updateStates = () => {
                setDisablePrev(swiper.isBeginning);
                setDisableNext(swiper.isEnd);
              };
              updateStates();
              swiper.on("slideChange", updateStates);
            }}
            spaceBetween={20}
            slidesPerView={1}
            loop={false}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="service-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <div
                  className="service-section-card p-6 border border-zinc-800 bg-zinc-900/50 rounded-xl hover:border-white transition-all duration-300 h-full"
                  onMouseMove={(e) => {
                    const glow = e.currentTarget.querySelector(".service-glow") as HTMLElement;
                    if(glow){
                        const rect = e.currentTarget.getBoundingClientRect();
                        glow.style.left = `${e.clientX - rect.left}px`;
                        glow.style.top = `${e.clientY - rect.top}px`;
                    }
                  }}
                >
                  <div className="service-glow"></div>
                  <div className={`${index % 2 === 0 ? "service-section-card-abtract" : "service-section-card-abtract-two"}`}>
                    <Image src={Abtractcardone} alt="Abstract" width={380} height={0} />
                  </div>

                  <div className="service-section-card-content relative z-10">
                    <div className="service-section-card-icon">{service.icon}</div>
                    <div className="service-section-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
                      <a href="#" className="flex items-center gap-2">Read More <span><GoArrowUpRight /></span></a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div 
          className="service-section-btn flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <MainButton label="Explore Our Services" />
        </motion.div>
      </div>
    </section>
  );
};

export default Servicesection;