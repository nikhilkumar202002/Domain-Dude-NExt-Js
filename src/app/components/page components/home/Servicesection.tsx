"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MainButton from "../../common/MainButton";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: "Web Development", desc: "We build fast, responsive websites tailored to your business. Every page is designed to engage visitors and guide them toward action. Clean code and scalable architecture support your long-term growth.", href: "/our-services/web-development" },
  { id: 2, title: "Digital Marketing", desc: "We create targeted campaigns that connect your brand with the right audience. SEO, social media, and paid advertising work together to generate measurable growth. Continuous optimization helps maximize engagement and return on investment.", href: "/our-services/digital-marketing" },
  { id: 3, title: "UI/UX Designing", desc: "We design intuitive experiences that make every interaction feel effortless. Research and thoughtful user flows turn complex journeys into clear interfaces. Distinctive visuals keep your product engaging and memorable.", href: "/our-services/ui-ux-design" },
  { id: 4, title: "App Development", desc: "We develop scalable mobile applications with smooth, reliable performance. Each feature is shaped around real user needs and business objectives. Flexible technology keeps your product ready for future growth.", href: "/our-services/web-development" },
  { id: 5, title: "SEO Optimization", desc: "We improve your visibility with search strategies built around genuine demand. Technical improvements and valuable content help attract qualified organic traffic. Clear reporting keeps progress measurable and decisions focused.", href: "/our-services/digital-marketing" },
  { id: 6, title: "Brand Strategy", desc: "We define a clear position that separates your business from competitors. Consistent messaging and visual direction create a recognizable identity. A focused strategy builds trust and supports lasting brand growth.", href: "/our-services/branding-visual" },
];

const Servicesection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(1);

  const splitWords = (text: string) =>
    text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));

  useGSAP(() => {
    const wrapper = document.querySelector("#main-flow");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      if (wrapper) {
        gsap.fromTo(wrapper, { backgroundColor: "#ffffff", color: "#000000" }, {
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
        });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    timeline.from(headerRef.current?.querySelector("h3") || null, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    }).from(headerRef.current?.querySelectorAll(".word-span") || [], {
      y: 50,
      opacity: 0,
      rotation: 5,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section className="service-section text-white relative z-10" ref={sectionRef}>
      <div className="container service-showcase">
        <div ref={headerRef} className="service-showcase-header">
          <div className="service-showcase-heading">
            <h3>What we do?</h3>
            <h2>
              {splitWords("Creative and ")}
              <span className="heading-highlight">{splitWords("Performance")}</span>
              {splitWords(", Aligned to Your ")}
              <span className="heading-highlight">{splitWords("Business Goals")}</span>
            </h2>
          </div>
          <p className="service-showcase-intro">
            Our approach blends creativity with data-driven strategy to deliver digital
            experiences that don&apos;t just look exceptional—they drive real business results.
            Every decision is aligned with your goals, ensuring maximum impact, engagement,
            and long-term success.
          </p>
        </div>

        <motion.div
          className="service-accordion"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px 0px 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {services.map((service) => {
            const isActive = activeService === service.id;

            return (
              <article
                key={service.id}
                className={`service-accordion-card ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveService(service.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveService(service.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
              >
                <span className="service-accordion-number">
                  {String(service.id).padStart(2, "0")}
                  {isActive ? "." : ""}
                </span>

                <div className="service-accordion-active-content" aria-hidden={!isActive}>
                  <h3>{service.title}</h3>
                  <div className="service-accordion-copy">
                    <p>{service.desc}</p>
                    <Link
                      href={service.href}
                      tabIndex={isActive ? 0 : -1}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Read More <LuArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <h3 className="service-accordion-vertical-title" aria-hidden={isActive}>
                  {service.title}
                </h3>
              </article>
            );
          })}
        </motion.div>

        <div className="service-section-btn flex justify-center mt-12">
          <MainButton label="Explore Our Services" />
        </div>
      </div>
    </section>
  );
};

export default Servicesection;
