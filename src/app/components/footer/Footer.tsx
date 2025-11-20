"use client";

import Logo from "../../../assets/Domine Dude white.svg";
import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterest   } from "react-icons/fa";
import { AiOutlineCopyright } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <>
        <footer className="footer-section">
            <div className="footer-container container">
                <div className="footer-row grid grid-cols-4 gap-20 md:gap-20">
                    <div className="footer-col">
                        <div className="footer-logo">                           
                            <Image src={Logo} alt="Domain Dude Logo" height={50} />
                        </div>
                        <p>We are a creative digital agency from Kochi crafting meaningful brand experiences through powerful design, content, strategy & growth marketing.</p>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <div className="footer-col-items">
                            <a href="#">Home</a>
                            <a href="#">About Us</a>
                            <a href="#">Services</a>    
                            <a href="#">Portfolio</a>
                            <a href="#">Blogs</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>

                      <div className="footer-col footer-col-second">
                        <h4>Services</h4>
                        <div className="footer-col-items">
                            <a href="#">Branding & Identity</a>
                            <a href="#">UI/UX Design</a>
                            <a href="#">Website Development</a>    
                            <a href="#">Digital Marketing</a>
                            <a href="#">Social Media Management</a>
                            <a href="#">Growth Strategy</a>
                        </div>
                    </div>

                      <div className="footer-col">
                        <h4>Contact</h4>
                        <div className="footer-col-items">
                            <div className="footer-col-flex">
                                <span className="footer-col-icons">
                                    <MdLocationPin/>
                                </span>
                                <p className="footer-col-text">Domain Dude, Kochi, India</p>
                            </div>
                             <div className="footer-col-flex call">
                                <span className="footer-col-icons">
                                    <FiPhoneCall/>
                                </span>
                                <div>
                                    <div>
                                        <a className="footer-col-links">+91 77360 16507</a>
                                    </div>
                                    <div>
                                        <a className="footer-col-links">+91 77360 16507</a>                                     
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <h4 className="mt-4">Social</h4>
                        <div className="footer-social-icons flex mt-2 gap-2">
                            <div className="footer-social-icon">
                                <a href="#"><FaInstagram/></a>
                            </div>
                              <div className="footer-social-icon">
                                <a href="#"><FaFacebookF/></a>
                            </div>

                              <div className="footer-social-icon">
                                <a href="#"><FaLinkedinIn/></a>
                            </div>
                              <div className="footer-social-icon">
                                <a href="#"><FaPinterest/></a>
                            </div>
                        </div>
                    </div>
                </div> 

                <div className="footer-copyright">
                    <p className="flex items-center gap-2"><AiOutlineCopyright/>2025 Domain Dude. All Rights Reserved.</p>
                </div>           
            </div>
        </footer>
    </>
  )
}

export default Footer