import { createClient, Entry } from 'contentful'
import { ProjectSkeleton } from './contentful-types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getProjects(): Promise<Entry<ProjectSkeleton>[]> {
  const response = await client.getEntries({
    content_type: 'project'
  })

  return response.items as Entry<ProjectSkeleton>[];
}

export async function getProjectsByType(type: 'Book' | 'Sign'): Promise<Entry<ProjectSkeleton>[]> {
  const response = await client.getEntries({
    content_type: 'project',
    'fields.type': type
  })

  return response.items as Entry<ProjectSkeleton>[];
}