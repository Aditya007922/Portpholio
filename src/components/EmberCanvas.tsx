import { useEffect, useRef } from 'react';

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  hue: string;
}

export function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particleCount = width < 768 ? 32 : 64;
    const colors = ['#EF4444', '#DC2626', '#F87171', '#991B1B'];
    const particles: EmberParticle[] = Array.from({ length: particleCount }, (_, i) => {
      const baseAlpha = 0.18 + Math.random() * 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.18 + Math.random() * 0.45),
        radius: 1 + Math.random() * 2.2,
        alpha: baseAlpha,
        baseAlpha,
        phase: Math.random() * Math.PI * 2,
        hue: colors[i % colors.length],
      };
    });

    const mouse = { x: -9999, y: -9999, active: false };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    let frameId = 0;
    let lastTime = performance.now();

    const drawFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.phase += 0.02 * dt;
          p.x += (p.vx + Math.sin(p.phase) * 0.14) * dt;
          p.y += p.vy * dt;

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 18000 && distSq > 1) {
              const force = (1 - Math.sqrt(distSq) / 134) * 0.45;
              p.x += (dx / Math.sqrt(distSq)) * force * dt;
              p.y += (dy / Math.sqrt(distSq)) * force * dt;
            }
          }

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          p.alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.phase * 1.6));
        }

        const glowRadius = p.radius * 4.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, p.hue);
        grad.addColorStop(0.35, 'rgba(220, 38, 38, 0.35)');
        grad.addColorStop(1, 'rgba(220, 38, 38, 0)');

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FCA5A5';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(drawFrame);
      }
    };

    if (prefersReducedMotion) {
      drawFrame(performance.now());
    } else {
      frameId = requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 75% 18%, rgba(220, 38, 38, 0.18) 0%, rgba(153, 27, 27, 0.06) 36%, rgba(5, 5, 5, 0) 68%), radial-gradient(circle at 15% 75%, rgba(220, 38, 38, 0.1) 0%, rgba(5, 5, 5, 0) 55%)',
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-90"
      />
    </>
  );
}
