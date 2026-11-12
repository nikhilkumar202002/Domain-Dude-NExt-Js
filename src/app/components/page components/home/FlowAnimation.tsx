"use client";

import React, { useEffect, useRef } from "react";

interface FlowAnimationProps {
  numPaths?: number;
  speed?: number;
  lineColor?: string;
  particleColor?: string;
  accentParticleColor?: string;
  glowColor?: string;
  opacity?: number;
  interactive?: boolean;
  className?: string;
}

interface Particle {
  t: number;
  speed: number;
  size: number;
  isAccent: boolean;
}

interface PathData {
  isLeft: boolean;
  startY: number;
  baseStartY: number;
  particles: Particle[];
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  life: number;
}

export const FlowAnimation: React.FC<FlowAnimationProps> = ({
  numPaths = 80,
  speed = 1,
  lineColor = "rgba(255, 255, 255, 0.24)",
  particleColor = "rgba(255, 255, 255, 0.9)",
  accentParticleColor = "rgba(0, 215, 255, 0.95)",
  glowColor = "rgba(0, 200, 255, 0.6)",
  opacity = 0.85,
  interactive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let paths: PathData[] = [];
    let explosions: Explosion[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const buildPaths = () => {
      paths = [];
      const actualCount = Math.max(20, numPaths);
      for (let i = 0; i < actualCount; i++) {
        const startY = (i / actualCount) * height * 1.35 - height * 0.17;
        const particleCount = i % 3 === 0 ? 2 : 1;
        const particles: Particle[] = [];

        for (let p = 0; p < particleCount; p++) {
          particles.push({
            t: (Math.random() + p * 0.5) % 1,
            speed: (0.0013 + Math.random() * 0.0022) * speed,
            size: 2.2 + Math.random() * 1.6,
            isAccent: Math.random() > 0.45,
          });
        }

        paths.push({
          isLeft: i % 2 === 0,
          startY,
          baseStartY: startY,
          particles,
        });
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const nextWidth = rect.width || window.innerWidth;
      const nextHeight = rect.height || window.innerHeight;
      if (nextWidth < 1 || nextHeight < 1) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = nextWidth;
      height = nextHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPaths();
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      explosions.push({
        x,
        y,
        radius: 0,
        life: 1,
      });
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Attach listeners to container or parent section so clicks trigger shockwaves reliably
    const parentSection = container.closest("section") || container;
    parentSection.addEventListener("click", handlePointerDown as EventListener);
    parentSection.addEventListener("mousemove", handlePointerMove as EventListener);
    parentSection.addEventListener("mouseleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);
    resize();

    // Helper: Cubic Bezier calculation
    const getBezierPoint = (
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
    ) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Update shockwave explosions
      explosions.forEach((exp) => {
        exp.radius += 11;
        exp.life -= 0.016;
      });
      explosions = explosions.filter((exp) => exp.life > 0);

      // Render shockwave ripple rings
      explosions.forEach((exp) => {
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 215, 255, ${Math.max(0, exp.life * 0.45)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Render central gateway subtle convergence glow
      const pulse = Math.sin(Date.now() * 0.0025) * 0.15 + 0.85;
      const centerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        140 * pulse,
      );
      centerGlow.addColorStop(0, "rgba(0, 210, 255, 0.28)");
      centerGlow.addColorStop(0.35, "rgba(0, 150, 255, 0.12)");
      centerGlow.addColorStop(0.7, "rgba(0, 80, 200, 0.04)");
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Render paths and streaming particles
      paths.forEach((path) => {
        const p0 = { x: path.isLeft ? 0 : width, y: path.startY };
        const p1 = {
          x: path.isLeft ? centerX * 0.46 : width - centerX * 0.46,
          y: path.startY,
        };
        const p2 = {
          x: path.isLeft ? centerX * 0.82 : width - centerX * 0.82,
          y: centerY,
        };
        const p3 = { x: centerX, y: centerY };

        // Draw dotted/dashed flow curve
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.15;
        ctx.setLineDash([1, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animate particles along the curve
        path.particles.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            // Subtle wandering on reset for organic flow
            path.startY = path.baseStartY + (Math.random() - 0.5) * 16;
          }

          const pos = getBezierPoint(p.t, p0, p1, p2, p3);

          let dxTotal = 0;
          let dyTotal = 0;

          // Shockwave displacement
          explosions.forEach((exp) => {
            const dx = pos.x - exp.x;
            const dy = pos.y - exp.y;
            const dist = Math.hypot(dx, dy);
            if (dist < exp.radius + 110 && dist > exp.radius - 110 && dist > 0.01) {
              const force = (1 - Math.abs(dist - exp.radius) / 110) * exp.life;
              dxTotal += (dx / dist) * force * 70;
              dyTotal += (dy / dist) * force * 70;
            }
          });

          // Mouse proximity interaction
          if (mouse.active) {
            const mdx = pos.x - mouse.x;
            const mdy = pos.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < 130 && mdist > 0.1) {
              const mForce = (1 - mdist / 130) * 18;
              dxTotal += (mdx / mdist) * mForce;
              dyTotal += (mdy / mdist) * mForce;
            }
          }

          pos.x += dxTotal;
          pos.y += dyTotal;

          // Particle glow & rendering
          ctx.save();
          if (p.isAccent) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = glowColor;
            ctx.fillStyle = accentParticleColor;
          } else {
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
            ctx.fillStyle = particleColor;
          }

          // Subtle size scale as it converges to center
          const scale = 0.7 + (1 - p.t) * 0.5;
          const halfSize = (p.size * scale) / 2;

          ctx.fillRect(pos.x - halfSize, pos.y - halfSize, p.size * scale, p.size * scale);
          ctx.restore();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      parentSection.removeEventListener("click", handlePointerDown as EventListener);
      parentSection.removeEventListener("mousemove", handlePointerMove as EventListener);
      parentSection.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [
    numPaths,
    speed,
    lineColor,
    particleColor,
    accentParticleColor,
    glowColor,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className={`flow-animation-root absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        opacity,
        maskImage:
          "radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, rgba(0,0,0,0.6) 80%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, rgba(0,0,0,0.6) 80%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      {/* Ambient background glow orbs matching SaaS hero styling */}
      <div className="absolute -right-32 top-8 w-[480px] h-[480px] rounded-full bg-cyan-500/12 blur-[90px]" />
      <div className="absolute -left-32 bottom-8 w-[440px] h-[440px] rounded-full bg-blue-600/12 blur-[90px]" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default FlowAnimation;

