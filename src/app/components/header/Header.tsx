"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Logo from "../../../assets/Domine Dude white.svg";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiMenu,
  FiX,
  FiChevronRight, // Added for menu items
} from "react-icons/fi";
import "./Header.css";
import MainButton from "../common/MainButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 1. New State for Mega Menu
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

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
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(12px)",
      borderRadius: "0px 30px 0px 0px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingRight: "0px",
      paddingLeft: "0px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
  };

  // 2. Mega Menu Variants (Glassmorphism)
  const megaMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 10, // Slide down slightly
      scale: 0.98,
      display: "none"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      display: "grid", // Using Grid layout
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.98,
      transition: { duration: 0.15, ease: "easeIn" },
      transitionEnd: { display: "none" }
    }
  };

  const drawerVariants: Variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
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
                <div className="navbar-item"><a href="#">Home</a></div>
                <div className="navbar-item"><a href="/about">About</a></div>
                
                {/* 3. "What we do" Item with Hover Handlers */}
                <div 
                  className="navbar-item relative" 
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <a href="#" className="with-arrow" style={{ cursor: "default" }}>
                    What we do
                    <span className={`navbar-arrow transition-transform duration-300 ${megaMenuOpen ? "rotate-45" : ""}`}>
                      <FiArrowUpRight />
                    </span>
                  </a>

                  {/* 4. The Mega Menu Dropdown */}
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div 
                        className="mega-menu-container"
                        variants={megaMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                         {/* Column 1: Services */}
                         <div className="mega-menu-column">
                            <h4>Services</h4>
                            <ul>
                                <li><a href="#"><FiChevronRight/> Web Development</a></li>
                                <li><a href="#"><FiChevronRight/> UI/UX Design</a></li>
                                <li><a href="#"><FiChevronRight/> Branding</a></li>
                                <li><a href="#"><FiChevronRight/> SEO Optimization</a></li>
                            </ul>
                         </div>

                         {/* Column 2: Solutions */}
                         <div className="mega-menu-column">
                            <h4>Solutions</h4>
                            <ul>
                                <li><a href="#"><FiChevronRight/> E-Commerce</a></li>
                                <li><a href="#"><FiChevronRight/> Corporate Websites</a></li>
                                <li><a href="#"><FiChevronRight/> Landing Pages</a></li>
                            </ul>
                         </div>
                         
                         {/* Column 3: Featured (Optional Image/Card) */}
                         <div className="mega-menu-column featured-column">
                            <h4>Featured</h4>
                            <div className="featured-card">
                                <p>See how we helped <strong>Ayursidhi</strong> scale 300%</p>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="navbar-item"><a href="#">Works</a></div>
                <div className="navbar-item"><a href="#">Contact</a></div>
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
                 {/* ... (Keep your drawer content same) ... */}
                 {/* I omitted the drawer content here to save space, keep it as is! */}
                 {/* ... */}
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

                <motion.div className="drawer-links" variants={drawerVariants}>
                  {["Home", "Work", "About", "Career", "Contact"].map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      variants={linkVariants}
                      whileHover={{ x: 6 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                  {/* ... Rest of drawer ... */}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </nav>
    </>
  );
};

export default Header;