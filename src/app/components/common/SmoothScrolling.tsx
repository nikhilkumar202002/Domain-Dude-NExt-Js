"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    // We cast children as any to resolve the "bigint is not assignable to ReactNode" conflict
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}

export default SmoothScrolling;