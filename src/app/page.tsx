import { cookies } from 'next/headers';
import { getProfile, getExperience, getProjects, getSkillsByCategory } from '@/lib/payload';
import V0 from '@/variants/v0';
import V1 from '@/variants/v1';
import V2 from '@/variants/v2';
import V3 from '@/variants/v3';
import V4 from '@/variants/v4';
import type { VariantProps } from '@/variants/types';

// ─── Variant Registry ───────────────────────────────────────────────
const VARIANTS: Record<string, React.ComponentType<VariantProps>> = {
  v0: V0,
  v1: V1,
  v2: V2,
  v3: V3,
  v4: V4,
};

export default async function Page() {
  // 1. Read the variant cookie (set by middleware)
  const cookieStore = await cookies();
  const variant = cookieStore.get('portfolio_variant')?.value ?? 'v0';

  // 2. Fetch CMS data
  const [profile, experiences, projects, skillsByCategory] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getSkillsByCategory(),
  ]);

  // 3. Render the selected variant
  const SelectedVariant = VARIANTS[variant] ?? V0;

  return (
    <SelectedVariant
      profile={profile}
      experiences={experiences}
      projects={projects}
      skillsByCategory={skillsByCategory}
    />
  );
}
