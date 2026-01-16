// This is a seed script template for Payload CMS
// To run this script, you would need to:
// 1. Start the Payload CMS server
// 2. Use the Payload REST API or admin interface to create content
// 3. Or use Payload's programmatic API in a proper server context

console.log('🌱 Content Seeding Script');
console.log('This script contains the data structure for seeding the CMS');

// Profile data structure
export const profileData = {
  name: 'Raja Babu Dubey',
  title: 'Senior Software Engineer - UI',
  bio: 'Senior Software Engineer with over 5 years of experience architecting enterprise-grade applications. Currently at Oxyzo Financial Services, I lead the development of internal workflow automation platforms. My role involves not just writing code, but designing the entire frontend ecosystem—from creating private npm registries to establishing standardized UI boilerplates that empower cross-functional teams. Previously, during my tenure at OfBusiness, I tackled high-volume data challenges on platforms like Nexizo.ai and BidAssist. My focus has always been on performance; I successfully optimized legacy web systems, improving performance scores from 65 to 95+ by implementing Server-Side Rendering (SSR) and advanced caching strategies with Redis and CDN edge networks. My technical philosophy bridges the gap between complex backend logic (Spring Boot, Elasticsearch, MongoDB) and fluid, reactive user interfaces (Next.js, Tailwind, Framer Motion). I am currently expanding my expertise into AI, building self-hosted code review systems using LLMs and Docker.',
  email: 'rajadubey1997@gmail.com',
  phone: '+91-786-930-3752',
  location: 'Gurgaon, India',
  socialLinks: [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/rajababudubey',
    },
    {
      platform: 'github',
      url: 'https://github.com/rajadubey',
    },
    {
      platform: 'twitter',
      url: 'https://x.com/rajadubey0',
    },
  ],
  seoTitle: 'Raja Dubey | Senior Software Engineer - React & Cloud Architecture',
  seoDescription: 'Portfolio of Raja Dubey, a Senior Software Engineer at Oxyzo and OfBusiness. Specializing in scalable frontend systems, Next.js performance, and enterprise workflow automation.',
  seoKeywords: [
    { keyword: 'Software Engineer' },
    { keyword: 'React' },
    { keyword: 'Next.js' },
    { keyword: 'Spring Boot' },
    { keyword: 'Elasticsearch' },
    { keyword: 'Frontend Architecture' },
    { keyword: 'Gurgaon' },
  ],
};

// Experience data structure
export const experienceData = [
  {
    company: 'Oxyzo Financial Services',
    role: 'Senior Software Engineer - UI',
    startDate: '2025-05-01',
    description: 'Architected an enterprise-grade Task & Workflow Management System from scratch, automating operations for organization-wide use. Designed a scalable frontend boilerplate and established a private npm registry to standardize UI development across teams. Implemented prioritization and dependency tracking, significantly improving operational transparency.',
    techStack: [
      { technology: 'Next.js' },
      { technology: 'Spring Boot' },
      { technology: 'Redis' },
      { technology: 'MongoDB' },
      { technology: 'System Design' },
    ],
    order: 1,
  },
  {
    company: 'OfBusiness',
    role: 'Senior Software Engineer - UI',
    startDate: '2020-12-01',
    endDate: '2025-04-30',
    description: 'Scaled Nexizo.ai and BidAssist platforms, implementing high-performance search using Elasticsearch. Engineered distributed web scraping pipelines using AWS Lambda and SQS with forward proxy rotation. Optimized web performance scores from 65 to 95+ by implementing SSR, code splitting, and Node.js clustering.',
    techStack: [
      { technology: 'Elasticsearch' },
      { technology: 'AWS Lambda' },
      { technology: 'SQS' },
      { technology: 'Node.js' },
      { technology: 'React' },
      { technology: 'MySQL' },
    ],
    order: 2,
  },
];

// Projects data structure
export const projectsData = [
  {
    title: 'AI-Powered Code Review Agent',
    slug: 'ai-powered-code-review-agent',
    category: 'AI & DevOps',
    description: 'A self-hosted, asynchronous code review system that leverages local LLMs (Deepseek-coder via Ollama) to analyze GitHub Pull Requests. Built with a containerized architecture to provide automated, context-aware inline feedback and code suggestions.',
    techStack: [
      { technology: 'Node.js' },
      { technology: 'Docker' },
      { technology: 'Redis' },
      { technology: 'Ollama' },
      { technology: 'GitHub API' },
    ],
    repoLink: 'https://github.com/rajadubey',
    featured: true,
    order: 1,
  },
  {
    title: 'Custom React SSR Engine',
    slug: 'custom-react-ssr-engine',
    category: 'Core Architecture',
    description: 'An advanced Server-Side Rendering implementation built from scratch as a high-performance alternative to Next.js. Engineered to support React Server Components, page streaming, and SEO optimization using custom Webpack and Babel configurations.',
    techStack: [
      { technology: 'React' },
      { technology: 'Express' },
      { technology: 'Webpack' },
      { technology: 'Babel' },
      { technology: 'SCSS' },
    ],
    repoLink: 'https://github.com/rajadubey',
    featured: true,
    order: 2,
  },
  {
    title: 'Full-Stack Note Platform',
    slug: 'full-stack-note-platform',
    category: 'Full-Stack Development',
    description: 'A comprehensive note-taking application with real-time collaboration features, rich text editing, and advanced search capabilities. Built with modern web technologies and optimized for performance.',
    techStack: [
      { technology: 'Next.js' },
      { technology: 'TypeScript' },
      { technology: 'Prisma' },
      { technology: 'PostgreSQL' },
      { technology: 'Tailwind CSS' },
    ],
    repoLink: 'https://github.com/rajadubey',
    featured: false,
    order: 3,
  },
];

// Skills data structure
export const skillsData = [
  // Frontend Skills
  { name: 'React', iconName: 'Globe', category: 'frontend', proficiency: '5', order: 1 },
  { name: 'Next.js', iconName: 'Layers', category: 'frontend', proficiency: '5', order: 2 },
  { name: 'TypeScript', iconName: 'Code2', category: 'frontend', proficiency: '4', order: 3 },
  { name: 'Tailwind CSS', iconName: 'Palette', category: 'frontend', proficiency: '4', order: 4 },
  { name: 'Framer Motion', iconName: 'Zap', category: 'frontend', proficiency: '3', order: 5 },

  // Backend Skills
  { name: 'Spring Boot', iconName: 'Server', category: 'backend', proficiency: '4', order: 6 },
  { name: 'Node.js', iconName: 'Terminal', category: 'backend', proficiency: '4', order: 7 },
  { name: 'Express', iconName: 'Globe', category: 'backend', proficiency: '4', order: 8 },

  // Database Skills
  { name: 'MongoDB', iconName: 'Database', category: 'database', proficiency: '4', order: 9 },
  { name: 'Elasticsearch', iconName: 'Search', category: 'database', proficiency: '4', order: 10 },
  { name: 'Redis', iconName: 'Database', category: 'database', proficiency: '3', order: 11 },
  { name: 'MySQL', iconName: 'Database', category: 'database', proficiency: '3', order: 12 },

  // DevOps Skills
  { name: 'Docker', iconName: 'Container', category: 'devops', proficiency: '4', order: 13 },
  { name: 'AWS Lambda', iconName: 'Cloud', category: 'devops', proficiency: '4', order: 14 },
  { name: 'AWS SQS', iconName: 'MessageSquare', category: 'devops', proficiency: '3', order: 15 },

  // Tools
  { name: 'Webpack', iconName: 'Package', category: 'tools', proficiency: '4', order: 16 },
  { name: 'Babel', iconName: 'Code', category: 'tools', proficiency: '3', order: 17 },
  { name: 'Git', iconName: 'GitBranch', category: 'tools', proficiency: '5', order: 18 },
];

console.log('✅ Seed data structures defined');
console.log('📝 To use this data, manually create entries in the Payload CMS admin interface');
console.log('🔗 Admin interface will be available at: /admin');