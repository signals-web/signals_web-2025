import React from 'react'
import { getProjects } from '@/lib/contentful'
import ProjectClient from './ProjectClient'
import { ProjectFields } from '@/lib/contentful'

export const revalidate = 60

interface Props {
  params: {
    id: string
  }
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
  
  // Find current project and its index in the filtered list
  const currentIndex = projectsWithImages.findIndex(p => p.sys.id === params.id)
  const project = projectsWithImages[currentIndex]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FF0054]">
        <h1 className="text-2xl font-extralight text-white">Project not found</h1>
      </div>
    )
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