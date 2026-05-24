'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { VariantProps } from '../types';
import type { Experience as ExperienceType, Project, Skill } from '../../../payload-types';
import { JetBrains_Mono } from 'next/font/google';

// ─── Font ───────────────────────────────────────────────────────────
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-terminal',
  display: 'swap',
});

// ─── Colors ─────────────────────────────────────────────────────────
const c = {
  bg: '#0a0a0a',
  green: '#00ff41',
  greenDim: '#0d4f1c',
  greenMuted: '#1a7a2e',
  amber: '#ffb000',
  red: '#ff5f56',
  yellow: '#ffbd2e',
  greenDot: '#27c93f',
  text: '#b0b0b0',
  textBright: '#e0e0e0',
  comment: '#6a6a6a',
  border: 'rgba(0, 255, 65, 0.15)',
};

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
  return `${f(s)} - ${e ? f(e) : 'Present'}`;
};

const hashId = (i: number) => {
  const hashes = ['a3f7c2e', 'b8d41f0', 'c5e928a', 'd1f063b', 'e7a4b5c', 'f2c891d'];
  return hashes[i % hashes.length];
};

// ─── Scoped Styles ──────────────────────────────────────────────────
const styles = `
  .v2-root {
    background: ${c.bg};
    color: ${c.text};
    font-family: var(--font-terminal), monospace;
    -webkit-font-smoothing: antialiased;
  }
  .v2-root ::selection {
    background: ${c.greenDim};
    color: ${c.green};
  }
  .v2-scanline {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 100;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 65, 0.015) 2px,
      rgba(0, 255, 65, 0.015) 4px
    );
  }
  .v2-prompt::before {
    content: '❯ ';
    color: ${c.green};
  }
  .v2-cursor {
    display: inline-block;
    width: 8px;
    height: 18px;
    background: ${c.green};
    margin-left: 4px;
    animation: v2blink 1s step-end infinite;
    vertical-align: text-bottom;
  }
  @keyframes v2blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .v2-card {
    border: 1px dashed ${c.border};
    border-radius: 4px;
    background: rgba(0, 255, 65, 0.02);
    transition: border-color 0.3s, background 0.3s;
  }
  .v2-card:hover {
    border-color: rgba(0, 255, 65, 0.35);
    background: rgba(0, 255, 65, 0.04);
  }
  .v2-glow { text-shadow: 0 0 10px rgba(0, 255, 65, 0.4); }
`;

// ─── Sub-Components ─────────────────────────────────────────────────

function TermHeader() {
  return (
    <header className="fixed top-0 w-full z-50" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${c.border}` }}>
      <div className="max-w-[800px] mx-auto px-4 h-12 flex items-center justify-between">
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: c.red }} />
            <span className="w-3 h-3 rounded-full" style={{ background: c.yellow }} />
            <span className="w-3 h-3 rounded-full" style={{ background: c.greenDot }} />
          </div>
          <span className="ml-3 text-xs" style={{ color: c.comment }}>raja@portfolio:~$</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {['#work', '#stack', '#projects', '#contact'].map((h) => (
            <Link key={h} href={h} className="text-xs transition-colors min-h-[44px] flex items-center" style={{ color: c.text }}>
              {h}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function TermHero({ profile }: { profile: VariantProps['profile'] }) {
  const name = profile?.name || 'Raja Dubey';
  const title = profile?.title || 'Senior Software Engineer';
  const bio = profile ? extractText(profile.bio) : 'Senior Software Engineer with 5+ years of experience architecting scalable frontend systems and enterprise workflow automation platforms.';

  return (
    <section className="mb-16">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
        <div className="mb-2 text-xs" style={{ color: c.comment }}>// identity.ts</div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 v2-glow" style={{ color: c.green, letterSpacing: '-0.02em' }}>
          {name}
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <h2 className="text-xl md:text-2xl mb-8 font-medium" style={{ color: c.amber }}>{title}</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="v2-card p-6">
        <div className="text-xs mb-3" style={{ color: c.comment }}>$ cat about.md</div>
        <p className="leading-relaxed" style={{ color: c.textBright }}>
          <span style={{ color: c.green }}>{'> '}</span>{bio}
        </p>
      </motion.div>
    </section>
  );
}

function TermExperience({ experiences }: { experiences: ExperienceType[] }) {
  const fallback: ExperienceType[] = [
    { id: '1', company: 'Oxyzo Financial Services', role: 'Senior Frontend Engineer', startDate: '2025-05-01', endDate: null, order: 1, description: 'Architected an enterprise-grade Task & Workflow Management System from scratch.', techStack: [{ technology: 'Next.js' }, { technology: 'Spring Boot' }, { technology: 'Redis' }], createdAt: '', updatedAt: '' },
    { id: '2', company: 'OfBusiness', role: 'Software Engineer', startDate: '2020-12-01', endDate: '2025-04-30', order: 2, description: 'Built interactive dashboards handling real-time data. Optimized web performance scores from 65 to 95+.', techStack: [{ technology: 'React' }, { technology: 'Elasticsearch' }, { technology: 'AWS Lambda' }], createdAt: '', updatedAt: '' },
  ];
  const items = experiences.length > 0 ? experiences : fallback;

  return (
    <section id="work" className="mb-16">
      <div className="text-xs mb-6" style={{ color: c.comment }}>$ git log --oneline --graph</div>

      <div className="space-y-6">
        {items.map((exp, i) => {
          const bullets = extractBullets(exp.description);
          return (
            <motion.div key={exp.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="v2-card p-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: c.amber }}>*</span>
                  <span className="text-xs" style={{ color: c.comment }}>{hashId(i)}</span>
                  <span className="font-bold" style={{ color: c.green }}>{exp.role}</span>
                </div>
                <span className="text-xs" style={{ color: c.comment }}>{fmtDate(exp.startDate, exp.endDate)}</span>
              </div>
              <div className="text-sm mb-3" style={{ color: c.amber }}>{exp.company}</div>
              <div className="space-y-1 mb-4">
                {bullets.map((b, j) => (
                  <div key={j} className="text-sm pl-4" style={{ color: c.textBright }}>
                    <span style={{ color: c.greenMuted }}>│ </span>{b}
                  </div>
                ))}
              </div>
              {exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop: `1px dashed ${c.border}` }}>
                  {exp.techStack.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded" style={{ border: `1px solid ${c.border}`, color: c.green }}>{t.technology}</span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function TermStack({ skillsByCategory }: { skillsByCategory: Record<string, Skill[]> }) {
  const hasCms = Object.keys(skillsByCategory).length > 0;
  const data = hasCms
    ? Object.entries(skillsByCategory).reduce((a, [k, v]) => { a[k] = v.map((s) => s.name); return a; }, {} as Record<string, string[]>)
    : { frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], backend: ['Spring Boot', 'Node.js', 'Express'], database: ['MongoDB', 'Redis', 'Elasticsearch'], devops: ['Docker', 'AWS Lambda', 'Git'] };

  return (
    <section id="stack" className="mb-16">
      <div className="text-xs mb-4" style={{ color: c.comment }}>$ cat skills.json</div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="v2-card p-6">
        <div style={{ color: c.comment }}>{'{'}</div>
        {Object.entries(data).map(([cat, skills], i) => (
          <div key={cat} className="pl-4 my-2">
            <span style={{ color: c.amber }}>&quot;{cat}&quot;</span>
            <span style={{ color: c.text }}>: [</span>
            <div className="pl-4">
              {skills.map((s, j) => (
                <span key={s}>
                  <span style={{ color: c.green }}>&quot;{s}&quot;</span>
                  {j < skills.length - 1 && <span style={{ color: c.text }}>, </span>}
                </span>
              ))}
            </div>
            <span style={{ color: c.text }}>]{i < Object.keys(data).length - 1 ? ',' : ''}</span>
          </div>
        ))}
        <div style={{ color: c.comment }}>{'}'}</div>
      </motion.div>
    </section>
  );
}

function TermProjects({ projects }: { projects: Project[] }) {
  const fallback: Project[] = [
    { id: '1', title: 'ai-code-review-agent', category: 'AI & DevOps', slug: 'ai', description: 'Self-hosted async code review using local LLMs and GitHub API.', techStack: [{ technology: 'Node.js' }, { technology: 'Docker' }, { technology: 'Redis' }], coverImage: '', featured: true, order: 1, createdAt: '', updatedAt: '', repoLink: 'https://github.com/rajadubey', liveLink: null },
    { id: '2', title: 'react-ssr-engine', category: 'Core', slug: 'ssr', description: 'Custom SSR implementation with React Server Components and streaming.', techStack: [{ technology: 'React' }, { technology: 'Webpack' }, { technology: 'Babel' }], coverImage: '', featured: true, order: 2, createdAt: '', updatedAt: '', repoLink: 'https://github.com/rajadubey', liveLink: null },
    { id: '3', title: 'fullstack-note-platform', category: 'Full Stack', slug: 'notes', description: 'Scalable document management with hierarchical notebook structure.', techStack: [{ technology: 'Spring Boot' }, { technology: 'MongoDB' }], coverImage: '', featured: false, order: 3, createdAt: '', updatedAt: '', repoLink: 'https://github.com/rajadubey', liveLink: null },
  ];
  const items = projects.length > 0 ? projects : fallback;

  return (
    <section id="projects" className="mb-16">
      <div className="text-xs mb-4" style={{ color: c.comment }}>$ ls -la ./projects/</div>
      <div className="space-y-3">
        {items.map((p, i) => {
          const desc = extractText(p.description);
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="v2-card p-5">
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                <span className="font-bold" style={{ color: c.green }}>drwxr-xr-x</span>
                <span className="font-bold" style={{ color: c.amber }}>{p.title}</span>
                <span className="text-xs" style={{ color: c.comment }}>// {p.category}</span>
              </div>
              <p className="text-sm mb-3 pl-4" style={{ color: c.textBright }}>{desc}</p>
              <div className="flex flex-wrap gap-2 pl-4 mb-3">
                {p.techStack.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded" style={{ border: `1px solid ${c.border}`, color: c.green }}>{t.technology}</span>
                ))}
              </div>
              {p.repoLink && (
                <a href={p.repoLink} target="_blank" rel="noopener noreferrer" className="text-xs pl-4 transition-colors inline-flex items-center gap-1 min-h-[44px]" style={{ color: c.amber }}>
                  → view source
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function TermFooter({ profile }: { profile: VariantProps['profile'] }) {
  const gh = profile?.socialLinks?.find((l) => l.platform === 'github')?.url || 'https://github.com/rajadubey';
  const li = profile?.socialLinks?.find((l) => l.platform === 'linkedin')?.url || 'https://linkedin.com/in/rajababudubey';

  return (
    <footer className="mt-16 pt-8" style={{ borderTop: `1px dashed ${c.border}` }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6">
          <a href={gh} target="_blank" rel="noopener noreferrer" className="text-xs transition-colors min-h-[44px] flex items-center" style={{ color: c.text }}>github</a>
          <a href={li} target="_blank" rel="noopener noreferrer" className="text-xs transition-colors min-h-[44px] flex items-center" style={{ color: c.text }}>linkedin</a>
          <Link href="#contact" className="text-xs transition-colors min-h-[44px] flex items-center" style={{ color: c.text }}>contact</Link>
        </div>
        <div className="text-xs flex items-center gap-1" style={{ color: c.comment }}>
          Process exited with code <span style={{ color: c.green }}>0</span><span className="v2-cursor" />
        </div>
      </div>
    </footer>
  );
}

// ─── Main V2 Component ──────────────────────────────────────────────
export default function V2App({ profile, experiences, projects, skillsByCategory }: VariantProps) {
  return (
    <div className={`v2-root min-h-screen ${mono.variable}`} style={{ fontFamily: 'var(--font-terminal), monospace' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="v2-scanline" />

      <TermHeader />

      <main className="max-w-[800px] mx-auto px-4 md:px-6 pt-20 pb-12">
        <TermHero profile={profile} />
        <TermExperience experiences={experiences} />
        <TermStack skillsByCategory={skillsByCategory} />
        <TermProjects projects={projects} />
        <TermFooter profile={profile} />
      </main>
    </div>
  );
}
