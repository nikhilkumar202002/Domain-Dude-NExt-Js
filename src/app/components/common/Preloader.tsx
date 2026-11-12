"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Preloader.css";

const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!isComplete) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isComplete]);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
        },
      });

      // Initial positions
      tl.set(overlayRef.current, { yPercent: 0 });
      tl.set(words, { yPercent: 125, opacity: 0 });
      if (progressRef.current) {
        tl.set(progressRef.current, { scaleX: 0 });
      }

      // Word 1: "Design." appears (Black)
      if (words[0]) {
        tl.to(
          words[0],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power4.out",
          },
          0.25,
        );
      }

      // Word 2: "Develop." appears (Primary Color)
      if (words[1]) {
        tl.to(
          words[1],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power4.out",
          },
          0.75,
        );
      }

      // Word 3: "Deliver." appears (Black)
      if (words[2]) {
        tl.to(
          words[2],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power4.out",
          },
          1.25,
        );
      }

      // Progress bar fills in sync across the bottom
      if (progressRef.current) {
        tl.to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
          },
          0.25,
        );
      }

      // Words slight parallax lift
      tl.to(
        words,
        {
          yPercent: -40,
          opacity: 0.8,
          duration: 0.7,
          ease: "power3.in",
        },
        2.1,
      );

      // Smooth curtain exit upwards
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        2.2,
      );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={overlayRef}
      className="preloader-overlay"
      aria-label="Loading animation"
      role="status"
    >
      <div className="preloader-track">
        {/* First word: Black */}
        <div className="preloader-mask">
          <span
            ref={(el) => {
              wordsRef.current[0] = el;
            }}
            className="preloader-word word-black"
          >
            Design.
          </span>
        </div>

        {/* Middle word: Primary Color */}
        <div className="preloader-mask">
          <span
            ref={(el) => {
              wordsRef.current[1] = el;
            }}
            className="preloader-word word-primary"
          >
            Develop.
          </span>
        </div>

        {/* Third word: Black */}
        <div className="preloader-mask">
          <span
            ref={(el) => {
              wordsRef.current[2] = el;
            }}
            className="preloader-word word-black"
          >
            Deliver.
          </span>
        </div>
      </div>

      {/* Subtle bottom progress bar */}
      <div className="preloader-progress-track">
        <div ref={progressRef} className="preloader-progress-fill" />
      </div>
    </div>
  );
};

export default Preloader;
