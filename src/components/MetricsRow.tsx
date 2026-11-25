import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { METRICS, MetricItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

function AnimatedCount({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    hasAnimated.current = true;
    const duration = 850;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.max(1, Math.round(eased * target)));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold tracking-tight text-white tabular-nums sm:text-6xl">
      {count}
      <span className="text-red-500">{suffix}</span>
    </span>
  );
}

export function MetricsRow() {
  return (
    <section aria-label="Key Engineering Metrics" className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {METRICS.map((metric: MetricItem, idx: number) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard className="h-full p-7" maxTilt={6}>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex items-baseline justify-between">
                  <AnimatedCount target={metric.value} suffix={metric.suffix} />
                  <span className="font-mono text-xs text-zinc-500 tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <div className="space-y-1.5 border-t border-white/10 pt-4">
                  <h2 className="text-base font-semibold text-white">{metric.label}</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">{metric.detail}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
