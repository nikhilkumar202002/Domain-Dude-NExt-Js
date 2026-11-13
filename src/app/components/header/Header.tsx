"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LogoWhite from "../../../assets/Domine Dude white.svg";
import LogoBlack from "../../../assets/Domine-Dude_black.png";
import Image from "next/image";
import Link from "next/link";
import {
  FiPhone,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa6";
import "./Header.css";
import { navItems, megaMenuColumns, socialLinks } from "../../data/NavigationMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Mega Menu States
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(77);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const updateHeight = () => {
      if (navRef.current) {
        setHeaderHeight(navRef.current.offsetHeight);
      }
    };

    handleScroll();
    updateHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const megaMenuVariants: Variants = {
    hidden: { opacity: 0, y: -4, display: "none" },
    visible: { 
      opacity: 1, y: 0, display: "block",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, y: -4,
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
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] flex justify-center transition-all duration-300 ${
          isScrolled || megaMenuOpen
            ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] pointer-events-auto"
            : "bg-transparent pointer-events-none"
        }`}
      >
        <motion.section
          className={`navbar container pointer-events-auto ${
            isScrolled || megaMenuOpen ? "is-scrolled" : ""
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
                        isScrolled || megaMenuOpen ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100"
                      }`}
                      src={LogoWhite}
                      alt="Domain Dude"
                      width={148}
                      height={47}
                      priority
                    />
                    <Image
                      className={`navbar-logo-image transition-opacity duration-300 ${
                        isScrolled || megaMenuOpen ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
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
                              style={{ top: headerHeight }}
                              variants={megaMenuVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              onMouseEnter={() => setMegaMenuOpen(true)}
                              onMouseLeave={() => setMegaMenuOpen(false)}
                            >
                              <div className="mega-menu-glow" aria-hidden="true" />

                              <div className="mega-menu-inner">
                                <div className="mega-menu-grid">
                                  {/* Left Brand Intro */}
                                  <div className="mega-menu-left">
                                    <h3 className="mega-menu-headline">
                                      Building
                                      <br />
                                      Strong
                                      <br />
                                      Capabilities to
                                      <br />
                                      Empower Your
                                      <br />
                                      Brand
                                    </h3>
                                    <Link
                                      href="/our-services"
                                      className="mega-menu-overview-link"
                                      onClick={() => setMegaMenuOpen(false)}
                                    >
                                      <span>Go to overview</span>
                                      <FiArrowRight className="overview-arrow" />
                                    </Link>
                                  </div>

                                  {/* Right Service Columns */}
                                  {megaMenuColumns.map((col) => (
                                    <div key={col.id} className="mega-menu-col">
                                      {col.categories.map((category) => (
                                        <div key={category.title} className="mega-menu-category">
                                          <Link
                                            href={category.href}
                                            className="mega-menu-category-title"
                                            onClick={() => setMegaMenuOpen(false)}
                                          >
                                            <span>{category.title}</span>
                                            <FiArrowRight className="category-arrow" />
                                          </Link>
                                          <ul className="mega-menu-items">
                                            {category.items.map((subItem, idx) => (
                                              <li key={idx}>
                                                <Link
                                                  href={category.href}
                                                  className="mega-menu-item-link"
                                                  onClick={() => setMegaMenuOpen(false)}
                                                >
                                                  {subItem}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                </div>
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
