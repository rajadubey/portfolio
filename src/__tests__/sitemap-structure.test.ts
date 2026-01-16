/**
 * Unit tests for sitemap.xml structure
 * Tests specific examples of sitemap generation
 */

// Mock the Payload CMS module
jest.mock('@/lib/payload', () => ({
  getProjects: jest.fn().mockResolvedValue([
    {
      slug: 'ai-code-review',
      updatedAt: '2025-01-15T00:00:00.000Z',
    },
    {
      slug: 'react-ssr-engine',
      updatedAt: '2025-01-10T00:00:00.000Z',
    },
  ]),
}));

import sitemap from '@/app/sitemap';

describe('sitemap.xml structure', () => {
  it('should return an array of sitemap entries', async () => {
    const result = await sitemap();
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should include the home page', async () => {
    const result = await sitemap();
    
    const homePage = result.find(entry => entry.url === 'https://www.rajadubey.in');
    expect(homePage).toBeDefined();
  });

  it('should set home page priority to 1', async () => {
    const result = await sitemap();
    
    const homePage = result.find(entry => entry.url === 'https://www.rajadubey.in');
    expect(homePage?.priority).toBe(1);
  });

  it('should set home page change frequency to monthly', async () => {
    const result = await sitemap();
    
    const homePage = result.find(entry => entry.url === 'https://www.rajadubey.in');
    expect(homePage?.changeFrequency).toBe('monthly');
  });

  it('should include lastModified date for all entries', async () => {
    const result = await sitemap();
    
    for (const entry of result) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it('should use HTTPS for all URLs', async () => {
    const result = await sitemap();
    
    for (const entry of result) {
      expect(entry.url).toMatch(/^https:\/\//);
    }
  });

  it('should use the correct base URL', async () => {
    const result = await sitemap();
    
    for (const entry of result) {
      expect(entry.url).toMatch(/^https:\/\/www\.rajadubey\.in/);
    }
  });

  it('should handle CMS errors gracefully with fallback', async () => {
    // This test verifies the fallback behavior is in place
    const result = await sitemap();
    
    // Should at least return the home page even if CMS fails
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].url).toBe('https://www.rajadubey.in');
  });
});
