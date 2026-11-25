import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgress(100);
      setVisible(false);
      onComplete();
      return;
    }

    const duration = 950;
    const start = performance.now();
    let rafId = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(eased * 100);
      setProgress(val);

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 180);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  const formatted = String(progress).padStart(3, '0');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] px-6"
          aria-label="Portfolio loading screen"
        >
          <div className="w-full max-w-md space-y-6">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="font-mono text-xs tracking-[0.22em] text-zinc-400 uppercase">
                  Goud Aditya
                </p>
                <p className="text-xs text-zinc-500">Portfolio Environment</p>
              </div>
              <span className="font-display text-6xl font-bold tracking-tight text-white tabular-nums sm:text-7xl">
                {formatted}
              </span>
            </div>

            <div className="relative h-[2px] w-full overflow-hidden bg-zinc-900">
              <div
                className="h-full bg-gradient-to-r from-red-800 via-red-500 to-red-400 transition-transform duration-75 ease-out"
                style={{
                  width: '100%',
                  transform: `translateX(${progress - 100}%)`,
                  boxShadow: '0 0 14px rgba(239, 68, 68, 0.9)',
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Full-Stack · AI · IoT</span>
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  onComplete();
                }}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Skip Intro
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
