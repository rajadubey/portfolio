"use client";

import FadeIn from "@/components/fade-in";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  return (
    <FadeIn as="section" className="pt-16 pb-12 md:pt-24 md:pb-16">
      <div id="home" className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center text-lg shrink-0">
          RD
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold t-primary tracking-[-0.02em]">
          {personalInfo.name}
        </h1>
      </div>
      <p className="text-xl md:text-2xl t-secondary mb-2">
        {personalInfo.title}
      </p>
      <p className="text-base md:text-lg t-muted mb-8 max-w-lg">
        {personalInfo.subtitle}
      </p>

      {/* Resume CTA */}
      <div className="mb-6">
        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium transition-all group"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          View Resume
          <svg
            className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>

      {/* Links row */}
      <div className="flex flex-wrap items-center gap-y-2 text-sm t-muted">
        <a
          href={`mailto:${personalInfo.email}`}
          className="hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-current/20 hover:decoration-emerald-400/40"
        >
          {personalInfo.email}
        </a>
        {personalInfo.socials.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center whitespace-nowrap"
          >
            <span className="t-faint mx-3">·</span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-current/20 hover:decoration-emerald-400/40"
            >
              {s.label}
            </a>
          </span>
        ))}
      </div>
    </FadeIn>
  );
}
