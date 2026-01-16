import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import fc from 'fast-check';
import App from '../app/page';

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

describe('Property 14: Heading Hierarchy', () => {
  it('should maintain logical heading hierarchy (h1 → h2 → h3)', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const AppComponent = await App();
        const { container } = render(AppComponent);
        
        // Get all heading elements
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingLevels = Array.from(headings).map(heading => 
          parseInt(heading.tagName.charAt(1))
        );
        
        // Check that we have at least one h1
        const h1Count = headingLevels.filter(level => level === 1).length;
        expect(h1Count).toBeGreaterThanOrEqual(1);
        
        // Check that heading levels don't skip (e.g., h1 → h3 without h2)
        for (let i = 1; i < headingLevels.length; i++) {
          const currentLevel = headingLevels[i];
          const previousLevel = headingLevels[i - 1];
          
          // Allow same level, one level down, or any level up
          const isValidProgression = 
            currentLevel === previousLevel || // Same level
            currentLevel === previousLevel + 1 || // One level down
            currentLevel < previousLevel; // Any level up
            
          expect(isValidProgression).toBe(true);
        }
        
        return true;
      }),
      { numRuns: 10 }
    );
  });
});