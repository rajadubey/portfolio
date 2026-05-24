'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { VariantProps } from '../types';
import type { Experience as ExperienceType, Project, Skill } from '../../../payload-types';
import { Outfit, Inter } from 'next/font/google';

// ─── Fonts ──────────────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// ─── Helpers ────────────────────────────────────────────────────────
const extractText = (rt: any): string => {
  if (!rt) return '';
  if (typeof rt === 'string') return rt;
  if (rt.root?.children) return rt.root.children.map((ch: any) => ch.children ? ch.children.map((t: any) => t.text || '').join('') : ch.text || '').join(' ');
  return '';
};

const extractBullets = (rt: any): string[] => {
  if (!rt) return [];
  if (typeof rt === 'string') return [rt];
  if (rt.root?.children) return rt.root.children.map((ch: any) => ch.children ? ch.children.map((t: any) => t.text || '').join('') : ch.text || '').filter((s: string) => s.trim());
  return [];
};

const fmtDate = (s: string, e?: string | null) => {
  const f = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${f(s)} — ${e ? f(e) : 'Present'}`;
};

// ─── Scoped Styles ──────────────────────────────────────────────────
const styles = `
  .v3-root {
    background: #0a0118;
    color: #f8fafc;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  .v3-root ::selection {
    background: #7c3aed;
    color: #06b6d4;
  }

  .v3-glass {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .v3-glass:hover {
    transform: translateY(-2px) scale(1.01);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 40px rgba(124, 58, 237, 0.15), 0 0 60px rgba(6, 182, 212, 0.08);
  }

  .v3-nav {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
  }

  .v3-gradient-text {
    background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .v3-gradient-border {
    height: 3px;
    border-radius: 9999px;
    background: linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899);
  }

  .v3-chip {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    transition: all 0.2s ease;
  }
  .v3-chip:hover {
    background: rgba(124, 58, 237, 0.15);
    border-color: rgba(124, 58, 237, 0.4);
  }

  @keyframes v3float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(80px, -40px) scale(1.1); }
    50% { transform: translate(-30px, 60px) scale(0.95); }
    75% { transform: translate(50px, 30px) scale(1.05); }
  }
  @keyframes v3float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(-60px, 50px) scale(1.08); }
    50% { transform: translate(40px, -30px) scale(0.92); }
    75% { transform: translate(-20px, -60px) scale(1.03); }
  }
  @keyframes v3float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(70px, 40px) scale(1.05); }
    66% { transform: translate(-50px, -50px) scale(0.97); }
  }

  .v3-blob-1 {
    animation: v3float1 18s ease-in-out infinite alternate;
  }
  .v3-blob-2 {
    animation: v3float2 22s ease-in-out infinite alternate;
  }
  .v3-blob-3 {
    animation: v3float3 15s ease-in-out infinite alternate;
  }

  .v3-section-label {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// ─── Sub-Components ─────────────────────────────────────────────────

function AuroraBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ overflow: 'hidden' }}>
      <div className="v3-blob-1 absolute" style={{ top: '10%', left: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="v3-blob-2 absolute" style={{ top: '50%', right: '10%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="v3-blob-3 absolute" style={{ bottom: '10%', left: '40%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
    </div>
  );
}

function GlassNav() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[900px]">
      <div className="v3-nav px-4 md:px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="v3-gradient-text">RD</span>
        </span>

        <nav className="hidden md:flex items-center gap-6">
          {([['About', '#home'], ['Experience', '#experience'], ['Projects', '#projects'], ['Contact', '#contact']] as const).map(([label, href]) => (
            <Link key={href} href={href} className="text-sm transition-colors min-h-[44px] flex items-center" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'var(--font-body)' }}>
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all min-h-[44px] flex items-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontFamily: 'var(--font-body)' }}
        >
          Let&apos;s Talk
        </Link>
      </div>
    </header>
  );
}

function AuroraHero({ profile }: { profile: VariantProps['profile'] }) {
  const name = profile?.name || 'Raja Dubey';
  const title = profile?.title || 'Senior Software Engineer';
  const bio = profile ? extractText(profile.bio) : 'Senior Software Engineer with 5+ years of experience architecting scalable frontend systems and enterprise workflow automation platforms.';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', fontFamily: 'var(--font-body)' }}>
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-5xl md:text-8xl font-extrabold mb-6 v3-gradient-text leading-tight"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
        >
          {name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl mb-8 font-semibold"
          style={{ color: 'rgba(248,250,252,0.5)', fontFamily: 'var(--font-display)' }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(248,250,252,0.45)', fontFamily: 'var(--font-body)' }}
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#contact" className="px-8 py-4 rounded-full font-bold transition-all hover:scale-105 min-h-[44px] flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontFamily: 'var(--font-body)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Get in Touch
          </Link>
          <a href={profile?.socialLinks?.find((l) => l.platform === 'github')?.url || 'https://github.com/rajadubey'} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full font-bold transition-all min-h-[44px] flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', fontFamily: 'var(--font-body)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function AuroraExperience({ experiences }: { experiences: ExperienceType[] }) {
  const fallback: ExperienceType[] = [
    { id: '1', company: 'Oxyzo Financial Services', role: 'Senior Frontend Engineer', startDate: '2025-05-01', endDate: null, order: 1, description: 'Architected an enterprise-grade Task & Workflow Management System from scratch, automating operations for organization-wide use.', techStack: [{ technology: 'Next.js' }, { technology: 'Spring Boot' }, { technology: 'Redis' }, { technology: 'MongoDB' }], createdAt: '', updatedAt: '' },
    { id: '2', company: 'OfBusiness', role: 'Software Engineer', startDate: '2020-12-01', endDate: '2025-04-30', order: 2, description: 'Scaled Nexizo.ai and BidAssist platforms. Optimized web performance scores from 65 to 95+ via SSR and clustering.', techStack: [{ technology: 'React' }, { technology: 'Elasticsearch' }, { technology: 'AWS Lambda' }, { technology: 'Node.js' }], createdAt: '', updatedAt: '' },
  ];
  const items = experiences.length > 0 ? experiences : fallback;

  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 v3-gradient-text" style={{ fontFamily: 'var(--font-display)' }}>Experience</h2>
          <p className="text-lg" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'var(--font-body)' }}>My professional journey so far.</p>
        </motion.div>

        {/* Timeline dots */}
        <div className="hidden md:flex items-center justify-center gap-0 mb-12">
          {items.map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-full" style={{ background: i === 0 ? '#7c3aed' : 'rgba(255,255,255,0.2)', boxShadow: i === 0 ? '0 0 12px rgba(124,58,237,0.5)' : 'none' }} />
              {i < items.length - 1 && <div className="w-24 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((exp, i) => {
            const bullets = extractBullets(exp.description);
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="v3-glass p-8">
                <div className="v3-gradient-border mb-6" />
                <span className="text-xs font-medium mb-2 block" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'var(--font-body)' }}>{fmtDate(exp.startDate, exp.endDate)}</span>
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#f8fafc' }}>{exp.role}</h3>
                <div className="text-sm font-medium mb-5 v3-section-label" style={{ fontFamily: 'var(--font-body)' }}>{exp.company}</div>
                <ul className="space-y-2 mb-6">
                  {bullets.map((b, j) => (
                    <li key={j} className="text-sm flex items-start gap-2" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'var(--font-body)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#06b6d4' }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {exp.techStack.map((t, j) => (
                    <span key={j} className="v3-chip px-3 py-1 text-xs font-medium" style={{ fontFamily: 'var(--font-body)' }}>{t.technology}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AuroraStack({ skillsByCategory }: { skillsByCategory: Record<string, Skill[]> }) {
  const hasCms = Object.keys(skillsByCategory).length > 0;
  const data = hasCms
    ? Object.entries(skillsByCategory).reduce((a, [k, v]) => { a[k] = v.map((s) => s.name); return a; }, {} as Record<string, string[]>)
    : { frontend: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'Framer Motion'], backend: ['Spring Boot', 'Node.js', 'Express', 'Java'], database: ['MongoDB', 'Redis', 'Elasticsearch', 'MySQL'], devops: ['Docker', 'AWS Lambda', 'SQS', 'Git', 'Webpack'] };

  const gradients = [
    'linear-gradient(135deg, #7c3aed, #6366f1)',
    'linear-gradient(135deg, #06b6d4, #3b82f6)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #f59e0b, #f97316)',
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 v3-gradient-text" style={{ fontFamily: 'var(--font-display)' }}>Tech Stack</h2>
          <p className="text-lg" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'var(--font-body)' }}>Technologies I work with daily.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(data).map(([cat, skills], i) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="v3-glass p-6">
              <div className="h-1 w-16 rounded-full mb-4" style={{ background: gradients[i % gradients.length] }} />
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 v3-section-label" style={{ fontFamily: 'var(--font-body)' }}>{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="v3-chip px-4 py-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuroraProjects({ projects }: { projects: Project[] }) {
  const fallback: Project[] = [
    { id: '1', title: 'AI-Powered Code Review Agent', category: 'AI & DevOps', slug: 'ai', description: 'A self-hosted, asynchronous code review system that leverages local LLMs to analyze GitHub Pull Requests with automated inline feedback.', techStack: [{ technology: 'Node.js' }, { technology: 'Docker' }, { technology: 'Redis' }, { technology: 'Ollama' }], coverImage: '', featured: true, order: 1, createdAt: '', updatedAt: '', repoLink: 'https://github.com/rajadubey', liveLink: null },
    { id: '2', title: 'Custom React SSR Engine', category: 'Core Architecture', slug: 'ssr', description: 'An advanced Server-Side Rendering implementation built from scratch with React Server Components, page streaming, and SEO optimization.', techStack: [{ technology: 'React' }, { technology: 'Webpack' }, { technology: 'Babel' }, { technology: 'Express' }], coverImage: '', featured: true, order: 2, createdAt: '', updatedAt: '', repoLink: 'https://github.com/rajadubey', liveLink: null },
    { id: '3', title: 'Full-Stack Note Platform', category: 'Full Stack', slug: 'notes', description: 'A scalable document management application with hierarchical notebook structure using MongoDB and Spring Boot.', techStack: [{ technology: 'Java' }, { technology: 'Spring Boot' }, { technology: 'MongoDB' }], coverImage: '', featured: false, order: 3, createdAt: '', updatedAt: '', repoLink: 'https://github.com/rajadubey', liveLink: null },
  ];
  const items = projects.length > 0 ? projects : fallback;

  const cardGradients = [
    'linear-gradient(90deg, #7c3aed, #06b6d4)',
    'linear-gradient(90deg, #06b6d4, #ec4899)',
    'linear-gradient(90deg, #ec4899, #f59e0b)',
  ];

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 v3-gradient-text" style={{ fontFamily: 'var(--font-display)' }}>Projects</h2>
          <p className="text-lg" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'var(--font-body)' }}>Featured work from my portfolio.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((p, i) => {
            const desc = extractText(p.description);
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className={`v3-glass p-8 flex flex-col justify-between ${i === 0 ? 'md:col-span-2' : ''}`}>
                <div className="h-1 rounded-full mb-6" style={{ background: cardGradients[i % cardGradients.length] }} />
                <div>
                  <span className="text-xs font-medium uppercase tracking-widest mb-2 block" style={{ color: 'rgba(248,250,252,0.35)', fontFamily: 'var(--font-body)' }}>{p.category}</span>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#f8fafc' }}>{p.title}</h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(248,250,252,0.55)', fontFamily: 'var(--font-body)' }}>{desc}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.techStack.map((t, j) => (
                      <span key={j} className="v3-chip px-3 py-1 text-xs font-medium" style={{ fontFamily: 'var(--font-body)' }}>{t.technology}</span>
                    ))}
                  </div>
                  {p.repoLink && (
                    <a href={p.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium transition-colors min-h-[44px]" style={{ color: '#06b6d4', fontFamily: 'var(--font-body)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      View Project →
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AuroraFooter({ profile }: { profile: VariantProps['profile'] }) {
  const name = profile?.name || 'Raja Dubey';
  const gh = profile?.socialLinks?.find((l) => l.platform === 'github')?.url || 'https://github.com/rajadubey';
  const li = profile?.socialLinks?.find((l) => l.platform === 'linkedin')?.url || 'https://linkedin.com/in/rajababudubey';

  return (
    <footer id="contact" className="py-16 relative z-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="v3-gradient-border mb-12 mx-auto" style={{ maxWidth: 200 }} />
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#f8fafc' }}>{name}</h2>

        <div className="flex justify-center gap-6 mb-8">
          {[
            { href: gh, label: 'GitHub', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
            { href: li, label: 'LinkedIn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
          ].map(({ href, label, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full flex items-center justify-center transition-all min-h-[44px] min-w-[44px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(248,250,252,0.5)' }}>
              {icon}
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'rgba(248,250,252,0.25)', fontFamily: 'var(--font-body)' }}>
          © {new Date().getFullYear()} {name}. Crafted with precision.
        </p>
      </div>
    </footer>
  );
}

// ─── Main V3 Component ──────────────────────────────────────────────
export default function V3App({ profile, experiences, projects, skillsByCategory }: VariantProps) {
  return (
    <div className={`v3-root min-h-screen relative ${outfit.variable} ${inter.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <AuroraBlobs />
      <GlassNav />

      <main>
        <AuroraHero profile={profile} />
        <AuroraExperience experiences={experiences} />
        <AuroraStack skillsByCategory={skillsByCategory} />
        <AuroraProjects projects={projects} />
      </main>

      <AuroraFooter profile={profile} />
    </div>
  );
}
