"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Preloader.css";

const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (!isComplete) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const word1 = overlay.querySelector<HTMLElement>(".word-1");
    const word2 = overlay.querySelector<HTMLElement>(".word-2");
    const word3 = overlay.querySelector<HTMLElement>(".word-3");

    if (!word1 || !word2 || !word3) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          setIsComplete(true);
        },
      });

      // 1. Initial setup - hide words below their masks
      tl.set([word1, word2, word3], {
        y: "125%",
        opacity: 0,
      });

      // 2. Word 1 ("Design.") appears (Black)
      tl.to(
        word1,
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.2,
      );

      // 3. Word 2 ("Develop.") appears (Primary Blue)
      tl.to(
        word2,
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.85,
      );

      // 4. Word 3 ("Deliver.") appears (Black)
      tl.to(
        word3,
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        1.5,
      );

      // 5. Hold all 3 words in view spanning the full screen edge-to-edge

      // 6. Smooth exit: Words parallax up, white curtain lifts upward
      tl.to(
        [word1, word2, word3],
        {
          y: "-35%",
          opacity: 0.85,
          duration: 0.75,
          ease: "power3.in",
        },
        2.7,
      );

      tl.to(
        overlay,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        2.8,
      );
    }, overlay);

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
        {/* Word 1: Black */}
        <div className="preloader-mask">
          <span className="preloader-word word-1 word-black">
            Design.
          </span>
        </div>

        {/* Word 2: Primary Blue */}
        <div className="preloader-mask">
          <span className="preloader-word word-2 word-primary">
            Develop.
          </span>
        </div>

        {/* Word 3: Black */}
        <div className="preloader-mask">
          <span className="preloader-word word-3 word-black">
            Deliver.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
