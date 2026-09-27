export interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  email: string
  phone: string
  location: string
  socials: { label: string; url: string }[]
  resumeUrl: string
  calUrl?: string
}

export interface Education {
  institution: string
  institutionUrl?: string
  degree: string
  location: string
  period: string
  gpa?: string
}

export interface Experience {
  title: string
  company: string
  companyUrl?: string
  location: string
  period: string
  type: 'job' | 'internship'
  bullets: string[]
}

export interface Project {
  name: string
  description: string
  stack: string[]
  bullets: string[]
  awards?: string[]
  github?: string
}

export interface Publication {
  title: string
  authors: { name: string; highlighted?: boolean }[]
  conference: string
  publisher: string
  volume: string
  date: string
  pages: string
  doi: string
  doiUrl: string
  springerUrl: string
  arxivUrl: string
  description: string
}

export interface Achievement {
  text: string
  type: 'gold' | 'silver' | 'bronze' | 'mention'
}

export interface Club {
  name: string
  role: string
  period: string
  description: string
  link?: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface BlogArticle {
  title: string
  description: string
  url: string
  date: string
  readTime: string
  tags: string[]
}

export const personalInfo: PersonalInfo = {
  name: 'Raja Babu Dubey',
  title: 'Full Stack Engineer',
  subtitle:
    'Full stack engineer with 5+ years of experience building fintech and B2B data intelligence systems across backend services, RESTful APIs, distributed data ingestion, search platforms, and high-performance web applications.',
  email: 'rajadubey1997@gmail.com',
  phone: '+91 786-930-3752',
  location: 'Gurgaon, HR',
  socials: [
    { label: 'GitHub', url: 'https://github.com/rajadubey' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rajadubey' },
  ],
  resumeUrl: '/Raja_Babu_Dubey.pdf',
}

export const education: Education[] = [
  {
    institution: 'Government Engineering College',
    degree: 'Bachelor of Engineering in Computer Science',
    location: 'Ujjain, Madhya Pradesh',
    period: '2016 – 2020',
  },
]

export const experience: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Oxyzo Financial Services (OfBusiness Group)',
    companyUrl: 'https://www.oxyzo.in',
    location: 'Gurgaon, HR',
    period: 'May 2025 – Present',
    type: 'job',
    bullets: [
      'Enterprise Workflow Management System – Led full-stack delivery of an organization-wide workflow automation platform for task ownership, priority handling, dependency tracking, and real-time execution visibility.',
      'Designed workflow state models, service boundaries, API contracts, and backend integration patterns to support reliable task lifecycle management across interdependent teams.',
      'Built scalable application foundations, reusable modules and UI components using bit.cloud.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'OfBusiness',
    companyUrl: 'https://www.ofbusiness.com',
    location: 'Gurgaon, HR',
    period: 'Dec 2020 – Apr 2025',
    type: 'job',
    bullets: [
      'Nexizo.ai – Contributed to the bidder profiling and data intelligence platform used by 10K+ customers, helping scale curated tender, company, and bidder datasets to 10M+ profiles.',
      'Designed and optimized search and analytics workflows for high-speed querying, advanced filtering, profile tagging, and review operations across large datasets.',
      'Built distributed data ingestion and web scraping pipelines using AWS Lambda, SQS, and forward proxy rotation, processing 1M+ daily requests from multiple external sources.',
      'Led the development of Nexizo.ai from scratch, integrating Next.js with Strapi CMS (with added capabilities of Node.js plugins) to build a scalable, SEO-friendly marketing website.',
      'BidAssist – Developed a SaaS invoice management platform featuring subscription plans, configurable usage limits, role-based access control, invoice lifecycle management, and reporting.',
      'Increased Lighthouse performance score up to 95+ by optimizing rendering and asset delivery with SSR, code splitting, CDN caching, bundle optimization, and Node.js clustering.',
      'Reduced page response latency in a Node.js SSR application through parallel API requests, static API caching, and server-to-server (S2S) communication, avoiding client-side DNS resolution.',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'Module Development Kit',
    description:
      'Modular development platform for AI agents to discover, compose, and orchestrate reusable UI components and workflows.',
    stack: ['pnpm workspace', 'Storybook', 'Node.js', 'Verdaccio', 'TypeScript', 'LLMs'],
    bullets: [
      'Architected a modular development platform where AI agents can discover, compose, and orchestrate reusable UI components, modules, and workflows to generate production-ready applications.',
      'Designed a metadata-driven component registry exposing schemas, capabilities, dependencies, and configuration contracts, enabling LLMs to reason about modules instead of generating UI from scratch.',
      'Built the platform foundation with versioned packages, Storybook documentation, private registry integration, and standardized module APIs to support scalable AI-assisted application development.',
      'Defining a roadmap toward an AI-native app builder that transforms natural language prompts into full-stack applications by composing existing modules, generating business logic, connecting APIs, and producing deployable projects.',
    ],
  },
  {
    name: 'Loki (Nginx Reverse proxy)',
    description:
      'Internal connectivity solution to bridge local development environments with remote stage/devbox machines using Nginx reverse proxying.',
    stack: ['Networking', 'Nginx', 'Reverse Proxy', 'Port Mapping', 'DevOps'],
    github: 'https://github.com/rajadubey',
    bullets: [
      'Built an internal connectivity solution to bridge local development environments with remote stage/devbox machines using Nginx reverse proxying.',
      'Implemented configurable port mapping and request routing to replace manual tunnel setup, enabling seamless local-to-stage communication for development and debugging.',
    ],
  },
]

export const skillCategories: Skill[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Worker Queues', 'Spring Boot'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Redux Toolkit', 'Zustand', 'TanStack Query'],
  },
  {
    category: 'Data & Infra',
    items: ['MongoDB', 'MySQL', 'Redis', 'AWS Lambda', 'SQS', 'Docker', 'Webpack', 'RsPack'],
  },
]

export const skills: Skill[] = skillCategories

export const publications: Publication[] = []
export const achievements: Achievement[] = []
export const clubs: Club[] = []
export const blogArticles: BlogArticle[] = []
