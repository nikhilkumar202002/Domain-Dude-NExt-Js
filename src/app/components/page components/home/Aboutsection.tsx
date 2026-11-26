"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Aboutsection.css";

interface CounterItem {
  id: number;
  value: number;
  suffix: string;
  title: string;
  description: string;
}

const counterData: CounterItem[] = [
  {
    id: 1,
    value: 30,
    suffix: "+",
    title: "Happy Clients",
    description: "Brands that trust us",
  },
  {
    id: 2,
    value: 50,
    suffix: "+",
    title: "Projects Delivered",
    description: "Creative digital solutions",
  },
  {
    id: 3,
    value: 6,
    suffix: "+",
    title: "Core Services",
    description: "Complete digital solutions",
  },
  {
    id: 4,
    value: 100,
    suffix: "%",
    title: "Commitment",
    description: "Dedicated to quality",
  },
];

const AnimatedCounterNumber: React.FC<{
  value: number;
  inView: boolean;
  duration?: number;
}> = ({ value, inView, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const current = Math.round(easedProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView, value, duration]);

  return <span className="about-counter-number">{inView ? displayValue : 0}</span>;
};

const Aboutsection = () => {
  const counterSectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (counterSectionRef.current) {
              observer.unobserve(counterSectionRef.current);
            }
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about-scroll-section" id="about-section">
      <div className="container">
        {/* ROW 1: Left About Content & Right Image Placeholder (Blank Space) */}
        <div className="about-first-row">
          <div className="about-first-row-left">
            <div className="about-badge">
              <span className="about-badge-dot"></span>
              <span>Who We Are</span>
            </div>
            <h2 className="about-statement">
              We craft memorable digital experiences and high-growth websites that elevate brands.
            </h2>
            <p className="about-description">
              From full-stack development and UI/UX design to creative branding and growth strategy, we turn bold ideas into high-converting digital products.
            </p>
          </div>

          <div className="about-first-row-right">
            <div className="about-image-placeholder" aria-label="Image Blank Space Placeholder">
              <div className="about-image-placeholder-inner">
                <svg
                  className="about-placeholder-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="about-placeholder-text">Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Counter Section */}
        <div className="about-counter-row" ref={counterSectionRef}>
          <div className="about-counter-grid">
            {counterData.map((item) => (
              <div key={item.id} className="about-counter-card">
                <div className="about-counter-value-wrap">
                  <AnimatedCounterNumber value={item.value} inView={inView} />
                  <span className="about-counter-suffix">{item.suffix}</span>
                </div>
                <h4 className="about-counter-title">{item.title}</h4>
                <p className="about-counter-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
