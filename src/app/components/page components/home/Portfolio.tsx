"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "../../../data/PortfolioData";
import MainButton from "../../common/MainButton";
import "./Home.css";

const projects = portfolioData.slice(0, 6);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeProject, setActiveProject] = useState(0);

  const updateCursorPosition = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    target.style.setProperty("--portfolio-cursor-x", `${x}%`);
    target.style.setProperty("--portfolio-cursor-y", `${y}%`);
  };

  useEffect(() => {
    let frame = 0;

    const updateActiveProject = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      visualRefs.current.forEach((visual, index) => {
        if (!visual) return;
        const rect = visual.getBoundingClientRect();
        const visualCenter = rect.top + rect.height / 2;
        const distance = Math.abs(visualCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveProject((current) => current === closestIndex ? current : closestIndex);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveProject);
    };

    updateActiveProject();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const active = projects[activeProject];

  return (
    <section className="portfolio-editorial" ref={sectionRef}>
      <div className="portfolio-editorial-grid">
        <div className="portfolio-editorial-content">
          <div className="portfolio-editorial-sticky">
            <p className="portfolio-editorial-label">Our Work</p>

            <div className="portfolio-editorial-copy" key={active.id}>
        
              <h2>{active.title}</h2>
              <p>{active.description}</p>

              <div className="portfolio-editorial-meta">
                <Image src={active.image} alt="" width={74} height={74} />
                <div>
                  <h3>{active.title}</h3>
                  <span>{active.tags.join(" · ")}</span>
                </div>
              </div>

              <div className="portfolio-editorial-case-study-btn">
                <MainButton label="View Case Study" href="/works" />
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio-editorial-visuals">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(element) => { visualRefs.current[index] = element; }}
              className={`portfolio-editorial-project ${activeProject === index ? "is-active" : ""}`}
            >
              <Link
                href="/works"
                className="portfolio-editorial-image"
                onMouseMove={updateCursorPosition}
                onMouseEnter={updateCursorPosition}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} project`}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <span>View Case Study</span>
              </Link>

              <div className="portfolio-editorial-mobile-copy">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <small>{project.tags.join(" · ")}</small>
                <div className="portfolio-editorial-mobile-cta">
                  <MainButton label="View Case Study" href="/works" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="portfolio-editorial-button">
        <MainButton label="View All Portfolio" />
      </div>
    </section>
  );
};

export default Portfolio;
