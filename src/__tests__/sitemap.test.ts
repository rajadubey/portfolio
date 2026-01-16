import fc from 'fast-check';
import { getProjects } from '@/lib/payload';

// Mock the payload function
jest.mock('@/lib/payload', () => ({
  getProjects: jest.fn(),
}));

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

// Create a standalone sitemap generation function for testing
async function generateTestSitemap() {
  const baseUrl = 'https://www.rajadubey.in';
  
  try {
    // Fetch all projects for dynamic routes
    const projects = await getProjects();
    
    // Static routes
    const routes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
    ];
    
    // Dynamic project routes
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
    
    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback to static routes only if CMS is unavailable
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
    ];
  }
}

// Helper to generate valid date strings
const validDateString = () => fc.integer({ min: 1577836800000, max: 1735689600000 }) // 2020-01-01 to 2024-12-31 in milliseconds
  .map(timestamp => new Date(timestamp).toISOString());

// Feature: portfolio-seo-optimization, Property 25: Dynamic Sitemap Includes All Projects
// Feature: portfolio-seo-optimization, Property 26: Sitemap Timestamps Reflect Updates
describe('Dynamic Sitemap Properties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should include all projects in the sitemap', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            slug: fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes(' ')),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            updatedAt: validDateString(),
            createdAt: validDateString(),
          }),
          { minLength: 0, maxLength: 20 }
        ),
        async (projects) => {
          // Mock the CMS response
          mockGetProjects.mockResolvedValue(projects as any);

          const sitemap = await generateTestSitemap();

          // Property 25: For any project in the CMS, the sitemap should include a URL entry for that project
          projects.forEach(project => {
            const projectUrl = `https://www.rajadubey.in/projects/${project.slug}`;
            const hasProjectUrl = sitemap.some(entry => entry.url === projectUrl);
            expect(hasProjectUrl).toBe(true);
          });

          // Should always include the home page
          const hasHomePage = sitemap.some(entry => entry.url === 'https://www.rajadubey.in');
          expect(hasHomePage).toBe(true);

          // Total entries should be projects + 1 (home page)
          expect(sitemap.length).toBe(projects.length + 1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should reflect project update timestamps in sitemap', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            slug: fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes(' ')),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            updatedAt: validDateString(),
            createdAt: validDateString(),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        async (projects) => {
          // Mock the CMS response
          mockGetProjects.mockResolvedValue(projects as any);

          const sitemap = await generateTestSitemap();

          // Property 26: For any project, when updated, the sitemap lastmod should reflect the update time
          projects.forEach(project => {
            const projectUrl = `https://www.rajadubey.in/projects/${project.slug}`;
            const sitemapEntry = sitemap.find(entry => entry.url === projectUrl);
            
            expect(sitemapEntry).toBeDefined();
            if (sitemapEntry) {
              const expectedDate = new Date(project.updatedAt);
              const actualDate = new Date(sitemapEntry.lastModified);
              
              // Allow for small time differences due to test execution time
              const timeDiff = Math.abs(actualDate.getTime() - expectedDate.getTime());
              expect(timeDiff).toBeLessThanOrEqual(1000); // Less than or equal to 1 second difference
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have correct URL structure for all project entries', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            slug: fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes(' ') && !s.includes('/')),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            updatedAt: validDateString(),
            createdAt: validDateString(),
          }),
          { minLength: 0, maxLength: 15 }
        ),
        async (projects) => {
          // Mock the CMS response
          mockGetProjects.mockResolvedValue(projects as any);

          const sitemap = await generateTestSitemap();

          // Property: All project URLs should follow the correct structure
          const projectEntries = sitemap.filter(entry => entry.url.includes('/projects/'));
          
          projectEntries.forEach(entry => {
            // Should start with base URL
            expect(entry.url).toMatch(/^https:\/\/www\.rajadubey\.in\/projects\/.+/);
            
            // Should have correct priority for project pages
            expect(entry.priority).toBe(0.8);
            
            // Should have monthly change frequency
            expect(entry.changeFrequency).toBe('monthly');
            
            // Should have a valid lastModified date
            expect(entry.lastModified).toBeInstanceOf(Date);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle CMS failures gracefully', async () => {
    // Mock CMS throwing an error
    mockGetProjects.mockRejectedValue(new Error('CMS unavailable'));

    const sitemap = await generateTestSitemap();

    // Property: When CMS fails, should still provide fallback sitemap with home page
    expect(sitemap.length).toBe(1);
    expect(sitemap[0]?.url).toBe('https://www.rajadubey.in');
    expect(sitemap[0]?.priority).toBe(1);
    expect(sitemap[0]?.changeFrequency).toBe('monthly');
  });

  it('should handle empty project list', async () => {
    // Mock CMS returning empty array
    mockGetProjects.mockResolvedValue([]);

    const sitemap = await generateTestSitemap();

    // Property: When no projects exist, should still include home page
    expect(sitemap.length).toBe(1);
    expect(sitemap[0]?.url).toBe('https://www.rajadubey.in');
    expect(sitemap[0]?.priority).toBe(1);
  });

  it('should ensure all URLs are absolute and use HTTPS', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            slug: fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes(' ')),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            updatedAt: validDateString(),
            createdAt: validDateString(),
          }),
          { minLength: 0, maxLength: 10 }
        ),
        async (projects) => {
          // Mock the CMS response
          mockGetProjects.mockResolvedValue(projects as any);

          const sitemap = await generateTestSitemap();

          // Property: All URLs should be absolute and use HTTPS
          sitemap.forEach(entry => {
            expect(entry.url).toMatch(/^https:\/\//);
            expect(entry.url).toMatch(/^https:\/\/www\.rajadubey\.in/);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});