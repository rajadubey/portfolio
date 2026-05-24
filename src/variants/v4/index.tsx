'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { VariantProps } from '../types';
import type { Experience as ExperienceType, Project, Skill } from '../../../payload-types';
import { Geist, Inter, JetBrains_Mono } from 'next/font/google';
import { ArrowUpRight, Mail, MapPin, CheckCircle2, Server, Database, Terminal, Cpu, Network } from 'lucide-react';

// ─── Font Configuration ────────────────────────────────────────────
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// ─── Helpers ────────────────────────────────────────────────────────
const extractText = (rt: any): string => {
  if (!rt) return '';
  if (typeof rt === 'string') return rt;
  if (rt.root?.children) {
    return rt.root.children
      .map((ch: any) => ch.children ? ch.children.map((t: any) => t.text || '').join('') : ch.text || '')
      .join(' ');
  }
  return '';
};

const extractBullets = (rt: any): string[] => {
  if (!rt) return [];
  if (typeof rt === 'string') return [rt];
  if (rt.root?.children) {
    return rt.root.children
      .map((ch: any) => ch.children ? ch.children.map((t: any) => t.text || '').join('') : ch.text || '')
      .filter((s: string) => s.trim().length > 0);
  }
  return [];
};

const fmtDate = (s: string, e?: string | null) => {
  const f = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${f(s)} — ${e ? f(e) : 'Present'}`;
};

// ─── Custom Scoped CSS Styles ───────────────────────────────────────
const styles = `
  .v4-root {
    background-color: #080808;
    color: #e5e2e1;
    font-family: var(--font-inter), sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .v4-root ::selection {
    background-color: rgba(0, 220, 229, 0.3);
    color: #ffffff;
  }

  .v4-font-display {
    font-family: var(--font-geist), sans-serif;
  }
  .v4-font-body-lg {
    font-family: var(--font-inter), sans-serif;
  }
  .v4-font-code-label {
    font-family: var(--font-mono), monospace;
  }

  .v4-text-display {
    font-size: 48px;
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.04em;
  }
  @media (max-width: 768px) {
    .v4-text-display {
      font-size: 32px;
    }
  }

  .v4-text-headline-lg {
    font-size: 32px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .v4-text-headline-md {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 500;
  }
  .v4-text-body-lg {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
  }
  .v4-text-body-sm {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
  }
  .v4-text-code-label {
    font-size: 13px;
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  /* Colors */
  .v4-text-primary-fixed-dim { color: #00dce5; }
  .v4-bg-primary-fixed-dim { background-color: #00dce5; }
  .v4-text-on-primary { color: #003739; }
  .v4-bg-on-primary { background-color: #003739; }
  .v4-text-on-surface { color: #e5e2e1; }
  .v4-text-on-surface-variant { color: #b9caca; }
  .v4-bg-surface-container-low { background-color: #1c1b1b; }
  .v4-bg-surface-container-lowest { background-color: #0e0e0e; }
  .v4-bg-surface-container-high { background-color: #2a2a2a; }
  .v4-bg-surface-container-highest { background-color: #353534; }
  .v4-border-outline-variant-30 { border-color: rgba(58, 73, 74, 0.3); }
  .v4-border-outline-variant-20 { border-color: rgba(58, 73, 74, 0.2); }
  .v4-border-outline-variant { border-color: #3a494a; }
  .v4-border-primary-fixed-dim-20 { border-color: rgba(0, 220, 229, 0.2); }
  .v4-bg-primary-fixed-dim-5 { background-color: rgba(0, 220, 229, 0.05); }
  .v4-bg-primary-fixed-dim-10 { background-color: rgba(0, 220, 229, 0.1); }
  .v4-bg-on-surface-variant-10 { background-color: rgba(185, 202, 202, 0.1); }
  .v4-bg-error-10 { background-color: rgba(255, 180, 171, 0.1); }

  /* Layout classes */
  .v4-glass-panel {
    background: rgba(18, 18, 18, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid #1F1F1F;
  }

  .v4-grid-pattern {
    background-image: linear-gradient(#1F1F1F 1px, transparent 1px), linear-gradient(90deg, #1F1F1F 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .v4-terminal-shadow {
    box-shadow: 0 0 20px rgba(0, 220, 229, 0.05);
  }

  .v4-hover-accent:hover {
    border-color: #333333;
    box-shadow: inset 0 0 10px rgba(0, 220, 229, 0.03);
  }

  .v4-node-line {
    background: linear-gradient(90deg, #00dce5, transparent);
  }

  @keyframes v4marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes v4move-x {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .v4-animate-marquee {
    display: flex;
    animation: v4marquee 30s linear infinite;
  }

  .v4-animate-move-x-3s {
    animation: v4move-x 3s linear infinite;
  }

  .v4-animate-move-x-5s {
    animation: v4move-x 5s linear infinite reverse;
  }
`;

// ─── Sub-Components ─────────────────────────────────────────────────

function V4Header({ profileName }: { profileName: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md border-b v4-border-outline-variant-30">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="v4-font-display text-lg font-black tracking-tighter uppercase text-white">
          {profileName}
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest text-primary-fixed-dim font-bold border-b-2 v4-border-primary-fixed-dim pb-1" href="#architecture">Architecture</a>
          <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant font-medium hover:text-white transition-colors" href="#experience">History</a>
          <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant font-medium hover:text-white transition-colors" href="#lab">Deployments</a>
          <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant font-medium hover:text-white transition-colors" href="#about">About</a>
        </nav>
        <Link href="#about" className="v4-bg-primary-fixed-dim v4-text-on-primary px-6 py-2 v4-font-code-label v4-text-code-label uppercase tracking-widest font-bold hover:opacity-90 transition-all scale-95 active:opacity-80">
          Contact
        </Link>
      </div>
    </header>
  );
}

function V4Hero({ profile }: { profile: VariantProps['profile'] }) {
  const name = profile?.name || 'RAJA DUBEY';
  const title = profile?.title || 'SENIOR FULL-STACK ARCHITECT';
  const bio = profile ? extractText(profile.bio) : 'Senior Software Engineer specializing in frontend architecture, distributed systems, and AI-assisted workflows. Building resilient digital infrastructure for the modern web.';

  return (
    <section className="relative px-6 py-20 overflow-hidden border-b v4-border-outline-variant-20">
      <div className="absolute inset-0 v4-grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 v4-bg-surface-container-low border v4-border-outline-variant-30 rounded-full mb-6 w-fit">
            <span className="w-2 h-2 rounded-full v4-bg-primary-fixed-dim animate-pulse" />
            <span className="v4-font-code-label text-[11px] uppercase tracking-[0.2em] v4-text-on-surface-variant">System Status: Optimal</span>
          </div>
          <h1 className="v4-font-display v4-text-display v4-text-on-surface mb-6 leading-none uppercase">
            Engineering Scalable <br />Systems at the <span className="v4-text-primary-fixed-dim">Edge.</span>
          </h1>
          <p className="v4-font-body-lg v4-text-body-lg v4-text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            {bio}
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="px-8 py-4 v4-bg-primary-fixed-dim v4-text-on-primary v4-font-code-label v4-text-code-label uppercase tracking-widest font-black transition-all hover:brightness-110 active:scale-95" href="#architecture">
              View Workload
            </a>
            <a className="px-8 py-4 border v4-border-outline-variant v4-text-on-surface v4-font-code-label v4-text-code-label uppercase tracking-widest font-bold hover:v4-bg-surface-container-high transition-all" href="#lab">
              Terminal Lab
            </a>
          </div>
        </div>

        {/* System Overview Visual */}
        <div className="lg:col-span-5 relative">
          <div className="v4-glass-panel p-6 rounded-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 border-b v4-border-outline-variant-30 pb-4">
              <span className="v4-font-code-label v4-text-primary-fixed-dim flex items-center gap-1"><Cpu size={14} /> CORE_SYSTEM_V3.0</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full v4-bg-surface-container-highest" />
                <div className="w-2.5 h-2.5 rounded-full v4-bg-primary-fixed-dim/40" />
              </div>
            </div>
            
            {/* Interactive System Diagram */}
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-full flex justify-between items-center px-4 py-2 border v4-border-primary-fixed-dim-20 v4-bg-primary-fixed-dim-5 rounded text-center">
                  <span className="v4-font-code-label text-[10px] v4-text-primary-fixed-dim uppercase flex items-center gap-1.5"><Terminal size={12} /> Frontend (Next.js)</span>
                </div>
                <div className="w-0.5 h-4 bg-gradient-to-b v4-text-primary-fixed-dim/40 to-transparent" />
                
                <div className="w-full flex justify-between items-center px-4 py-2 border v4-border-outline-variant-30 v4-bg-surface-container-low rounded text-center">
                  <span className="v4-font-code-label text-[10px] v4-text-on-surface-variant uppercase flex items-center gap-1.5"><Network size={12} /> API Gateway</span>
                </div>

                <div className="w-full flex gap-4 justify-center items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-0.5 h-4 v4-border-outline-variant-30" />
                    <div className="px-3 py-2 border v4-border-outline-variant-30 rounded text-center w-full v4-bg-surface-container-high">
                      <span className="v4-font-code-label text-[10px] v4-text-on-surface-variant uppercase flex items-center justify-center gap-1"><Server size={10} /> Queue</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-0.5 h-4 v4-border-outline-variant-30" />
                    <div className="px-3 py-2 border v4-border-outline-variant-30 rounded text-center w-full v4-bg-surface-container-high">
                      <span className="v4-font-code-label text-[10px] v4-text-on-surface-variant uppercase flex items-center justify-center gap-1"><Cpu size={10} /> Worker</span>
                    </div>
                  </div>
                </div>

                <div className="w-0.5 h-4 v4-border-outline-variant-30" />
                <div className="w-full flex justify-between items-center px-4 py-2 border v4-border-outline-variant-30 v4-bg-surface-container-high rounded text-center">
                  <span className="v4-font-code-label text-[10px] v4-text-on-surface-variant uppercase flex items-center gap-1.5"><Database size={12} /> Database (PostgreSQL)</span>
                </div>
              </div>
            </div>

            {/* Data Flow Interaction Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
              <div className="absolute top-1/4 left-0 w-full h-px v4-bg-primary-fixed-dim v4-animate-move-x-3s" />
              <div className="absolute top-1/2 left-0 w-full h-px v4-bg-primary-fixed-dim v4-animate-move-x-5s" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V4Metrics() {
  const stats = [
    { label: 'Uptime SLA', val: '99.99%' },
    { label: 'P99 Latency', val: '<350MS' },
    { label: 'Requests / Day', val: '2.5M+' },
    { label: 'Critical Failures', val: 'ZERO' }
  ];

  return (
    <div className="w-full v4-bg-surface-container-lowest border-b v4-border-outline-variant-20 py-4 overflow-hidden whitespace-nowrap">
      <div className="v4-animate-marquee gap-16 px-6">
        {/* Continuous list of tickers */}
        {[...Array(4)].map((_, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {stats.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 inline-flex">
                <span className="v4-font-code-label v4-text-primary-fixed-dim font-black">{s.val}</span>
                <span className="v4-font-code-label v4-text-on-surface-variant uppercase text-[11px] tracking-wider">{s.label}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function V4Expertise({ skillsByCategory }: { skillsByCategory: Record<string, Skill[]> }) {
  // Setup standard list in case CMS data is empty
  const hasCms = Object.keys(skillsByCategory).length > 0;
  const categories = hasCms
    ? Object.entries(skillsByCategory)
    : ([
        ['frontend', [{ name: 'React' }, { name: 'Next.js' }, { name: 'TypeScript' }, { name: 'Tailwind CSS' }]],
        ['backend', [{ name: 'Spring Boot' }, { name: 'Node.js' }, { name: 'Express' }, { name: 'REST APIs' }]],
        ['systems', [{ name: 'Docker' }, { name: 'AWS Lambda' }, { name: 'Redis' }, { name: 'PostgreSQL' }]]
      ] as [string, any[]][]);

  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto" id="architecture">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="v4-font-display v4-text-headline-lg v4-text-on-surface uppercase mb-2">Core Expertise</h2>
          <p className="v4-font-code-label v4-text-on-surface-variant uppercase tracking-widest text-sm">System capabilities across the full spectrum</p>
        </div>
        <div className="h-px v4-bg-outline-variant-30 flex-grow mx-8 hidden md:block" />
        <div className="v4-font-code-label v4-text-on-surface-variant">L_01 - L_{String(categories.length).padStart(2, '0')}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.slice(0, 3).map(([cat, skills], index) => {
          const catName = (cat || '').toUpperCase();
          const layers = ['LAYER_01', 'LAYER_02', 'LAYER_03'];
          
          return (
            <div key={cat || index} className="v4-glass-panel p-8 v4-hover-accent transition-all group flex flex-col h-full border-t-2 v4-border-outline-variant-30">
              <span className="v4-font-code-label v4-text-primary-fixed-dim text-xs mb-4">{layers[index] || `LAYER_0${index + 1}`}</span>
              <h3 className="v4-font-display v4-text-headline-md v4-text-on-surface mb-4 uppercase">{catName}</h3>
              <p className="v4-font-body-sm v4-text-on-surface-variant mb-8 flex-grow">
                Production-grade implementations deploying modern standards, rigorous testing, and optimized runtime performance.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="v4-font-code-label text-[11px] v4-text-on-surface-variant uppercase">Integration Score</span>
                  <span className="v4-font-code-label v4-text-primary-fixed-dim">{(95 - index * 4)}/100</span>
                </div>
                <div className="w-full h-1 v4-bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full v4-bg-primary-fixed-dim" style={{ width: `${95 - index * 4}%` }} />
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t v4-border-outline-variant-20">
                  {(skills || []).map((s: any) => (
                    <span key={s?.name || ''} className="px-2 py-0.5 v4-bg-surface-container-low border v4-border-outline-variant-30 v4-font-code-label text-[10px] v4-text-on-surface-variant uppercase">
                      {s?.name || ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function V4Experience({ experiences }: { experiences: ExperienceType[] }) {
  const fallback: ExperienceType[] = [
    {
      id: '1', company: 'Oxyzo Financial Services', role: 'Senior Frontend Engineer',
      startDate: '2025-05-01', endDate: null, order: 1,
      description: 'Architected an enterprise-grade Task & Workflow Management System from scratch.',
      techStack: [{ technology: 'Next.js' }, { technology: 'Spring Boot' }, { technology: 'Redis' }],
      createdAt: '', updatedAt: ''
    },
    {
      id: '2', company: 'OfBusiness', role: 'Software Engineer',
      startDate: '2020-12-01', endDate: '2025-04-30', order: 2,
      description: 'Built interactive dashboards handling real-time data streams using React and WebSockets.',
      techStack: [{ technology: 'React' }, { technology: 'Elasticsearch' }, { technology: 'AWS Lambda' }],
      createdAt: '', updatedAt: ''
    }
  ];
  const items = experiences.length > 0 ? experiences : fallback;

  return (
    <section className="py-20 px-6 max-w-[1000px] mx-auto border-t v4-border-outline-variant-20" id="experience">
      <div className="mb-12">
        <h2 className="v4-font-display v4-text-headline-lg v4-text-on-surface uppercase mb-2">Runtime History</h2>
        <p className="v4-font-code-label v4-text-on-surface-variant uppercase tracking-widest text-sm">Execution trace of professional path</p>
      </div>

      <div className="relative pl-8 border-l v4-border-outline-variant-30 space-y-12">
        {items.map((exp, index) => {
          const bullets = extractBullets(exp.description);
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full v4-bg-surface-container-high border-2 v4-border-primary-fixed-dim flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full v4-bg-primary-fixed-dim animate-pulse" />
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <h3 className="v4-font-display v4-text-headline-md text-white font-bold">{exp.role}</h3>
                <span className="v4-font-code-label text-xs v4-text-primary-fixed-dim bg-primary-fixed-dim/10 px-2 py-0.5 rounded">{fmtDate(exp.startDate, exp.endDate)}</span>
              </div>
              <div className="v4-font-code-label text-sm v4-text-primary-fixed-dim uppercase mb-4">{exp.company}</div>
              
              <ul className="space-y-2 list-none pl-0 mb-6">
                {bullets.map((b, i) => (
                  <li key={i} className="v4-font-body-sm v4-text-on-surface-variant flex items-start gap-2">
                    <span className="v4-text-primary-fixed-dim mt-1.5 select-none font-bold">↳</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-dashed v4-border-outline-variant-20">
                {exp.techStack.map((t, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded text-xs border v4-border-outline-variant-30 v4-font-code-label v4-text-on-surface-variant uppercase">
                    {t.technology}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function V4Projects({ projects }: { projects: Project[] }) {
  const fallback: Project[] = [
    {
      id: '1', title: 'ScaleSearch V3', category: 'Systems Architecture', slug: 'scalesearch',
      description: 'Distributed Elasticsearch cluster orchestration for 100M+ documents.',
      techStack: [{ technology: 'Rust' }, { technology: 'Kubernetes' }, { technology: 'Elasticsearch' }],
      coverImage: '', featured: true, order: 1, createdAt: '', updatedAt: '', repoLink: '#', liveLink: '#'
    },
    {
      id: '2', title: 'Aura Design System', category: 'Core Frontend', slug: 'aura',
      description: 'Enterprise-grade design system and frontend boilerplate with zero-runtime CSS.',
      techStack: [{ technology: 'Next.js' }, { technology: 'Tailwind' }, { technology: 'tRPC' }],
      coverImage: '', featured: true, order: 2, createdAt: '', updatedAt: '', repoLink: '#', liveLink: '#'
    }
  ];
  const items = projects.length > 0 ? projects : fallback;

  return (
    <section className="v4-bg-surface-container-low py-20 px-6 border-t v4-border-outline-variant-20" id="lab">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="v4-font-display v4-text-headline-lg v4-text-on-surface uppercase mb-2">System Deployments</h2>
            <p className="v4-font-code-label v4-text-on-surface-variant uppercase tracking-widest text-sm">Compiled index of core software outputs</p>
          </div>
          <span className="v4-font-code-label v4-text-primary-fixed-dim bg-primary-fixed-dim/10 px-3 py-1 text-xs font-bold rounded">SYS_LOG_ACTIVE</span>
        </div>

        <div className="space-y-px bg-[#1f1f1f]/30 border v4-border-outline-variant-20">
          {items.map((p, index) => {
            const desc = extractText(p.description);
            const logId = String(index + 1).padStart(2, '0');
            return (
              <div key={p.id} className="bg-[#131313] p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:v4-bg-surface-container-high transition-colors group">
                <div className="v4-font-code-label v4-text-on-surface-variant opacity-50 shrink-0 text-sm">{logId}_LOG</div>
                <div className="shrink-0 md:w-32">
                  <span className="v4-font-code-label v4-text-primary-fixed-dim v4-bg-primary-fixed-dim-10 px-2.5 py-1 text-xs rounded border border-[#00dce5]/20 uppercase">SUCCESS</span>
                </div>
                <div className="flex-grow">
                  <h4 className="v4-font-display v4-text-headline-md text-white font-bold mb-1">{p.title}</h4>
                  <p className="v4-font-body-sm v4-text-on-surface-variant">{desc}</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <span className="v4-font-code-label v4-text-primary-fixed-dim text-sm uppercase">{p.category}</span>
                  <div className="flex flex-wrap gap-1 md:justify-end">
                    {p.techStack.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="v4-font-code-label text-[10px] v4-text-on-surface-variant uppercase bg-surface/30 px-1">
                        {t.technology} {idx < p.techStack.slice(0, 3).length - 1 ? '//' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center gap-2">
                  {p.repoLink && (
                    <a href={p.repoLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border v4-border-outline-variant v4-text-primary-fixed-dim hover:bg-surface-container transition-all" aria-label="Source code">
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function V4Contact({ profile }: { profile: VariantProps['profile'] }) {
  const [formState, setFormState] = useState({ name: '', description: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.description) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormState({ name: '', description: '' });
      }, 3000);
    }
  };

  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto" id="about">
      <div className="v4-glass-panel p-8 md:p-12 border-[#00dce5]/20 relative overflow-hidden group rounded-lg">
        <div className="absolute -right-20 -top-20 w-80 h-80 v4-bg-primary-fixed-dim-5 rounded-full blur-3xl group-hover:v4-bg-primary-fixed-dim-10 transition-colors" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="v4-font-display v4-text-display v4-text-on-surface mb-6 uppercase">Need a <br />System Upgrade?</h2>
            <p className="v4-font-body-lg v4-text-on-surface-variant mb-8 leading-relaxed">
              Currently accepting select senior-level architecture consultations and high-impact engineering roles. Let&apos;s discuss your technical roadmap.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 v4-text-primary-fixed-dim">
                <Mail size={18} />
                <span className="v4-font-code-label uppercase">{profile?.email || 'arch@rajadubey.dev'}</span>
              </div>
              <div className="flex items-center gap-4 v4-text-on-surface-variant">
                <MapPin size={18} />
                <span className="v4-font-code-label uppercase">{profile?.location || 'Remote // UTC-5'}</span>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-6 md:p-8 rounded-lg border v4-border-outline-variant-30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="v4-font-code-label text-xs v4-text-on-surface-variant uppercase block">Input_Name</label>
                <input
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full bg-[#040404] border v4-border-outline-variant focus:v4-border-primary-fixed-dim focus:ring-0 text-white v4-font-body-sm p-3 transition-colors outline-none"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="v4-font-code-label text-xs v4-text-on-surface-variant uppercase block">Project_Description</label>
                <textarea
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  required
                  className="w-full bg-[#040404] border v4-border-outline-variant focus:v4-border-primary-fixed-dim focus:ring-0 text-white v4-font-body-sm p-3 transition-colors outline-none"
                  rows={4}
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 v4-bg-primary-fixed-dim v4-text-on-primary v4-font-code-label v4-text-code-label uppercase tracking-widest font-black hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {success ? (
                  <>
                    <CheckCircle2 size={16} /> Transmission Complete
                  </>
                ) : 'Execute Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function V4Footer({ profileName }: { profileName: string }) {
  return (
    <footer className="w-full py-8 px-6 border-t v4-border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 v4-bg-surface-container-lowest">
      <div className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant font-bold">
        © {new Date().getFullYear()} {profileName} // CORE_SYSTEM_V3.0
      </div>
      <div className="flex gap-8">
        <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant hover:v4-text-primary-fixed-dim transition-colors opacity-80 hover:opacity-100" href="#">GitHub</a>
        <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant hover:v4-text-primary-fixed-dim transition-colors opacity-80 hover:opacity-100" href="#">LinkedIn</a>
        <a className="v4-font-code-label v4-text-code-label uppercase tracking-widest v4-text-on-surface-variant hover:v4-text-primary-fixed-dim transition-colors opacity-80 hover:opacity-100" href="#">Source</a>
      </div>
    </footer>
  );
}

// ─── Main V4 Component ──────────────────────────────────────────────

export default function V4App({ profile, experiences, projects, skillsByCategory }: VariantProps) {
  const profileName = profile?.name || 'RAJA DUBEY';
  return (
    <div className={`v4-root min-h-screen relative ${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <V4Header profileName={profileName} />
      <main className="pt-16">
        <V4Hero profile={profile} />
        <V4Metrics />
        <V4Expertise skillsByCategory={skillsByCategory} />
        <V4Experience experiences={experiences} />
        <V4Projects projects={projects} />
        <V4Contact profile={profile} />
      </main>
      <V4Footer profileName={profileName} />
    </div>
  );
}
