'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type SVGProps } from 'react';
import {
  ArrowUpRight,
  FileText,
  Mail,
  Menu,
  Moon,
  SunMedium,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { cvData } from './data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-cv-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cv-mono',
  display: 'swap',
});

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'contact', label: 'Contact' },
];

const indicatorSections = [
  'home',
  'about',
  'meeting',
  'work',
  'education',
  'projects',
  'writing',
  'engineering',
  'contact',
];

type Theme = 'dark' | 'light';
type WritingTab = 'overview' | 'detail';

function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('cv-theme') as Theme | null;
    const preferred =
      stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('cv-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 200;

    for (let i = indicatorSections.length - 1; i >= 0; i--) {
      const sectionId = indicatorSections[i];
      if (!sectionId) continue;
      const el = document.getElementById(sectionId);
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return activeSection;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}

function SectionHeading({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-10">
      {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">{eyebrow}</p> : null}
      <h2 className="text-2xl md:text-3xl font-semibold t-primary">{title}</h2>
    </div>
  );
}

function FadeInSection({
  as: Tag = 'section',
  className,
  children,
}: {
  as?: 'section' | 'div';
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const inViewport = el.getBoundingClientRect().top < window.innerHeight;
    if (inViewport) return;

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-40px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement> & React.RefObject<HTMLElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px)',
        transition: visible
          ? 'opacity 0.15s ease, transform 0.15s ease'
          : 'none',
      }}
    >
      {children}
    </Tag>
  );
}

function CommandPalette({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute left-1/2 top-24 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border b-subtle bg-surface p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-2 pb-3">
          <p className="text-sm font-semibold t-primary">Command Palette</p>
          <button type="button" className="text-xs t-muted hover:t-primary" onClick={onClose}>
            Esc
          </button>
        </div>
        <div className="grid gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className="rounded-lg px-3 py-2 text-left text-sm t-secondary hover:bg-white/5 hover:t-primary"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-3 border-t b-subtle pt-3">
          <a
            href={cvData.personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-sm t-secondary hover:bg-white/5 hover:t-primary"
          >
            Open Resume
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionIndicator({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="fixed right-6 top-1/2 hidden -translate-y-1/2 z-40 lg:flex flex-col gap-2">
      {indicatorSections.map((section) => (
        <button
          key={section}
          type="button"
          aria-label={`Scroll to ${section}`}
          onClick={() => onNavigate(section)}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            activeSection === section ? 'bg-emerald-400' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  );
}

function ThemeButton({
  theme,
  toggle,
}: {
  theme: Theme;
  toggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="p-1 text-t-primary transition-colors hover:text-emerald-500"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunMedium className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 text-sm t-muted hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-current/20 hover:decoration-emerald-400/40"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-4.2 1.3-4.2-2-5.8-2.4" />
      <path d="M15 22v-3.2c0-.9.3-1.6.8-2-.1 0-1.9-.2-3.8-1.7-1-1-1.4-2.1-1.4-3.8 0-1.3.4-2.3 1.1-3.2-.2-.6-.5-1.7.1-3.2 0 0 .9-.3 3 1.2a10.6 10.6 0 0 1 5.4 0c2.1-1.5 3-1.2 3-1.2.6 1.5.3 2.6.1 3.2.7.9 1.1 1.9 1.1 3.2 0 1.7-.4 2.8-1.4 3.8-1.9 1.5-3.7 1.7-3.8 1.7.7.5 1 1.3 1 2.2V22" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4V8h4v2" />
      <path d="M2 9h4v11H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function HeroSection() {
  return (
    <FadeInSection as="section" className="pt-16 pb-12 md:pt-24 md:pb-16">
      <div id="home" className="flex items-center gap-4 mb-4">
        <div
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-full p-[3px] bg-gradient-to-tr from-emerald-400/70 via-cyan-400/70 to-blue-400/70 shadow-2xl"
          aria-hidden="true"
        >
          <div className="absolute -inset-3 rounded-full bg-emerald-400/30 blur-2xl opacity-25" />
          <div className="relative grid h-full w-full place-items-center rounded-full bg-[#0f1111] text-[0.9rem] font-bold tracking-[0.08em] text-white">
            RD
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold t-primary tracking-[-0.02em]">
          {cvData.personalInfo.name}
        </h1>
      </div>
      <p className="mb-2 text-xl md:text-2xl t-secondary">{cvData.personalInfo.title}</p>
      <p className="mb-8 max-w-lg text-base md:text-lg t-muted">{cvData.personalInfo.subtitle}</p>
      <a
        href={cvData.personalInfo.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-500 transition-colors hover:text-emerald-300"
      >
        <FileText className="h-4 w-4" />
        View Resume
        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
      </a>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm t-muted">
        <a
          href={`mailto:${cvData.personalInfo.email}`}
          className="underline underline-offset-4 decoration-current/20 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
        >
          {cvData.personalInfo.email}
        </a>
        {cvData.personalInfo.socials.map((social) => (
          <span key={social.label} className="flex items-center gap-x-4">
            <span className="t-faint">·</span>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-current/20 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
            >
              {social.label}
            </a>
          </span>
        ))}
        <span className="flex items-center gap-x-4">
          <span className="t-faint">·</span>
          <a
            href={cvData.personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-current/20 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
          >
            Resume
          </a>
        </span>
      </div>
    </FadeInSection>
  );
}

function AboutSection() {
  return (
    <FadeInSection as="section" className="py-12 border-t b-subtle">
      <div id="about">
        <SectionHeading title={cvData.aboutHeading} />
        <div className="space-y-5 text-base leading-relaxed t-muted">
          {cvData.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function MeetingSection() {
  return (
    <FadeInSection as="section" className="py-12 border-t b-subtle">
      <div id="meeting">
        <h2 className="mb-2 text-xl font-semibold t-primary md:text-2xl">Let&apos;s talk</h2>
        <p className="mb-4 max-w-md text-sm t-muted">
          Book a 30-minute call to discuss full-stack work, platform architecture, or AI-adjacent product engineering.
        </p>
        <a
          href={cvData.personalInfo.calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
        >
          Schedule a call
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </FadeInSection>
  );
}

function WorkSection() {
  const [expanded, setExpanded] = useState(0);
  const reduceMotion = useReducedMotion();

  const toggle = (index: number) => setExpanded((current) => (current === index ? -1 : index));

  return (
    <FadeInSection as="section" className="py-16 border-t b-subtle">
      <div id="work">
        <SectionHeading title="Work" />
        <div className="relative pl-6 border-l b-muted">
          {cvData.experience.map((exp, index) => (
            <div key={`${exp.company}-${exp.period}`} className="relative mb-8 last:mb-0">
              <div
                className={`absolute -left-[calc(1.5rem+4.5px)] top-1.5 h-[9px] w-[9px] rounded-full border-2 transition-colors ${
                  expanded === index ? 'border-emerald-500 bg-emerald-500/20' : 'b-muted bg-transparent'
                }`}
              />
              <button type="button" onClick={() => toggle(index)} className="group w-full text-left">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="font-medium t-primary transition-colors group-hover:text-emerald-400">
                      {exp.company}
                    </span>
                    <span className="mx-2 t-muted">·</span>
                    <span className="text-sm t-secondary">{exp.title}</span>
                  </div>
                  <span className="shrink-0 text-xs t-muted">{exp.period}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-xs t-faint">{exp.location}</span>
                  {exp.type === 'internship' ? (
                    <span className="rounded border b-subtle px-1.5 py-0.5 text-[10px] t-faint">
                      Internship
                    </span>
                  ) : null}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expanded === index ? (
                  <motion.div
                    initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                    }
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 space-y-2">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet} className="border-l b-subtle pl-3 text-sm leading-relaxed t-muted">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function EducationSection() {
  return (
    <FadeInSection as="section" className="py-16 border-t b-subtle">
      <div id="education">
        <SectionHeading title="Education" />
        <div className="space-y-6">
          {cvData.education.map((item) => (
            <article key={item.institution}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-medium t-primary">{item.institution}</h3>
                <span className="text-xs t-muted">{item.period}</span>
              </div>
              <p className="mt-1 text-sm t-secondary">{item.degree}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs t-faint">
                <span>{item.location}</span>
                {item.gpa ? <span>·</span> : null}
                {item.gpa ? <span>CGPA {item.gpa}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<'overview' | 'stack' | 'impact'>('overview');
  const reduceMotion = useReducedMotion();
  const project = cvData.projects[selected] ?? cvData.projects[0]!;

  const tabs: { id: 'overview' | 'stack' | 'impact'; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'stack', label: 'Stack' },
    { id: 'impact', label: 'Impact' },
  ];

  const impactBullets = project.awards?.length ? project.awards : project.bullets.slice(0, 3);

  return (
    <FadeInSection as="section" className="py-16 border-t b-subtle">
      <div id="projects">
        <SectionHeading title="Projects" />

        <div className="hidden gap-8 md:grid grid-cols-[280px_1fr]">
          <div className="space-y-1">
            {cvData.projects.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setSelected(index);
                  setTab('overview');
                }}
                className={`w-full border-l-2 px-3 py-3 text-left transition-colors group ${
                  selected === index
                    ? 'border-emerald-500 bg-white/[0.03]'
                    : 'border-transparent hover:bg-white/[0.02]'
                }`}
              >
                <div className="text-sm font-medium t-secondary transition-colors group-hover:t-primary">
                  {item.name}
                </div>
                <div className="mt-0.5 line-clamp-1 text-xs t-muted">{item.description}</div>
              </button>
            ))}
          </div>

          <div className="sticky top-20 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.name}
                initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
              >
                <h3 className="mb-4 text-xl font-semibold t-primary">{project.name}</h3>

                <div className="mb-6 flex gap-4 border-b b-subtle pb-2">
                  {tabs.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTab(item.id)}
                      className={`pb-1 text-sm transition-colors ${
                        tab === item.id
                          ? 'border-b border-emerald-500 text-emerald-500'
                          : 't-muted hover:t-secondary'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.1 }}
                  >
                    {tab === 'overview' ? (
                      <ul className="space-y-3">
                        {project.bullets.map((bullet) => (
                          <li key={bullet} className="border-l b-subtle pl-3 text-sm leading-relaxed t-muted">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {tab === 'stack' ? (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="rounded border b-muted px-2.5 py-1 text-sm t-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {tab === 'impact' ? (
                      <div className="space-y-2">
                        {impactBullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2 text-sm text-emerald-400/80">
                            <span className="mt-0.5 text-emerald-400">*</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {cvData.projects.map((item, index) => (
            <ProjectAccordion
              key={item.name}
              project={item}
              isOpen={selected === index}
              onToggle={() => {
                setSelected(selected === index ? -1 : index);
                setTab('overview');
              }}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            href={cvData.personalInfo.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="t-muted underline decoration-current/20 underline-offset-4 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
          >
            More on GitHub
          </a>
          <a
            href={cvData.personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="t-muted underline decoration-current/20 underline-offset-4 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
          >
            Resume PDF
          </a>
        </div>
      </div>
    </FadeInSection>
  );
}

function ProjectAccordion({
  project,
  isOpen,
  onToggle,
}: {
  project: (typeof cvData.projects)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-lg border b-subtle md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <div>
          <div className="text-sm font-medium t-secondary">{project.name}</div>
          <div className="mt-0.5 text-xs t-muted">{project.description}</div>
        </div>
        <svg
          className={`h-4 w-4 t-faint transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-4 pb-4">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded border b-subtle px-2 py-0.5 text-xs t-muted">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-2">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed t-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function WritingSection() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();

  const article = cvData.writing[selected] ?? cvData.writing[0]!;

  return (
    <FadeInSection as="section" className="py-16 border-t b-subtle">
      <div id="writing">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mb-6 flex w-full items-center justify-between text-left group"
          aria-expanded={expanded}
        >
          <h2 className="text-2xl md:text-3xl font-semibold t-primary">Writing</h2>
          <svg
            className={`h-5 w-5 t-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {!expanded ? (
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm t-muted">
            {cvData.writing.slice(0, 3).map((item) => (
              <span key={item.title} className="max-w-[250px] truncate">
                {item.title}
              </span>
            ))}
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-emerald-500 transition-colors hover:text-emerald-400"
            >
              +{cvData.writing.length - 3} more
            </button>
          </div>
        ) : null}

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="hidden gap-8 md:grid grid-cols-[280px_1fr]">
                <div className="space-y-1">
                  {cvData.writing.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setSelected(index)}
                      className={`w-full border-l-2 px-3 py-3 text-left transition-colors group ${
                        selected === index
                          ? 'border-emerald-500 bg-[var(--border-subtle)]'
                          : 'border-transparent hover:bg-[var(--border-subtle)]'
                      }`}
                    >
                      <div
                        className={`text-sm font-medium transition-colors ${
                          selected === index ? 't-primary' : 't-secondary'
                        } group-hover:t-primary`}
                      >
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-xs t-faint">{item.summary}</div>
                    </button>
                  ))}
                </div>

                <div className="sticky top-20 self-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={article.title}
                      initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
                    >
                      <h3 className="mb-3 text-xl font-semibold t-primary">{article.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed t-muted">{article.summary}</p>
                      <p className="mb-4 text-sm leading-relaxed t-muted">{article.detail}</p>
                      <a
                        href={cvData.personalInfo.socials[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-emerald-500 transition-colors hover:text-emerald-400"
                      >
                        More on GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4 md:hidden">
                {cvData.writing.map((item) => (
                  <a
                    key={item.title}
                    href={cvData.personalInfo.socials[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b b-subtle py-3 last:border-0 group"
                  >
                    <div className="text-sm font-medium t-secondary transition-colors group-hover:text-emerald-500">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs t-faint">{item.summary}</div>
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={cvData.personalInfo.socials[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm t-muted underline underline-offset-4 transition-colors hover:text-emerald-500"
                >
                  Follow on GitHub
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </FadeInSection>
  );
}

function EngineeringSection() {
  const reduceMotion = useReducedMotion();
  const sections = useMemo(
    () => [
      {
        id: 'skills',
        label: 'Technical Skills',
        kind: 'skills' as const,
      },
      {
        id: 'wins',
        label: 'Selected Wins',
        kind: 'list' as const,
        items: cvData.selectedWins,
      },
      {
        id: 'platform',
        label: 'Platform Work',
        kind: 'list' as const,
        items: cvData.platformWork,
      },
      {
        id: 'contributions',
        label: 'Contributions',
        kind: 'list' as const,
        items: cvData.contributions,
      },
    ],
    []
  );

  const [open, setOpen] = useState<Set<string>>(
    () => new Set(sections.map((section) => section.id))
  );

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <FadeInSection as="section" className="py-16 border-t b-subtle">
      <div id="engineering">
        <SectionHeading title="Engineering" />
        <div className="space-y-1">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => toggle(section.id)}
                className="group flex w-full items-center justify-between py-3 text-left"
                aria-expanded={open.has(section.id)}
              >
                <span
                  className={`text-sm font-medium transition-colors ${
                    open.has(section.id) ? 't-primary' : 't-muted group-hover:t-secondary'
                  }`}
                >
                  {section.label}
                </span>
                <svg
                  className={`h-4 w-4 t-faint transition-transform ${
                    open.has(section.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {open.has(section.id) ? (
                  <motion.div
                    initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-1">
                      {section.kind === 'skills' ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {cvData.skills.map((skill) => (
                            <div key={skill.category}>
                              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider t-muted">
                                {skill.category}
                              </h4>
                              <p className="text-sm leading-relaxed t-muted">{skill.items.join(', ')}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed t-muted">
                              <span className="mt-0.5 t-muted">*</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function ContactSection() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const reduceMotion = useReducedMotion();

  const handleSubmit = () => {
    const subject = `Message from ${name}`;
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:${cvData.personalInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <FadeInSection as="section" className="py-16 border-t b-subtle">
      <div id="contact">
        <h2 className="mb-3 text-2xl font-semibold t-primary md:text-3xl">Get in touch</h2>
        <a
          href={`mailto:${cvData.personalInfo.email}`}
          className="text-lg text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 transition-colors hover:text-emerald-300"
        >
          {cvData.personalInfo.email}
        </a>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm t-muted">
          {cvData.personalInfo.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-current/20 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
            >
              {social.label}
            </a>
          ))}
          <a
            href={cvData.personalInfo.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-current/20 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
          >
            Schedule a call
          </a>
          <a
            href={cvData.personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-current/20 transition-colors hover:text-emerald-400 hover:decoration-emerald-400/40"
          >
            Resume
          </a>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="text-sm t-faint transition-colors hover:t-muted"
          >
            {showForm ? 'Close form' : 'Send a message'}
          </button>

          <AnimatePresence initial={false}>
            {showForm ? (
              <motion.div
                initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 max-w-md space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="rounded-lg border b-muted bg-[var(--border-subtle)] px-3 py-2 text-sm t-primary placeholder:t-faint focus:border-emerald-500/30 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="rounded-lg border b-muted bg-[var(--border-subtle)] px-3 py-2 text-sm t-primary placeholder:t-faint focus:border-emerald-500/30 focus:outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-lg border b-muted bg-[var(--border-subtle)] px-3 py-2 text-sm t-primary placeholder:t-faint focus:border-emerald-500/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!name || !message}
                    className="text-sm text-emerald-400 transition-colors hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Send via email client
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </FadeInSection>
  );
}

function FooterSection() {
  return (
    <footer className="mt-16 border-t b-subtle pt-12 pb-8">
      <div className="mb-10 flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <IconLink href={cvData.personalInfo.socials[0].url} label="GitHub">
              <GitHubIcon className="h-5 w-5" />
            </IconLink>
            <IconLink href={cvData.personalInfo.socials[1].url} label="LinkedIn">
              <LinkedInIcon className="h-5 w-5" />
            </IconLink>
            <IconLink href={`mailto:${cvData.personalInfo.email}`} label="Email">
              <Mail className="h-5 w-5" />
            </IconLink>
          </div>
          <p className="text-xs t-muted">
            &copy; {new Date().getFullYear()} {cvData.personalInfo.name} | All Rights Reserved.
          </p>
        </div>

        <div className="flex gap-16">
          <div className="space-y-3">
            <a
              href={`mailto:${cvData.personalInfo.email}`}
              className="block text-sm t-secondary transition-colors hover:text-emerald-500"
            >
              {cvData.personalInfo.email}
            </a>
            <a
              href={cvData.personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm t-secondary transition-colors hover:text-emerald-500"
            >
              Resume
            </a>
            <a
              href={cvData.personalInfo.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm t-secondary transition-colors hover:text-emerald-500"
            >
              Schedule a Call
            </a>
          </div>
          <div className="space-y-3 border-l b-muted pl-10">
            <a href="#projects" className="block text-sm t-secondary transition-colors hover:text-emerald-500">
              Projects
            </a>
            <a href="#engineering" className="block text-sm t-secondary transition-colors hover:text-emerald-500">
              Engineering
            </a>
            <a href="#writing" className="block text-sm t-secondary transition-colors hover:text-emerald-500">
              Writing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function CvShell() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const activeSection = useActiveSection();

  const handleNavigate = useCallback(
    (id: string) => {
      scrollToSection(id);
      setMobileOpen(false);
    },
    []
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={`${inter.variable} ${mono.variable} bg-surface text-[var(--text-primary)]`}>
      <nav className="fixed left-0 right-0 top-0 z-50 h-14 border-b b-subtle bg-surface/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-full items-center justify-between px-6" style={{ maxWidth: 1120 }}>
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="text-sm font-semibold t-primary transition-colors hover:text-emerald-500"
          >
            {cvData.personalInfo.name}
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`text-sm transition-colors ${
                  activeSection === item.id ? 'text-emerald-500' : 't-secondary hover:t-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
            <ThemeButton theme={theme} toggle={toggle} />
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded border b-muted px-2 py-1 text-xs t-muted transition-colors hover:t-secondary"
            >
              <kbd>⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeButton theme={theme} toggle={toggle} />
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 t-secondary transition-colors hover:t-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-b b-subtle bg-surface px-6 py-4 space-y-3 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left text-sm ${
                  activeSection === item.id ? 'text-emerald-500' : 't-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="block border-t b-subtle pt-2 text-sm t-muted"
            >
              Search <kbd className="text-xs">⌘K</kbd>
            </button>
          </div>
        ) : null}
      </nav>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={handleNavigate} />
      <SectionIndicator activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="mx-auto max-w-[1120px] px-6 pt-14">
        <HeroSection />
        <AboutSection />
        <MeetingSection />
        <WorkSection />
        <EducationSection />
        <ProjectsSection />
        <WritingSection />
        <EngineeringSection />
        <ContactSection />
      </main>

      <div className="mx-auto max-w-[1120px] px-6">
        <FooterSection />
      </div>
    </div>
  );
}
