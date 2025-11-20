"use client";

import { useState } from "react";
import { LuGlobeLock, LuMonitorSmartphone, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { GoArrowUpRight } from "react-icons/go";
import { FiFigma, FiDatabase } from "react-icons/fi";
import { MdOutlineVideoSettings, MdOutlineCampaign } from "react-icons/md";
import Image from "next/image";
import Abtractcardone from "../../../../assets/Images/Abstract-card-one.svg";
import MainButton from "../../common/MainButton";

// 1. Import Framer Motion
import { motion } from "framer-motion";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Servicesection = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const services = [
    { id: 1, title: "Web Development", desc: "Build powerful, responsive websites that convert visitors into customers. Our expert team ensures seamless performance and modern design across all devices.", icon: <LuGlobeLock /> },
    { id: 2, title: "Digital Marketing", desc: "Boost your online presence with data-driven marketing strategies. We help your brand attract, engage, and retain the right audience.", icon: <MdOutlineVideoSettings /> },
    { id: 3, title: "UI/UX Designing", desc: "Deliver engaging experiences with user-focused design. We craft intuitive interfaces that are beautiful, functional, and conversion-optimized.", icon: <FiFigma /> },
    { id: 4, title: "App Development", desc: "Create scalable mobile applications for iOS and Android. We build high-performance apps with smooth UI, secure architecture, and seamless user experience.", icon: <LuMonitorSmartphone /> },
    { id: 5, title: "SEO Optimization", desc: "Rank higher on search engines and drive organic traffic. Our SEO strategies improve visibility, boost website authority, and attract the right audience effortlessly.", icon: <FiDatabase /> },
    { id: 6, title: "Brand Strategy", desc: "Define your unique brand voice and identity. We help create a strong, memorable brand presence that connects with customers and drives long-term trust.", icon: <MdOutlineCampaign /> },
  ];

  // 2. Define Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each child animation by 0.2s
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 }, // Starts 60px down and invisible
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <>
      <section className="service-section">
        
        {/* 3. Wrap the container in motion.div to orchestrate the stagger */}
        <motion.div 
          className="service-container container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Animates only once when 20% is in view
        >
          
          {/* Animate Header */}
          <motion.div className="service-section-header" variants={fadeUpVariants}>
            <h3>What we do?</h3>
            <h2>Creative and Performance, Aligned to Your Business Goals</h2>
          </motion.div>

          {/* Animate Slider Wrapper */}
          <motion.div className="service-section-card-wrapper group" variants={fadeUpVariants}>
            
            {/* Custom Navigation Buttons */}
            <button 
              onClick={() => swiperRef?.slidePrev()}
              disabled={isBeginning}
              className={`custom-swiper-btn prev-btn ${isBeginning ? "disabled" : ""}`}
            >
              <LuChevronLeft />
            </button>

            <button 
              onClick={() => swiperRef?.slideNext()}
              disabled={isEnd}
              className={`custom-swiper-btn next-btn ${isEnd ? "disabled" : ""}`}
            >
              <LuChevronRight />
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={setSwiperRef}
              spaceBetween={20}
              slidesPerView={1}
              loop={false} 
              navigation={false} 
              pagination={false} 
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="service-swiper"
            >
              {services.map((service, index) => (
                <SwiperSlide key={service.id}>
                  <div className="service-section-card" onMouseMove={handleMouseMove}>
                    <div className={`service-section-card-abtract ${index % 2 !== 0 ? "service-section-card-abtract-two" : ""}`}>
                      <Image src={Abtractcardone} alt="Abstract" width={380} height={0} />
                    </div>
                    <div className="service-section-card-content">
                      <div className="service-section-card-icon">{service.icon}</div>
                      <div className="service-section-card-body">
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                        <a href="#" className="flex items-center gap-2">Read More <span><GoArrowUpRight/></span></a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Animate Button */}
          <motion.div className="service-section-btn flex justify-center mt-8" variants={fadeUpVariants}>
            <MainButton label="Explore Our Services" />
          </motion.div>

        </motion.div>
      </section>
    </>
  );
};

export default Servicesection;