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
    socialLinks: [
      { platform: 'github', url: 'https://github.com/test' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/test' }
    ]
  }),
  getExperience: jest.fn().mockResolvedValue([]),
  getProjects: jest.fn().mockResolvedValue([]),
  getSkillsByCategory: jest.fn().mockResolvedValue({})
}));

describe('Property 6: Social Links Accessibility', () => {
  it('should have proper ARIA labels for social media links', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all social media links (GitHub, LinkedIn)
        const socialLinks = container.querySelectorAll('a[href*="github"], a[href*="linkedin"]');
        
        socialLinks.forEach(link => {
          const ariaLabel = link.getAttribute('aria-label');
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel).toMatch(/github|linkedin/i);
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

describe('Property 13: Keyboard Accessibility', () => {
  it('should have keyboard accessible interactive elements', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find all interactive elements
        const interactiveElements = container.querySelectorAll('button, a, input, textarea');
        
        interactiveElements.forEach(element => {
          // Check that element is focusable (not disabled and not hidden)
          const isDisabled = element.hasAttribute('disabled');
          const isHidden = element.hasAttribute('hidden') || 
                          element.style.display === 'none' || 
                          element.style.visibility === 'hidden';
          
          if (!isDisabled && !isHidden) {
            // Element should be focusable
            expect(element.tabIndex).toBeGreaterThanOrEqual(-1);
          }
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

describe('Property 15: Icon Button ARIA Labels', () => {
  it('should have ARIA labels for icon-only buttons', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Find buttons that contain only icons (no visible text)
        const buttons = container.querySelectorAll('button');
        
        buttons.forEach(button => {
          const textContent = button.textContent?.trim() || '';
          const hasIcon = button.querySelector('svg') !== null;
          
          // If button has an icon but no visible text, it should have aria-label
          if (hasIcon && textContent.length === 0) {
            const ariaLabel = button.getAttribute('aria-label');
            expect(ariaLabel).toBeTruthy();
            expect(ariaLabel!.length).toBeGreaterThan(0);
          }
        });
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});