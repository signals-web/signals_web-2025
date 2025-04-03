import { createClient, Entry } from 'contentful'
import { ProjectSkeleton, IProjectFields } from './contentful-types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Export the types that other components need
export type Project = Entry<ProjectSkeleton>
export type ProjectFields = IProjectFields

export async function getProjects(): Promise<Project[]> {
  const response = await client.getEntries({
    content_type: 'project'
  })

  return response.items as Project[]
}

export async function getProjectsByType(type: 'Book' | 'Sign'): Promise<Project[]> {
  const response = await client.getEntries({
    content_type: 'project',
    'fields.type': type
  })

  return response.items as Project[]
}