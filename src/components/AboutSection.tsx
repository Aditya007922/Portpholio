import { motion } from 'motion/react';
import { GraduationCap, Code2, Cpu, Globe } from 'lucide-react';
import { Lanyard3D } from './Lanyard3D';

const FOCUS_PILLARS = [
  {
    icon: Globe,
    title: 'Full-Stack Web Engineering',
    detail: 'Component-driven React.js interfaces backed by Node.js, Express.js, and MongoDB/MySQL.',
  },
  {
    icon: Code2,
    title: 'Algorithmic Foundations',
    detail: 'Structured problem solving with Java & Python across Data Structures & Algorithms.',
  },
  {
    icon: Cpu,
    title: 'AI Vision & Connected IoT',
    detail: 'Real-time OpenCV analytics pipelines and Arduino biometric sensor telemetry.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Bio & Education */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between lg:col-span-6"
        >
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
              Profile &amp; Background
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
              About Me
            </h2>

            <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
              Frontend-focused Full Stack Developer and B.Tech Computer Science &amp; Engineering
              student at Sharda University, Greater Noida (2023–Present). Skilled in React.js,
              JavaScript, Java, and Python, with a strong foundation in Data Structures &amp;
              Algorithms, REST APIs, and database architecture. Passionate about building scalable
              software and solving real-world problems across web, AI, and IoT.
            </p>

            {/* Education Highlight Container */}
            <div className="glass-surface mt-8 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/35 bg-red-950/35 text-red-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-red-400 uppercase">
                    Education · 2023 – Present
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    B.Tech in Computer Science &amp; Engineering (CSE)
                  </h3>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    Sharda University, Greater Noida
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {FOCUS_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="space-y-2">
                  <Icon className="h-4 w-4 text-red-400" />
                  <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{pillar.detail}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Suspended Lanyard ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <Lanyard3D />
        </motion.div>
      </div>
    </section>
  );
}
