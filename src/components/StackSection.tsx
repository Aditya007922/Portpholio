import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES, TECH_TILES } from '../data/portfolioData';

export function StackSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="stack" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
            Engineering Arsenal
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
            Technical Skills &amp; Stack
          </h2>
        </div>

        {activeCategory && (
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="self-start rounded-lg border border-red-500/30 bg-red-950/30 px-3.5 py-1.5 font-mono text-xs text-red-300 transition-colors hover:border-red-500 hover:text-white md:self-auto"
          >
            Show All Technologies
          </button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Left Column: Categorized Skill Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 lg:col-span-5"
        >
          {SKILL_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(isSelected ? null : category.id)}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`glass-surface w-full rounded-2xl p-5 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-red-500/70 bg-[#141115] shadow-[0_0_26px_-6px_rgba(220,38,38,0.4)]'
                    : 'hover:border-red-500/45'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-white">{category.name}</h3>
                  <span className="font-mono text-xs text-red-400 tabular-nums">
                    {category.skills.length}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">{category.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-zinc-300">
                  {category.skills.map((skill, idx) => (
                    <span key={skill} className="inline-flex items-center gap-2">
                      <span>{skill}</span>
                      {idx < category.skills.length - 1 && (
                        <span aria-hidden="true" className="text-red-500/60">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Right Column: 3D Glass Tech Stack Tile Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
          style={{ perspective: '1100px' }}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TECH_TILES.map((tile) => {
              const dimmed = activeCategory !== null && tile.categoryId !== activeCategory;
              const highlighted = activeCategory === tile.categoryId;

              return (
                <div
                  key={tile.name}
                  className={`group relative rounded-xl border p-4 transition-all duration-250 ease-out ${
                    highlighted
                      ? ' -translate-y-1.5 border-red-500/75 bg-[#161014] shadow-[0_14px_30px_-8px_rgba(220,38,38,0.48)]'
                      : dimmed
                      ? 'border-white/5 bg-[#0C0C0F]/45 opacity-40'
                      : 'border-red-500/20 bg-[#101014]/75 hover:-translate-y-1.5 hover:border-red-500/70 hover:bg-[#161115] hover:shadow-[0_14px_32px_-8px_rgba(220,38,38,0.45)]'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Crimson underglow bar */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent transition-opacity duration-200 ${
                      highlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/30 bg-red-950/30 font-mono text-xs font-bold tracking-wider text-red-400 transition-colors group-hover:border-red-500 group-hover:bg-red-600/20 group-hover:text-white">
                      {tile.abbr}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45 bg-zinc-700 transition-colors group-hover:bg-red-500"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-white">{tile.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-zinc-400">{tile.focus}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
