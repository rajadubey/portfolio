# Requirements Document

## Introduction

This document outlines the requirements for optimizing the rajadubey.in portfolio website to improve SEO performance, mobile usability, and Core Web Vitals. The current site has an SEO health score of 30/100 with critical issues including missing crawler directives, default metadata, and mobile usability failures. The goal is to achieve a health score of 90+ while maintaining the existing Next.js architecture and design aesthetic.

## Glossary

- **Portfolio_System**: The Next.js-based personal portfolio website at rajadubey.in
- **SEO_Engine**: Search engine crawlers (Google, Bing) that index and rank the website
- **Metadata_Layer**: HTML meta tags, Open Graph tags, and structured data that describe the site
- **Mobile_Viewport**: The responsive display configuration for mobile devices
- **Core_Web_Vitals**: Google's performance metrics (LCP, FID, CLS, INP)
- **Sitemap**: XML file that lists all pages for search engine discovery
- **Robots_File**: Text file that instructs search engines which pages to crawl
- **Canonical_Tag**: HTML tag that specifies the preferred URL for duplicate content
- **Structured_Data**: JSON-LD schema markup that helps search engines understand content
- **Touch_Target**: Interactive UI elements (buttons, links) sized for mobile interaction

## Requirements

### Requirement 1: Search Engine Crawlability

**User Story:** As a search engine crawler, I want clear directives about what content to index, so that I can properly discover and rank the portfolio pages.

#### Acceptance Criteria

1. THE Portfolio_System SHALL provide a robots.txt file in the public directory
2. WHEN the SEO_Engine requests /robots.txt, THE Portfolio_System SHALL return directives allowing all crawlers to access public routes
3. THE Robots_File SHALL reference the sitemap location at https://www.rajadubey.in/sitemap.xml
4. THE Portfolio_System SHALL generate an XML sitemap listing all public pages
5. WHEN the Portfolio_System builds, THE Sitemap SHALL be automatically generated and placed in the public directory
6. THE Portfolio_System SHALL define canonical URLs for all pages to prevent duplicate content penalties

### Requirement 2: Metadata and SEO Tags

**User Story:** As a search engine and social media platform, I want descriptive metadata about the portfolio, so that I can display accurate titles, descriptions, and previews.

#### Acceptance Criteria

1. THE Metadata_Layer SHALL replace the default "Create Next App" title with "Raja Dubey | Senior Software Engineer - React & Cloud Architecture"
2. THE Metadata_Layer SHALL provide a description containing keywords: Senior Software Engineer, React, Next.js, Spring Boot, Elasticsearch, Frontend Architecture
3. WHEN a page is shared on social media, THE Portfolio_System SHALL provide Open Graph tags with title, description, and site name
4. WHEN a page is shared on Twitter/X, THE Portfolio_System SHALL provide Twitter Card metadata with summary_large_image card type
5. THE Metadata_Layer SHALL include author information with name "Raja Dubey" and URL "https://rajadubey.in"
6. THE Portfolio_System SHALL set metadataBase to "https://www.rajadubey.in" for proper URL resolution

### Requirement 3: Structured Data

**User Story:** As a search engine, I want structured data about the portfolio owner, so that I can display rich snippets and understand the content context.

#### Acceptance Criteria

1. THE Portfolio_System SHALL include JSON-LD structured data on the home page
2. THE Structured_Data SHALL use schema.org Person type
3. THE Structured_Data SHALL include name, jobTitle, url, and sameAs properties
4. THE Structured_Data SHALL reference social profiles: LinkedIn, GitHub, and X/Twitter
5. THE Structured_Data SHALL include worksFor property with organization name "Oxyzo Financial Services"

### Requirement 4: Content Quality and Depth

**User Story:** As a visitor and search engine, I want substantial, keyword-rich content about the engineer's experience, so that I can understand their expertise and the site ranks for relevant searches.

#### Acceptance Criteria

1. THE Portfolio_System SHALL display content with a text-to-HTML ratio above 20%
2. THE Portfolio_System SHALL include detailed descriptions of work at Oxyzo Financial Services and OfBusiness
3. WHEN displaying experience, THE Portfolio_System SHALL mention specific achievements: task management platform, private npm registry, performance optimization from 65 to 95+, Elasticsearch implementation
4. THE Portfolio_System SHALL include project descriptions with technical keywords: AI, Docker, Redis, SSR, Webpack, Spring Boot
5. THE Portfolio_System SHALL provide an about section with at least 300 words describing technical expertise and career highlights

### Requirement 5: Mobile Responsiveness

**User Story:** As a mobile user, I want the portfolio to display correctly on my device, so that I can read content and interact with elements easily.

#### Acceptance Criteria

1. THE Mobile_Viewport SHALL be configured with width=device-width, initial-scale=1, and maximum-scale=5
2. WHEN the Portfolio_System renders on mobile devices, THE layout SHALL use single-column grid layout
3. WHEN the Portfolio_System renders on tablet devices, THE layout SHALL use two-column grid layout where appropriate
4. WHEN the Portfolio_System renders on desktop devices, THE layout SHALL use three-column grid layout where appropriate
5. THE Portfolio_System SHALL ensure all text has sufficient padding to prevent touching screen edges
6. THE Portfolio_System SHALL ensure grid containers collapse responsively using Tailwind classes: grid-cols-1, md:grid-cols-2, lg:grid-cols-3

### Requirement 6: Touch Target Accessibility

**User Story:** As a mobile user, I want interactive elements to be easily tappable, so that I can navigate the site without frustration.

#### Acceptance Criteria

1. WHEN an interactive element is rendered, THE Touch_Target SHALL have a minimum height of 44px
2. WHEN an interactive element is rendered, THE Touch_Target SHALL have a minimum width of 44px
3. THE Portfolio_System SHALL apply min-h-[44px] and min-w-[44px] classes to all buttons and links
4. THE Portfolio_System SHALL ensure adequate spacing between adjacent touch targets

### Requirement 7: Performance Optimization

**User Story:** As a visitor, I want the site to respond quickly to my interactions, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Portfolio_System SHALL achieve an Interaction to Next Paint (INP) score below 200ms
2. WHEN loading icons, THE Portfolio_System SHALL use tree-shaking to import only required Lucide React icons
3. WHEN using animations, THE Portfolio_System SHALL defer animations until elements are in viewport using whileInView
4. WHEN loading third-party scripts, THE Portfolio_System SHALL use the lazyOnload strategy
5. THE Portfolio_System SHALL avoid blocking the main thread during initial render

### Requirement 8: Social Media Integration

**User Story:** As a visitor, I want to easily find and connect with the portfolio owner on social platforms, so that I can follow their work and reach out.

#### Acceptance Criteria

1. THE Portfolio_System SHALL display visible social media links in the footer
2. WHEN displaying social links, THE Portfolio_System SHALL include X/Twitter, LinkedIn, GitHub, and Email
3. THE Portfolio_System SHALL use aria-label attributes on social links for accessibility
4. THE Portfolio_System SHALL open external social links in new tabs using target="_blank" and rel="noopener noreferrer"
5. THE Portfolio_System SHALL display a copyright notice with the current year

### Requirement 9: Resume Accessibility

**User Story:** As a recruiter or potential employer, I want to easily download the portfolio owner's resume, so that I can review their qualifications offline.

#### Acceptance Criteria

1. THE Portfolio_System SHALL provide a resume download link
2. WHEN a user clicks the resume download link, THE Portfolio_System SHALL serve the PDF file from the public/files directory
3. THE Portfolio_System SHALL ensure the resume link is prominently displayed and easily accessible
4. THE Portfolio_System SHALL use appropriate touch target sizing for the resume download button

### Requirement 10: Build and Deployment Configuration

**User Story:** As a developer, I want the SEO optimizations to be automatically applied during the build process, so that I don't have to manually generate files.

#### Acceptance Criteria

1. THE Portfolio_System SHALL install and configure next-sitemap package
2. WHEN the Portfolio_System builds, THE sitemap SHALL be automatically generated
3. THE Portfolio_System SHALL include a next-sitemap.config.js file with siteUrl set to https://www.rajadubey.in
4. THE Portfolio_System SHALL configure next-sitemap to generate robots.txt automatically
5. THE Portfolio_System SHALL include sitemap generation in the build script

### Requirement 11: Image Optimization

**User Story:** As a visitor, I want images to load quickly without impacting page performance, so that I can view the portfolio content efficiently.

#### Acceptance Criteria

1. THE Portfolio_System SHALL use Next.js Image component for all images
2. WHEN displaying images, THE Portfolio_System SHALL provide width and height attributes to prevent layout shift
3. THE Portfolio_System SHALL use lazy loading for images below the fold
4. THE Portfolio_System SHALL serve images in modern formats (WebP, AVIF) with fallbacks
5. THE Portfolio_System SHALL provide appropriate alt text for all images for accessibility
6. WHEN images are loading, THE Portfolio_System SHALL display placeholder or blur effect

### Requirement 12: Semantic HTML and Accessibility

**User Story:** As a user with assistive technology, I want the portfolio to use proper semantic HTML, so that I can navigate and understand the content structure.

#### Acceptance Criteria

1. THE Portfolio_System SHALL use semantic HTML5 elements: header, nav, main, section, article, footer
2. THE Portfolio_System SHALL provide skip-to-content link for keyboard navigation
3. THE Portfolio_System SHALL ensure all interactive elements are keyboard accessible
4. THE Portfolio_System SHALL maintain a logical heading hierarchy (h1, h2, h3)
5. THE Portfolio_System SHALL provide ARIA labels for icon-only buttons and links
6. THE Portfolio_System SHALL ensure color contrast ratios meet WCAG AA standards (4.5:1 for normal text)
7. WHEN focus moves between elements, THE Portfolio_System SHALL display visible focus indicators

### Requirement 13: Core Web Vitals Compliance

**User Story:** As a search engine, I want the portfolio to meet Core Web Vitals thresholds, so that I can rank it favorably in search results.

#### Acceptance Criteria

1. THE Portfolio_System SHALL achieve a Largest Contentful Paint (LCP) score below 2.5 seconds
2. THE Portfolio_System SHALL achieve a First Input Delay (FID) score below 100ms
3. THE Portfolio_System SHALL achieve a Cumulative Layout Shift (CLS) score below 0.1
4. THE Portfolio_System SHALL achieve an Interaction to Next Paint (INP) score below 200ms
5. WHEN measuring performance, THE Portfolio_System SHALL pass Core Web Vitals on both mobile and desktop
6. THE Portfolio_System SHALL use font-display: swap for custom fonts to prevent invisible text

### Requirement 14: Analytics and Monitoring

**User Story:** As the portfolio owner, I want to track visitor behavior and performance metrics, so that I can understand how users interact with my site.

#### Acceptance Criteria

1. THE Portfolio_System SHALL integrate Vercel Analytics for performance monitoring
2. THE Portfolio_System SHALL load analytics scripts using the lazyOnload strategy
3. THE Portfolio_System SHALL respect user privacy preferences and consent
4. THE Portfolio_System SHALL track Core Web Vitals metrics in production
5. THE Portfolio_System SHALL not block page rendering while loading analytics

### Requirement 15: Content Security and Headers

**User Story:** As a security-conscious visitor, I want the portfolio to implement security best practices, so that my browsing is protected from common vulnerabilities.

#### Acceptance Criteria

1. THE Portfolio_System SHALL implement Content Security Policy (CSP) headers
2. THE Portfolio_System SHALL set X-Frame-Options to prevent clickjacking
3. THE Portfolio_System SHALL set X-Content-Type-Options to nosniff
4. THE Portfolio_System SHALL use HTTPS for all resources
5. THE Portfolio_System SHALL implement Referrer-Policy for privacy
6. THE Portfolio_System SHALL set appropriate cache headers for static assets

### Requirement 16: Link Management and Navigation

**User Story:** As a visitor, I want all links to work correctly and navigate smoothly, so that I can explore the portfolio without encountering broken links.

#### Acceptance Criteria

1. THE Portfolio_System SHALL ensure all internal links use relative paths or Next.js Link component
2. THE Portfolio_System SHALL ensure all external links open in new tabs with rel="noopener noreferrer"
3. THE Portfolio_System SHALL provide smooth scroll behavior for anchor links
4. WHEN a link is hovered, THE Portfolio_System SHALL provide visual feedback
5. THE Portfolio_System SHALL ensure no broken links exist (404 errors)
6. THE Portfolio_System SHALL implement proper URL structure without trailing slashes inconsistencies

### Requirement 17: Data Layer Enhancement

**User Story:** As a developer maintaining the portfolio, I want comprehensive, accurate data in the data layer, so that all content reflects the engineer's actual experience and projects.

#### Acceptance Criteria

1. THE Portfolio_System SHALL update the personal title from "Software Engineer" to "Senior Software Engineer - UI"
2. THE Portfolio_System SHALL include country code (+91) in phone number
3. THE Portfolio_System SHALL expand the about section to minimum 300 words
4. THE Portfolio_System SHALL include specific project details: AI-Powered Code Review Agent with Ollama and Deepseek-coder
5. THE Portfolio_System SHALL include Custom React SSR Engine project with Webpack and Babel details
6. THE Portfolio_System SHALL update experience descriptions to include quantifiable achievements
7. THE Portfolio_System SHALL ensure all social media URLs are correct and active

### Requirement 18: Error Handling and Fallbacks

**User Story:** As a visitor, I want graceful error handling when things go wrong, so that I can still access portfolio content even if some features fail.

#### Acceptance Criteria

1. WHEN a resource fails to load, THE Portfolio_System SHALL display a fallback UI
2. WHEN JavaScript is disabled, THE Portfolio_System SHALL still display core content
3. THE Portfolio_System SHALL implement error boundaries for React components
4. WHEN an image fails to load, THE Portfolio_System SHALL display a placeholder
5. THE Portfolio_System SHALL provide a custom 404 page for non-existent routes

### Requirement 19: Internationalization Preparation

**User Story:** As a developer planning for future growth, I want the portfolio structure to support internationalization, so that content can be easily translated later.

#### Acceptance Criteria

1. THE Portfolio_System SHALL set the html lang attribute to "en"
2. THE Portfolio_System SHALL use locale-aware date formatting
3. THE Portfolio_System SHALL structure content in the data layer for easy translation
4. THE Portfolio_System SHALL set Open Graph locale to "en_IN"
5. THE Portfolio_System SHALL avoid hardcoded text in components, preferring data layer references

### Requirement 20: Progressive Enhancement

**User Story:** As a visitor with varying network conditions, I want the portfolio to load core content first, so that I can access information even on slow connections.

#### Acceptance Criteria

1. THE Portfolio_System SHALL render critical above-the-fold content without JavaScript
2. THE Portfolio_System SHALL defer non-critical CSS and JavaScript
3. THE Portfolio_System SHALL implement progressive enhancement for animations
4. WHEN network is slow, THE Portfolio_System SHALL prioritize text content over images
5. THE Portfolio_System SHALL use resource hints (preconnect, dns-prefetch) for external domains

### Requirement 21: Content Management System Integration

**User Story:** As the portfolio owner, I want a headless CMS to manage content dynamically, so that I can update experience, projects, and profile information without code changes.

#### Acceptance Criteria

1. THE Portfolio_System SHALL integrate Payload CMS 3.0 with native Next.js support
2. THE Portfolio_System SHALL use MongoDB Atlas as the database backend for CMS data
3. THE Portfolio_System SHALL configure Payload CMS with TypeScript for type safety
4. THE Portfolio_System SHALL provide an admin interface at /admin for content management
5. THE Portfolio_System SHALL authenticate CMS access with secure credentials
6. WHEN the Portfolio_System builds, THE CMS SHALL be accessible in both development and production environments

### Requirement 22: CMS Schema and Collections

**User Story:** As the portfolio owner, I want structured content collections in the CMS, so that I can manage different types of content independently.

#### Acceptance Criteria

1. THE Portfolio_System SHALL define a Global Profile collection as a singleton
2. THE Profile collection SHALL include fields: name, title, bio (Rich Text), resumeURL, socialLinks array, seoTitle, seoDescription
3. THE Portfolio_System SHALL define an Experience collection with fields: company, role, startDate, endDate, description, techStack array, logo
4. THE Portfolio_System SHALL define a Projects collection with fields: title, category, description, techStack array, repoLink, liveLink, coverImage
5. THE Portfolio_System SHALL define a Skills collection with fields: name, iconName, category
6. THE Portfolio_System SHALL ensure all collections are strictly typed with TypeScript interfaces
7. THE Portfolio_System SHALL validate required fields and data types in the CMS schema

### Requirement 23: Media Management with ImageKit

**User Story:** As the portfolio owner, I want optimized image delivery through a CDN, so that images load quickly and improve Core Web Vitals scores.

#### Acceptance Criteria

1. THE Portfolio_System SHALL integrate ImageKit as the media CDN
2. THE Portfolio_System SHALL configure Payload CMS upload collection to offload files to ImageKit
3. THE Portfolio_System SHALL create a custom Next.js Image Loader for ImageKit URLs
4. WHEN images are requested, THE Portfolio_System SHALL apply automatic transformations: quality optimization (q-80), format conversion (f-auto)
5. THE Portfolio_System SHALL use ImageKit URLs for all project cover images and logos
6. THE Portfolio_System SHALL implement lazy loading for images below the fold
7. THE Portfolio_System SHALL provide responsive image sizes using ImageKit transformations

### Requirement 24: Content Seeding and Migration

**User Story:** As a developer, I want the CMS to be pre-populated with accurate portfolio data, so that the site launches with complete, professional content.

#### Acceptance Criteria

1. THE Portfolio_System SHALL create a seed script to populate initial CMS data
2. THE seed script SHALL populate Profile data: name "Raja Babu Dubey", title "Senior Software Engineer - UI", bio with 300+ words
3. THE seed script SHALL populate Experience data for Oxyzo Financial Services (May 2025 - Present) and OfBusiness (Dec 2020 - Apr 2025)
4. THE seed script SHALL populate Projects data: AI-Powered Code Review Agent, Custom React SSR Boilerplate, Note App
5. THE seed script SHALL populate Skills data with all technical skills from the resume
6. THE seed script SHALL include social links: LinkedIn, GitHub, X/Twitter
7. THE Portfolio_System SHALL NOT use lorem ipsum or placeholder text in seeded data

### Requirement 25: Dynamic Sitemap and Robots Generation

**User Story:** As a search engine, I want dynamically generated sitemaps based on CMS content, so that I can discover all portfolio pages including dynamically created project pages.

#### Acceptance Criteria

1. THE Portfolio_System SHALL generate robots.txt dynamically based on CMS configuration
2. THE Portfolio_System SHALL generate sitemap.xml dynamically including all CMS-managed pages
3. WHEN new projects are added to the CMS, THE sitemap SHALL automatically include them
4. THE Portfolio_System SHALL update sitemap lastmod timestamps when content changes
5. THE Portfolio_System SHALL set appropriate priority values for different page types in the sitemap

### Requirement 26: CMS-Driven Metadata

**User Story:** As the portfolio owner, I want to manage SEO metadata through the CMS, so that I can optimize titles and descriptions without code changes.

#### Acceptance Criteria

1. THE Portfolio_System SHALL use Profile singleton data to populate root layout metadata
2. WHEN Profile seoTitle is set in CMS, THE Portfolio_System SHALL use it as the page title
3. WHEN Profile seoDescription is set in CMS, THE Portfolio_System SHALL use it as the meta description
4. THE Portfolio_System SHALL generate Open Graph tags from CMS Profile data
5. THE Portfolio_System SHALL generate Twitter Card tags from CMS Profile data
6. WHEN project pages are created, THE Portfolio_System SHALL use project title and description for page-specific metadata

### Requirement 27: Type Safety and Data Validation

**User Story:** As a developer, I want strict TypeScript types for all CMS data, so that I can catch errors at compile time and ensure data consistency.

#### Acceptance Criteria

1. THE Portfolio_System SHALL generate TypeScript types from Payload CMS collections
2. THE Portfolio_System SHALL use generated types in all components consuming CMS data
3. THE Portfolio_System SHALL validate CMS data against schema before saving
4. WHEN required fields are missing, THE CMS SHALL prevent content publication
5. THE Portfolio_System SHALL provide type-safe access to nested CMS fields
6. THE Portfolio_System SHALL ensure techStack arrays contain only strings
7. THE Portfolio_System SHALL validate URL formats for social links and project links
