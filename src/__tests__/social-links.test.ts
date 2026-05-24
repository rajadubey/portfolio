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

describe('Property 7: External Links Security', () => {
  it('should have proper security attributes for external links', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all external links (target="_blank")
        const externalLinks = container.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
          const rel = link.getAttribute('rel');
          
          // External links should have rel="noopener noreferrer" for security
          expect(rel).toContain('noopener');
          expect(rel).toContain('noreferrer');
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

describe('Property 23: Valid Social Media URLs', () => {
  it('should have valid social media URLs', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find social media links
        const socialLinks = container.querySelectorAll('a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="x.com"]');
        
        socialLinks.forEach(link => {
          const href = link.getAttribute('href');
          expect(href).toBeTruthy();
          
          // Should be valid URLs
          expect(() => new URL(href!)).not.toThrow();
          
          // Should use HTTPS
          expect(href).toMatch(/^https:\/\//);
          
          // Should be from known social media domains
          expect(href).toMatch(/(github\.com|linkedin\.com|twitter\.com|x\.com)/);
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});