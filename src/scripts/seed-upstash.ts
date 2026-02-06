import { redis } from '@/lib/redis';
import {
  experienceData,
  profileData,
  projectsData,
  skillsData,
} from './seed';

const log = (message: string) => {
  console.log(`[seed:upstash] ${message}`);
};

async function seed() {
  log('Flushing existing Redis database');
  await redis.flushdb();

  log('Seeding profile');
  await redis.set('profile:main', JSON.stringify(profileData));

  log('Seeding experience');
  for (const exp of experienceData) {
    const key = `experience:${exp.order}`;
    await redis.set(key, JSON.stringify(exp));
    await redis.rpush('experience:list', key);
  }

  log('Seeding projects');
  for (const project of projectsData) {
    const key = `project:${project.slug}`;
    await redis.set(key, JSON.stringify(project));
    await redis.rpush('projects:list', key);

    if (project.featured) {
      await redis.sadd('projects:featured', key);
    }
  }

  log('Seeding skills');
  for (const skill of skillsData) {
    const key = `skill:${skill.category}:${skill.order}`;
    await redis.set(key, JSON.stringify(skill));
    await redis.rpush(`skills:list:${skill.category}`, key);
  }

  log('Upstash seeding complete');
}

seed().catch((error) => {
  console.error('[seed:upstash] Seeding failed:', error);
  process.exitCode = 1;
});
