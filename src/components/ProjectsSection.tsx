import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Layers, Activity, Cpu } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

type FilterCategory = 'All' | ProjectItem['category'];
const FILTERS: FilterCategory[] = ['All', 'Full-Stack', 'AI / Vision', 'Civic Tech'];

function ProjectCardImage({ project }: { project: ProjectItem }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-48 w-full flex-col items-center justify-center bg-gradient-to-br from-[#121216] via-[#0B0B0E] to-red-950/35 p-6 text-center">
        <Layers className="mb-2 h-7 w-7 text-red-500/80" />
        <span className="font-display text-lg tracking-wide text-white uppercase">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full overflow-hidden border-b border-red-500/15 bg-[#09090B]">
      <img
        src={project.image}
        alt={`${project.title} — ${project.subtitle}`}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/25"
      />
      <span className="absolute left-4 top-4 font-display text-2xl font-bold tracking-tight text-white/90 tabular-nums drop-shadow">
        {project.number}
      </span>
    </div>
  );
}

function ProjectDemoModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-surface relative w-full max-w-2xl overflow-hidden rounded-2xl border border-red-500/40 bg-[#0B0B0F] shadow-[0_0_60px_-10px_rgba(220,38,38,0.45)]"
      >
        <div className="relative h-56 w-full overflow-hidden border-b border-red-500/20 bg-[#08080A]">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/70 text-zinc-200 transition-colors hover:border-red-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <p className="font-mono text-xs tracking-[0.16em] text-red-400 uppercase">
              {project.number} · {project.category}
            </p>
            <h3
              id="modal-project-title"
              className="mt-1 font-display text-3xl font-bold tracking-tight text-white uppercase"
            >
              {project.title} — {project.subtitle}
            </h3>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{project.description}</p>

          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-red-400 uppercase">
              {project.category === 'AI / Vision' ? (
                <Activity className="h-4 w-4" />
              ) : (
                <Cpu className="h-4 w-4" />
              )}
              System Architecture &amp; Implementation
            </h4>
            <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-400">
              {project.architectureHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-red-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-red-500/25 bg-red-950/20 px-2.5 py-1 font-mono text-xs text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="font-mono text-xs text-zinc-500">{project.metricsLabel}</span>
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs font-medium text-zinc-200 transition-colors hover:border-red-500/50 hover:text-white"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-red-600 px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-red-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
            Selected Works
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
            Featured Projects
          </h2>
        </div>

        {/* Interactive Category Filter Control */}
        <div
          role="tablist"
          aria-label="Filter projects by domain"
          className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-red-500/20 bg-[#0D0D11]/90 p-1.5"
        >
          {FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(cat)}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 font-mono text-xs font-medium transition-all duration-150 ${
                  active
                    ? 'bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
        {visibleProjects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <TiltCard className="group flex w-full flex-col">
              <div className="flex h-full flex-col">
                <ProjectCardImage project={project} />

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <span className="text-red-400">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.metricsLabel}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white uppercase">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-300">{project.subtitle}</p>

                    <p className="mt-3.5 text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.08em] text-white uppercase shadow-[0_0_20px_rgba(220,38,38,0.35)] transition-all duration-150 hover:from-red-500 hover:to-red-600 hover:shadow-[0_0_26px_rgba(239,68,68,0.55)]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        LIVE DEMO
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-red-500/25 bg-[#0D0D12] px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.08em] text-zinc-200 uppercase transition-colors duration-150 hover:border-red-500/60 hover:text-white"
                      >
                        <Github className="h-3.5 w-3.5 text-red-400" />
                        GITHUB
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDemoModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
