
import { 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Layers, 
  Server, 
  Bot, 
  Terminal, 
  Workflow, 
  LayoutTemplate 
} from 'lucide-react';

export const DATA = {
  personal: {
    name: "Raja Babu Dubey", // [cite: 405]
    title: "Senior Software Engineer - UI", // [cite: 409]
    email: "rajadubey1997@gmail.com", // [cite: 406]
    phone: "+91-786-930-3752", // [cite: 406]
    location: "Gurgaon, India", // [cite: 419]
    social: {
      linkedin: "https://linkedin.com/in/rajababudubey", // [cite: 410]
      github: "https://github.com/rajadubey", // [cite: 411]
      twitter: "https://x.com/rajadubey0" // Added to satisfy SEO Audit [cite: 217]
    },
    about: "Senior Software Engineer with 5+ years of experience architecting scalable frontend systems and enterprise workflow automation platforms. Expert in optimizing core web vitals (65 to 95+), designing distributed architectures, and integrating AI-driven developer tools.", // Synthesized from [cite: 413, 425, 437]
    resumeUrl: "/Raja_Dubey_Resume.pdf"
  },
  hero: {
    badge: "Senior UI Architect",
    title: "Raja Babu Dubey",
    subtitle: "Senior Software Engineer",
    description: "Architecting high-performance enterprise platforms. Specializing in Next.js internals, distributed web scraping systems, and AI-powered developer tooling." // Synthesized from [cite: 413, 423, 437]
  },
  skills: [
    { name: 'React', icon: <Globe />, color: 'text-blue-400' }, // [cite: 434]
    { name: 'Next.js', icon: <Layers />, color: 'text-white' }, // [cite: 434]
    { name: 'Spring Boot', icon: <Server />, color: 'text-green-500' }, // [cite: 434]
    { name: 'Elasticsearch', icon: <Database />, color: 'text-yellow-500' }, // [cite: 435]
    { name: 'AWS Lambda/SQS', icon: <Globe />, color: 'text-orange-400' }, // [cite: 426]
    { name: 'Docker', icon: <Cpu />, color: 'text-blue-500' }, // [cite: 437]
    { name: 'Redis', icon: <Database />, color: 'text-red-600' }, // [cite: 435]
    { name: 'Upstash Redis', icon: <Database />, color: 'text-green-400' }, // [cite: 435]
    { name: 'Redux Toolkit', icon: <Layers />, color: 'text-purple-400' }, // [cite: 434]
    { name: 'Zustand', icon: <Layers />, color: 'text-yellow-100' }, // [cite: 434]
    { name: 'RsPack/Webpack', icon: <Terminal />, color: 'text-blue-200' }, // [cite: 435]
    { name: 'Emotion/Styled', icon: <LayoutTemplate />, color: 'text-pink-400' } // [cite: 434]
  ],
  experience: [
    {
      id: 1,
      date: 'May 2025 - Present', // [cite: 412]
      role: 'Senior Software Engineer - UI', // [cite: 409]
      company: 'Oxyzo Financial Services', // [cite: 408]
      description: [
        'Architected an enterprise-grade Task & Workflow Management System from scratch, automating operations for organization-wide use.', // [cite: 413]
        'Designed a scalable frontend boilerplate and established a private npm registry to standardize UI development across teams.', // [cite: 415]
        'Implemented prioritization and dependency tracking, significantly improving operational transparency.' // [cite: 414]
      ],
      tech: ['Next.js', 'Spring Boot', 'Redis', 'Upstash Redis', 'System Design'] // [cite: 416]
    },
    {
      id: 2,
      date: 'Dec 2020 - Apr 2025', // [cite: 419]
      role: 'Senior Software Engineer - UI', // [cite: 418]
      company: 'OfBusiness', // [cite: 417]
      description: [
        'Scaled Nexizo.ai and BidAssist platforms, implementing high-performance search using Elasticsearch.', // [cite: 420, 421]
        'Engineered distributed web scraping pipelines using AWS Lambda and SQS with forward proxy rotation.', // [cite: 423]
        'Optimized web performance scores from 65 to 95+ by implementing SSR, code splitting, and Node.js clustering.' // [cite: 425]
      ],
      tech: ['Elasticsearch', 'AWS Lambda', 'SQS', 'Node.js', 'React', 'MySQL'] // [cite: 426]
    }
  ],
  projects: [
    {
      id: 1,
      title: 'AI-Powered Code Review Agent', // [cite: 437]
      category: 'AI & DevOps',
      description: 'A self-hosted, asynchronous code review system that leverages local LLMs (Deepseek-coder via Ollama) to analyze GitHub Pull Requests. Built with a containerized architecture to provide automated, context-aware inline feedback and code suggestions.', // [cite: 437, 438, 439]
      tech: ['Node.js', 'Docker', 'Redis', 'Ollama', 'GitHub API'], // [cite: 437]
      image: '/projects/ai-review.png', 
      link: 'https://github.com/rajadubey', 
      span: 'col-span-2'
    },
    {
      id: 2,
      title: 'Custom React SSR Engine', // [cite: 444]
      category: 'Core Architecture',
      description: 'An advanced Server-Side Rendering implementation built from scratch as a high-performance alternative to Next.js. Engineered to support React Server Components, page streaming, and SEO optimization using custom Webpack and Babel configurations.', // [cite: 445, 446]
      tech: ['React', 'Express', 'Webpack', 'Babel', 'SCSS'], // [cite: 444]
      image: '/projects/ssr.png',
      link: 'https://github.com/rajadubey',
      span: 'col-span-1'
    },
    {
      id: 3,
      title: 'Full-Stack Note Platform', // [cite: 441]
      category: 'Full Stack',
      description: 'A scalable document management application powered by RESTful APIs. Features a hierarchical data structure for managing multiple notebooks and pages, utilizing Redis-backed storage and Spring Boot for robust backend logic.', // [cite: 442, 443]
      tech: ['Java', 'Spring Boot', 'Hibernate', 'Redis'], // [cite: 441]
      image: '/projects/notes.png',
      link: 'https://github.com/rajadubey',
      span: 'col-span-1'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Engineering in Computer Science', // [cite: 429]
      school: 'Government Engineering College', // [cite: 428]
      location: 'Ujjain, Madhya Pradesh', // [cite: 433]
      year: '2016 - 2020', // [cite: 432]
      details: 'Selected for SHE (Scholarship for Higher Education) among top 1%.' // [cite: 449]
    }
  ]
};
