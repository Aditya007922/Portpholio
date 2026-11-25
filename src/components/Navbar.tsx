import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CREDENTIALS', href: '#credentials' },
  { label: 'STACK', href: '#stack' },
  { label: 'CONTACT', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-red-500/15 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Geometric GA Monogram + Single-Line Wordmark */}
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
          aria-label="Goud Aditya Home"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          >
            <rect
              x="1"
              y="1"
              width="34"
              height="34"
              rx="6"
              fill="#0C0C0F"
              stroke="rgba(239, 68, 68, 0.6)"
              strokeWidth="1.5"
            />
            <path
              d="M17 11H10.5C9.67 11 9 11.67 9 12.5V23.5C9 24.33 9.67 25 10.5 25H16.5V18.5H13.5"
              stroke="#EF4444"
              strokeWidth="2.2"
              strokeLinecap="square"
            />
            <path
              d="M19.5 25L23.5 11L27.5 25M20.8 20.8H26.2"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span className="font-display text-lg font-bold tracking-[0.08em] text-white uppercase">
            Goud Aditya
          </span>
        </a>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 whitespace-nowrap py-1 font-mono text-xs font-medium tracking-[0.14em] text-zinc-400 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 transition-all duration-200 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action Status Link */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-red-500/40 bg-red-950/35 px-4 py-2 font-mono text-xs font-medium tracking-[0.1em] text-red-200 transition-all duration-150 hover:border-red-500 hover:bg-red-600/20 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rotate-45 bg-red-500 shadow-[0_0_8px_#EF4444]"
            />
            OPEN TO OPPORTUNITIES
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/25 bg-[#0C0C0F] text-zinc-200 transition-colors hover:border-red-500/60 hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-red-500/15 bg-[#08080A] px-6 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 font-mono text-xs font-medium tracking-[0.15em] text-zinc-300 transition-colors hover:text-red-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-950/35 px-4 py-2.5 font-mono text-xs font-medium tracking-[0.1em] text-red-200"
            >
              OPEN TO OPPORTUNITIES
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
