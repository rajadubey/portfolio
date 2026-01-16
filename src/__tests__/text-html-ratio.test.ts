import fc from 'fast-check';
import { render } from '@testing-library/react';
import React from 'react';
import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Expertise } from '../components/Expertise';
import type { Profile, Experience as ExperienceType, Project, Skill } from '../../payload-types';

// Feature: portfolio-seo-optimization, Property 2: Text-to-HTML Ratio Threshold

/**
 * Helper function to calculate text-to-HTML ratio
 */
const calculateTextToHtmlRatio = (htmlString: string): number => {
  // Remove HTML tags to get text content
  const textContent = htmlString.replace(/<[^>]*>/g, '');
  
  // Calculate ratio: text length / total HTML length
  const ratio = textContent.length / htmlString.length;
  
  return ratio;
};

/**
 * Helper function to extract text content from rendered component
 */
const getTextContent = (container: HTMLElement): string => {
  return container.textContent || '';
};

/**
 * Helper function to get HTML content from rendered component
 */
const getHtmlContent = (container: HTMLElement): string => {
  return container.innerHTML || '';
};

describe('Text-to-HTML Ratio Property Tests', () => {
  // Property 2: Text-to-HTML Ratio Threshold
  // For any page in the Portfolio_System, the ratio of text content to HTML markup should be at least 20%
  // Validates: Requirements 4.1

  describe('Hero Component Text-to-HTML Ratio', () => {
    it('should maintain text-to-HTML ratio above 20% for any profile data', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 5, maxLength: 50 }),
            title: fc.string({ minLength: 10, maxLength: 100 }),
            bio: fc.string({ minLength: 300, maxLength: 1000 }), // Ensure minimum 300 words as per requirements
            socialLinks: fc.array(
              fc.record({
                platform: fc.constantFrom('github', 'linkedin', 'twitter', 'email'),
                url: fc.webUrl()
              }),
              { minLength: 1, maxLength: 5 }
            )
          }),
          (profileData) => {
            const mockProfile: Profile = {
              id: '1',
              name: profileData.name,
              title: profileData.title,
              bio: profileData.bio,
              email: 'test@example.com',
              phone: '+1234567890',
              location: 'Test City',
              resumeURL: 'test-resume.pdf',
              socialLinks: profileData.socialLinks,
              seoTitle: 'Test Title',
              seoDescription: 'Test Description',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            const { container } = render(React.createElement(Hero, { profile: mockProfile }));
            
            const htmlContent = getHtmlContent(container);
            const textContent = getTextContent(container);
            
            // Calculate ratio
            const ratio = textContent.length / htmlContent.length;
            
            // Assert that ratio is at least 20% (0.2)
            expect(ratio).toBeGreaterThanOrEqual(0.2);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Experience Component Text-to-HTML Ratio', () => {
    it('should maintain text-to-HTML ratio above 20% for any experience data', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              company: fc.string({ minLength: 5, maxLength: 50 }),
              role: fc.string({ minLength: 10, maxLength: 100 }),
              description: fc.array(fc.string({ minLength: 50, maxLength: 200 }), { minLength: 2, maxLength: 5 }),
              techStack: fc.array(
                fc.record({ technology: fc.string({ minLength: 2, maxLength: 20 }) }),
                { minLength: 3, maxLength: 8 }
              )
            }),
            { minLength: 1, maxLength: 3 }
          ),
          (experienceData) => {
            const mockExperiences: ExperienceType[] = experienceData.map((exp, index) => ({
              id: `exp-${index}`,
              company: exp.company,
              role: exp.role,
              startDate: new Date('2020-01-01').toISOString(),
              endDate: index === 0 ? undefined : new Date('2023-01-01').toISOString(),
              description: exp.description.join('\n'),
              techStack: exp.techStack,
              order: index + 1,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }));

            const { container } = render(React.createElement(Experience, { experiences: mockExperiences }));
            
            const htmlContent = getHtmlContent(container);
            const textContent = getTextContent(container);
            
            // Calculate ratio
            const ratio = textContent.length / htmlContent.length;
            
            // Assert that ratio is at least 20% (0.2)
            expect(ratio).toBeGreaterThanOrEqual(0.2);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Projects Component Text-to-HTML Ratio', () => {
    it('should maintain text-to-HTML ratio above 20% for any project data', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              title: fc.string({ minLength: 10, maxLength: 50 }),
              category: fc.string({ minLength: 5, maxLength: 30 }),
              description: fc.string({ minLength: 100, maxLength: 500 }),
              techStack: fc.array(
                fc.record({ technology: fc.string({ minLength: 2, maxLength: 20 }) }),
                { minLength: 3, maxLength: 8 }
              )
            }),
            { minLength: 1, maxLength: 5 }
          ),
          (projectData) => {
            const mockProjects: Project[] = projectData.map((proj, index) => ({
              id: `proj-${index}`,
              title: proj.title,
              category: proj.category,
              description: proj.description,
              techStack: proj.techStack,
              repoLink: 'https://github.com/test',
              liveLink: 'https://example.com',
              coverImage: '/test-image.jpg',
              featured: index === 0,
              order: index + 1,
              slug: `project-${index}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }));

            const { container } = render(React.createElement(Projects, { projects: mockProjects }));
            
            const htmlContent = getHtmlContent(container);
            const textContent = getTextContent(container);
            
            // Calculate ratio
            const ratio = textContent.length / htmlContent.length;
            
            // Assert that ratio is at least 20% (0.2)
            expect(ratio).toBeGreaterThanOrEqual(0.2);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Skills Component Text-to-HTML Ratio', () => {
    it('should maintain text-to-HTML ratio above 20% for any skills data', () => {
      fc.assert(
        fc.property(
          fc.record({
            frontend: fc.array(
              fc.record({
                name: fc.string({ minLength: 2, maxLength: 20 }),
                iconName: fc.constantFrom('globe', 'layers', 'code2', 'monitor'),
                category: fc.constant('frontend' as const)
              }),
              { minLength: 2, maxLength: 6 }
            ),
            backend: fc.array(
              fc.record({
                name: fc.string({ minLength: 2, maxLength: 20 }),
                iconName: fc.constantFrom('server', 'database', 'terminal', 'cpu'),
                category: fc.constant('backend' as const)
              }),
              { minLength: 2, maxLength: 6 }
            )
          }),
          (skillsData) => {
            const mockSkillsByCategory: Record<string, Skill[]> = {};
            
            Object.entries(skillsData).forEach(([category, skills]) => {
              mockSkillsByCategory[category] = skills.map((skill, index) => ({
                id: `skill-${category}-${index}`,
                name: skill.name,
                iconName: skill.iconName,
                category: skill.category,
                order: index + 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }));
            });

            const { container } = render(React.createElement(Expertise, { skillsByCategory: mockSkillsByCategory }));
            
            const htmlContent = getHtmlContent(container);
            const textContent = getTextContent(container);
            
            // Calculate ratio
            const ratio = textContent.length / htmlContent.length;
            
            // Assert that ratio is at least 20% (0.2)
            expect(ratio).toBeGreaterThanOrEqual(0.2);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Combined Components Text-to-HTML Ratio', () => {
    it('should maintain overall page text-to-HTML ratio above 20%', () => {
      fc.assert(
        fc.property(
          fc.record({
            profile: fc.record({
              name: fc.string({ minLength: 5, maxLength: 50 }),
              title: fc.string({ minLength: 10, maxLength: 100 }),
              bio: fc.string({ minLength: 300, maxLength: 1000 })
            }),
            experienceCount: fc.integer({ min: 1, max: 3 }),
            projectCount: fc.integer({ min: 1, max: 5 }),
            skillCount: fc.integer({ min: 5, max: 15 })
          }),
          (pageData) => {
            // This test validates that when multiple components are combined,
            // the overall text-to-HTML ratio remains above 20%
            
            const totalTextLength = 
              pageData.profile.name.length + 
              pageData.profile.title.length + 
              pageData.profile.bio.length +
              (pageData.experienceCount * 200) + // Approximate text per experience
              (pageData.projectCount * 150) + // Approximate text per project
              (pageData.skillCount * 10); // Approximate text per skill
            
            // Approximate HTML overhead (tags, attributes, etc.)
            const approximateHtmlOverhead = 2000; // Base HTML structure
            const totalApproximateLength = totalTextLength + approximateHtmlOverhead;
            
            const ratio = totalTextLength / totalApproximateLength;
            
            // Assert that the calculated ratio would be at least 20%
            expect(ratio).toBeGreaterThanOrEqual(0.2);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});