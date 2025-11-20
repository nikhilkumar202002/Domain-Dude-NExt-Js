"use client";

import "./Home.css";
import Portfolio1 from "../../../../assets/Portfolio/Skybound.jpg";
import Portfolio2 from "../../../../assets/Portfolio/ayursidhi.jpg";
import Portfolio3 from "../../../../assets/Portfolio/lab-8.jpg";
import Portfolio4 from "../../../../assets/Portfolio/paddle-boat.jpg";
import Portfolio5 from "../../../../assets/Portfolio/pantry-india.jpg";
import Portfolio6 from "../../../../assets/Portfolio/thebridgate.jpg";
import Portfolio7 from "../../../../assets/Portfolio/vismaya.jpg";
import Abstract from "../../../../assets/Images/Abstract-right.svg";
import MainButton from "../../common/MainButton";
import Image from "next/image";
// 1. Import Framer Motion
import { motion } from "framer-motion";

const Portfolio = () => {

  // 2. Define Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each child by 0.2s
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 }, // Start 60px down and invisible
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <>
      <section className="portfolio-section">
        <div className="portfolio-section-bg-image">
          <Image src={Abstract} width={750} height={0} alt="Abstract" />
        </div>
        {/* 3. Wrap the main container to orchestrate the stagger */}
        <motion.div 
          className="portfolio-container container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Animates once when 10% is in view
        >
          
          {/* Animate Header */}
          <motion.div className="portfolio-section-header" variants={fadeUpVariants}>
            <h3>Creative Highlights</h3>
            <h2>A Glimpse Into Our Creative Journey</h2>
          </motion.div>

          <div className="portfolio-section-portfolio-rows">
            
            {/* ROW 1 */}
            <div className="portfolio-section-portfolio-row grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5">
              
              {/* Column 1 */}
              <motion.div className="portfolio-section-col" variants={fadeUpVariants}>
                <div className="portfolio-section-portfolio-item">
                  <Image src={Portfolio1} width={400} height={300} alt="Portfolio1" />
                </div>
              </motion.div>

              {/* Column 2 (Stacked) */}
              <motion.div className="portfolio-section-col" variants={fadeUpVariants}>
                <div className="portfolio-section-portfolio-item center mb-5">
                  <Image src={Portfolio2} width={400} height={300} alt="Portfolio1" />
                </div>
                <div className="portfolio-section-portfolio-item center">
                  <Image src={Portfolio3} width={400} height={300} alt="Portfolio1" />
                </div>
              </motion.div>

              {/* Column 3 */}
              <motion.div className="portfolio-section-col" variants={fadeUpVariants}>
                <div className="portfolio-section-portfolio-item">
                  <Image src={Portfolio4} width={400} height={300} alt="Portfolio1" />
                </div>
              </motion.div>
            </div>

            {/* ROW 2 */}
            <div className="portfolio-section-portfolio-row grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mt-5">
              
              {/* Item 5 */}
              <motion.div className="portfolio-section-col" variants={fadeUpVariants}>
                <div className="portfolio-section-portfolio-item second">
                  <Image src={Portfolio5} width={400} height={300} alt="Portfolio1" />
                </div>
              </motion.div>

              {/* Item 6 */}
              <motion.div className="portfolio-section-col" variants={fadeUpVariants}>
                <div className="portfolio-section-portfolio-item second">
                  <Image src={Portfolio6} width={400} height={300} alt="Portfolio1" />
                </div>
              </motion.div>

              {/* Item 7 */}
              <motion.div className="portfolio-section-col" variants={fadeUpVariants}>
                <div className="portfolio-section-portfolio-item second">
                  <Image src={Portfolio7} width={400} height={300} alt="Portfolio1" />
                </div>
              </motion.div>
            </div>
            
          </div>

          {/* Animate Button */}
          <motion.div className="portfolio-section-btn flex justify-center mt-10" variants={fadeUpVariants}>
            <MainButton label="View All Portfolio" />
          </motion.div>

        </motion.div>
      </section>
    </>
  );
};

export default Portfolio;