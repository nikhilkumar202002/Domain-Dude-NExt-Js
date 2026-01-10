"use client";

import Logo from "../../../assets/Domine Dude white.svg";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { FaBehance } from "react-icons/fa6";
import { AiOutlineCopyright } from "react-icons/ai";
import MainButton from "../common/MainButton";
import "./Footer.css";
// 1. Import Variants type specifically
import { motion, Variants } from "framer-motion"; 

const Footer = () => {

  // 2. Add ': Variants' annotation to your animation objects
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } // Now TS knows this is a valid Easing string
    },
  };

  const taglineVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" }
    },
  };

  return (
    <>
      <footer className="footer-section">
        <motion.div 
            className="footer-container container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* --- TOP SECTION --- */}
            <motion.div className="footer-top" variants={fadeUpVariants}>
                <div className="footer-logo-bottom">
                    <a href="/">
                    <Image src={Logo} alt="Domain Dude Logo" width={0} height={0} />
                    </a>
                </div>
                <div className="footer-top-cta">
                    <h2>Need more clarity? Let our team help you.</h2>
                    <div className="footer-top-btn">
                        <MainButton label="We are Here to Assist" />
                    </div>
                </div>
            </motion.div>

            {/* --- LINKS GRID --- */}
            <motion.div className="footer-row grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20" variants={containerVariants}>
                
                {/* Col 1 */}
                <motion.div className="footer-col" variants={fadeUpVariants}>
                    <h4>Quick Links</h4>
                    <div className="footer-col-items">
                        <a href="/">Home</a>
                        <a href="/about">About Us</a>
                        <a href="/our-services">Services</a>    
                        <a href="/works">Portfolio</a>
                        <a href="#">Blogs</a>
                        <a href="/contact-us">Contact</a>
                    </div>
                </motion.div>
      
                {/* Col 2 */}
                <motion.div className="footer-col footer-col-second" variants={fadeUpVariants}>
                    <h4>Services</h4>
                    <div className="footer-col-items">
                        <a href="#">Branding & Identity</a>
                        <a href="#">UI/UX Design</a>
                        <a href="#">Website Development</a>    
                        <a href="#">Digital Marketing</a>
                        <a href="#">Social Media Management</a>
                        <a href="#">Growth Strategy</a>
                    </div>
                </motion.div>

                {/* Col 3 */}
                <motion.div className="footer-col" variants={fadeUpVariants}>
                    <h4>Resources</h4>
                    <div className="footer-col-items">
                        <a href="#">Case Studies</a>
                        <a href="#">Our Process</a>
                        <a href="#">Client Testimonials</a>    
                        <a href="#">FAQs</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </motion.div>

                {/* Col 4 */}
                <motion.div className="footer-col" variants={fadeUpVariants}>
                    <h4>Get in Touch</h4>
                    <div className="footer-col-items">
                        <a href="#">Contact Us</a>
                        <a href="#">Our Process</a>
                        <a href="#">Book a Free Consultation</a>    
                    </div>
                </motion.div>
            </motion.div> 

            {/* --- CONTACT INFO SECTION --- */}
            <motion.div className="footer-contact-section" variants={containerVariants}>
                <div className="footer-contact-flex">
                    
                    <motion.div className="footer-contact-item" variants={fadeUpVariants}>
                        <h2>Email</h2>
                        <div className="footer-contact-inside">
                            <p><a href="mailto:info@domaindude.com">info@domaindude.com</a></p>
                            <span>(for sales enquiry)</span>
                        </div>
                        <div className="footer-contact-inside">
                            <p><a href="mailto:info@padamonline.com">info@padamonline.com</a></p>
                            <span>(for creatives)</span>
                        </div>
                    </motion.div>

                    <motion.div className="footer-contact-item" variants={fadeUpVariants}>
                        <h2>Phone</h2>
                        <div className="footer-contact-inside">
                            <p><a href="tel:917736016507">+91 77360 16507</a></p>
                            <span>(for sales enquiry)</span>
                        </div>
                        <div className="footer-contact-inside">
                            <p><a href="tel:919048006320">+91 90480 06320</a></p>
                            <span>(for creatives)</span>
                        </div>
                    </motion.div>

                    <motion.div className="footer-contact-item" variants={fadeUpVariants}>
                        <h2>Address</h2>
                        <div className="footer-contact-inside">
                            <p><a href="">Vyttila, Ernakulam, Kochi - 682017</a></p>
                        </div>
                    </motion.div>
                    
                </div>
            </motion.div>

            {/* --- COPYRIGHT & TAGLINE --- */}
            <div className="footer-copyright">
                <motion.div className="footer-copyright-flex" variants={fadeUpVariants}>
                    <div className="footer-copyright-left">
                      <p className="flex items-center justify-center md:justify-start gap-2 text-center md:text-left">
                                <AiOutlineCopyright />
                                {new Date().getFullYear()} Domain Dude. All Rights Reserved.
                                </p>

                    </div>
                    <div className="footer-copyright-righr">
                        <div className="footer-copyright-social">
                            <a href="https://www.instagram.com/domain.dude_?igsh=NzlraHBoMHZzYWJn"><FaInstagram/></a>
                            <a href="https://www.facebook.com/profile.php?id=61573770105887"><FaFacebookF/></a>
                            <a href="https://www.linkedin.com/company/domain-dude/"><FaLinkedinIn/></a>
                            <a href="https://www.behance.net/domaindude"><FaBehance/></a>
                        </div>
                    </div>
                </motion.div>
              
                {/* Big Tagline Animation */}
                <motion.div 
                    className="footer-top-tagline"
                    variants={taglineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2><span>D</span>esign. <span>D</span>evelop. <span>D</span>eliver.</h2>
                </motion.div>
            </div>          
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;