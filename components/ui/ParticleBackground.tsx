'use client';

import { useEffect, useRef } from 'react';
import { particles as particleTokens } from '@/styles/tokens';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** A few particles are "packets": slightly larger, accent-tinted, faster. */
  packet: boolean;
}

/**
 * Custom canvas particle field styled as a network-traffic visualization:
 * drifting nodes joined by faint links when within 120px, with a handful
 * of brighter "packet" particles moving through the mesh. No pointer
 * interaction. Renders nothing under prefers-reduced-motion.
 *
 * Loaded via next/dynamic with ssr:false so it never blocks first paint.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const isMobile = () => window.innerWidth < 768;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile() ? particleTokens.countMobile : particleTokens.countDesktop;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        packet: Math.random() < 0.08,
      }));
      // Packets travel ~3x faster — they read as traffic moving through the mesh.
      particles.forEach((p) => {
        if (p.packet) {
          p.vx *= 3;
          p.vy *= 3;
        }
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // Links first, beneath the nodes.
      const maxDist = particleTokens.linkDistance;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges for continuous drift.
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        if (p.packet) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(241, 245, 249, ${particleTokens.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(step);
    };

    init();
    raf = requestAnimationFrame(step);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
