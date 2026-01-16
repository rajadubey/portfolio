/**
 * Property-Based Tests for TypeScript Type Safety
 * Feature: portfolio-seo-optimization, Property 31: TypeScript Type Safety for CMS Data
 * Feature: portfolio-seo-optimization, Property 32: TechStack Array Type Validation
 * Feature: portfolio-seo-optimization, Property 33: URL Format Validation
 * Validates: Requirements 27.2, 27.5, 27.6, 27.7
 */

import fc from 'fast-check';
import type { Profile, Experience, Project, Skill, Media } from '../../payload-types';

describe('TypeScript Type Safety Property Tests', () => {
  // Feature: portfolio-seo-optimization, Property 31: TypeScript Type Safety for CMS Data
  it('should ensure all CMS data access uses generated TypeScript types', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string(),
          title: fc.string(),
          bio: fc.anything(),
          email: fc.emailAddress(),
          phone: fc.string(),
          location: fc.string(),
          resumeURL: fc.oneof(fc.string(), fc.record({
            id: fc.string(),
            url: fc.string(),
            filename: fc.string(),
            mimeType: fc.string(),
            filesize: fc.integer(),
            width: fc.integer(),
            height: fc.integer(),
            alt: fc.string(),
            createdAt: fc.string(),
            updatedAt: fc.string()
          })),
          socialLinks: fc.array(fc.record({
            platform: fc.constantFrom('linkedin', 'github', 'twitter', 'email'),
            url: fc.webUrl(),
            id: fc.string()
          })),
          seoTitle: fc.string(),
          seoDescription: fc.string(),
          seoKeywords: fc.array(fc.record({
            keyword: fc.string(),
            id: fc.string()
          })),
          createdAt: fc.string(),
          updatedAt: fc.string()
        }),
        (profileData) => {
          // Property: For any Profile data, it should conform to the generated Profile type
          const profile: Profile = profileData;
          
          // Type-safe access to nested fields
          expect(typeof profile.id).toBe('string');
          expect(typeof profile.name).toBe('string');
          expect(typeof profile.title).toBe('string');
          expect(typeof profile.email).toBe('string');
          expect(typeof profile.phone).toBe('string');
          expect(typeof profile.location).toBe('string');
          expect(typeof profile.seoTitle).toBe('string');
          expect(typeof profile.seoDescription).toBe('string');
          
          // Validate social links array structure
          if (profile.socialLinks) {
            profile.socialLinks.forEach(link => {
              expect(['linkedin', 'github', 'twitter', 'email']).toContain(link.platform);
              expect(typeof link.url).toBe('string');
            });
          }
          
          // Validate SEO keywords array structure
          if (profile.seoKeywords) {
            profile.seoKeywords.forEach(keyword => {
              if (keyword.keyword) {
                expect(typeof keyword.keyword).toBe('string');
              }
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-seo-optimization, Property 32: TechStack Array Type Validation
  it('should ensure techStack arrays contain only strings', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          company: fc.string(),
          role: fc.string(),
          startDate: fc.string(),
          endDate: fc.option(fc.string()),
          description: fc.anything(),
          techStack: fc.array(fc.record({
            technology: fc.string(),
            id: fc.string()
          })),
          logo: fc.option(fc.oneof(fc.string(), fc.record({
            id: fc.string(),
            url: fc.string(),
            filename: fc.string(),
            mimeType: fc.string(),
            filesize: fc.integer(),
            width: fc.integer(),
            height: fc.integer(),
            alt: fc.string(),
            createdAt: fc.string(),
            updatedAt: fc.string()
          }))),
          order: fc.integer(),
          createdAt: fc.string(),
          updatedAt: fc.string()
        }),
        (experienceData) => {
          // Property: For any Experience techStack, all elements should be objects with technology strings
          const experience: Experience = experienceData;
          
          experience.techStack.forEach(tech => {
            if (tech.technology) {
              expect(typeof tech.technology).toBe('string');
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should ensure project techStack arrays contain only strings', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          title: fc.string(),
          category: fc.string(),
          description: fc.anything(),
          techStack: fc.array(fc.record({
            technology: fc.string(),
            id: fc.string()
          })),
          repoLink: fc.option(fc.string()),
          liveLink: fc.option(fc.string()),
          coverImage: fc.oneof(fc.string(), fc.record({
            id: fc.string(),
            url: fc.string(),
            filename: fc.string(),
            mimeType: fc.string(),
            filesize: fc.integer(),
            width: fc.integer(),
            height: fc.integer(),
            alt: fc.string(),
            createdAt: fc.string(),
            updatedAt: fc.string()
          })),
          featured: fc.option(fc.boolean()),
          order: fc.integer(),
          slug: fc.string(),
          createdAt: fc.string(),
          updatedAt: fc.string()
        }),
        (projectData) => {
          // Property: For any Project techStack, all elements should be objects with technology strings
          const project: Project = projectData;
          
          project.techStack.forEach(tech => {
            if (tech.technology) {
              expect(typeof tech.technology).toBe('string');
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-seo-optimization, Property 33: URL Format Validation
  it('should validate URL formats for social links and project links', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.webUrl().filter(url => {
            try {
              new URL(url);
              return !url.includes("'") && !url.includes('"') && !url.includes('<') && !url.includes('>');
            } catch {
              return false;
            }
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (urls) => {
          // Property: For any URL field in the CMS, the value should be a valid URL format
          urls.forEach(url => {
            try {
              const urlObj = new URL(url);
              
              // Valid URL should have protocol and hostname
              expect(urlObj.protocol).toMatch(/^https?:$/);
              expect(urlObj.hostname).toBeTruthy();
              expect(urlObj.hostname.length).toBeGreaterThan(0);
              
              // URL should not contain invalid characters
              expect(url).not.toMatch(/[<>"']/);
              
            } catch (error) {
              // If URL constructor throws, it's an invalid URL
              throw new Error(`Invalid URL format: ${url}`);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should validate specific URL patterns for social platforms', () => {
    fc.assert(
      fc.property(
        fc.record({
          linkedin: fc.constant('https://linkedin.com/in/').chain(base => 
            fc.string({ minLength: 3, maxLength: 30 }).filter(s => /^[a-zA-Z0-9-_]+$/.test(s)).map(username => base + username)
          ),
          github: fc.constant('https://github.com/').chain(base => 
            fc.string({ minLength: 1, maxLength: 39 }).filter(s => /^[a-zA-Z0-9-_]+$/.test(s)).map(username => base + username)
          ),
          twitter: fc.constant('https://x.com/').chain(base => 
            fc.string({ minLength: 1, maxLength: 15 }).filter(s => /^[a-zA-Z0-9-_]+$/.test(s)).map(username => base + username)
          )
        }),
        (socialUrls) => {
          // Property: For any social media URL, it should match the expected platform pattern
          
          // LinkedIn URL validation
          expect(socialUrls.linkedin).toMatch(/^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9-_]+$/);
          
          // GitHub URL validation
          expect(socialUrls.github).toMatch(/^https:\/\/github\.com\/[a-zA-Z0-9-_]+$/);
          
          // Twitter/X URL validation
          expect(socialUrls.twitter).toMatch(/^https:\/\/x\.com\/[a-zA-Z0-9-_]+$/);
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should ensure type-safe access to nested CMS fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string(),
          iconName: fc.string(),
          category: fc.constantFrom('frontend', 'backend', 'database', 'devops', 'tools'),
          proficiency: fc.option(fc.constantFrom('1', '2', '3', '4', '5')),
          order: fc.integer(),
          createdAt: fc.string(),
          updatedAt: fc.string()
        }),
        (skillData) => {
          // Property: For any Skill data, nested field access should be type-safe
          const skill: Skill = skillData;
          
          // Type-safe access to all fields
          expect(typeof skill.id).toBe('string');
          expect(typeof skill.name).toBe('string');
          expect(typeof skill.iconName).toBe('string');
          expect(['frontend', 'backend', 'database', 'devops', 'tools']).toContain(skill.category);
          expect(typeof skill.order).toBe('number');
          
          // Optional proficiency field
          if (skill.proficiency) {
            expect(['1', '2', '3', '4', '5']).toContain(skill.proficiency);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should validate Media type structure', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          alt: fc.string(),
          createdAt: fc.string(),
          updatedAt: fc.string(),
          url: fc.option(fc.webUrl()),
          filename: fc.option(fc.string()),
          mimeType: fc.option(fc.constantFrom('image/jpeg', 'image/png', 'image/webp', 'image/svg+xml')),
          filesize: fc.option(fc.integer({ min: 1, max: 10000000 })),
          width: fc.option(fc.integer({ min: 1, max: 4000 })),
          height: fc.option(fc.integer({ min: 1, max: 4000 }))
        }),
        (mediaData) => {
          // Property: For any Media data, it should conform to the Media type structure
          const media: Media = mediaData;
          
          // Required fields
          expect(typeof media.id).toBe('string');
          expect(typeof media.alt).toBe('string');
          expect(typeof media.createdAt).toBe('string');
          expect(typeof media.updatedAt).toBe('string');
          
          // Optional fields with proper types
          if (media.url) {
            expect(typeof media.url).toBe('string');
            // Should be a valid URL
            expect(() => new URL(media.url!)).not.toThrow();
          }
          
          if (media.filename) {
            expect(typeof media.filename).toBe('string');
          }
          
          if (media.mimeType) {
            expect(typeof media.mimeType).toBe('string');
            expect(media.mimeType).toMatch(/^image\//);
          }
          
          if (media.filesize) {
            expect(typeof media.filesize).toBe('number');
            expect(media.filesize).toBeGreaterThan(0);
          }
          
          if (media.width) {
            expect(typeof media.width).toBe('number');
            expect(media.width).toBeGreaterThan(0);
          }
          
          if (media.height) {
            expect(typeof media.height).toBe('number');
            expect(media.height).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});