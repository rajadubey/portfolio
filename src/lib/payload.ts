import { redis } from '@/lib/redis';
import type { Experience, Profile, Project, Skill } from '../../payload-types';

const NOW_ISO = new Date().toISOString();

const parseIfString = <T>(value: unknown): T | null => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  return value as T;
};

const safeLRange = async (key: string): Promise<string[]> => {
  const items = await redis.lrange(key, 0, -1);
  return Array.isArray(items) ? (items as string[]) : [];
};

export const getPayloadClient = async () => null;

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const raw = await redis.get('profile:main');
    const profile = parseIfString<Record<string, unknown>>(raw);
    if (!profile) return null;

    return {
      id: 'profile-main',
      name: String(profile.name || ''),
      title: String(profile.title || ''),
      bio: profile.bio ?? '',
      email: String(profile.email || ''),
      phone: String(profile.phone || ''),
      location: String(profile.location || ''),
      resumeURL: String(profile.resumeURL || ''),
      socialLinks: (profile.socialLinks as Profile['socialLinks']) ?? [],
      seoTitle: String(profile.seoTitle || ''),
      seoDescription: String(profile.seoDescription || ''),
      seoKeywords: (profile.seoKeywords as Profile['seoKeywords']) ?? [],
      createdAt: NOW_ISO,
      updatedAt: NOW_ISO,
    };
  } catch (error) {
    console.error('Error fetching profile from Upstash:', error);
    return null;
  }
};

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const keys = await safeLRange('experience:list');
    const docs = await Promise.all(keys.map((key) => redis.get(key)));

    return docs
      .map((doc, index) => {
        const exp = parseIfString<Record<string, unknown>>(doc);
        if (!exp) return null;
        return {
          id: `experience-${index + 1}`,
          company: String(exp.company || ''),
          role: String(exp.role || ''),
          startDate: String(exp.startDate || ''),
          endDate: (exp.endDate as string | null) ?? null,
          description: exp.description ?? '',
          techStack: (exp.techStack as Experience['techStack']) ?? [],
          logo: null,
          order: Number(exp.order || index + 1),
          createdAt: NOW_ISO,
          updatedAt: NOW_ISO,
        } as Experience;
      })
      .filter((item): item is Experience => Boolean(item))
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching experience from Upstash:', error);
    return [];
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const keys = await safeLRange('projects:list');
    const docs = await Promise.all(keys.map((key) => redis.get(key)));

    return docs
      .map((doc, index) => {
        const project = parseIfString<Record<string, unknown>>(doc);
        if (!project) return null;
        return {
          id: `project-${index + 1}`,
          title: String(project.title || ''),
          category: String(project.category || ''),
          description: project.description ?? '',
          techStack: (project.techStack as Project['techStack']) ?? [],
          repoLink: (project.repoLink as string | null) ?? null,
          liveLink: (project.liveLink as string | null) ?? null,
          coverImage: String(project.coverImage || '/projects/default.png'),
          featured: Boolean(project.featured),
          order: Number(project.order || index + 1),
          slug: String(project.slug || `project-${index + 1}`),
          createdAt: NOW_ISO,
          updatedAt: NOW_ISO,
        } as Project;
      })
      .filter((item): item is Project => Boolean(item))
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching projects from Upstash:', error);
    return [];
  }
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const all = await getProjects();
  return all.filter((project) => Boolean(project.featured));
};

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const categories: Skill['category'][] = ['frontend', 'backend', 'database', 'devops', 'tools'];
    const keyLists = await Promise.all(categories.map((category) => safeLRange(`skills:list:${category}`)));
    const keys = keyLists.flat();
    const docs = await Promise.all(keys.map((key) => redis.get(key)));

    return docs
      .map((doc, index) => {
        const skill = parseIfString<Record<string, unknown>>(doc);
        if (!skill) return null;
        return {
          id: `skill-${index + 1}`,
          name: String(skill.name || ''),
          iconName: String(skill.iconName || 'code2').toLowerCase(),
          category: (skill.category as Skill['category']) || 'tools',
          proficiency: (skill.proficiency as Skill['proficiency']) ?? '3',
          order: Number(skill.order || index + 1),
          createdAt: NOW_ISO,
          updatedAt: NOW_ISO,
        } as Skill;
      })
      .filter((item): item is Skill => Boolean(item))
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching skills from Upstash:', error);
    return [];
  }
};

export const getSkillsByCategory = async (): Promise<Record<string, Skill[]>> => {
  const skills = await getSkills();
  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
};
