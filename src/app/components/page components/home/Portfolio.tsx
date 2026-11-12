"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "../../../data/PortfolioData";
import MainButton from "../../common/MainButton";
import "./Home.css";

const projects = portfolioData.slice(0, 9);

const Portfolio = () => (
  <section className="portfolio-grid-section">
    <div className="container">
      <div className="portfolio-grid-header">
        <div>
          <p>Our Work</p>
          <h2>Selected <span className="heading-highlight">Projects</span></h2>
        </div>
        <MainButton label="View All Projects" href="/works" />
      </div>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <Link key={project.id} href="/works" className="portfolio-grid-card">
            <div className="portfolio-grid-image">
              <Image src={project.image} alt={`${project.title} project`} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              <span>View ↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
