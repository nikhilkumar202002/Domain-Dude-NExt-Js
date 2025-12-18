"use client";

import { useLayoutEffect, useRef } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineWhatsapp } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainButton from "../../common/MainButton";
import "./Contact.css";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Contactform = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-form-section",
          start: "top 80%", // Animation starts when section is 80% in view
          toggleActions: "play none none reverse",
        },
      });

      // 1. Left Side: Contact Info Items (Staggered Fade Up)
      tl.from(".contact-form-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
      // 2. Animate the Text inside the items (Word Reveal style)
      .from(".contact-form-item h2 .word-span", {
        y: 20,
        opacity: 0,
        rotation: 3,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
      }, "-=0.6") // Overlap slightly with previous animation
      
      // 3. Right Side: Form Container Fade In
      .from(".contact-form-frm", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      
      // 4. Stagger Input Fields inside the form
      .from(".contact-form-frm input, .contact-form-frm select, .contact-form-frm textarea, .contact-form-frm button, .form-group-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1, // Rapid stagger for fields
        ease: "power3.out",
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text for "Banner Style" word animation
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word-wrapper inline-block overflow-hidden align-top">
        <span className="word-span inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <section className="contact-form-section" ref={containerRef}>
      <div className="contact-form-container container">
        <div className="contact-form-flex grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">
          
          {/* --- LEFT SIDE: Contact Info --- */}
          <div className="contact-form-items">
            
            <div className="contact-form-item">
              <div className="contact-form-icon">
                <FiPhoneCall />
              </div>
              <div className="contact-form-info">
                {/* Applied splitWords for animation */}
                <h2>{splitWords("Call Us:")}</h2>
                <p>
                  <a href="tel:919048006320">+91 90480 06320</a>
                </p>
                <p>
                  <a href="tel:917736016507">+91 77360 16507</a>
                </p>
              </div>
            </div>

            <div className="contact-form-item">
              <div className="contact-form-icon">
                <MdOutlineWhatsapp />
              </div>
              <div className="contact-form-info">
                <h2>{splitWords("Whatsapp Us:")}</h2>
                <p>
                  <a href="tel:919048006320">+91 90480 06320</a>
                </p>
                <p>
                  <a href="tel:917736016507">+91 77360 16507</a>
                </p>
              </div>
            </div>

            <div className="contact-form-item">
              <div className="contact-form-icon">
                <IoMailOutline />
              </div>
              <div className="contact-form-info">
                <h2>{splitWords("Mail Us:")}</h2>
                <p>
                  <a href="mailto:info@domindude.in">info@domindude.in</a>
                </p>
              </div>
            </div>

            <div className="contact-form-item">
              <div className="contact-form-icon">
                <SlLocationPin />
              </div>
              <div className="contact-form-info">
                <h2>{splitWords("Location:")}</h2>
                <p>Kochi, Kerala, India</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Contact Form --- */}
          <div className="contact-form-frm">
            <form action="#" className="flex flex-col gap-5">
              <div className="form-group flex gap-4">
                <div className="form-col w-full">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full"
                  />
                </div>
                <div className="form-col w-full">
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="form-group flex gap-4">
                <div className="form-col w-full">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full"
                  />
                </div>
                <div className="form-col w-full">
                  <input
                    type="text"
                    placeholder="Your Whatsapp Number"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="form-group">
                <select name="" id="" className="w-full">
                  <option value="" disabled selected>
                    Select Service
                  </option>
                  <option value="web-development">Web Development</option>
                  <option value="branding">Branding</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full"
                ></textarea>
              </div>

              <div className="form-group-btn pt-4">
                <MainButton label="Submit Now" />
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contactform;