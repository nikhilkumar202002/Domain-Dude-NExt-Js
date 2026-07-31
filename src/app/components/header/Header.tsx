"use client";

import { useState, useEffect, useRef } from "react";
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
import gsap from "gsap";

// --- DATASET: Services & Key Points ---
const servicesData = [
  {
    id: 1,
    title: "Web Development",
    href: "/our-services/web-development",
    keyPoints: [
      "Custom website development services",
      "Responsive web design for businesses",
      "SEO-friendly website development",
      "React and Next.js web development",
      "WordPress business website development",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designing",
    href: "/our-services/ui-ux-design",
    keyPoints: [
      "Professional UI UX design services",
      "User experience design for websites",
      "Mobile app UI UX design",
      "Conversion-focused interface design",
      "Product and web app UX design",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing",
    href: "/our-services/digital-marketing",
    keyPoints: [
      "Digital marketing services for brands",
      "Social media marketing and management",
      "Google Ads PPC campaign management",
      "Performance marketing for lead generation",
      "Content marketing and email campaigns",
    ],
  },
  {
    id: 4,
    title: "Branding",
    href: "/our-services/branding-visual",
    keyPoints: [
      "Brand identity and logo design",
      "Brand strategy and positioning",
      "Rebranding services for businesses",
      "Visual identity design for brands",
      "Brand voice and messaging development",
    ],
  },
  {
    id: 5,
    title: "Video Production",
    href: "/our-services/video-production",
    keyPoints: [
      "Video production services for brands",
      "Social media reels and ad videos",
      "Product explainer video production",
      "Corporate and brand film production",
      "Motion graphics and animation videos",
    ],
  },
  {
    id: 6,
    title: "Graphics Designing",
    href: "/our-services/graphics-designing",
    keyPoints: [
      "Graphic design services for businesses",
      "Social media creative design",
      "Marketing poster and banner design",
      "Branding and print design services",
      "Pitch deck and presentation design",
    ],
  },
];


const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const navbarContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Mega Menu States
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 50;

      setIsScrolled((currentlySticky) => {
        if (currentlySticky === shouldStick) return currentlySticky;

        const desktop = window.innerWidth > 992;
        if (desktop) {
          const containerGutters = window.innerWidth > 1024 ? 192 : 96;

          gsap.to(navbarRef.current, {
            marginTop: shouldStick ? 20 : 0,
            width: shouldStick ? `calc(100% - ${containerGutters}px)` : "100%",
            maxWidth: shouldStick ? 1248 : "100%",
            duration: 1.5,
            ease: "power4.out",
            overwrite: true,
          });
          gsap.to(navbarContainerRef.current, {
            padding: shouldStick ? "15px" : window.innerWidth > 1120 ? "30px" : "30px 20px",
            duration: 1.5,
            ease: "power4.out",
            overwrite: true,
          });
          gsap.to(logoRef.current, {
            width: shouldStick ? 105 : 140,
            duration: 1.5,
            ease: "power4.out",
            overwrite: true,
          });
        }

        return shouldStick;
      });
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
          ref={navbarRef}
          className={`navbar pointer-events-auto ${isScrolled ? "is-scrolled" : ""}`}
          style={{
            width: "100%",
            maxWidth: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <motion.div 
            ref={navbarContainerRef}
            className={`navbar-container h-full flex flex-col justify-center ${isScrolled ? "is-scrolled" : ""}`}
          >
            <div className="navbar-flex flex items-center justify-between">
              
              <motion.div
                ref={logoRef}
                className="logo"
                style={{ width: 140 }}
              >
                <Link href="/">
                  <Image className="navbar-logo-image" src={Logo} alt="Domain Dude" width={140} height={0} />
                </Link>
              </motion.div>

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
