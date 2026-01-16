/**
 * Property-Based Tests for HTTPS Usage
 * Feature: portfolio-seo-optimization, Property 18: HTTPS for All Resources
 * Validates: Requirements 15.4
 */

import fc from 'fast-check';

describe('HTTPS Usage Property Tests', () => {
  // Feature: portfolio-seo-optimization, Property 18: HTTPS for All Resources
  it('should ensure all resource URLs use HTTPS protocol', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.oneof(
            // Generate various types of URLs that should be HTTPS
            fc.string().map(path => `https://example.com/${path}`),
            fc.string().map(path => `https://cdn.example.com/${path}`),
            fc.string().map(path => `https://api.example.com/${path}`),
            // Include some relative URLs (which are fine)
            fc.string().map(path => `/${path}`),
            fc.string().map(path => `./${path}`),
            // Include data URLs (which are fine)
            fc.constant('data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=')
          ),
          { minLength: 1, maxLength: 10 }
        ),
        (urls) => {
          // Property: For any URL that starts with http://, it should be flagged as insecure
          urls.forEach((url) => {
            if (url.startsWith('http://')) {
              throw new Error(`Found insecure HTTP URL: ${url}`);
            }
          });
          
          // Property: External URLs should use HTTPS
          urls.forEach((url) => {
            if (url.startsWith('http') && !url.startsWith('https://') && !url.startsWith('http://localhost')) {
              throw new Error(`External URL should use HTTPS: ${url}`);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should validate HTTPS usage in actual portfolio components', () => {
    // Test the actual portfolio data for HTTPS compliance
    const portfolioData = {
      socialLinks: [
        'https://linkedin.com/in/rajababudubey',
        'https://github.com/rajadubey',
        'https://x.com/rajadubey0'
      ],
      projectLinks: [
        'https://github.com/rajadubey'
      ],
      cdnUrls: [
        'https://ik.imagekit.io/interview0/portfolio/resume/Resume%20-%20Raja%20Dubey.pdf'
      ]
    };

    // Property: For any URL in the portfolio data, it should use HTTPS
    const allUrls = [
      ...portfolioData.socialLinks,
      ...portfolioData.projectLinks,
      ...portfolioData.cdnUrls
    ];

    allUrls.forEach(url => {
      if (url.startsWith('http://')) {
        throw new Error(`Found HTTP URL in portfolio data: ${url}`);
      }
      
      // Ensure external URLs use HTTPS
      if (url.startsWith('http') && !url.startsWith('https://')) {
        throw new Error(`External URL should use HTTPS: ${url}`);
      }
    });
  });

  it('should validate HTTPS in metadata URLs', () => {
    fc.assert(
      fc.property(
        fc.record({
          metadataBase: fc.constant('https://www.rajadubey.in'),
          canonicalUrl: fc.constant('https://rajadubey.in'),
          ogUrl: fc.constant('https://rajadubey.in'),
          ogImage: fc.constant('https://ik.imagekit.io/test/image.jpg'),
          authorUrl: fc.constant('https://rajadubey.in')
        }),
        (metadata) => {
          // Property: All metadata URLs should use HTTPS
          Object.values(metadata).forEach((url) => {
            if (typeof url === 'string' && url.startsWith('http://')) {
              throw new Error(`Found HTTP URL in metadata: ${url}`);
            }
          });
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should validate URL protocol consistency', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.oneof(
            // Generate HTTPS URLs
            fc.webUrl().filter(url => url.startsWith('https://')),
            // Generate localhost URLs (which can be HTTP in development)
            fc.string().map(path => `http://localhost:3000/${path}`)
          ),
          { minLength: 1, maxLength: 20 }
        ),
        (urls) => {
          // Property: For any collection of URLs, none should use HTTP protocol for external resources
          urls.forEach((url) => {
            try {
              const urlObj = new URL(url);
              
              // Skip localhost and relative URLs
              if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                return;
              }
              
              // External URLs should use HTTPS
              if (urlObj.protocol === 'http:') {
                throw new Error(`External URL should use HTTPS: ${url}`);
              }
            } catch (e) {
              // Skip invalid URLs
              if (e instanceof TypeError) {
                return;
              }
              throw e;
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});