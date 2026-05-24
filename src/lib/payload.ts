import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Profile, Experience, Project, Skill } from '../../payload-types'

/**
 * Get a cached Payload instance.
 * Returns null if the database is unavailable (e.g. during static build).
 */
export const getPayloadClient = async () => {
  try {
    const config = await configPromise
    return await getPayload({ config })
  } catch (error) {
    console.warn('Payload CMS unavailable (MongoDB not connected). Using fallback data.', (error as Error).message)
    return null
  }
}

/**
 * Helper function to get profile data
 */
export const getProfile = async (): Promise<Profile | null> => {
  const payload = await getPayloadClient()
  if (!payload) return null
  
  try {
    const result = await payload.find({
      collection: 'profile',
      limit: 1,
    })
    
    return (result.docs[0] as Profile) || null
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

/**
 * Helper function to get all experience entries
 */
export const getExperience = async (): Promise<Experience[]> => {
  const payload = await getPayloadClient()
  if (!payload) return []
  
  try {
    const result = await payload.find({
      collection: 'experience',
      sort: 'order',
      limit: 100,
    })
    
    return result.docs as Experience[]
  } catch (error) {
    console.error('Error fetching experience:', error)
    return []
  }
}

/**
 * Helper function to get all projects
 */
export const getProjects = async (): Promise<Project[]> => {
  const payload = await getPayloadClient()
  if (!payload) return []
  
  try {
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 100,
    })
    
    return result.docs as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Helper function to get featured projects
 */
export const getFeaturedProjects = async (): Promise<Project[]> => {
  const payload = await getPayloadClient()
  if (!payload) return []
  
  try {
    const result = await payload.find({
      collection: 'projects',
      where: {
        featured: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })
    
    return result.docs as Project[]
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Helper function to get all skills
 */
export const getSkills = async (): Promise<Skill[]> => {
  const payload = await getPayloadClient()
  if (!payload) return []
  
  try {
    const result = await payload.find({
      collection: 'skills',
      sort: 'order',
      limit: 100,
    })
    
    return result.docs as Skill[]
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

/**
 * Helper function to get skills by category
 */
export const getSkillsByCategory = async (): Promise<Record<string, Skill[]>> => {
  const payload = await getPayloadClient()
  if (!payload) return {}
  
  try {
    const result = await payload.find({
      collection: 'skills',
      sort: 'order',
      limit: 100,
    })
    
    // Group skills by category
    const skillsByCategory = (result.docs as Skill[]).reduce((acc, skill) => {
      const category = skill.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
    
    return skillsByCategory
  } catch (error) {
    console.error('Error fetching skills:', error)
    return {}
  }
}