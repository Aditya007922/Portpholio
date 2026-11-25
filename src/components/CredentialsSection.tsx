import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Award } from 'lucide-react';
import { CREDENTIALS } from '../data/portfolioData';

export function CredentialsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="credentials" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
            Verified Milestones
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
            Training &amp; Certifications
          </h2>
        </div>
        <p className="max-w-md text-sm text-zinc-400">
          Academic distinctions, intensive full-stack bootcamps, and industry-aligned certifications.
        </p>
      </motion.div>

      <div className="space-y-4">
        {CREDENTIALS.map((cred, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <motion.div
              key={cred.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`glass-surface glass-surface-hover overflow-hidden rounded-2xl transition-colors ${
                isOpen ? 'border-red-500/55 shadow-[0_0_28px_-8px_rgba(220,38,38,0.3)]' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-500 sm:px-8"
              >
                <div className="flex min-w-0 items-center gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/35 bg-red-950/35 font-mono text-xs font-semibold text-red-400 tabular-nums">
                    {cred.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                      {cred.title}
                    </h3>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-zinc-400">
                      <span>{cred.issuer}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-red-400">{cred.periodOrScore}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Award className="hidden h-4 w-4 text-red-400/80 sm:block" />
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-400' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 sm:pl-[5.75rem]">
                      <p className="text-sm leading-relaxed text-zinc-300">{cred.summary}</p>
                      <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                        {cred.highlights.map((hl) => (
                          <li key={hl} className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-red-500"
                            />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
