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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {sortedProjects.map(project => {
          const fields = project.fields as ProjectFields
          return (
            <Link 
              key={project.sys.id}
              href={`/projects/${slugify(fields.title)}`}
              className="group block"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-signals-slate mb-4">
                {fields.coverImage && (
                  <Image
                    src={`https:${fields.coverImage.fields.file.url}`}
                    alt={fields.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                )}
              </div>
              
              {/* Project Info */}
              <div className="space-y-3">
                {/* Title row with icons */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Icon 
                      icon={fields.type === 'Book' ? 'octicon:book-24' : 'octicon:bookmark-24'} 
                      className="w-5 h-5 text-white"
                    />
                    {fields.hasAward && (
                      <Icon 
                        icon="material-symbols-light:award-star-outline-rounded"
                        className="w-5 h-5 text-signals-red"
                      />
                    )}
                  </div>
                  <h2 className="text-lg font-extralight text-white group-hover:text-signals-red transition-colors">{fields.title}</h2>
                  <span className="text-sm text-white/60 font-extralight">{fields.year}</span>
                </div>

                {/* Tags */}
                {fields.tags && fields.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {fields.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs font-extralight px-2 py-1 bg-white/10 text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </PageLayout>
  )
} 