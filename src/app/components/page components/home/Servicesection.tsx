"use client";

import { useRef } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";
import MainButton from "../../common/MainButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion"; 
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const Servicesection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Helper: Split text into spans for animation
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    const wrapper = document.querySelector("#main-flow");
    const mm = gsap.matchMedia();

    // 1. WHITE -> BLACK Transition (Desktop Only)
    // On mobile, this logic is skipped, so it stays Black.
    mm.add("(min-width: 769px)", () => {
        if (wrapper) {
            gsap.fromTo(wrapper, 
              { backgroundColor: "#ffffff", color: "#000000" }, 
              {
                backgroundColor: "#000000",
                color: "#ffffff",
                ease: "none",
                immediateRender: false, 
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 75%",
                  end: "top 25%",
                  scrub: 0.5,
                },
              }
            );
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

    tl.from(headerRef.current?.querySelector("h3") || null, {
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out"
    })
    .from(headerRef.current?.querySelectorAll(".word-span") || [], {
        y: 50,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
    }, "-=0.4");

  }, { scope: sectionRef });

  const services = [
    { id: 1, title: "Web Development", desc: "Build powerful, responsive websites that convert visitors into customers.", href: "/our-services/web-development" },
    { id: 2, title: "Digital Marketing", desc: "Grow your online presence with campaigns built to drive meaningful results.", href: "/our-services/digital-marketing" },
    { id: 3, title: "UI/UX Designing", desc: "Create intuitive digital experiences that feel effortless and keep users engaged.", href: "/our-services/ui-ux-design" },
    { id: 4, title: "App Development", desc: "Build scalable, feature-rich mobile products for Android and iOS platforms.", href: "/our-services/web-development" },
    { id: 5, title: "SEO Optimization", desc: "Improve search visibility with focused strategies tailored to your industry.", href: "/our-services/digital-marketing" },
    { id: 6, title: "Brand Strategy", desc: "Shape a distinctive brand through clear strategy and creative positioning.", href: "/our-services/branding-visual" },
  ];

  return (
    <section className="service-section text-white relative z-10" ref={sectionRef}>
      <div className="service-container relative z-20">
        
        <div ref={headerRef} className="service-section-header mb-12">
          <h3>What we do?</h3>
          <h2>
             {splitWords("Creative and Performance, Aligned to Your ")}
             <span className="heading-highlight inline-block">
                {splitWords("Business Goals")}
             </span>
          </h2>
        </div>

        <motion.div 
            className="service-section-card-wrapper group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px 0px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Swiper
            modules={[FreeMode, Mousewheel]}
            spaceBetween={16}
            slidesPerView="auto"
            centeredSlides
            initialSlide={2}
            speed={600}
            grabCursor
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.6,
              momentumVelocityRatio: 0.7,
              sticky: true,
            }}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.7,
            }}
            className="service-swiper"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <Link href={service.href} className="service-section-card">
                  <div className="service-card-top">
                    <span className="service-card-number">
                      {String(service.id).padStart(2, "0")}
                    </span>
                    <LuArrowUpRight className="service-card-arrow" aria-hidden="true" />
                  </div>
                  <div className="service-section-card-body">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </Link>
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
