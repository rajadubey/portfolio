import { 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Layers, 
  Server} from 'lucide-react';

// --- Data JSON ---
// All website content is driven by this object for easy updates.
export const DATA = {
  personal: {
    name: "Raja Dubey",
    title: "Software Engineer",
    email: "rajadubey1997@gmail.com",
    phone: "786-930-3752",
    location: "Gurgaon, HR",
    social: {
      linkedin: "https://linkedin.com/in/rajababudubey",
      github: "https://github.com/rajadubey",
      twitter: "https://x.com/rajadubey0"
    },
    about: "Senior Software Engineer with extensive experience in scalable frontend architectures, workflow automation, and performance optimization. Proven track record in revamping legacy systems and leading technical initiatives.",
    resumeUrl: "https://rajadubey.in/resume" // Placeholder for actual resume download
  },
  hero: {
    badge: "Web Developer",
    title: "Raja Dubey",
    subtitle: "Software Engineer",
    description: "Crafting scalable, high-performance web experiences. Specializing in React architectures, SSR optimizations, and distributed workflow systems."
  },
  skills: [
    { name: 'React', icon: <Globe />, color: 'text-blue-400' },
    { name: 'Next.js', icon: <Layers />, color: 'text-white' },
    { name: 'JavaScript', icon: <Code2 />, color: 'text-yellow-300' },
    { name: 'Java', icon: <Code2 />, color: 'text-red-500' },
    { name: 'Spring Boot', icon: <Server />, color: 'text-green-500' },
    { name: 'Redux', icon: <Layers />, color: 'text-purple-400' },
    { name: 'Node.js', icon: <Server />, color: 'text-green-600' },
    { name: 'SQL', icon: <Database />, color: 'text-blue-300' },
    { name: 'MongoDB', icon: <Database />, color: 'text-green-400' },
    { name: 'Elastic Search', icon: <Database />, color: 'text-yellow-500' },
    { name: 'AWS', icon: <Globe />, color: 'text-orange-400' },
    { name: 'Docker', icon: <Cpu />, color: 'text-blue-500' },
    { name: 'Webpack', icon: <Code2 />, color: 'text-blue-200' },
    { name: 'HTML/CSS', icon: <Code2 />, color: 'text-orange-500' },
    { name: 'Redis', icon: <Database />, color: 'text-red-600' },
    { name: 'Zustand', icon: <Layers />, color: 'text-yellow-100' }
  ],
  experience: [
    {
      id: 1,
      date: 'May 2025 - Present',
      role: 'Senior Software Engineer - UI',
      company: 'Oxyzo Financial Services',
      description: [
        'Led the design and development of a scalable task and workflow management platform for group-wide use, automating daily operations.',
        'Designed and implemented a scalable front-end boilerplate using modern technologies to improve development efficiency.',
        'Established a private npm registry for secure distribution and versioning of shared components.'
      ],
      tech: ['React', 'Next.js', 'Redux', 'Node.js', 'MongoDB', 'Docker', 'Webpack']
    },
    {
      id: 2,
      date: 'Dec 2020 - April 2025',
      role: 'Senior Software Engineer - UI',
      company: 'OfBusiness',
      description: [
        'Implemented a distributed web scraping framework using AWS Lambda and forward proxy rotation.',
        'Revamped tender review system using Elasticsearch, improving operational efficiency by 3x.',
        'Upgraded web page speed performance score from 65 to 95+ using SSR and code splitting.',
        'Transitioned permission system to a database-managed model with custom HOCs for security.'
      ],
      tech: ['AWS', 'Elastic Search', 'Next.js', 'Node.js', 'Redis', 'SQL']
    }
  ],
  projects: [
    {
      id: 1,
      title: 'React SSR Boilerplate',
      category: 'Architecture',
      description: 'A custom React Server-Side Rendering (SSR) boilerplate built as a high-performance alternative to Next.js. Features include SEO optimization, page streaming, and styled components support.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      link: '#',
      span: 'col-span-2'
    },
    {
      id: 2,
      title: 'Note App',
      category: 'Full Stack',
      description: 'A comprehensive full-stack notebook application. Users can manage multiple notebooks and pages with a rich text interface, powered by Spring Boot REST APIs and MongoDB.',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
      link: '#',
      span: 'col-span-1'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'Government Engineering College',
      location: 'Ujjain, Madhya Pradesh',
      year: '2016 - 2020',
      details: 'Selected for SHE (Scholarship for Higher Education) among top 1%.'
    }
  ]
};
