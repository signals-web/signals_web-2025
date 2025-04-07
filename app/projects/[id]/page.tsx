import React from 'react'
import { getProjects, getProjectsByType } from '@/lib/contentful'
import ProjectClient from './ProjectClient'
import { ProjectFields } from '@/lib/contentful'
import { slugify } from '@/lib/utils'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface Props {
  params: {
    id: string
  }
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const allProjects = await getProjects()
  return allProjects.map((project) => ({
    id: slugify((project.fields as ProjectFields).title)
  }))
}

export default async function ProjectPage({ params }: Props) {
  // Fetch all projects using the same logic as homepage
  const [books, signs] = await Promise.all([
    getProjectsByType('Book'),
    getProjectsByType('Sign')
  ])

  const allProjects = [...books, ...signs]
    .sort((a, b) => {
      const fieldsA = a.fields as ProjectFields
      const fieldsB = b.fields as ProjectFields
      return fieldsA.title.localeCompare(fieldsB.title)
    })
  
  // Find current project by matching the slug
  const currentIndex = allProjects.findIndex(p => {
    const fields = p.fields as ProjectFields
    return slugify(fields.title) === params.id
  })
  
  const project = allProjects[currentIndex]

  if (!project) {
    notFound()
  }

  // Get previous and next projects from the complete list
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined

  return <ProjectClient 
    project={project}
    prevProject={prevProject}
    nextProject={nextProject}
  />
} 