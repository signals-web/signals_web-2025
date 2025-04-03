'use client'

import React from 'react'
import { Project, ProjectFields } from '@/lib/contentful'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const fields = project.fields as ProjectFields

  return (
    <Link 
      href={`/projects/${project.sys.id}`}
      className="group block p-6 bg-white hover:bg-neutral-50 transition-colors"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium text-neutral-900 group-hover:text-black">
            {fields.title}
          </h3>
          <span className="text-sm text-neutral-500">
            {fields.year}
          </span>
        </div>
        
        {fields.author && (
          <p className="text-neutral-600">
            {fields.author}
          </p>
        )}

        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full">
            {fields.type}
          </span>
          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full">
            {fields.category}
          </span>
        </div>

        <p className="text-neutral-600 line-clamp-2">
          {fields.description}
        </p>
      </div>
    </Link>
  )
} 