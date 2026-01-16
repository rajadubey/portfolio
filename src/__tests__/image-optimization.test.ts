import fc from 'fast-check';
import imagekitLoader from '@/lib/imagekit-loader';

// Feature: portfolio-seo-optimization, Property 8: Next.js Image Component Usage
// Feature: portfolio-seo-optimization, Property 9: Image Dimensions for Layout Stability
// Feature: portfolio-seo-optimization, Property 10: Image Lazy Loading
// Feature: portfolio-seo-optimization, Property 11: Image Alt Text Accessibility
// Feature: portfolio-seo-optimization, Property 12: Image Placeholder During Load
// Feature: portfolio-seo-optimization, Property 28: ImageKit Transformation Parameters
// Feature: portfolio-seo-optimization, Property 29: ImageKit URLs for CMS Images
// Feature: portfolio-seo-optimization, Property 30: Responsive Image Transformations
describe('Image Optimization Properties', () => {
  // Mock environment variable for ImageKit
  const originalEnv = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  
  beforeEach(() => {
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/test';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT = originalEnv;
  });

  it('should generate ImageKit URLs with transformation parameters', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes(' ')),
          width: fc.integer({ min: 16, max: 3840 }),
          quality: fc.option(fc.integer({ min: 1, max: 100 })),
        }),
        ({ src, width, quality }) => {
          const result = imagekitLoader({ src, width, quality });

          // Property 28: For any image, ImageKit URL should include transformation parameters
          expect(result).toMatch(/^https:\/\/ik\.imagekit\.io\/test\/tr:/);
          expect(result).toContain(`w-${width}`);
          expect(result).toContain('f-auto'); // Auto format conversion
          
          if (quality) {
            expect(result).toContain(`q-${quality}`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle source paths correctly', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.oneof(
            fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes(' ') && s.trim().length > 0).map(s => `/${s}`), // With leading slash
            fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.startsWith('/') && !s.includes(' ') && s.trim().length > 0) // Without leading slash
          ),
          width: fc.integer({ min: 100, max: 1000 }),
        }),
        ({ src, width }) => {
          const result = imagekitLoader({ src, width });

          // Property 29: For any source path, should handle leading slashes correctly
          let expectedSrc = src;
          while (expectedSrc.startsWith('/')) {
            expectedSrc = expectedSrc.slice(1);
          }
          
          // If expectedSrc becomes empty, it should use placeholder
          if (!expectedSrc) {
            expectedSrc = 'placeholder';
          }
          
          expect(result).toContain(expectedSrc);
          expect(result).not.toMatch(/\/\/(?!ik\.imagekit\.io)/); // No double slashes except in domain
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should generate responsive image transformations', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes(' ')),
          widths: fc.array(fc.integer({ min: 100, max: 2000 }), { minLength: 2, maxLength: 5 })
            .filter(arr => new Set(arr).size === arr.length), // Ensure all widths are unique
        }),
        ({ src, widths }) => {
          const results = widths.map(width => imagekitLoader({ src, width }));

          // Property 30: For any set of unique widths, should generate different transformations
          const uniqueResults = new Set(results);
          expect(uniqueResults.size).toBe(widths.length);

          // Each result should contain the correct width parameter
          results.forEach((result, index) => {
            expect(result).toContain(`w-${widths[index]}`);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should fallback gracefully when ImageKit endpoint is not configured', () => {
    // Remove the environment variable
    delete process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    fc.assert(
      fc.property(
        fc.record({
          src: fc.string({ minLength: 1, maxLength: 100 }),
          width: fc.integer({ min: 100, max: 1000 }),
        }),
        ({ src, width }) => {
          const result = imagekitLoader({ src, width });

          // Property: When ImageKit is not configured, should return original src
          expect(result).toBe(src);
        }
      ),
      { numRuns: 100 }
    );

    // Restore the environment variable
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/test';
  });

  it('should handle quality parameter correctly', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.string({ minLength: 1, maxLength: 50 }),
          width: fc.integer({ min: 100, max: 1000 }),
          quality: fc.integer({ min: 1, max: 100 }),
        }),
        ({ src, width, quality }) => {
          const resultWithQuality = imagekitLoader({ src, width, quality });
          const resultWithoutQuality = imagekitLoader({ src, width });

          // Property: Quality parameter should be included when provided
          expect(resultWithQuality).toContain(`q-${quality}`);
          expect(resultWithoutQuality).not.toContain('q-');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should generate valid URLs', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes(' ')),
          width: fc.integer({ min: 16, max: 3840 }),
          quality: fc.option(fc.integer({ min: 1, max: 100 })),
        }),
        ({ src, width, quality }) => {
          const result = imagekitLoader({ src, width, quality });

          // Property: Generated URLs should be valid
          expect(() => new URL(result)).not.toThrow();
          
          // Should use HTTPS
          expect(result).toMatch(/^https:/);
          
          // Should contain ImageKit domain
          expect(result).toContain('ik.imagekit.io');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain consistent parameter order', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.string({ minLength: 1, maxLength: 50 }),
          width: fc.integer({ min: 100, max: 1000 }),
          quality: fc.integer({ min: 1, max: 100 }),
        }),
        ({ src, width, quality }) => {
          const result = imagekitLoader({ src, width, quality });

          // Property: Parameters should appear in consistent order
          const transformationPart = result.split('/tr:')[1]?.split('/')[0];
          expect(transformationPart).toBeDefined();
          
          const params = transformationPart!.split(',');
          
          // Width should come first
          expect(params[0]).toBe(`w-${width}`);
          
          // Quality should come second (if present)
          expect(params[1]).toBe(`q-${quality}`);
          
          // Format should come last
          expect(params[params.length - 1]).toBe('f-auto');
        }
      ),
      { numRuns: 100 }
    );
  });
});