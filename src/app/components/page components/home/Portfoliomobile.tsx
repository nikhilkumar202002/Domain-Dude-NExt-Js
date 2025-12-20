'use client'

import { portfolioData } from "../../../data/PortfolioData";
import Image from "next/image";
import "../portfolio/Portfolio.css"
import "./Home.css";

const Portfoliomobile = () => {
  return (
    <>
        <section className="portfolio-mobile">
            <div className="portfolio-mobile-container container">
                   <div className="portfolio-card-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {portfolioData.map((item) => (
                              <div className="portfolio-card" key={item.id}>
                                <div className="portfolio-card-image">
                                  <Image 
                                    alt={item.title} 
                                    src={item.image} 
                                    className="w-full h-auto" 
                                    placeholder="blur" // Optional: nice loading effect
                                  />
                                  <div className="portfolio-card-keys">
                                    {item.tags.map((tag, i) => (
                                      <span key={i}>{tag}</span>
                                    ))}
                                  </div>
                                </div>
                                <div className="portfolio-card-content">
                                  <h3>{item.title}</h3>
                                  <h2>{item.description}</h2>
                                </div>
                              </div>
                            ))}
                          </div>
            </div>
        </section>
    </>
  )
}

export default Portfoliomobile