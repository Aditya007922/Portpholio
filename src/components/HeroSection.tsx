import { motion } from 'motion/react';
import { ArrowDownRight, Mail } from 'lucide-react';
import { useCroppedPortrait } from '../utils/portraitCrop';
import { HeroThreeScene } from './HeroThreeScene';

export function HeroSection() {
  const portrait = useCroppedPortrait();

  return (
    <section id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-10 lg:pb-16 lg:pt-16">
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Editorial Display Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center lg:col-span-6"
        >
          <p className="mb-4 font-mono text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
            Full-Stack Developer <span aria-hidden="true" className="mx-1.5 text-zinc-600">·</span> AI &amp; IoT Builder
          </p>

          <h1
            className="font-display font-bold tracking-tight text-white uppercase"
            style={{
              fontSize: 'clamp(3.25rem, 6.2vw, 5.75rem)',
              lineHeight: 0.96,
              textWrap: 'balance',
            }}
          >
            GOUD
            <span className="block bg-gradient-to-r from-white via-zinc-100 to-red-500 bg-clip-text text-transparent">
              ADITYA
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Building scalable web applications, real-time computer vision systems, and connected
            digital solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.12em] text-white uppercase shadow-[0_0_28px_rgba(220,38,38,0.48)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-500 hover:to-red-600 hover:shadow-[0_0_38px_rgba(239,68,68,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              EXPLORE MY WORK
              <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="glass-surface inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.12em] text-zinc-200 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/60 hover:text-white hover:shadow-[0_0_24px_rgba(220,38,38,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              <Mail className="h-4 w-4 text-red-400" />
              GET IN TOUCH
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 font-mono text-xs text-zinc-500">
            <span>Sharda University · CSE</span>
            <span aria-hidden="true">·</span>
            <span>Greater Noida, India</span>
            <span aria-hidden="true">·</span>
            <span>React · Node.js · Python · Java</span>
          </div>
        </motion.div>

        {/* Right Column: User's Real Uploaded Portrait + Crimson Rim-Lighting + 3D Wireframe Accents */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex min-h-[380px] items-stretch lg:col-span-6 lg:min-h-[480px]"
        >
          <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-red-500/25 bg-[#0A0A0C] shadow-[0_0_50px_-14px_rgba(220,38,38,0.35)]">
            {portrait.dataUrl ? (
              <img
                src={portrait.dataUrl}
                alt="Goud Aditya — Full-Stack Developer portrait"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center opacity-95 contrast-105"
              />
            ) : (
              <div className="flex h-full min-h-[380px] w-full items-center justify-center bg-gradient-to-br from-[#0D0D11] via-[#070709] to-red-950/30 p-8 text-center">
                <span className="font-display text-3xl tracking-wider text-zinc-400 uppercase">
                  Goud Aditya
                </span>
              </div>
            )}

            {/* Measured contrast vignette & crimson rim lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 22% 35%, rgba(239, 68, 68, 0.25) 0%, transparent 56%)',
              }}
            />

            {/* Floating Interactive 3D Wireframe Geometric Accent Layer */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-90 sm:h-72 sm:w-72">
              <HeroThreeScene />
            </div>

            {/* Clean unboxed bottom caption */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] text-red-400 uppercase">
                  Engineering Focus
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  Full-Stack Web · Computer Vision · Civic Tech
                </p>
              </div>
              <span className="hidden font-mono text-xs text-zinc-400 tabular-nums sm:inline">
                2023 – Present
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
