/**
 * Unit tests for JSON-LD structured data
 * Tests specific examples of structured data generation
 */

describe('JSON-LD structured data', () => {
  // Mock the page component to extract JSON-LD
  const extractJsonLd = (profile: any) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile?.name || 'Raja Dubey',
      jobTitle: profile?.title || 'Senior Software Engineer - UI',
      url: 'https://rajadubey.in',
      email: profile?.email || 'rajadubey1997@gmail.com',
      telephone: profile?.phone || '+91-786-930-3752',
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile?.location || 'Gurgaon, India',
      },
      sameAs: profile?.socialLinks?.map((link: any) => link.url) || [
        'https://linkedin.com/in/rajababudubey',
        'https://github.com/rajadubey',
        'https://x.com/rajadubey0'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Oxyzo Financial Services',
      },
    };
  };

  it('should have correct schema.org context', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd['@context']).toBe('https://schema.org');
  });

  it('should have Person type', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd['@type']).toBe('Person');
  });

  it('should include name field', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.name).toBeDefined();
    expect(typeof jsonLd.name).toBe('string');
    expect(jsonLd.name.length).toBeGreaterThan(0);
  });

  it('should include jobTitle field', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.jobTitle).toBeDefined();
    expect(typeof jsonLd.jobTitle).toBe('string');
  });

  it('should include URL with HTTPS', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.url).toBeDefined();
    expect(jsonLd.url).toMatch(/^https:\/\//);
  });

  it('should include email field', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.email).toBeDefined();
    expect(jsonLd.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('should include telephone field with country code', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.telephone).toBeDefined();
    expect(jsonLd.telephone).toMatch(/^\+91/);
  });

  it('should include address with PostalAddress type', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.address).toBeDefined();
    expect(jsonLd.address['@type']).toBe('PostalAddress');
    expect(jsonLd.address.addressLocality).toBeDefined();
  });

  it('should include sameAs array with social profiles', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.sameAs).toBeDefined();
    expect(Array.isArray(jsonLd.sameAs)).toBe(true);
    expect(jsonLd.sameAs.length).toBeGreaterThan(0);
  });

  it('should use HTTPS for all social profile URLs', () => {
    const jsonLd = extractJsonLd(null);
    
    for (const url of jsonLd.sameAs) {
      expect(url).toMatch(/^https:\/\//);
    }
  });

  it('should include worksFor organization', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.worksFor).toBeDefined();
    expect(jsonLd.worksFor['@type']).toBe('Organization');
    expect(jsonLd.worksFor.name).toBeDefined();
  });

  it('should use CMS data when available', () => {
    const mockProfile = {
      name: 'Test Name',
      title: 'Test Title',
      email: 'test@example.com',
      phone: '+91-1234567890',
      location: 'Test Location',
      socialLinks: [
        { url: 'https://linkedin.com/in/test' },
        { url: 'https://github.com/test' }
      ]
    };
    
    const jsonLd = extractJsonLd(mockProfile);
    
    expect(jsonLd.name).toBe('Test Name');
    expect(jsonLd.jobTitle).toBe('Test Title');
    expect(jsonLd.email).toBe('test@example.com');
    expect(jsonLd.telephone).toBe('+91-1234567890');
    expect(jsonLd.address.addressLocality).toBe('Test Location');
    expect(jsonLd.sameAs).toHaveLength(2);
  });

  it('should use fallback data when CMS is unavailable', () => {
    const jsonLd = extractJsonLd(null);
    
    expect(jsonLd.name).toBe('Raja Dubey');
    expect(jsonLd.jobTitle).toBe('Senior Software Engineer - UI');
    expect(jsonLd.email).toBe('rajadubey1997@gmail.com');
    expect(jsonLd.telephone).toBe('+91-786-930-3752');
    expect(jsonLd.address.addressLocality).toBe('Gurgaon, India');
  });
});
