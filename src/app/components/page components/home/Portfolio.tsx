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
        <h2>Our Works</h2>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <Link key={project.id} href="/works" className="portfolio-grid-card">
            <div className="portfolio-grid-image">
              <Image
                src={project.image}
                alt={`${project.title} project`}
                fill
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span>View ↗</span>
            </div>
            <div className="portfolio-grid-card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="portfolio-grid-button">
        <MainButton label="View All Projects" href="/works" size="lg" />
      </div>
    </div>
  </section>
);

export default Portfolio;
