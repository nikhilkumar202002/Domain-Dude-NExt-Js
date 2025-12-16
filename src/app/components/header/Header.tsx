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
} from "react-icons/fi";
import "./Header.css";
import MainButton from "../common/MainButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger slightly earlier to catch the scroll start
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

  // --- VARIANTS FOR NON-LAYOUT PROPERTIES ---
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
      borderRadius: "0px 30px 0px 0px", // The specific curve
      border: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingRight: "0px",
      paddingLeft: "0px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Adds depth
    },
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
          
          // Layout Properties (Animated automatically by 'layout' prop)
          style={{
            width: isScrolled ? "90%" : "100%",
            maxWidth: isScrolled ? "1280px" : "100%",
            marginTop: isScrolled ? 15 : 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}

          // Visual Properties (Animated by variants)
          variants={navbarStyleVariants}
          initial="top"
          animate={isScrolled ? "scrolled" : "top"}

          // The Transition Config
          transition={{
            layout: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }, // Smooth Layout
            default: { duration: 0.5, ease: "easeInOut" } // Smooth Colors/Border
          }}
        >
          {/* UPDATED: Added conditional padding logic */}
          <motion.div 
            className={`navbar-container h-full flex flex-col justify-center ${
                isScrolled ? "px-[25px]" : "px-[17px] md:px-15"
            }`}
            layout="position" // Ensures content flows smoothly inside
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
                <div className="navbar-item">
                  <a href="#" className="with-arrow">
                    What we do
                    <span className="navbar-arrow"><FiArrowUpRight /></span>
                  </a>
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

                  <motion.div className="drawer-dropdown" variants={linkVariants}>
                    <div
                      className="dropdown-header"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                      <span>Services</span>
                      {isServicesOpen ? <FiArrowDownRight /> : <FiArrowUpRight />}
                    </div>
                    {isServicesOpen && (
                      <motion.div
                        className="dropdown-content"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p><strong>Enterprise Apps -</strong></p>
                        <a href="#">Android App Development</a>
                        <a href="#">HTML 5 Applications</a>
                        <a href="#">Native App Development</a>
                        <p><strong>Digital Marketing -</strong></p>
                        <p><strong>Cloud AI -</strong></p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div className="drawer-footer" variants={linkVariants}>
                  <MainButton label="Lets Talk" />
                  <div className="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                  </div>
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