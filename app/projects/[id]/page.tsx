import React from 'react'
import { getProjects } from '@/lib/contentful'
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
  return allProjects
    .filter(project => {
      const fields = project.fields as ProjectFields
      return fields.images && fields.images.length > 0
    })
    .map((project) => ({
      id: slugify((project.fields as ProjectFields).title)
    }))
}

export default async function ProjectPage({ params }: Props) {
  const allProjects = await getProjects()
  
  // Filter projects to only include those with images and sort alphabetically
  const projectsWithImages = allProjects
    .filter(project => {
      const fields = project.fields as ProjectFields
      return fields.images && fields.images.length > 0
    })
    .sort((a, b) => {
      const fieldsA = a.fields as ProjectFields
      const fieldsB = b.fields as ProjectFields
      return fieldsA.title.localeCompare(fieldsB.title)
    })
  
  // Find current project by matching the slug
  const currentIndex = projectsWithImages.findIndex(p => {
    const fields = p.fields as ProjectFields
    return slugify(fields.title) === params.id
  })
  
  const project = projectsWithImages[currentIndex]

  if (!project) {
    notFound()
  }

  // Get previous and next projects from the filtered list
  const prevProject = currentIndex > 0 ? projectsWithImages[currentIndex - 1] : undefined
  const nextProject = currentIndex < projectsWithImages.length - 1 ? projectsWithImages[currentIndex + 1] : undefined

  return <ProjectClient 
    project={project}
    prevProject={prevProject}
    nextProject={nextProject}
  />
} 