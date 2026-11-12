"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LogoWhite from "../../../assets/Domine Dude white.svg";
import LogoBlack from "../../../assets/Domine-Dude_black.png";
import Image from "next/image";
import Link from "next/link";
import {
  FiPhone,
  FiX,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa6";
import "./Header.css";
import { navItems, servicesData, socialLinks } from "../../data/NavigationMenu";

const Header = () => {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav
        className={`fixed top-0 left-0 w-full z-[100] flex justify-center transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] pointer-events-auto"
            : "bg-transparent pointer-events-none"
        }`}
      >
        <motion.section
          className={`navbar container pointer-events-auto ${
            isScrolled ? "is-scrolled" : ""
          }`}
        >
          <motion.div 
            className="navbar-container h-full flex flex-col justify-center"
          >
            <div className="navbar-flex flex items-center justify-between">
              
              <motion.div
                className="logo"
              >
                <Link href="/">
                  <div className="navbar-logo-wrapper">
                    <Image
                      className={`navbar-logo-image transition-opacity duration-300 ${
                        isScrolled ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100"
                      }`}
                      src={LogoWhite}
                      alt="Domain Dude"
                      width={148}
                      height={47}
                      priority
                    />
                    <Image
                      className={`navbar-logo-image transition-opacity duration-300 ${
                        isScrolled ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                      }`}
                      src={LogoBlack}
                      alt="Domain Dude"
                      width={148}
                      height={47}
                      priority
                    />
                  </div>
                </Link>
              </motion.div>

              <div className="navbar-items desktop-menu">
                {navItems.map((item) => {
                  if (item.hasDropdown) {
                    return (
                      <div
                        key={item.id}
                        className="navbar-item relative"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                      >
                        <Link
                          href={item.href}
                          style={{ cursor: "default" }}
                        >
                          {item.name}
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
                                    <li
                                      key={service.id}
                                      onMouseEnter={() =>
                                        setActiveServiceIndex(index)
                                      }
                                    >
                                      <Link
                                        href={service.href}
                                        className={
                                          index === activeServiceIndex
                                            ? "active-service"
                                            : ""
                                        }
                                      >
                                        <FiChevronRight className="icon" />
                                        {service.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mega-menu-details">
                                <div className="details-header">
                                  <h4>{servicesData[activeServiceIndex].title}</h4>
                                  <span className="details-tag">
                                    Key Highlights
                                  </span>
                                </div>
                                <ul className="details-grid">
                                  {servicesData[
                                    activeServiceIndex
                                  ].keyPoints.map((point, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.05 }}
                                    >
                                      <FiCheckCircle className="details-icon" />
                                      {point}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} className="navbar-item">
                      <Link href={item.href}>
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="navbar-right">
                <a
                  href="tel:919048006320"
                  className="navbar-icon-btn"
                  aria-label="Call Us"
                >
                  <FiPhone size={20} />
                </a>

                <a
                  href="https://wa.me/919048006320?text=Hi%20Domain%20Dude%2C%20I%27d%20like%20to%20discuss%20a%20new%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-icon-btn"
                  aria-label="WhatsApp Us"
                >
                  <FaWhatsapp size={21} />
                </a>

                <button
                  type="button"
                  className="two-line-menu"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <span className="line line-1"></span>
                  <span className="line line-2"></span>
                </button>
              </div>
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
                    <Image src={LogoWhite} alt="Domain Dude" width={150} height={48} />
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
                    {navItems.map((item) => (
                      <Link key={item.id} href={item.href} legacyBehavior>
                        <motion.a
                          variants={linkVariants}
                          whileHover={{ x: 6, color: "var(--primary)" }}
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
                      {socialLinks.map((social) => {
                        const Icon =
                          social.platform === "instagram"
                            ? FaInstagram
                            : social.platform === "linkedin"
                            ? FaLinkedinIn
                            : social.platform === "twitter"
                            ? FaXTwitter
                            : FaFacebookF;
                        return (
                          <Link
                            key={social.id}
                            href={social.href}
                            target="_blank"
                            aria-label={social.name}
                          >
                            <Icon size={20} />
                          </Link>
                        );
                      })}
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
