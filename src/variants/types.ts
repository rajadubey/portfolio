import type { Profile, Experience, Project, Skill } from '../../payload-types';

/**
 * Shared props interface that all portfolio variants must accept.
 * These props are passed from page.tsx after fetching CMS data.
 */
export interface VariantProps {
  profile: Profile | null;
  experiences: Experience[];
  projects: Project[];
  skillsByCategory: Record<string, Skill[]>;
}
