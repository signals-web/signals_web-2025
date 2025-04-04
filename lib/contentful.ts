import { createClient, Entry } from 'contentful'
import { ProjectSkeleton, IProjectFields, AboutPageSkeleton } from './contentful-types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Export the types that other components need
export type Project = Entry<ProjectSkeleton>
export type ProjectFields = IProjectFields

export async function getProjects(): Promise<Entry<ProjectSkeleton>[]> {
  const response = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
  })
  return response.items
}

export async function getProjectsByType(type: 'Book' | 'Sign'): Promise<Entry<ProjectSkeleton>[]> {
  const response = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'fields.type': type,
  })
  return response.items
}

export async function getAboutPage(): Promise<Entry<AboutPageSkeleton>> {
  const response = await client.getEntries<AboutPageSkeleton>({
    content_type: 'aboutPage',
    limit: 1,
  })
  
  if (!response.items.length) {
    throw new Error('No about page found')
  }

  return response.items[0]
}