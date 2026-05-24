'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { VariantProps } from '../types';
import type { Experience as ExperienceType, Project, Skill, Media } from '../../../payload-types';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';

// ─── Font Configuration ────────────────────────────────────────────
const plusJakarta = Plus_Jakarta_Sans({
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// ─── MD3 Color Tokens (from sample-1.html) ─────────────────────────
const colors = {
  surface: '#131313',
  surfaceDim: '#131313',
  surfaceContainerLow: '#1c1b1b',
  surfaceContainer: '#201f1f',
  surfaceContainerHigh: '#2a2a2a',
  surfaceContainerHighest: '#353534',
  surfaceContainerLowest: '#0e0e0e',
  surfaceBright: '#393939',
  surfaceVariant: '#353534',
  primary: '#c9c6c5',
  onPrimary: '#313030',
  primaryContainer: '#0a0a0a',
  onSurface: '#e5e2e1',
  onSurfaceVariant: '#c4c7c7',
  secondary: '#b8c3ff',
  secondaryContainer: '#0043eb',
  tertiary: '#abd600',
  tertiaryContainer: '#070c00',
  onTertiaryContainer: '#688300',
  tertiaryFixed: '#c3f400',
  outline: '#8e9192',
  outlineVariant: '#444748',
};

// ─── Helpers ────────────────────────────────────────────────────────
const extractTextFromRichText = (richText: any): string => {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  if (richText.root?.children) {
    return richText.root.children
      .map((child: any) =>
        child.children
          ? child.children.map((t: any) => t.text || '').join('')
          : child.text || ''
      )
      .join(' ');
  }
  return '';
};

const extractBullets = (richText: any): string[] => {
  if (!richText) return [];
  if (typeof richText === 'string') return [richText];
  if (richText.root?.children) {
    return richText.root.children
      .map((child: any) =>
        child.children
          ? child.children.map((t: any) => t.text || '').join('')
          : child.text || ''
      )
      .filter((t: string) => t.trim().length > 0);
  }
  return [];
};

const formatDate = (startDate: string, endDate?: string | null): string => {
  const fmt = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const start = fmt(startDate);
  const end = endDate ? fmt(endDate) : 'Present';
  return `${start} – ${end}`;
};

const getImageUrl = (coverImage: string | Media): string => {
  if (typeof coverImage === 'string') return coverImage;
  if (coverImage && typeof coverImage === 'object' && 'url' in coverImage)
    return coverImage.url || '/projects/default.png';
  return '/projects/default.png';
};

// ─── Inline Styles (scoped to v1 variant) ───────────────────────────
const variantStyles = `
  .v1-root {
    background-color: ${colors.surface};
    color: ${colors.onSurface};
    -webkit-font-smoothing: antialiased;
  }

  .v1-root ::selection {
    background-color: ${colors.tertiary};
    color: ${colors.tertiaryContainer};
  }

  .v1-bento {
    background-color: ${colors.surfaceContainerLow};
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.5rem;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .v1-bento:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 30px rgba(46, 91, 255, 0.1);
  }

  .v1-chip {
    background-color: rgba(46, 91, 255, 0.1);
    border: 1px solid rgba(46, 91, 255, 0.2);
    color: ${colors.secondary};
  }

  .v1-header {
    background: rgba(19, 19, 19, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 30px rgba(46, 91, 255, 0.15);
    transition: all 0.3s ease-in-out;
  }

  .v1-header:hover {
    transform: translateY(-1px);
  }

  .v1-timeline-line::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  .v1-footer {
    background-color: ${colors.surfaceContainerLowest};
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 767px) {
    .v1-hero-title {
      font-size: 48px !important;
      line-height: 1.1 !important;
      letter-spacing: -0.04em !important;
    }
  }
`;

// ─── Sub-Components ─────────────────────────────────────────────────

function V1Header() {
  return (
    <header className="v1-header fixed top-0 w-full z-50">
      <div
        className="flex justify-between items-center h-16 mx-auto"
        style={{ maxWidth: 1440, paddingLeft: 64, paddingRight: 64 }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: colors.primary,
          }}
        >
          ARCHITECT_OS
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#work"
            style={{
              color: colors.tertiary,
              fontWeight: 700,
              borderBottom: `2px solid ${colors.tertiary}`,
              paddingBottom: 4,
              fontFamily: 'var(--font-body)',
              fontSize: 16,
            }}
          >
            Work
          </Link>
          <Link
            href="#stack"
            className="transition-colors"
            style={{
              color: colors.onSurfaceVariant,
              fontFamily: 'var(--font-body)',
              fontSize: 16,
            }}
          >
            Stack
          </Link>
          <Link
            href="#contact"
            className="transition-colors"
            style={{
              color: colors.onSurfaceVariant,
              fontFamily: 'var(--font-body)',
              fontSize: 16,
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Open terminal"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
            style={{ color: colors.onSurfaceVariant }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </button>
          <Link
            href="#contact"
            className="px-6 py-2 rounded font-bold transition-colors min-h-[44px] flex items-center"
            style={{
              backgroundColor: colors.tertiary,
              color: colors.tertiaryContainer,
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}
          >
            Hire
          </Link>
        </div>
      </div>
    </header>
  );
}

function V1Hero({ profile }: { profile: VariantProps['profile'] }) {
  const name = profile?.name || 'Raja Dubey';
  const title = profile?.title || 'Senior Software Engineer';
  const bio = profile
    ? extractTextFromRichText(profile.bio)
    : 'Specializing in high-performance React architecture and Server-Side Rendering (SSR) optimization. Dedicated to crafting scalable, resilient web applications that prioritize both developer experience and end-user performance. My work bridges the gap between complex system design and intuitive user interfaces.';

  return (
    <section className="col-span-1 md:col-span-12 mb-16">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="v1-hero-title mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 72,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          fontWeight: 800,
          color: colors.primary,
        }}
      >
        {name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          lineHeight: 1.3,
          fontWeight: 600,
          color: colors.secondary,
          marginBottom: 32,
        }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="v1-bento"
        style={{ padding: 32, maxWidth: 768 }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            lineHeight: 1.5,
            letterSpacing: '0.05em',
            fontWeight: 500,
            color: colors.onSurfaceVariant,
            textTransform: 'uppercase' as const,
            marginBottom: 16,
          }}
        >
          Statement of Engineering
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: colors.onSurface,
          }}
        >
          {bio}
        </p>
      </motion.div>
    </section>
  );
}

function V1Experience({ experiences }: { experiences: ExperienceType[] }) {
  const fallback: ExperienceType[] = [
    {
      id: '1', company: 'Oxyzo Financial Services', role: 'Senior Frontend Engineer',
      startDate: '2025-05-01', endDate: null, order: 1,
      description: 'Architected an enterprise-grade Task & Workflow Management System from scratch.',
      techStack: [{ technology: 'Next.js' }, { technology: 'Spring Boot' }, { technology: 'Redis' }],
      createdAt: '', updatedAt: '',
    },
    {
      id: '2', company: 'OfBusiness', role: 'Software Engineer',
      startDate: '2020-12-01', endDate: '2025-04-30', order: 2,
      description: 'Built interactive dashboards handling real-time data streams using React and WebSockets.',
      techStack: [{ technology: 'React' }, { technology: 'Elasticsearch' }, { technology: 'AWS Lambda' }],
      createdAt: '', updatedAt: '',
    },
  ];

  const items = experiences.length > 0 ? experiences : fallback;

  return (
    <section className="col-span-1 md:col-span-8 mb-16" id="work">
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          lineHeight: 1.3,
          fontWeight: 600,
          color: colors.primary,
          marginBottom: 32,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        Experience
      </h3>

      <div className="space-y-12">
        {items.map((exp, index) => {
          const bullets = extractBullets(exp.description);
          const dateStr = formatDate(exp.startDate, exp.endDate);
          const isFirst = index === 0;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 v1-timeline-line"
            >
              {/* Dot */}
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: -4,
                  top: 8,
                  backgroundColor: isFirst ? colors.tertiary : colors.surfaceVariant,
                  border: isFirst ? 'none' : '1px solid rgba(255,255,255,0.2)',
                }}
              />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    lineHeight: 1.3,
                    fontWeight: 600,
                    color: colors.primary,
                  }}
                >
                  {exp.role}
                </h4>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                    color: colors.onSurfaceVariant,
                  }}
                >
                  {dateStr}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: colors.secondary,
                  marginBottom: 16,
                }}
              >
                {exp.company}
              </div>

              <ul
                className="space-y-2 list-disc pl-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: colors.onSurfaceVariant,
                }}
              >
                {bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function V1TechStack({ skillsByCategory }: { skillsByCategory: Record<string, Skill[]> }) {
  // Group fallback skills or use CMS data
  const hasCmsSkills = Object.keys(skillsByCategory).length > 0;

  const categoryMap: Record<string, { label: string; skills: string[] }> = hasCmsSkills
    ? Object.entries(skillsByCategory).reduce(
        (acc, [cat, skills]) => {
          acc[cat] = {
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
            skills: skills.map((s) => s.name),
          };
          return acc;
        },
        {} as Record<string, { label: string; skills: string[] }>
      )
    : {
        architecture: { label: 'Architecture', skills: ['React', 'Next.js', 'SSR', 'Micro-frontends'] },
        languages: { label: 'Languages', skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML/CSS'] },
        tooling: { label: 'Tooling', skills: ['Webpack', 'Vite', 'Jest', 'Git'] },
      };

  return (
    <section className="col-span-1 md:col-span-4 mb-16" id="stack">
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          lineHeight: 1.3,
          fontWeight: 600,
          color: colors.primary,
          marginBottom: 32,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        Core Stack
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="v1-bento flex flex-col gap-6"
        style={{ padding: 24 }}
      >
        {Object.entries(categoryMap).map(([key, { label, skills }]) => (
          <div key={key}>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: '0.05em',
                fontWeight: 500,
                color: colors.onSurfaceVariant,
                textTransform: 'uppercase' as const,
                marginBottom: 12,
              }}
            >
              {label}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="v1-chip px-3 py-1 rounded"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function V1Projects({ projects }: { projects: Project[] }) {
  const fallback: Project[] = [
    {
      id: '1', title: 'Nexus UI Framework', category: 'Component Library', slug: 'nexus-ui',
      description: 'A high-performance, accessible React component library built from the ground up to support micro-frontend architectures.',
      techStack: [{ technology: 'React' }, { technology: 'TypeScript' }],
      coverImage: '/projects/default.png', featured: true, order: 1,
      createdAt: '', updatedAt: '', repoLink: '#', liveLink: '#',
    },
    {
      id: '2', title: 'Omni-Cache Engine', category: 'Performance', slug: 'omni-cache',
      description: 'An advanced client-side caching layer designed to optimize data fetching in SSR applications, significantly reducing network payload.',
      techStack: [{ technology: 'Node.js' }, { technology: 'Redis' }],
      coverImage: '/projects/default.png', featured: true, order: 2,
      createdAt: '', updatedAt: '', repoLink: null, liveLink: '#',
    },
  ];

  const items = projects.length > 0 ? projects : fallback;

  return (
    <section className="col-span-1 md:col-span-12 mb-16">
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          lineHeight: 1.3,
          fontWeight: 600,
          color: colors.primary,
          marginBottom: 32,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        Selected Projects
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((project, index) => {
          const desc = extractTextFromRichText(project.description);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="v1-bento flex flex-col justify-between"
              style={{ padding: 24 }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    lineHeight: 1.3,
                    fontWeight: 600,
                    color: colors.primary,
                    marginBottom: 8,
                  }}
                >
                  {project.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: colors.onSurfaceVariant,
                    marginBottom: 16,
                  }}
                >
                  {desc}
                </p>
              </div>

              {/* Tech chips */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="v1-chip px-2 py-0.5 rounded text-xs"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tech.technology}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div
                className="flex items-center gap-4 pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                      color: colors.secondary,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Documentation
                  </a>
                )}
                {project.repoLink ? (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                      color: colors.onSurfaceVariant,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    Source
                  </a>
                ) : (
                  <span
                    className="flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                      color: colors.onSurfaceVariant,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Private Repo
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function V1Footer({ profile }: { profile: VariantProps['profile'] }) {
  const name = profile?.name || 'Raja Dubey';
  const github = profile?.socialLinks?.find((l) => l.platform === 'github')?.url || 'https://github.com/rajadubey';
  const linkedin = profile?.socialLinks?.find((l) => l.platform === 'linkedin')?.url || 'https://linkedin.com/in/rajababudubey';

  return (
    <footer className="v1-footer w-full py-8 mt-auto">
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-6 mx-auto opacity-80 hover:opacity-100 transition-opacity"
        style={{ maxWidth: 1440, paddingLeft: 64, paddingRight: 64 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            letterSpacing: '0.05em',
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            color: colors.tertiary,
          }}
        >
          © {new Date().getFullYear()} PRECISION ENGINEERED BY ARCHITECT_OS
        </div>
        <nav className="flex items-center gap-6">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              letterSpacing: '0.05em',
              fontWeight: 500,
              color: colors.onSurfaceVariant,
            }}
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              letterSpacing: '0.05em',
              fontWeight: 500,
              color: colors.onSurfaceVariant,
            }}
          >
            LinkedIn
          </a>
          <Link
            href="#work"
            className="transition-colors"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              letterSpacing: '0.05em',
              fontWeight: 500,
              color: colors.onSurfaceVariant,
            }}
          >
            Documentation
          </Link>
        </nav>
      </div>
    </footer>
  );
}

// ─── Main V1 Component ──────────────────────────────────────────────

export default function V1App({
  profile,
  experiences,
  projects,
  skillsByCategory,
}: VariantProps) {
  return (
    <div
      className={`v1-root min-h-screen flex flex-col ${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ paddingTop: 96, paddingBottom: 48 }}
    >
      <style dangerouslySetInnerHTML={{ __html: variantStyles }} />

      <V1Header />

      <main
        className="flex-grow w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 pt-12"
        style={{
          maxWidth: 1440,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {/* Responsive padding override for desktop */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 768px) {
            .v1-root main {
              padding-left: 64px !important;
              padding-right: 64px !important;
            }
          }
        `}} />

        <V1Hero profile={profile} />
        <V1Experience experiences={experiences} />
        <V1TechStack skillsByCategory={skillsByCategory} />
        <V1Projects projects={projects} />
      </main>

      <V1Footer profile={profile} />
    </div>
  );
}
