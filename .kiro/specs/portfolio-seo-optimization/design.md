# Design Document

## Overview

This document outlines the technical design for transforming the rajadubey.in portfolio from a basic Next.js site with default configurations into an enterprise-grade, SEO-optimized, CMS-powered application. The design addresses critical SEO deficiencies (current health score: 30/100), implements modern headless CMS architecture with Payload 3.0, and optimizes for Core Web Vitals to achieve a target health score of 90+.

The solution maintains the existing Next.js 14+ App Router architecture while integrating Payload CMS for content management, ImageKit for media optimization, and implementing comprehensive SEO, accessibility, and performance enhancements.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 14 App Router                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Frontend (React Components)                │ │
│  │  • Hero, Experience, Projects, Skills, Contact         │ │
│  │  • Optimized Images (Next.js Image + ImageKit)         │ │
│  │  • Responsive Layouts (Tailwind CSS)                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↕                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Payload CMS 3.0 (Native Integration)         │ │
│  │  • Admin UI at /admin                                  │ │
│  │  • Collections: Profile, Experience, Projects, Skills  │ │
│  │  • TypeScript Types Generation                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↕                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  MongoDB Atlas                          │ │
│  │  • CMS Data Storage                                    │ │
│  │  • Collections for each content type                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
        ┌───────────────────────────────────────┐
        │         ImageKit CDN                   │
        │  • Image Optimization & Delivery       │
        │  • Automatic Format Conversion         │
        │  • Responsive Image Transformations    │
        └───────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14+ with App Router and TypeScript
- **CMS**: Payload CMS 3.0 (native Next.js integration)
- **Database**: MongoDB Atlas
- **Media CDN**: ImageKit
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React (tree-shaken imports)
- **Analytics**: Vercel Analytics
- **SEO Tools**: next-sitemap (for dynamic sitemap generation)

## Components and Interfaces

### 1. Payload CMS Configuration

#### Collections Schema

**Profile Collection (Singleton)**
```typescript
interface Profile {
  name: string;
  title: string;
  bio: RichText; // Payload Rich Text field
  email: string;
  phone: string;
  location: string;
  resumeURL: Upload; // Payload Upload field
  socialLinks: Array<{
    platform: 'linkedin' | 'github' | 'twitter' | 'email';
    url: string;
  }>;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}
```

**Experience Collection**
```typescript
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date; // Optional for current positions
  description: RichText | string[];
  techStack: string[];
  logo?: Upload;
  order: number; // For manual sorting
}
```

**Projects Collection**
```typescript
interface Project {
  id: string;
  title: string;
  category: string;
  description: RichText;
  techStack: string[];
  repoLink?: string;
  liveLink?: string;
  coverImage: Upload;
  featured: boolean;
  order: number;
  slug: string; // Auto-generated from title
}
```

**Skills Collection**
```typescript
interface Skill {
  id: string;
  name: string;
  iconName: string; // Maps to Lucide React icon
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: 1 | 2 | 3 | 4 | 5; // Optional skill level
  order: number;
}
```

#### Payload Configuration File

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Portfolio CMS',
      favicon: '/favicon.ico',
    },
  },
  collections: [
    {
      slug: 'profile',
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'bio', type: 'richText', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
        { name: 'location', type: 'text', required: true },
        { name: 'resumeURL', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: ['linkedin', 'github', 'twitter', 'email'],
              required: true,
            },
            { name: 'url', type: 'text', required: true },
          ],
        },
        { name: 'seoTitle', type: 'text', required: true },
        { name: 'seoDescription', type: 'textarea', required: true },
        { name: 'seoKeywords', type: 'array', fields: [{ name: 'keyword', type: 'text' }] },
      ],
    },
    // Experience, Projects, Skills collections follow similar pattern
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
```

### 2. ImageKit Integration

#### Custom Image Loader

```typescript
// lib/imagekit-loader.ts
export default function imagekitLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`w-${width}`];
  
  if (quality) {
    params.push(`q-${quality}`);
  }
  
  // Auto format conversion
  params.push('f-auto');
  
  const paramsString = params.join(',');
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  
  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  return `${urlEndpoint}/tr:${paramsString}/${cleanSrc}`;
}
```

#### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imagekit-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // ... other config
};

export default nextConfig;
```

#### Payload Upload Collection with ImageKit Plugin

We will use the official `payloadcms-plugin-imagekit` package to handle media uploads directly to ImageKit CDN.

```typescript
// collections/Media.ts
import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true, // ImageKit plugin will handle the upload configuration
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};
```

**Payload Configuration with ImageKit Plugin**:

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import imagekitPlugin from 'payloadcms-plugin-imagekit';
import path from 'path';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Portfolio CMS',
      favicon: '/favicon.ico',
    },
  },
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
      },
      collections: {
        media: {
          uploadOptions: {
            folder: '/portfolio', // ImageKit folder path
            useUniqueFileName: true,
            tags: ['portfolio', 'cms'],
          },
          imageSizes: [
            {
              name: 'thumbnail',
              width: 400,
              height: 300,
            },
            {
              name: 'card',
              width: 768,
              height: 1024,
            },
            {
              name: 'hero',
              width: 1920,
              height: 1080,
            },
          ],
        },
      },
    }),
  ],
  collections: [
    // ... other collections
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
```

**Benefits of Using the Plugin**:
- Automatic upload to ImageKit CDN
- Built-in image transformation support
- Automatic thumbnail generation
- Seamless integration with Payload admin UI
- No need for custom upload handlers

### 3. SEO Implementation

#### Metadata Configuration

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { getProfile } from '@/lib/payload';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  
  return {
    metadataBase: new URL('https://www.rajadubey.in'),
    title: {
      default: profile.seoTitle || 'Raja Dubey | Senior Software Engineer',
      template: '%s | Raja Dubey',
    },
    description: profile.seoDescription,
    keywords: profile.seoKeywords,
    authors: [{ name: profile.name, url: 'https://rajadubey.in' }],
    creator: profile.name,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://rajadubey.in',
      title: profile.seoTitle,
      description: profile.seoDescription,
      siteName: `${profile.name} Portfolio`,
    },
    twitter: {
      card: 'summary_large_image',
      title: profile.seoTitle,
      description: profile.seoDescription,
      creator: '@rajadubey0',
    },
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

#### Structured Data (JSON-LD)

```typescript
// app/page.tsx
import { getProfile } from '@/lib/payload';

export default async function HomePage() {
  const profile = await getProfile();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: 'https://rajadubey.in',
    email: profile.email,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    sameAs: profile.socialLinks.map(link => link.url),
    worksFor: {
      '@type': 'Organization',
      name: 'Oxyzo Financial Services',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### 4. Dynamic Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();
  
  // Fetch all projects for dynamic routes
  const projects = await payload.find({
    collection: 'projects',
    limit: 1000,
  });
  
  const baseUrl = 'https://www.rajadubey.in';
  
  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];
  
  // Dynamic project routes
  const projectRoutes = projects.docs.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  return [...routes, ...projectRoutes];
}
```

### 5. Robots.txt Generation

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://www.rajadubey.in/sitemap.xml',
  };
}
```

## Data Models

### Content Seeding Script

```typescript
// scripts/seed.ts
import { getPayloadClient } from '../lib/payload';

async function seed() {
  const payload = await getPayloadClient();
  
  // Seed Profile
  await payload.create({
    collection: 'profile',
    data: {
      name: 'Raja Babu Dubey',
      title: 'Senior Software Engineer - UI',
      bio: `Senior Software Engineer with over 5 years of experience architecting enterprise-grade applications. 
      Currently at Oxyzo Financial Services, I lead the development of internal workflow automation platforms. 
      My role involves not just writing code, but designing the entire frontend ecosystem—from creating private npm 
      registries to establishing standardized UI boilerplates that empower cross-functional teams.
      
      Previously, during my tenure at OfBusiness, I tackled high-volume data challenges on platforms like Nexizo.ai 
      and BidAssist. My focus has always been on performance; I successfully optimized legacy web systems, improving 
      performance scores from 65 to 95+ by implementing Server-Side Rendering (SSR) and advanced caching strategies 
      with Redis and CDN edge networks.
      
      My technical philosophy bridges the gap between complex backend logic (Spring Boot, Elasticsearch, MongoDB) 
      and fluid, reactive user interfaces (Next.js, Tailwind, Framer Motion). I am currently expanding my expertise 
      into AI, building self-hosted code review systems using LLMs and Docker.`,
      email: 'rajadubey1997@gmail.com',
      phone: '+91-786-930-3752',
      location: 'Gurgaon, India',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/rajababudubey' },
        { platform: 'github', url: 'https://github.com/rajadubey' },
        { platform: 'twitter', url: 'https://x.com/rajadubey0' },
      ],
      seoTitle: 'Raja Dubey | Senior Software Engineer - React & Cloud Architecture',
      seoDescription: 'Portfolio of Raja Dubey, a Senior Software Engineer at Oxyzo and OfBusiness. Specializing in scalable frontend systems, Next.js performance, and enterprise workflow automation.',
      seoKeywords: ['Software Engineer', 'React', 'Next.js', 'Spring Boot', 'Elasticsearch', 'Frontend Architecture', 'Gurgaon'],
    },
  });
  
  // Seed Experience
  await payload.create({
    collection: 'experience',
    data: {
      company: 'Oxyzo Financial Services',
      role: 'Senior Software Engineer - UI',
      startDate: new Date('2025-05-01'),
      description: [
        'Architected an enterprise-grade Task & Workflow Management System from scratch.',
        'Built a private npm registry and scalable frontend boilerplate to standardize UI development.',
        'Implemented real-time status visibility using Redis and Spring Boot.',
      ],
      techStack: ['Next.js', 'Spring Boot', 'Redis', 'MongoDB', 'System Design'],
      order: 1,
    },
  });
  
  await payload.create({
    collection: 'experience',
    data: {
      company: 'OfBusiness',
      role: 'Senior Software Engineer - UI',
      startDate: new Date('2020-12-01'),
      endDate: new Date('2025-04-30'),
      description: [
        'Scaled Nexizo.ai and BidAssist platforms, handling massive data ingestion.',
        'Improved Core Web Vitals performance scores from 65 to 95+ via SSR and clustering.',
        'Designed AWS Lambda pipelines for distributed web scraping.',
      ],
      techStack: ['Elasticsearch', 'AWS Lambda', 'Node.js', 'React', 'Docker'],
      order: 2,
    },
  });
  
  // Seed Projects
  await payload.create({
    collection: 'projects',
    data: {
      title: 'AI-Powered Code Review Agent',
      slug: 'ai-code-review-agent',
      category: 'AI & DevOps',
      description: `A self-hosted, asynchronous code review system that leverages local LLMs (Deepseek-coder via Ollama) 
      to analyze GitHub Pull Requests. Built with a containerized architecture to provide automated, context-aware 
      inline feedback and code suggestions.`,
      techStack: ['Node.js', 'Docker', 'Redis', 'Ollama', 'GitHub API'],
      repoLink: 'https://github.com/rajadubey',
      featured: true,
      order: 1,
    },
  });
  
  // ... more seeding
  
  console.log('Seeding completed successfully!');
}

seed();
```

## 
Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After analyzing all acceptance criteria, I've identified the following testable properties. Many criteria are specific examples or configuration checks that don't generalize to properties, but several key behaviors should hold universally:

### Property 1: Canonical URLs for All Pages
*For any* page in the Portfolio_System, the HTML output should contain a canonical link tag with a properly formatted absolute URL.
**Validates: Requirements 1.6**

### Property 2: Text-to-HTML Ratio Threshold
*For any* page in the Portfolio_System, the ratio of text content to HTML markup should be at least 20%.
**Validates: Requirements 4.1**

### Property 3: Responsive Grid Padding
*For any* text container in the Portfolio_System, the element should have sufficient padding (minimum 16px) to prevent content from touching screen edges.
**Validates: Requirements 5.5**

### Property 4: Touch Target Minimum Dimensions
*For any* interactive element (button, link, input) in the Portfolio_System, the element should have a minimum height and width of 44px.
**Validates: Requirements 6.1, 6.2, 6.3**

### Property 5: Touch Target Spacing
*For any* pair of adjacent interactive elements, the spacing between them should be at least 8px to prevent accidental taps.
**Validates: Requirements 6.4**

### Property 6: Social Links Accessibility
*For any* social media link in the Portfolio_System, the link should have an aria-label attribute for screen reader accessibility.
**Validates: Requirements 8.3**

### Property 7: External Links Security
*For any* external link in the Portfolio_System, the link should have both target="_blank" and rel="noopener noreferrer" attributes.
**Validates: Requirements 8.4, 16.2**

### Property 8: Next.js Image Component Usage
*For any* image displayed in the Portfolio_System, it should use the Next.js Image component rather than a standard img tag.
**Validates: Requirements 11.1**

### Property 9: Image Dimensions for Layout Stability
*For any* image using the Next.js Image component, it should have explicit width and height props to prevent layout shift.
**Validates: Requirements 11.2**

### Property 10: Image Lazy Loading
*For any* image below the fold, it should have lazy loading enabled to improve initial page load performance.
**Validates: Requirements 11.3**

### Property 11: Image Alt Text Accessibility
*For any* image in the Portfolio_System, it should have a non-empty alt attribute for accessibility.
**Validates: Requirements 11.5**

### Property 12: Image Placeholder During Load
*For any* image using the Next.js Image component, it should have a placeholder (blur or shimmer) to improve perceived performance.
**Validates: Requirements 11.6**

### Property 13: Keyboard Accessibility
*For any* interactive element in the Portfolio_System, it should be keyboard accessible (focusable and operable via keyboard).
**Validates: Requirements 12.3**

### Property 14: Heading Hierarchy
*For any* page in the Portfolio_System, headings should follow a logical hierarchy without skipping levels (h1 → h2 → h3, not h1 → h3).
**Validates: Requirements 12.4**

### Property 15: Icon Button ARIA Labels
*For any* button or link that contains only an icon (no visible text), it should have an aria-label attribute.
**Validates: Requirements 12.5**

### Property 16: Color Contrast Compliance
*For any* text element in the Portfolio_System, the color contrast ratio between text and background should meet WCAG AA standards (minimum 4.5:1 for normal text).
**Validates: Requirements 12.6**

### Property 17: Visible Focus Indicators
*For any* focusable element in the Portfolio_System, it should have a visible focus indicator when focused.
**Validates: Requirements 12.7**

### Property 18: HTTPS for All Resources
*For any* resource URL (images, scripts, stylesheets) in the Portfolio_System, it should use the HTTPS protocol.
**Validates: Requirements 15.4**

### Property 19: Internal Links Use Next.js Link
*For any* internal navigation link in the Portfolio_System, it should use the Next.js Link component for client-side navigation.
**Validates: Requirements 16.1**

### Property 20: Link Hover Feedback
*For any* link in the Portfolio_System, it should have visual feedback (color change, underline, etc.) on hover.
**Validates: Requirements 16.4**

### Property 21: No Broken Links
*For any* link in the Portfolio_System, the href should resolve to a valid resource (no 404 errors).
**Validates: Requirements 16.5**

### Property 22: URL Consistency
*For any* URL in the Portfolio_System, it should follow a consistent pattern without trailing slash inconsistencies.
**Validates: Requirements 16.6**

### Property 23: Valid Social Media URLs
*For any* social media URL in the data layer, it should be a valid, well-formed URL that resolves successfully.
**Validates: Requirements 17.7**

### Property 24: No Lorem Ipsum in Seeded Data
*For any* text content in the seeded CMS data, it should not contain placeholder text like "lorem ipsum" or "placeholder".
**Validates: Requirements 24.7**

### Property 25: Dynamic Sitemap Includes All Projects
*For any* project in the CMS, the generated sitemap should include a URL entry for that project.
**Validates: Requirements 25.2, 25.3**

### Property 26: Sitemap Timestamps Reflect Updates
*For any* project in the CMS, when the project is updated, the sitemap lastmod timestamp for that project should reflect the update time.
**Validates: Requirements 25.4**

### Property 27: CMS Data Drives Metadata
*For any* metadata field (title, description) on a page, when the corresponding CMS field is updated, the page metadata should reflect the new value.
**Validates: Requirements 26.2, 26.3, 26.4, 26.5, 26.6**

### Property 28: ImageKit Transformation Parameters
*For any* image served through ImageKit, the URL should include transformation parameters for quality optimization (q-80) and format conversion (f-auto).
**Validates: Requirements 23.4**

### Property 29: ImageKit URLs for CMS Images
*For any* image uploaded through the CMS, the image URL should use the ImageKit domain for CDN delivery.
**Validates: Requirements 23.5**

### Property 30: Responsive Image Transformations
*For any* image displayed at different viewport sizes, the Portfolio_System should request appropriately sized images using ImageKit width transformations.
**Validates: Requirements 23.7**

### Property 31: TypeScript Type Safety for CMS Data
*For any* component consuming CMS data, the data should be accessed using generated TypeScript types to ensure type safety.
**Validates: Requirements 27.2, 27.5**

### Property 32: TechStack Array Type Validation
*For any* techStack array in the CMS (Experience or Projects), all elements should be strings.
**Validates: Requirements 27.6**

### Property 33: URL Format Validation
*For any* URL field in the CMS (social links, project links), the value should be a valid URL format.
**Validates: Requirements 27.7**

## Error Handling

### CMS Connection Failures
- **Scenario**: MongoDB Atlas connection fails
- **Handling**: Display cached content from last successful build, show admin error message
- **Implementation**: Use try-catch blocks around Payload API calls, implement fallback to static data

### Image Loading Failures
- **Scenario**: ImageKit CDN is unavailable or image fails to load
- **Handling**: Display placeholder image with appropriate alt text
- **Implementation**: Use Next.js Image onError prop to handle failures

### Build-Time Data Fetching Errors
- **Scenario**: CMS data cannot be fetched during build
- **Handling**: Fail the build with clear error message indicating which collection failed
- **Implementation**: Validate all required collections exist before proceeding with build

### Invalid CMS Data
- **Scenario**: Required fields are missing or data types are incorrect
- **Handling**: Prevent content publication, display validation errors in admin UI
- **Implementation**: Use Payload's built-in validation with custom error messages

### Sitemap Generation Failures
- **Scenario**: Unable to fetch projects for sitemap generation
- **Handling**: Generate sitemap with static routes only, log error
- **Implementation**: Wrap sitemap generation in try-catch, provide fallback

### Authentication Failures
- **Scenario**: User cannot authenticate to CMS admin
- **Handling**: Display clear error message, provide password reset option
- **Implementation**: Use Payload's built-in authentication with custom error handling

## Testing Strategy

### Dual Testing Approach

This project requires both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and configuration
- Test specific metadata values (title, description)
- Test robots.txt and sitemap.xml content
- Test CMS schema configuration
- Test seed script output
- Test ImageKit loader URL generation
- Test error boundary behavior
- Test 404 page rendering

**Property-Based Tests**: Verify universal properties across all inputs
- Test touch target dimensions for all interactive elements
- Test image accessibility (alt text) for all images
- Test link security attributes for all external links
- Test heading hierarchy across all pages
- Test color contrast for all text elements
- Test URL validation for all links
- Test TypeScript type safety for all CMS data access

### Property-Based Testing Configuration

**Library**: We will use **fast-check** for property-based testing in TypeScript/JavaScript.

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `// Feature: portfolio-seo-optimization, Property N: [property description]`

**Example Property Test**:
```typescript
import fc from 'fast-check';
import { render } from '@testing-library/react';

// Feature: portfolio-seo-optimization, Property 4: Touch Target Minimum Dimensions
describe('Touch Target Dimensions', () => {
  it('all interactive elements should have minimum 44px dimensions', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          type: fc.constantFrom('button', 'link', 'input'),
          text: fc.string(),
        })),
        (elements) => {
          const { container } = render(<TestComponent elements={elements} />);
          const interactiveElements = container.querySelectorAll('button, a, input');
          
          interactiveElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            expect(rect.height).toBeGreaterThanOrEqual(44);
            expect(rect.width).toBeGreaterThanOrEqual(44);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**CMS Integration**:
- Test Payload CMS initialization
- Test collection CRUD operations
- Test file uploads to ImageKit
- Test authentication flow

**Build Process**:
- Test sitemap generation during build
- Test robots.txt generation
- Test TypeScript type generation
- Test image optimization

**SEO Validation**:
- Test metadata generation from CMS data
- Test structured data (JSON-LD) output
- Test canonical URL generation
- Test Open Graph and Twitter Card tags

### Accessibility Testing

**Automated Tools**:
- Use axe-core for automated accessibility testing
- Test color contrast ratios
- Test ARIA attributes
- Test keyboard navigation

**Manual Testing**:
- Test with screen readers (NVDA, JAWS)
- Test keyboard-only navigation
- Test with browser zoom at 200%
- Test on actual mobile devices

### Performance Testing

**Core Web Vitals**:
- Use Lighthouse CI in build pipeline
- Test LCP, FID, CLS, INP metrics
- Set thresholds: LCP < 2.5s, FID < 100ms, CLS < 0.1, INP < 200ms

**Image Optimization**:
- Test ImageKit transformation parameters
- Test lazy loading behavior
- Test responsive image sizes

### Cross-Browser Testing

**Target Browsers**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Mobile (Android 10+)

### Test Coverage Goals

- Unit test coverage: 80%+ for utility functions and components
- Property test coverage: 100% of identified properties
- Integration test coverage: All CMS collections and API routes
- E2E test coverage: Critical user flows (view portfolio, download resume, navigate sections)

## Implementation Notes

### Development Workflow

1. **Setup Phase**:
   - Initialize Payload CMS in Next.js project
   - Configure MongoDB Atlas connection
   - Set up ImageKit account and integration
   - Create all collection schemas

2. **Content Migration**:
   - Run seed script to populate CMS with resume data
   - Upload images to ImageKit
   - Verify all content displays correctly

3. **SEO Implementation**:
   - Update metadata in layout.tsx
   - Add structured data to home page
   - Implement dynamic sitemap generation
   - Create robots.txt

4. **Optimization Phase**:
   - Implement responsive layouts
   - Add touch target sizing
   - Optimize images with Next.js Image
   - Add accessibility features

5. **Testing Phase**:
   - Write and run unit tests
   - Write and run property-based tests
   - Run Lighthouse audits
   - Test on real devices

6. **Deployment**:
   - Deploy to Vercel
   - Configure environment variables
   - Submit sitemap to Google Search Console
   - Monitor Core Web Vitals

### Environment Variables

```env
# MongoDB
DATABASE_URI=mongodb+srv://...

# Payload CMS
PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_SERVER_URL=https://rajadubey.in

# ImageKit (for payloadcms-plugin-imagekit)
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### Required Packages

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "payload": "^3.0.0",
    "@payloadcms/db-mongodb": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "payloadcms-plugin-imagekit": "^1.0.0",
    "imagekitio-next": "^1.0.0",
    "tailwindcss": "^4.0.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.0.0",
    "@vercel/analytics": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "fast-check": "^3.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "axe-core": "^4.0.0"
  }
}
```

### Performance Optimization Checklist

- [ ] Enable Next.js Image Optimization
- [ ] Configure ImageKit transformations
- [ ] Implement lazy loading for below-fold content
- [ ] Use dynamic imports for heavy components
- [ ] Optimize font loading with font-display: swap
- [ ] Minimize JavaScript bundle size
- [ ] Enable compression (gzip/brotli)
- [ ] Set appropriate cache headers
- [ ] Use CDN for static assets
- [ ] Implement resource hints (preconnect, dns-prefetch)

### Security Checklist

- [ ] Set Content Security Policy headers
- [ ] Set X-Frame-Options header
- [ ] Set X-Content-Type-Options header
- [ ] Use HTTPS for all resources
- [ ] Implement Referrer-Policy
- [ ] Secure CMS admin with strong authentication
- [ ] Validate all user inputs
- [ ] Sanitize CMS content before rendering
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets

### Accessibility Checklist

- [ ] Use semantic HTML elements
- [ ] Provide skip-to-content link
- [ ] Ensure keyboard accessibility
- [ ] Maintain logical heading hierarchy
- [ ] Add ARIA labels where needed
- [ ] Meet WCAG AA color contrast standards
- [ ] Provide visible focus indicators
- [ ] Add alt text to all images
- [ ] Test with screen readers
- [ ] Support browser zoom up to 200%
