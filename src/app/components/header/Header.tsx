"use client";

import { useState } from "react";
// 1. Import Variants type
import { motion, AnimatePresence, Variants } from "framer-motion";
import Logo from "../../../assets/Domine Dude white.svg";
import Image from "next/image";
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

  // 2. Add Type Annotation ': Variants'
  const drawerVariants: Variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1], // Now TS knows this is a Bezier curve
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
      <nav>
        <section className="navbar">
          <div className="navbar-container container">
            <div className="navbar-flex flex items-center justify-between py-5">
              {/* Logo */}
              <div className="logo">
                <Image src={Logo} alt="Domain Dude" width={180} height={0} />
              </div>

              {/* Desktop Navigation */}
              <div className="navbar-items desktop-menu">
                <div className="navbar-item">
                  <a href="#">Home</a>
                </div>
                <div className="navbar-item">
                  <a href="#">About</a>
                </div>
                <div className="navbar-item">
                  <a href="#" className="with-arrow">
                    What we do
                    <span className="navbar-arrow">
                      <FiArrowUpRight />
                    </span>
                  </a>
                </div>
                <div className="navbar-item">
                  <a href="#">Works</a>
                </div>
                <div className="navbar-item">
                  <a href="#">Contact</a>
                </div>
              </div>

              {/* Desktop Button */}
              <div className="navbar-btn desktop-menu">
                <MainButton label="Lets Talk" />
              </div>

              {/* Mobile Hamburger */}
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
          </div>

          {/* Framer Motion Drawer */}
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

                <motion.div
                  className="drawer-links"
                  variants={drawerVariants}
                >
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

                  {/* Dropdown */}
                  <motion.div
                    className="drawer-dropdown"
                    variants={linkVariants}
                  >
                    <div
                      className="dropdown-header"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                      <span>Services</span>
                      {isServicesOpen ? (
                        <FiArrowDownRight />
                      ) : (
                        <FiArrowUpRight />
                      )}
                    </div>
                    {isServicesOpen && (
                      <motion.div
                        className="dropdown-content"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          <strong>Enterprise Apps -</strong>
                        </p>
                        <a href="#">Android App Development</a>
                        <a href="#">HTML 5 Applications</a>
                        <a href="#">Native App Development</a>
                        <p>
                          <strong>Digital Marketing -</strong>
                        </p>
                        <p>
                          <strong>Cloud AI -</strong>
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="drawer-footer"
                  variants={linkVariants}
                >
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
        </section>
      </nav>
    </>
  );
};

export default Header;