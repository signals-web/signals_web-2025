import React from 'react'
import { getProjects } from '@/lib/contentful'
import ProjectClient from './ProjectClient'

export const revalidate = 60

interface Props {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: Props) {
  const projects = await getProjects()
  
  // Find current project and its index
  const currentIndex = projects.findIndex(p => p.sys.id === params.id)
  const project = projects[currentIndex]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FF0054]">
        <h1 className="text-2xl font-extralight text-white">Project not found</h1>
      </div>
    )
  }

  // Get previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined

  return <ProjectClient 
    project={project}
    prevProject={prevProject}
    nextProject={nextProject}
  />
} 