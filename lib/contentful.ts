import { createClient, Entry, Asset as ContentfulAsset, EntryCollection } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export interface ProjectFields {
  title: string
  type: 'Book' | 'Sign'
  year: string
  author?: string
  category: string
  description: string
  coverImage?: ContentfulAsset
  images?: ContentfulAsset[]
}

export type Project = Entry<ProjectFields>

export async function getProjects(): Promise<Project[]> {
  const response = await client.getEntries<ProjectFields>({
    content_type: 'project',
    include: 2
  })

  return response.items.sort((a, b) => {
    const yearA = a.fields.year || ''
    const yearB = b.fields.year || ''
    const yearCompare = yearA.localeCompare(yearB)
    return yearCompare !== 0 ? yearCompare : a.fields.title.localeCompare(b.fields.title)
  })
}

export async function getProjectsByType(type: 'Book' | 'Sign'): Promise<Project[]> {
  const response = await client.getEntries<ProjectFields>({
    content_type: 'project',
    'fields.type': type,
    include: 2
  })

  return response.items.sort((a, b) => {
    const yearA = a.fields.year || ''
    const yearB = b.fields.year || ''
    const yearCompare = yearA.localeCompare(yearB)
    return yearCompare !== 0 ? yearCompare : a.fields.title.localeCompare(b.fields.title)
  })
} 