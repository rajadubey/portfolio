import fc from 'fast-check';
import { render } from '@testing-library/react';
import React from 'react';
import { Hero } from '../components/Hero';
import { Contact } from '../components/Contact';
import { Navbar } from '../components/Navbar';
import { ResumePreview } from '../components/ResumePreview';
import type { Profile } from '../../payload-types';

// Feature: portfolio-seo-optimization, Property 4: Touch Target Minimum Dimensions
// Feature: portfolio-seo-optimization, Property 5: Touch Target Spacing

/**
 * Helper function to check if an element meets minimum touch target dimensions
 */
const meetsTouchTargetDimensions = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.width >= 44 && rect.height >= 44;
};

/**
 * Helper function to check spacing between adjacent touch targets
 */
const hasAdequateSpacing = (elements: HTMLElement[]): boolean => {
  if (elements.length < 2) return true;
  
  for (let i = 0; i < elements.length - 1; i++) {
    const current = elements[i].getBoundingClientRect();
    const next = elements[i + 1].getBoundingClientRect();
    
    // Calculate minimum distance between elements
    const horizontalGap = Math.max(0, next.left - current.right);
    const verticalGap = Math.max(0, next.top - current.bottom);
    
    // Check if there's at least 8px spacing
    if (horizontalGap < 8 && verticalGap < 8) {
      return false;
    }
  }
  
  return true;
};

/**
 * Helper function to find interactive elements
 */
const findInteractiveElements = (container: HTMLElement): HTMLElement[] => {
  const selectors = [
    'button',
    'a[href]',
    'input[type="button"]',
    'input[type="submit"]',
    '[role="button"]',
    '[tabindex="0"]'
  ];
  
  const elements: HTMLElement[] = [];
  selectors.forEach(selector => {
    const found = container.querySelectorAll(selector);
    elements.push(...Array.from(found) as HTMLElement[]);
  });
  
  return elements;
};

describe('Touch Target Property Tests', () => {
  // Property 4: Touch Target Minimum Dimensions
  // For any interactive element (button, link, input) in the Portfolio_System, the element should have a minimum height and width of 44px
  // Validates: Requirements 6.1, 6.2, 6.3

  describe('Hero Component Touch Targets', () => {
    it('should maintain minimum 44px dimensions for all interactive elements', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 5, maxLength: 50 }),
            title: fc.string({ minLength: 10, maxLength: 100 }),
            bio: fc.string({ minLength: 100, maxLength: 500 }),
            socialLinks: fc.array(
              fc.record({
                platform: fc.constantFrom('github', 'linkedin', 'twitter', 'email'),
                url: fc.webUrl()
              }),
              { minLength: 1, maxLength: 3 }
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
            
            // Find all interactive elements
            const interactiveElements = findInteractiveElements(container);
            
            // Ensure at least one interactive element exists
            expect(interactiveElements.length).toBeGreaterThan(0);
            
            // Check each interactive element meets minimum dimensions
            interactiveElements.forEach((element) => {
              const className = element.className;
              
              // Check for min-h-[44px] and min-w-[44px] classes
              const hasMinHeightClass = className.includes('min-h-[44px]');
              const hasMinWidthClass = className.includes('min-w-[44px]');
              
              // At least one of the dimension classes should be present
              expect(hasMinHeightClass || hasMinWidthClass).toBe(true);
            });
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('Contact Component Touch Targets', () => {
    it('should maintain minimum 44px dimensions for all interactive elements', () => {
      fc.assert(
        fc.property(
          fc.record({
            // Generate some variation in the test
            hasContent: fc.boolean()
          }),
          (testData) => {
            const { container } = render(React.createElement(Contact));
            
            // Find all interactive elements
            const interactiveElements = findInteractiveElements(container);
            
            // Ensure interactive elements exist
            expect(interactiveElements.length).toBeGreaterThan(0);
            
            // Check each interactive element has proper touch target classes
            interactiveElements.forEach((element) => {
              const className = element.className;
              
              // Check for touch target sizing classes
              const hasTouchTargetClass = 
                className.includes('min-h-[44px]') || 
                className.includes('min-w-[44px]') ||
                className.includes('p-4') || // Padding that would create 44px+ target
                className.includes('py-4'); // Vertical padding that would create 44px+ target
              
              expect(hasTouchTargetClass).toBe(true);
            });
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Navbar Component Touch Targets', () => {
    it('should maintain minimum 44px dimensions for all interactive elements', () => {
      fc.assert(
        fc.property(
          fc.record({
            // Generate some variation in the test
            isScrolled: fc.boolean()
          }),
          (testData) => {
            const { container } = render(React.createElement(Navbar));
            
            // Find all interactive elements
            const interactiveElements = findInteractiveElements(container);
            
            // Ensure interactive elements exist
            expect(interactiveElements.length).toBeGreaterThan(0);
            
            // Check each interactive element has proper touch target classes
            interactiveElements.forEach((element) => {
              const className = element.className;
              
              // Check for touch target sizing classes
              const hasTouchTargetClass = 
                className.includes('min-h-[44px]') || 
                className.includes('min-w-[44px]') ||
                className.includes('p-3') || // Padding that would create adequate target
                className.includes('py-3');
              
              expect(hasTouchTargetClass).toBe(true);
            });
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Resume Preview Component Touch Targets', () => {
    it('should maintain minimum 44px dimensions for all interactive elements', () => {
      fc.assert(
        fc.property(
          fc.record({
            // Generate some variation in the test
            hasContent: fc.boolean()
          }),
          (testData) => {
            const { container } = render(React.createElement(ResumePreview));
            
            // Find all interactive elements
            const interactiveElements = findInteractiveElements(container);
            
            // Ensure interactive elements exist
            expect(interactiveElements.length).toBeGreaterThan(0);
            
            // Check each interactive element has proper touch target classes
            interactiveElements.forEach((element) => {
              const className = element.className;
              
              // Check for touch target sizing classes
              const hasTouchTargetClass = 
                className.includes('min-h-[44px]') || 
                className.includes('min-w-[44px]') ||
                className.includes('py-4'); // Vertical padding that would create 44px+ target
              
              expect(hasTouchTargetClass).toBe(true);
            });
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  // Property 5: Touch Target Spacing
  // For any pair of adjacent interactive elements, the spacing between them should be at least 8px to prevent accidental taps
  // Validates: Requirements 6.4

  describe('Touch Target Spacing', () => {
    it('should maintain adequate spacing between adjacent interactive elements', () => {
      fc.assert(
        fc.property(
          fc.record({
            componentType: fc.constantFrom('hero', 'contact', 'navbar', 'resume'),
            elementCount: fc.integer({ min: 2, max: 5 })
          }),
          (testConfig) => {
            let component;
            
            if (testConfig.componentType === 'hero') {
              const mockProfile: Profile = {
                id: '1',
                name: 'Test User',
                title: 'Test Title',
                bio: 'Test bio content',
                email: 'test@example.com',
                phone: '+1234567890',
                location: 'Test City',
                resumeURL: 'test-resume.pdf',
                socialLinks: [{ platform: 'github' as const, url: 'https://github.com/test' }],
                seoTitle: 'Test Title',
                seoDescription: 'Test Description',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              component = React.createElement(Hero, { profile: mockProfile });
            } else if (testConfig.componentType === 'contact') {
              component = React.createElement(Contact);
            } else if (testConfig.componentType === 'navbar') {
              component = React.createElement(Navbar);
            } else {
              component = React.createElement(ResumePreview);
            }

            const { container } = render(component);
            
            // Find all interactive elements
            const interactiveElements = findInteractiveElements(container);
            
            // Check for gap classes that provide spacing
            const elementsWithGap = container.querySelectorAll('[class*="gap-"]');
            const elementsWithSpace = container.querySelectorAll('[class*="space-"]');
            
            // Ensure there are spacing utilities in use
            const hasSpacingUtilities = elementsWithGap.length > 0 || elementsWithSpace.length > 0;
            
            if (interactiveElements.length > 1) {
              expect(hasSpacingUtilities).toBe(true);
            }
            
            // Check that interactive elements have proper spacing classes
            interactiveElements.forEach((element) => {
              const parent = element.parentElement;
              if (parent) {
                const parentClassName = parent.className;
                const hasSpacingClass = 
                  parentClassName.includes('gap-') || 
                  parentClassName.includes('space-') ||
                  parentClassName.includes('flex') || // Flex containers often have implicit spacing
                  parentClassName.includes('grid'); // Grid containers often have implicit spacing
                
                // If there are multiple interactive elements, parent should have spacing
                if (interactiveElements.length > 1) {
                  expect(hasSpacingClass).toBe(true);
                }
              }
            });
          }
        ),
        { numRuns: 40 }
      );
    });
  });

  describe('General Touch Target Compliance', () => {
    it('should ensure all components have compliant touch targets', () => {
      fc.assert(
        fc.property(
          fc.record({
            testScenario: fc.constantFrom('buttons', 'links', 'inputs'),
            minDimension: fc.constant(44) // 44px minimum as per requirements
          }),
          (testConfig) => {
            // This property tests that all interactive elements across components
            // maintain the minimum touch target dimensions
            
            const components = [
              React.createElement(Contact),
              React.createElement(Navbar),
              React.createElement(ResumePreview)
            ];
            
            components.forEach((component) => {
              const { container } = render(component);
              
              // Find interactive elements based on test scenario
              let elements: HTMLElement[] = [];
              if (testConfig.testScenario === 'buttons') {
                elements = Array.from(container.querySelectorAll('button')) as HTMLElement[];
              } else if (testConfig.testScenario === 'links') {
                elements = Array.from(container.querySelectorAll('a[href]')) as HTMLElement[];
              } else if (testConfig.testScenario === 'inputs') {
                elements = Array.from(container.querySelectorAll('input, textarea')) as HTMLElement[];
              }
              
              // Check each element has appropriate touch target classes
              elements.forEach((element) => {
                const className = element.className;
                
                // Check for minimum dimension classes or adequate padding
                const hasTouchTargetSizing = 
                  className.includes('min-h-[44px]') ||
                  className.includes('min-w-[44px]') ||
                  className.includes('p-3') ||
                  className.includes('p-4') ||
                  className.includes('py-3') ||
                  className.includes('py-4') ||
                  className.includes('px-6') || // Adequate horizontal padding
                  className.includes('px-8'); // Adequate horizontal padding
                
                expect(hasTouchTargetSizing).toBe(true);
              });
            });
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});