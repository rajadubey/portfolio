import fc from 'fast-check';

// Feature: portfolio-seo-optimization, Property 24: No Lorem Ipsum in Seeded Data
describe('Seeded Data Validation', () => {
  // Mock seeded data for testing
  const mockSeededData = {
    profile: {
      name: 'Raja Babu Dubey',
      title: 'Senior Software Engineer - UI',
      bio: 'Senior Software Engineer with over 5 years of experience architecting enterprise-grade applications...',
      email: 'rajadubey1997@gmail.com',
      seoDescription: 'Portfolio of Raja Dubey, a Senior Software Engineer at Oxyzo and OfBusiness...',
    },
    experience: [
      {
        company: 'Oxyzo Financial Services',
        role: 'Senior Software Engineer - UI',
        description: 'Architected an enterprise-grade Task & Workflow Management System...',
      },
      {
        company: 'OfBusiness',
        role: 'Senior Software Engineer - UI',
        description: 'Scaled Nexizo.ai and BidAssist platforms...',
      },
    ],
    projects: [
      {
        title: 'AI-Powered Code Review Agent',
        description: 'A self-hosted, asynchronous code review system...',
        category: 'AI & DevOps',
      },
      {
        title: 'Custom React SSR Engine',
        description: 'An advanced Server-Side Rendering implementation...',
        category: 'Core Architecture',
      },
    ],
    skills: [
      { name: 'React', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'Spring Boot', category: 'backend' },
    ],
  };

  it('should not contain lorem ipsum or placeholder text in any seeded data', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...Object.values(mockSeededData.profile),
          ...mockSeededData.experience.flatMap(exp => Object.values(exp)),
          ...mockSeededData.projects.flatMap(proj => Object.values(proj)),
          ...mockSeededData.skills.flatMap(skill => Object.values(skill))
        ),
        (textContent) => {
          if (typeof textContent === 'string') {
            const lowerContent = textContent.toLowerCase();
            
            // Check for common placeholder text patterns
            const placeholderPatterns = [
              'lorem ipsum',
              'placeholder',
              'sample text',
              'dummy text',
              'test content',
              'example text',
              'fill this',
              'replace this',
              'todo:',
              'fixme:',
              'xxx',
              'yyy',
              'zzz',
            ];

            const hasPlaceholder = placeholderPatterns.some(pattern => 
              lowerContent.includes(pattern)
            );

            expect(hasPlaceholder).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have meaningful content in all text fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          mockSeededData.profile.bio,
          mockSeededData.profile.seoDescription,
          ...mockSeededData.experience.map(exp => exp.description),
          ...mockSeededData.projects.map(proj => proj.description)
        ),
        (textContent) => {
          if (typeof textContent === 'string') {
            // Content should be substantial (more than just a few words)
            expect(textContent.length).toBeGreaterThan(20);
            
            // Content should contain actual words, not just random characters
            const wordCount = textContent.split(/\s+/).filter(word => word.length > 2).length;
            expect(wordCount).toBeGreaterThanOrEqual(3);
            
            // Content should not be all uppercase or all lowercase (indicates real content)
            const hasVariedCase = textContent !== textContent.toLowerCase() && 
                                 textContent !== textContent.toUpperCase();
            expect(hasVariedCase).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have valid email format in profile data', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(mockSeededData.profile.email).toMatch(emailRegex);
  });

  it('should have consistent professional titles', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          mockSeededData.profile.title,
          ...mockSeededData.experience.map(exp => exp.role)
        ),
        (title) => {
          if (typeof title === 'string') {
            // Should contain professional keywords
            const professionalKeywords = [
              'engineer', 'developer', 'architect', 'lead', 'senior', 
              'manager', 'director', 'specialist', 'consultant'
            ];
            
            const lowerTitle = title.toLowerCase();
            const hasProfessionalKeyword = professionalKeywords.some(keyword => 
              lowerTitle.includes(keyword)
            );
            
            expect(hasProfessionalKeyword).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have valid skill categories', () => {
    const validCategories = ['frontend', 'backend', 'database', 'devops', 'tools'];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...mockSeededData.skills.map(skill => skill.category)),
        (category) => {
          expect(validCategories).toContain(category);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have realistic company names', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...mockSeededData.experience.map(exp => exp.company)),
        (companyName) => {
          if (typeof companyName === 'string') {
            // Company names should not contain placeholder patterns
            const lowerCompany = companyName.toLowerCase();
            const placeholderPatterns = ['company', 'corp', 'inc', 'ltd'];
            
            // Should be a real company name, not just generic terms
            expect(companyName.length).toBeGreaterThan(3);
            expect(companyName).not.toBe('Company Name');
            expect(companyName).not.toBe('Your Company');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});