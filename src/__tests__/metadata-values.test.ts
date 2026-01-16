/**
 * Unit tests for metadata values
 * Tests specific examples of metadata generation
 */

// Mock the Analytics component
jest.mock('@/components/Analytics', () => ({
  Analytics: () => null,
}));

// Mock the Payload CMS module
jest.mock('@/lib/payload', () => ({
  getProfile: jest.fn().mockResolvedValue({
    name: 'Raja Dubey',
    title: 'Senior Software Engineer - UI',
    seoTitle: 'Raja Dubey | Senior Software Engineer - React & Cloud Architecture',
    seoDescription: 'Portfolio of Raja Dubey, a Senior Software Engineer specializing in React, Next.js, Spring Boot, and cloud architecture.',
    seoKeywords: [
      { keyword: 'Software Engineer' },
      { keyword: 'React' },
      { keyword: 'Next.js' },
    ],
  }),
}));

import { generateMetadata } from '@/app/layout';

describe('metadata values', () => {
  it('should generate metadata object', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata).toBeDefined();
    expect(typeof metadata).toBe('object');
  });

  it('should set metadataBase to HTTPS URL', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.metadataBase).toBeDefined();
    expect(metadata.metadataBase?.toString()).toMatch(/^https:\/\//);
  });

  it('should set metadataBase to rajadubey.in domain', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.metadataBase?.toString()).toContain('rajadubey.in');
  });

  it('should have a title configuration', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.title).toBeDefined();
  });

  it('should have a description', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.description).toBeDefined();
    expect(typeof metadata.description).toBe('string');
    expect(metadata.description.length).toBeGreaterThan(0);
  });

  it('should have keywords array', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.keywords).toBeDefined();
    expect(Array.isArray(metadata.keywords)).toBe(true);
  });

  it('should have author information', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.authors).toBeDefined();
    expect(Array.isArray(metadata.authors)).toBe(true);
    expect(metadata.authors.length).toBeGreaterThan(0);
  });

  it('should have viewport configuration', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.viewport).toBeDefined();
    expect(metadata.viewport).toHaveProperty('width', 'device-width');
    expect(metadata.viewport).toHaveProperty('initialScale', 1);
    expect(metadata.viewport).toHaveProperty('maximumScale', 5);
  });

  it('should have Open Graph configuration', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph).toHaveProperty('type', 'website');
    expect(metadata.openGraph).toHaveProperty('locale', 'en_IN');
  });

  it('should have Twitter Card configuration', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter).toHaveProperty('card', 'summary_large_image');
  });

  it('should have canonical URL', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.alternates).toBeDefined();
    expect(metadata.alternates).toHaveProperty('canonical', '/');
  });

  it('should have robots configuration', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.robots).toBeDefined();
    expect(metadata.robots).toHaveProperty('index', true);
    expect(metadata.robots).toHaveProperty('follow', true);
  });

  it('should have Google Bot specific configuration', async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.robots?.googleBot).toBeDefined();
    expect(metadata.robots?.googleBot).toHaveProperty('index', true);
    expect(metadata.robots?.googleBot).toHaveProperty('follow', true);
  });
});
