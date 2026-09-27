export type SocialLink = {
  label: string;
  url: string;
};

export type EducationItem = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa?: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  type: "job" | "internship";
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  description: string;
  stack: string[];
  bullets: string[];
  awards?: string[];
  github?: string;
};

export type WritingItem = {
  title: string;
  summary: string;
  detail: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const cvData: {
  personalInfo: {
    name: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    socials: [SocialLink, SocialLink];
    resumeUrl: string;
    calUrl: string;
  };
  aboutHeading: string;
  aboutParagraphs: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  writing: WritingItem[];
  skills: SkillGroup[];
  selectedWins: string[];
  platformWork: string[];
  contributions: string[];
} = {
  personalInfo: {
    name: "Raja Babu Dubey",
    title: "Full Stack Engineer",
    subtitle:
      "Full stack engineer with 5+ years of experience building fintech and B2B data intelligence systems across backend services, REST APIs, distributed data ingestion, search platforms, and high-performance web applications.",
    email: "rajadubey1997@gmail.com",
    phone: "+91-786-930-3752",
    location: "Gurgaon, India",
    socials: [
      { label: "GitHub", url: "https://github.com/rajadubey" },
      { label: "LinkedIn", url: "https://linkedin.com/in/rajadubey" },
    ],
    resumeUrl: "/Raja_Dubey_Resume_21072026.pdf",
    calUrl: "mailto:rajadubey1997@gmail.com?subject=Schedule%20a%20call",
  },
  aboutHeading: "Building Systems that Matter",
  aboutParagraphs: [
    "I build products that sit between hard infrastructure and usable interfaces: workflow systems, search-heavy products, and applications that have to stay fast under load.",
    "Most of my recent work has focused on scaling internal operations, shaping service boundaries, improving delivery speed, and keeping frontend architecture maintainable while requirements get more complex.",
    "The through line is practical engineering: the least amount of abstraction that still holds up in production, with enough structure that the next team can move quickly.",
    "I like building systems where backend reliability, data movement, and UI clarity all have to land together.",
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Oxyzo Financial Services (OfBusiness Group)",
      location: "Gurgaon, HR",
      period: "May 2025 - Present",
      type: "job",
      bullets: [
        "Enterprise Workflow Management System - Led full-stack delivery of an organization-wide workflow automation platform for task ownership, priority handling, dependency tracking, and real-time execution visibility.",
        "Designed workflow state models, service boundaries, API contracts, and backend integration patterns to support reliable task lifecycle management across interdependent teams.",
        "Built scalable application foundations, reusable modules, and UI components using bit.cloud.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "OfBusiness",
      location: "Gurgaon, HR",
      period: "Dec 2020 - Apr 2025",
      type: "job",
      bullets: [
        "Nexizo.ai - Contributed to the bidder profiling and data intelligence platform used by 10K+ customers, helping scale curated tender, company, and bidder datasets to 10M+ profiles.",
        "Designed and optimized search and analytics workflows for high-speed querying, advanced filtering, profile tagging, and review operations across large datasets.",
        "Built distributed data ingestion and web scraping pipelines using AWS Lambda, SQS, and forward proxy rotation, processing 1M+ daily requests from multiple external sources.",
        "Led the development of Nexizo.ai from scratch, integrating Next.js with Strapi CMS to build a scalable, SEO-friendly marketing website.",
        "BidAssist - Developed a SaaS invoice management platform featuring subscription plans, configurable usage limits, role-based access control, invoice lifecycle management, and reporting.",
        "Increased Lighthouse performance score up to 95+ by optimizing rendering and asset delivery with SSR, code splitting, CDN caching, bundle optimization, and Node.js clustering.",
        "Reduced page response latency in a Node.js SSR application through parallel API requests, static API caching, and server-to-server communication, avoiding client-side DNS resolution.",
      ],
    },
  ],
  education: [
    {
      institution: "Government Engineering College",
      degree: "Bachelor of Engineering in Computer Science",
      location: "Ujjain, Madhya Pradesh",
      period: "2016 - 2020",
    },
  ],
  projects: [
    {
      name: "Module Development Kit",
      description:
        "pnpm workspace, Storybook, Node.js, Verdaccio",
      stack: ["pnpm workspace", "Storybook", "Node.js", "Verdaccio"],
      bullets: [
        "Architected a modular development platform where AI agents can discover, compose, and orchestrate reusable UI components, modules, and workflows to generate production-ready applications.",
        "Designed a metadata-driven component registry exposing schemas, capabilities, dependencies, and configuration contracts, enabling LLMs to reason about modules instead of generating UI from scratch.",
        "Built the platform foundation with versioned packages, Storybook documentation, private registry integration, and standardized module APIs to support scalable AI-assisted application development.",
        "Defined a roadmap toward an AI-native app builder that transforms natural language prompts into full-stack applications by composing existing modules, generating business logic, connecting APIs, and producing deployable projects.",
      ],
      github: "https://github.com/rajadubey",
    },
    {
      name: "Nexizo.ai",
      description:
        "Next.js, Strapi CMS, search workflows",
      stack: ["Next.js", "Strapi CMS", "Search", "Analytics"],
      bullets: [
        "Contributed to a bidder profiling and data intelligence platform used by 10K+ customers, helping scale curated tender, company, and bidder datasets to 10M+ profiles.",
        "Designed search and analytics workflows for high-speed querying, advanced filtering, profile tagging, and review operations across large datasets.",
      ],
      github: "https://github.com/rajadubey",
    },
    {
      name: "BidAssist",
      description:
        "Node.js, SSR, caching, reporting",
      stack: ["Node.js", "SSR", "Caching", "Reporting"],
      bullets: [
        "Built an invoice management platform with subscription plans, configurable usage limits, role-based access control, and reporting.",
        "Improved latency and response delivery with parallel API requests, static API caching, and server-to-server communication patterns.",
      ],
      github: "https://github.com/rajadubey",
    },
    {
      name: "Loki",
      description:
        "Nginx reverse proxy, networking",
      stack: ["Nginx", "Networking", "Reverse Proxy"],
      bullets: [
        "Built an internal connectivity solution to bridge local development environments with remote stage/devbox machines using Nginx reverse proxying.",
        "Implemented configurable port mapping and request routing to replace manual tunnel setup, enabling seamless local-to-stage communication for development and debugging.",
      ],
      github: "https://github.com/rajadubey",
    },
  ],
  writing: [
    {
      title: "Workflow Design",
      summary: "Task lifecycles, dependency tracking, and service boundaries for enterprise automation.",
      detail:
        "Designing workflow state models, event boundaries, and execution visibility for internal operations software that has to stay understandable as it grows.",
    },
    {
      title: "Search Systems",
      summary: "High-speed query flows, advanced filtering, and review operations at large dataset scale.",
      detail:
        "Building search and analytics surfaces that stay fast while handling large datasets, many filters, and noisy source material.",
    },
    {
      title: "Performance Work",
      summary: "SSR, parallel API requests, caching, and bundle tuning to keep applications responsive.",
      detail:
        "Optimizing response paths end to end: server render time, data fetch parallelism, CDN caching, and bundle size discipline.",
    },
    {
      title: "Platform APIs",
      summary: "Reusable module APIs and developer tooling for AI-assisted application development.",
      detail:
        "Creating module contracts and documentation so AI systems and developers can compose features without rewriting the same plumbing.",
    },
    {
      title: "Data Ingestion",
      summary: "Distributed crawling, queue processing, and forward proxy rotation at scale.",
      detail:
        "Keeping ingestion resilient when sources fail, requests spike, or routing rules change during execution.",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "SQL", "HTML", "CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "Microservices", "Worker Queues", "Spring Boot"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Redux Toolkit", "Zustand", "TanStack Query"],
    },
    {
      category: "Data/Infra",
      items: ["MongoDB", "MySQL", "Redis", "AWS Lambda", "SQS", "Docker", "Webpack", "Rspack"],
    },
  ],
  selectedWins: [
    "Led full-stack delivery of an organization-wide workflow automation platform for task ownership, priority handling, dependency tracking, and real-time execution visibility.",
    "Built distributed data ingestion and web scraping pipelines using AWS Lambda, SQS, and forward proxy rotation, processing 1M+ daily requests from multiple external sources.",
    "Improved Lighthouse performance score up to 95+ by optimizing rendering, code splitting, CDN caching, bundle optimization, and Node.js clustering.",
  ],
  platformWork: [
    "Next.js and Strapi CMS marketing experiences for Nexizo.ai with SEO-friendly architecture.",
    "SaaS invoice management with configurable usage limits, role-based access control, and reporting.",
    "Versioned packages, Storybook documentation, private registry integration, and standardized module APIs for AI-assisted development.",
  ],
  contributions: [
    "Collaborated across backend, frontend, and data teams to keep service boundaries and APIs practical under changing requirements.",
    "Focused on clean design and measurable impact while keeping production systems maintainable.",
    "Built reusable modules and UI components that reduced repetitive work across internal projects.",
  ],
} as const;
