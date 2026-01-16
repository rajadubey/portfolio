/**
 * Unit tests for robots.txt generation
 * Tests specific examples of robots.txt content
 */

import robots from '@/app/robots';

describe('robots.txt generation', () => {
  it('should allow all user agents to crawl the site', () => {
    const result = robots();
    
    expect(result.rules).toBeDefined();
    expect(result.rules).toHaveProperty('userAgent', '*');
  });

  it('should allow crawling of root path', () => {
    const result = robots();
    
    expect(result.rules).toHaveProperty('allow', '/');
  });

  it('should disallow crawling of admin routes', () => {
    const result = robots();
    
    expect(result.rules).toHaveProperty('disallow');
    expect(result.rules.disallow).toContain('/admin/');
  });

  it('should disallow crawling of API routes', () => {
    const result = robots();
    
    expect(result.rules).toHaveProperty('disallow');
    expect(result.rules.disallow).toContain('/api/');
  });

  it('should reference the sitemap location', () => {
    const result = robots();
    
    expect(result.sitemap).toBe('https://www.rajadubey.in/sitemap.xml');
  });

  it('should use HTTPS for sitemap URL', () => {
    const result = robots();
    
    expect(result.sitemap).toMatch(/^https:\/\//);
  });
});
