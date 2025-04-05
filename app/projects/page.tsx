import React from 'react'
import { getProjects, ProjectFields } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import PageLayout from '../components/PageLayout'
import { slugify } from '@/lib/utils'

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  // Filter and sort projects
  const sortedProjects = projects
    .filter(project => {
      const fields = project.fields as ProjectFields
      return fields.coverImage // Only show projects with cover images
    })
    .sort((a, b) => {
      const fieldsA = a.fields as ProjectFields
      const fieldsB = b.fields as ProjectFields
      return fieldsA.title.localeCompare(fieldsB.title)
    })

  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProjects.map(project => {
          const fields = project.fields as ProjectFields
          return (
            <Link 
              key={project.sys.id}
              href={`/projects/${slugify(fields.title)}`}
              className="group relative aspect-square overflow-hidden bg-signals-slate"
            >
              {fields.coverImage && (
                <Image
                  src={`https:${fields.coverImage.fields.file.url}`}
                  alt={fields.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-signals-navy bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon 
                      icon={fields.type === 'Book' ? 'octicon:book-24' : 'octicon:bookmark-24'} 
                      className="w-6 h-6 text-white"
                    />
                    {fields.hasAward && (
                      <Icon 
                        icon="material-symbols-light:award-star-outline-rounded"
                        className="w-6 h-6 text-signals-red"
                      />
                    )}
                  </div>
                  <h2 className="text-white text-xl font-extralight">{fields.title}</h2>
                  <p className="text-white/80 text-sm font-extralight mt-1">{fields.year}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </PageLayout>
  )
} 