import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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