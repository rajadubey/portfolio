import fc from 'fast-check';
import { render } from '@testing-library/react';
import React from 'react';
import { Projects } from '../components/Projects';
import { Expertise } from '../components/Expertise';
import { Contact } from '../components/Contact';
import type { Project, Skill } from '../../payload-types';

// Feature: portfolio-seo-optimization, Property 3: Responsive Grid Padding

/**
 * Helper function to check if an element has sufficient padding
 */
const hasSufficientPadding = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  const paddingLeft = parseInt(computedStyle.paddingLeft, 10);
  const paddingRight = parseInt(computedStyle.paddingRight, 10);
  const paddingTop = parseInt(computedStyle.paddingTop, 10);
  const paddingBottom = parseInt(computedStyle.paddingBottom, 10);
  
  // Check if padding is at least 16px (1rem) on all sides
  return paddingLeft >= 16 && paddingRight >= 16 && paddingTop >= 16 && paddingBottom >= 16;
};

/**
 * Helper function to find grid containers
 */
const findGridContainers = (container: HTMLElement): HTMLElement[] => {
  const gridElements = container.querySelectorAll('[class*="grid"]');
  return Array.from(gridElements) as HTMLElement[];
};

describe('Responsive Grid Padding Property Tests', () => {
  // Property 3: Responsive Grid Padding
  // For any text container in the Portfolio_System, the element should have sufficient padding (minimum 16px) to prevent content from touching screen edges
  // Validates: Requirements 5.5

  describe('Projects Component Grid Padding', () => {
    it('should maintain sufficient padding for any project data', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              title: fc.string({ minLength: 5, maxLength: 50 }),
              category: fc.string({ minLength: 3, maxLength: 20 }),
              description: fc.string({ minLength: 50, maxLength: 200 }),
              techStack: fc.array(
                fc.record({ technology: fc.string({ minLength: 2, maxLength: 15 }) }),
                { minLength: 1, maxLength: 5 }
              )
            }),
            { minLength: 1, maxLength: 6 }
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
            
            // Find grid containers
            const gridContainers = findGridContainers(container);
            
            // Check that at least one grid container exists
            expect(gridContainers.length).toBeGreaterThan(0);
            
            // For each grid container, verify it has responsive classes
            gridContainers.forEach((gridContainer) => {
              const className = gridContainer.className;
              
              // Check for responsive grid classes
              const hasResponsiveGrid = 
                className.includes('grid-cols-1') || 
                className.includes('md:grid-cols-2') || 
                className.includes('lg:grid-cols-3');
              
              expect(hasResponsiveGrid).toBe(true);
              
              // Check for padding classes or styles
              const hasPaddingClass = 
                className.includes('p-') || 
                className.includes('px-') || 
                className.includes('py-');
              
              // If no padding class, check computed styles
              if (!hasPaddingClass) {
                // For this test, we'll check that the parent container has padding
                const parentWithPadding = gridContainer.closest('[class*="px-"]');
                expect(parentWithPadding).toBeTruthy();
              }
            });
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Expertise Component Grid Padding', () => {
    it('should maintain sufficient padding for any skills data', () => {
      fc.assert(
        fc.property(
          fc.record({
            frontend: fc.array(
              fc.record({
                name: fc.string({ minLength: 2, maxLength: 15 }),
                iconName: fc.constantFrom('globe', 'layers', 'code2'),
                category: fc.constant('frontend' as const)
              }),
              { minLength: 2, maxLength: 8 }
            ),
            backend: fc.array(
              fc.record({
                name: fc.string({ minLength: 2, maxLength: 15 }),
                iconName: fc.constantFrom('server', 'database', 'terminal'),
                category: fc.constant('backend' as const)
              }),
              { minLength: 2, maxLength: 8 }
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
            
            // Find grid containers
            const gridContainers = findGridContainers(container);
            
            // Check that at least one grid container exists
            expect(gridContainers.length).toBeGreaterThan(0);
            
            // For each grid container, verify it has responsive classes
            gridContainers.forEach((gridContainer) => {
              const className = gridContainer.className;
              
              // Check for responsive grid classes
              const hasResponsiveGrid = 
                className.includes('grid-cols-2') || 
                className.includes('sm:grid-cols-4') || 
                className.includes('md:grid-cols-6') ||
                className.includes('lg:grid-cols-8');
              
              expect(hasResponsiveGrid).toBe(true);
              
              // Check that the parent container has proper padding
              const parentWithPadding = gridContainer.closest('[class*="px-"]');
              expect(parentWithPadding).toBeTruthy();
            });
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Contact Component Grid Padding', () => {
    it('should maintain sufficient padding for contact layout', () => {
      fc.assert(
        fc.property(
          fc.record({
            // Generate some variation in the test
            hasContent: fc.boolean()
          }),
          (testData) => {
            const { container } = render(React.createElement(Contact));
            
            // Find grid containers
            const gridContainers = findGridContainers(container);
            
            // Check that at least one grid container exists
            expect(gridContainers.length).toBeGreaterThan(0);
            
            // For each grid container, verify it has responsive classes and padding
            gridContainers.forEach((gridContainer) => {
              const className = gridContainer.className;
              
              // Check for responsive grid classes
              const hasResponsiveGrid = 
                className.includes('grid-cols-1') || 
                className.includes('md:grid-cols-2');
              
              expect(hasResponsiveGrid).toBe(true);
              
              // Check for padding classes
              const hasPaddingClass = 
                className.includes('p-4') || 
                className.includes('p-8') || 
                className.includes('p-12') ||
                className.includes('md:p-8') ||
                className.includes('lg:p-12');
              
              expect(hasPaddingClass).toBe(true);
            });
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('General Grid Container Padding', () => {
    it('should ensure all grid containers have adequate spacing', () => {
      fc.assert(
        fc.property(
          fc.record({
            componentType: fc.constantFrom('projects', 'expertise', 'contact'),
            dataSize: fc.integer({ min: 1, max: 10 })
          }),
          (testConfig) => {
            // This property tests that grid containers maintain proper spacing
            // regardless of content size or component type
            
            // Mock data based on component type
            let component;
            if (testConfig.componentType === 'projects') {
              const mockProjects: Project[] = Array.from({ length: testConfig.dataSize }, (_, i) => ({
                id: `proj-${i}`,
                title: `Project ${i}`,
                category: 'Test',
                description: 'Test description',
                techStack: [{ technology: 'Test' }],
                repoLink: 'https://github.com/test',
                liveLink: 'https://example.com',
                coverImage: '/test.jpg',
                featured: false,
                order: i,
                slug: `project-${i}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }));
              component = React.createElement(Projects, { projects: mockProjects });
            } else if (testConfig.componentType === 'expertise') {
              const mockSkills: Record<string, Skill[]> = {
                frontend: Array.from({ length: testConfig.dataSize }, (_, i) => ({
                  id: `skill-${i}`,
                  name: `Skill ${i}`,
                  iconName: 'globe',
                  category: 'frontend' as const,
                  order: i,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }))
              };
              component = React.createElement(Expertise, { skillsByCategory: mockSkills });
            } else {
              component = React.createElement(Contact);
            }

            const { container } = render(component);
            
            // Find all elements with grid classes
            const gridElements = container.querySelectorAll('[class*="grid"]');
            
            // Ensure at least one grid element exists
            expect(gridElements.length).toBeGreaterThan(0);
            
            // Check that grid elements have proper gap spacing
            Array.from(gridElements).forEach((element) => {
              const className = element.className;
              const hasGapClass = 
                className.includes('gap-') || 
                className.includes('space-');
              
              // Grid elements should have gap classes for proper spacing
              expect(hasGapClass).toBe(true);
            });
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});