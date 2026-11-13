"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Counter.css";

export interface CounterItem {
  id?: string | number;
  value: number;
  suffix?: string;
  prefix?: string;
  title: string;
  description: string;
}

export interface CounterProps {
  items?: CounterItem[];
  bgColor?: string;
  cardBgColor?: string;
  textColor?: string;
  mutedColor?: string;
  lineColor?: string;
  accentColor?: string;
  className?: string;
}

const defaultCounterItems: CounterItem[] = [
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

const AnimatedValue: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
  duration?: number;
}> = ({ value, suffix = "", prefix = "", inView, duration = 2000 }) => {
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

  return (
    <div className="counter-value-wrap">
      {prefix && <span className="counter-prefix">{prefix}</span>}
      <span className="counter-number">{inView ? displayValue : 0}</span>
      {suffix && <span className="counter-suffix">{suffix}</span>}
    </div>
  );
};

const Counter: React.FC<CounterProps> = ({
  items = defaultCounterItems,
  bgColor,
  cardBgColor,
  textColor,
  mutedColor,
  lineColor,
  accentColor,
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Once triggered, no need to keep observing
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Map dynamic color props to CSS custom variables so colors can be customized easily
  const styleVariables: Record<string, string> = {};
  if (bgColor) styleVariables["--counter-bg"] = bgColor;
  if (cardBgColor) styleVariables["--counter-card-bg"] = cardBgColor;
  if (textColor) styleVariables["--counter-text"] = textColor;
  if (mutedColor) styleVariables["--counter-muted"] = mutedColor;
  if (lineColor) styleVariables["--counter-line"] = lineColor;
  if (accentColor) styleVariables["--counter-accent"] = accentColor;

  return (
    <section
      ref={sectionRef}
      className={`counter-section ${className}`.trim()}
      style={styleVariables as React.CSSProperties}
      aria-label="Key Performance Indicators and Metrics"
    >
      <div className="counter-container">
        <div className="counter-grid">
          {items.map((item, index) => (
            <div key={item.id ?? index} className="counter-card">
              <AnimatedValue
                value={item.value}
                suffix={item.suffix}
                prefix={item.prefix}
                inView={inView}
              />
              <h4 className="counter-title">{item.title}</h4>
              <p className="counter-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
