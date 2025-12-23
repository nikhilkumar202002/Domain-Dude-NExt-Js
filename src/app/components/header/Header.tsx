"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Logo from "../../../assets/Domine Dude white.svg";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";
// Import Social Icons
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import "./Header.css";
import MainButton from "../common/MainButton";

// --- DATASET: Services & Key Points ---
const servicesData = [
  {
    id: 1,
    title: "Web Development",
    href: "/our-services/web-development",
    keyPoints: [
      "Custom Frontend (React/Next.js)",
      "Backend API Integration",
      "CMS Solutions (WordPress/Shopify)",
      "Progressive Web Apps (PWA)",
      "Website Maintenance",
    ],
  },
  {
    id: 2,
    title: "Digital Marketing",
    href: "/our-services/digital-marketing",
    keyPoints: [
      "Social Media Marketing (SMM)",
      "Google Ads (PPC)",
      "Content Marketing Strategy",
      "Email Marketing Campaigns",
      "Conversion Rate Optimization",
    ],
  },
  {
    id: 3,
    title: "UI/UX Designing",
    href: "/our-services/ui-ux-design",
    keyPoints: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Mobile App UI Design",
      "Website Interface Design",
      "Design Systems",
    ],
  },
  {
    id: 4,
    title: "App Development",
    href: "/services/app-development",
    keyPoints: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform (Flutter/React Native)",
      "App Store Optimization",
      "App UI/UX Integration",
    ],
  },
  {
    id: 5,
    title: "SEO Optimization",
    href: "/services/seo",
    keyPoints: [
      "On-Page SEO",
      "Off-Page Link Building",
      "Technical SEO Audits",
      "Keyword Research",
      "Local SEO Ranking",
    ],
  },
  {
    id: 6,
    title: "Brand Strategy",
    href: "/our-services/branding-visual",
    keyPoints: [
      "Brand Identity & Logo",
      "Brand Voice & Messaging",
      "Rebranding Strategy",
      "Market Positioning",
      "Visual Style Guides",
    ],
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Mega Menu States
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function for simple exact match links
  const isActive = (path: string) => (pathname === path ? "active" : "");

  // Helper for "What we do" (Matches parent page OR any child service page)
  const isServicesActive = 
    pathname === "/our-services" || pathname.startsWith("/services");

  const navbarStyleVariants: Variants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      borderRadius: "0px 0px 0px 0px",
      border: "1px solid transparent",
      paddingTop: "0px",
      paddingBottom: "0px",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    },
    scrolled: {
      backgroundColor: "black",
      borderRadius: "0px 30px 0px 0px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingRight: "0px",
      paddingLeft: "0px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
  };

  const megaMenuVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.98, display: "none" },
    visible: { 
      opacity: 1, y: 0, scale: 1, display: "grid",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, y: 10, scale: 0.98,
      transition: { duration: 0.15, ease: "easeIn" },
      transitionEnd: { display: "none" }
    }
  };

  const drawerVariants: Variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1], when: "beforeChildren", staggerChildren: 0.08 },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.35, ease: [0.45, 0, 0.55, 1] },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none">
        <motion.section
          className="navbar pointer-events-auto"
          layout 
          style={{
            width: isScrolled ? "90%" : "100%",
            maxWidth: isScrolled ? "1280px" : "100%",
            marginTop: isScrolled ? 15 : 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          variants={navbarStyleVariants}
          initial="top"
          animate={isScrolled ? "scrolled" : "top"}
          transition={{
            layout: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
            default: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <motion.div 
            className={`navbar-container h-full flex flex-col justify-center ${
                isScrolled ? "px-[25px]" : "px-[17px] md:px-15"
            }`}
            layout="position"
          >
            <div className="navbar-flex flex items-center justify-between py-3">
              
              <div className="logo">
                <Link href="/">
                  <Image src={Logo} alt="Domain Dude" width={140} height={0} />
                </Link>
              </div>

              <div className="navbar-items desktop-menu">
                <div className="navbar-item">
                    <Link href="/" className={isActive("/")}>Home</Link>
                </div>
                <div className="navbar-item">
                    <Link href="/about" className={isActive("/about")}>About</Link>
                </div>
                
                {/* Mega Menu Item */}
                <div 
                  className="navbar-item relative" 
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <Link 
                    href="/our-services" 
                    className={`with-arrow ${megaMenuOpen || isServicesActive ? "active" : ""}`} 
                    style={{ cursor: "default" }}
                  >
                    What we do
                    <span className={`navbar-arrow transition-transform duration-300 ${megaMenuOpen ? "rotate-45" : ""}`}>
                      <FiArrowUpRight />
                    </span>
                  </Link>

                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div 
                        className="mega-menu-container"
                        variants={megaMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                         <div className="mega-menu-list">
                            <h4>Our Services</h4>
                            <ul>
                                {servicesData.map((service, index) => (
                                    <li key={service.id} onMouseEnter={() => setActiveServiceIndex(index)}>
                                        <Link 
                                            href={service.href}
                                            className={index === activeServiceIndex ? "active-service" : ""}
                                        >
                                            <FiChevronRight className="icon"/> 
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                         </div>

                         <div className="mega-menu-details">
                            <div className="details-header">
                                <h4>{servicesData[activeServiceIndex].title}</h4>
                                <span className="details-tag">Key Highlights</span>
                            </div>
                            <ul className="details-grid">
                                {servicesData[activeServiceIndex].keyPoints.map((point, i) => (
                                    <motion.li 
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <FiCheckCircle className="details-icon"/> 
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="navbar-item">
                    <Link href="/works" className={isActive("/works")}>Works</Link>
                </div>
                <div className="navbar-item">
                    <Link href="/contact-us" className={isActive("/contact-us")}>Contact</Link>
                </div>
              </div>

              <div className="navbar-btn desktop-menu">
                <MainButton label="Lets Talk" />
              </div>

              {!isMenuOpen && (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="mobile-menu-icon"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <FiMenu size={28} />
                </motion.div>
              )}
            </div>
          </motion.div>

           <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="mobile-drawer-full"
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                  {/* Drawer Header */}
                  <div className="drawer-header">
                    <Image src={Logo} alt="Domain Dude" width={150} height={0} />
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="close-icon"
                    >
                      <FiX size={26} />
                    </motion.div>
                  </div>

                  {/* Drawer Links (Centered) */}
                  <motion.div className="drawer-links" variants={drawerVariants}>
                      {[
                        { name: "Home", href: "/" },
                        { name: "About", href: "/about" },
                        { name: "What we do", href: "/our-services" },
                        { name: "Works", href: "/works" },
                        { name: "Contact", href: "/contact-us" },
                      ].map((item) => (
                        <Link key={item.name} href={item.href} legacyBehavior>
                          <motion.a
                            variants={linkVariants}
                            whileHover={{ x: 6, color: "var(--secondary)" }}
                            onClick={() => setIsMenuOpen(false)} // Close on click
                          >
                            {item.name}
                          </motion.a>
                        </Link>
                      ))}
                  </motion.div>

                  {/* Drawer Footer (Social Icons) */}
                  <div className="drawer-footer">
                      <div className="social-links">
                          <Link href="#" target="_blank"><FaInstagram size={20} /></Link>
                          <Link href="#" target="_blank"><FaLinkedinIn size={20} /></Link>
                          <Link href="#" target="_blank"><FaXTwitter size={20} /></Link>
                          <Link href="#" target="_blank"><FaFacebookF size={20} /></Link>
                      </div>
                  </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </nav>
    </>
  );
};

export default Header;