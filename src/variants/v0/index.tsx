import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { HeroErrorBoundary, ErrorBoundary, ExperienceErrorBoundary, ProjectsErrorBoundary, ContactErrorBoundary } from "@/components/ErrorBoundary";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ResumePreview } from "@/components/ResumePreview";
import Link from 'next/link';
import type { VariantProps } from '../types';


export default function App({
  profile,
  experiences,
  projects,
  skillsByCategory,
}: VariantProps) {

  // Create JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile?.name || 'Raja Dubey',
    jobTitle: profile?.title || 'Senior Software Engineer - UI',
    url: 'https://rajadubey.in',
    email: profile?.email || 'rajadubey1997@gmail.com',
    telephone: profile?.phone || '+91-786-930-3752',
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile?.location || 'Gurgaon, India',
    },
    sameAs: profile?.socialLinks?.map((link: any) => link.url) || [
      'https://linkedin.com/in/rajababudubey',
      'https://github.com/rajadubey',
      'https://x.com/rajadubey0'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Oxyzo Financial Services',
    },
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-500 selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Noscript fallback content */}
      <noscript>
        <style>{`
          .noscript-content {
            display: block !important;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .noscript-content h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #ef4444;
          }
          .noscript-content h2 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem 0;
            color: #f3f4f6;
          }
          .noscript-content p, .noscript-content li {
            margin-bottom: 0.5rem;
            color: #d1d5db;
          }
          .noscript-content a {
            color: #60a5fa;
            text-decoration: underline;
          }
          .noscript-content ul {
            margin-left: 1.5rem;
          }
        `}</style>
        <div className="noscript-content" style={{ display: 'none' }}>
          <h1>Raja Dubey - Senior Software Engineer</h1>
          <p>
            Senior Software Engineer with 5+ years of experience architecting scalable frontend systems
            and enterprise workflow automation platforms. Currently at Oxyzo Financial Services.
          </p>

          <h2>Experience</h2>
          <ul>
            <li><strong>Oxyzo Financial Services</strong> - Senior Software Engineer - UI (May 2025 - Present)</li>
            <li><strong>OfBusiness</strong> - Senior Software Engineer - UI (Dec 2020 - Apr 2025)</li>
          </ul>

          <h2>Featured Projects</h2>
          <ul>
            <li><strong>AI-Powered Code Review Agent</strong> - Self-hosted code review system using LLMs</li>
            <li><strong>Custom React SSR Engine</strong> - High-performance server-side rendering solution</li>
            <li><strong>Full-Stack Note Platform</strong> - Complete note-taking application</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Email: rajadubey1997@gmail.com<br />
            Phone: +91-786-930-3752<br />
            Location: Gurgaon, India
          </p>

          <h2>Links</h2>
          <ul>
            <li><a href="https://linkedin.com/in/rajababudubey" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/rajadubey" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://x.com/rajadubey0" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
          </ul>
        </div>
      </noscript>

      {/* Skip to content link for accessibility */}
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md font-bold z-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Skip to main content
      </Link>

      <header>
        <Navbar />
      </header>

      <main id="main-content">
        <section aria-labelledby="hero-heading">
          <HeroErrorBoundary>
            <Hero profile={profile} />
          </HeroErrorBoundary>
        </section>

        <section aria-labelledby="skills-heading">
          <ErrorBoundary section="Skills Section">
            <Expertise skillsByCategory={skillsByCategory} />
          </ErrorBoundary>
        </section>

        <section aria-labelledby="resume-heading">
          <ErrorBoundary section="Resume Section">
            <ResumePreview />
          </ErrorBoundary>
        </section>

        <section aria-labelledby="experience-heading">
          <ExperienceErrorBoundary>
            <Experience experiences={experiences} />
          </ExperienceErrorBoundary>
        </section>

        <section aria-labelledby="projects-heading">
          <ProjectsErrorBoundary>
            <Projects projects={projects} />
          </ProjectsErrorBoundary>
        </section>

        <section aria-labelledby="education-heading">
          <ErrorBoundary section="Education Section">
            <Education />
          </ErrorBoundary>
        </section>

        <section aria-labelledby="contact-heading">
          <ContactErrorBoundary>
            <Contact />
          </ContactErrorBoundary>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
