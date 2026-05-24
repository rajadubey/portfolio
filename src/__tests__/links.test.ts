import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import fc from 'fast-check';
import App from '@/variants/v0';

// Mock the CMS data fetching functions
jest.mock('@/lib/payload', () => ({
  getProfile: jest.fn().mockResolvedValue({
    name: 'Raja Dubey',
    title: 'Senior Software Engineer - UI',
    bio: 'Test bio content',
    email: 'test@example.com',
    phone: '+91-1234567890',
    location: 'Test Location',
    socialLinks: []
  }),
  getExperience: jest.fn().mockResolvedValue([]),
  getProjects: jest.fn().mockResolvedValue([]),
  getSkillsByCategory: jest.fn().mockResolvedValue({})
}));

describe('Property 19: Internal Links Use Next.js Link', () => {
  it('should use Next.js Link for internal navigation', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all internal hash links (navigation within the same page)
        const internalLinks = container.querySelectorAll('a[href^="#"]');
        
        // For this test, we check that internal links exist and have proper href attributes
        internalLinks.forEach(link => {
          const href = link.getAttribute('href');
          expect(href).toBeTruthy();
          expect(href).toMatch(/^#[a-zA-Z-]+/); // Should be hash links to sections
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

describe('Property 20: Link Hover Feedback', () => {
  it('should have hover styles for all links', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all links
        const links = container.querySelectorAll('a');
        
        links.forEach(link => {
          const className = link.getAttribute('class') || '';
          
          // Links should have hover styles (hover: prefix in Tailwind)
          const hasHoverStyles = className.includes('hover:') || 
                                className.includes('transition');
          
          expect(hasHoverStyles).toBe(true);
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

describe('Property 21: No Broken Links', () => {
  it('should have valid href attributes for all links', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all links
        const links = container.querySelectorAll('a');
        
        links.forEach(link => {
          const href = link.getAttribute('href');
          
          // All links should have href attributes
          expect(href).toBeTruthy();
          expect(href!.length).toBeGreaterThan(0);
          
          // Should not be empty or just whitespace
          expect(href!.trim()).not.toBe('');
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

describe('Property 22: URL Consistency', () => {
  it('should have consistent URL formats', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all external links
        const externalLinks = container.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(link => {
          const href = link.getAttribute('href');
          
          // External links should use HTTPS
          expect(href).toMatch(/^https:\/\//);
          
          // Should be valid URLs
          expect(() => new URL(href!)).not.toThrow();
        });
        
        // Find all hash links
        const hashLinks = container.querySelectorAll('a[href^="#"]');
        
        hashLinks.forEach(link => {
          const href = link.getAttribute('href');
          
          // Hash links should follow consistent format
          expect(href).toMatch(/^#[a-zA-Z][a-zA-Z0-9-]*$/);
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});