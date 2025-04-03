import React from 'react'
import { getProjects } from '@/lib/contentful'
import ProjectCard from '../components/ProjectCard'

export const revalidate = 60 // Revalidate every minute

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.sys.id} project={project} />
        ))}
      </div>
    </main>
  )
} 