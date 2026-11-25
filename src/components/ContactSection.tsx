import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUp,
} from 'lucide-react';

const EMAIL = 'vishwanagar22@gmail.com';
const PHONE = '+91 7671029405';
const LOCATION = 'Greater Noida, Uttar Pradesh, India';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <>
      <section id="contact" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-surface overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Direct Details */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="font-mono text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
                  Get In Touch
                </p>
                <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
                  Let&apos;s Build Together
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Open to software engineering internships, full-stack collaborations, AI/CV
                  projects, and connected IoT builds.
                </p>

                <div className="mt-8 space-y-5 border-t border-white/10 pt-8">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-950/30 text-red-400">
                        <Mail className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] text-zinc-500 uppercase">Email</p>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="block truncate text-sm font-medium text-white transition-colors hover:text-red-400"
                        >
                          {EMAIL}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-red-500/30 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-200 transition-colors hover:border-red-500 hover:bg-red-600/20 hover:text-white"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-red-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-red-400" />
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-950/30 text-red-400">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] text-zinc-500 uppercase">Phone</p>
                      <a
                        href="tel:+917671029405"
                        className="text-sm font-medium text-white transition-colors hover:text-red-400 tabular-nums"
                      >
                        {PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-950/30 text-red-400">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] text-zinc-500 uppercase">Location</p>
                      <p className="text-sm font-medium text-white">{LOCATION}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Goud Aditya LinkedIn Profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/25 bg-[#0D0D12] px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 transition-all hover:border-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  <Linkedin className="h-4 w-4 text-red-400" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Goud Aditya GitHub Profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/25 bg-[#0D0D12] px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 transition-all hover:border-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  <Github className="h-4 w-4 text-red-400" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-2xl border border-red-500/35 bg-[#0C0C10]/90 p-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/50 bg-red-600/20 text-red-400 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-bold text-white uppercase">
                    Message Ready to Send
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                    Thank you, <span className="text-white">{name}</span>. Your note has been
                    captured. You can also reach out directly at{' '}
                    <span className="text-red-400">{EMAIL}</span>.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                        `Portfolio Inquiry from ${name}`
                      )}&body=${encodeURIComponent(message)}`}
                      className="rounded-xl bg-red-600 px-5 py-2.5 font-mono text-xs font-semibold text-white uppercase transition-colors hover:bg-red-500"
                    >
                      Open in Mail Client
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs font-medium text-zinc-300 uppercase transition-colors hover:text-white"
                    >
                      Send Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 rounded-2xl border border-white/10 bg-[#0B0B0F]/80 p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs font-medium tracking-[0.1em] text-zinc-300 uppercase"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#070709] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs font-medium tracking-[0.1em] text-zinc-300 uppercase"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#070709] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs font-medium tracking-[0.1em] text-zinc-300 uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about the role, project, or collaboration..."
                      required
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#070709] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="font-mono text-xs text-red-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(220,38,38,0.45)] transition-all duration-200 hover:from-red-500 hover:to-red-600 hover:shadow-[0_0_38px_rgba(239,68,68,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  >
                    <Send className="h-4 w-4" />
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Copy Email Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-red-500/45 bg-[#0E0E13] px-4 py-3 font-mono text-xs text-white shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
            <Check className="h-4 w-4 text-red-400" />
            <span>Email copied: {EMAIL}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/10 bg-[#050505]/90">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="font-mono text-xs text-zinc-500">
            © 2026 Goud Aditya · Sharda University, Greater Noida
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-red-400"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </>
  );
}
