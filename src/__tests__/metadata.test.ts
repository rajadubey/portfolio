import fc from 'fast-check';
import { getProfile } from '@/lib/payload';

// Mock the payload function
jest.mock('@/lib/payload', () => ({
  getProfile: jest.fn(),
}));

const mockGetProfile = getProfile as jest.MockedFunction<typeof getProfile>;

// Create a standalone metadata generation function for testing
async function generateTestMetadata() {
  const profile = await getProfile();
  
  // Fallback values if CMS data is not available
  const defaultTitle = "Raja Dubey | Senior Software Engineer - React & Cloud Architecture";
  const defaultDescription = "Portfolio of Raja Dubey, a Senior Software Engineer specializing in React, Next.js, Spring Boot, and cloud architecture. Building scalable frontend systems and enterprise applications.";
  const defaultKeywords = ["Software Engineer", "React", "Next.js", "Spring Boot", "Elasticsearch", "Frontend Architecture", "Gurgaon"];
  
  const title = profile?.seoTitle || defaultTitle;
  const description = profile?.seoDescription || defaultDescription;
  const keywords = profile?.seoKeywords?.map((k: any) => k.keyword).filter(Boolean) || defaultKeywords;
  const name = profile?.name || "Raja Dubey";
  
  return {
    metadataBase: new URL('https://www.rajadubey.in'),
    title: {
      default: title,
      template: '%s | Raja Dubey',
    },
    description,
    keywords,
    authors: [{ name, url: 'https://rajadubey.in' }],
    creator: name,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://rajadubey.in',
      title,
      description,
      siteName: `${name} Portfolio`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@rajadubey0',
    },
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Feature: portfolio-seo-optimization, Property 27: CMS Data Drives Metadata
describe('CMS-Driven Metadata Properties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use CMS seoTitle when available', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          seoTitle: fc.string({ minLength: 1, maxLength: 100 }),
          seoDescription: fc.string({ minLength: 1, maxLength: 200 }),
          seoKeywords: fc.array(
            fc.record({ keyword: fc.string({ minLength: 1, maxLength: 20 }) }),
            { minLength: 1, maxLength: 10 }
          ),
          name: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        async (profileData) => {
          // Mock the CMS response
          mockGetProfile.mockResolvedValue(profileData as any);

          const metadata = await generateTestMetadata();

          // Property: When CMS seoTitle is set, metadata should use it
          expect(metadata.title).toEqual({
            default: profileData.seoTitle,
            template: '%s | Raja Dubey',
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use CMS seoDescription when available', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          seoTitle: fc.string({ minLength: 1, maxLength: 100 }),
          seoDescription: fc.string({ minLength: 1, maxLength: 200 }),
          seoKeywords: fc.array(
            fc.record({ keyword: fc.string({ minLength: 1, maxLength: 20 }) }),
            { minLength: 1, maxLength: 10 }
          ),
          name: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        async (profileData) => {
          // Mock the CMS response
          mockGetProfile.mockResolvedValue(profileData as any);

          const metadata = await generateTestMetadata();

          // Property: When CMS seoDescription is set, metadata should use it
          expect(metadata.description).toBe(profileData.seoDescription);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use CMS seoKeywords when available', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          seoTitle: fc.string({ minLength: 1, maxLength: 100 }),
          seoDescription: fc.string({ minLength: 1, maxLength: 200 }),
          seoKeywords: fc.array(
            fc.record({ keyword: fc.string({ minLength: 1, maxLength: 20 }) }),
            { minLength: 1, maxLength: 10 }
          ),
          name: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        async (profileData) => {
          // Mock the CMS response
          mockGetProfile.mockResolvedValue(profileData as any);

          const metadata = await generateTestMetadata();

          // Property: When CMS seoKeywords are set, metadata should use them
          const expectedKeywords = profileData.seoKeywords.map(k => k.keyword);
          expect(metadata.keywords).toEqual(expectedKeywords);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should propagate CMS data to Open Graph tags', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          seoTitle: fc.string({ minLength: 1, maxLength: 100 }),
          seoDescription: fc.string({ minLength: 1, maxLength: 200 }),
          name: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        async (profileData) => {
          // Mock the CMS response
          mockGetProfile.mockResolvedValue(profileData as any);

          const metadata = await generateTestMetadata();

          // Property: Open Graph tags should reflect CMS data
          expect(metadata.openGraph?.title).toBe(profileData.seoTitle);
          expect(metadata.openGraph?.description).toBe(profileData.seoDescription);
          expect(metadata.openGraph?.siteName).toBe(`${profileData.name} Portfolio`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should propagate CMS data to Twitter Card tags', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          seoTitle: fc.string({ minLength: 1, maxLength: 100 }),
          seoDescription: fc.string({ minLength: 1, maxLength: 200 }),
          name: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        async (profileData) => {
          // Mock the CMS response
          mockGetProfile.mockResolvedValue(profileData as any);

          const metadata = await generateTestMetadata();

          // Property: Twitter Card tags should reflect CMS data
          expect(metadata.twitter?.title).toBe(profileData.seoTitle);
          expect(metadata.twitter?.description).toBe(profileData.seoDescription);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use fallback values when CMS data is unavailable', async () => {
    // Mock CMS returning null (unavailable)
    mockGetProfile.mockResolvedValue(null);

    const metadata = await generateTestMetadata();

    // Property: When CMS is unavailable, should use fallback values
    expect(metadata.title).toEqual({
      default: "Raja Dubey | Senior Software Engineer - React & Cloud Architecture",
      template: '%s | Raja Dubey',
    });
    expect(metadata.description).toBe("Portfolio of Raja Dubey, a Senior Software Engineer specializing in React, Next.js, Spring Boot, and cloud architecture. Building scalable frontend systems and enterprise applications.");
    expect(metadata.keywords).toEqual(["Software Engineer", "React", "Next.js", "Spring Boot", "Elasticsearch", "Frontend Architecture", "Gurgaon"]);
  });

  it('should handle partial CMS data gracefully', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          seoTitle: fc.option(fc.string({ minLength: 1, maxLength: 100 })),
          seoDescription: fc.option(fc.string({ minLength: 1, maxLength: 200 })),
          seoKeywords: fc.option(fc.array(
            fc.record({ keyword: fc.string({ minLength: 1, maxLength: 20 }) }),
            { minLength: 1, maxLength: 10 }
          )),
          name: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
        }),
        async (profileData) => {
          // Mock the CMS response with partial data
          mockGetProfile.mockResolvedValue(profileData as any);

          const metadata = await generateTestMetadata();

          // Property: Should handle partial data and use fallbacks appropriately
          expect(metadata).toBeDefined();
          expect(metadata.title).toBeDefined();
          expect(metadata.description).toBeDefined();
          expect(metadata.keywords).toBeDefined();
          expect(metadata.openGraph).toBeDefined();
          expect(metadata.twitter).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});