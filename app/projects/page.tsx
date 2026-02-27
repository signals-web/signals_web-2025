import React from 'react'
import { getProjects, ProjectFields } from '@/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import PageLayout from '../components/PageLayout'

export const revalidate = 60

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const projects = await getProjects()
  const type = typeof resolvedSearchParams.type === 'string' ? resolvedSearchParams.type as 'Book' | 'Sign' : undefined

  // Filter and sort projects
  const sortedProjects = projects
    .filter(project => {
      const fields = project.fields as ProjectFields
      return fields.coverImage && (!type || fields.type === type) // Filter by type if specified
    })
    .sort((a, b) => {
      const fieldsA = a.fields as ProjectFields
      const fieldsB = b.fields as ProjectFields
      return fieldsA.title.localeCompare(fieldsB.title)
    })

  return (
    <PageLayout>
      {/* Type Filter Navigation */}
      <nav className="flex gap-8 md:gap-12 mb-12">
        <Link
          href="/projects"
          className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${!type ? 'text-white' : 'text-signals-navy'}`}
        >
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
            <Icon icon="octicon:issue-opened-24" className="w-full h-full" />
          </span>
          <span className="text-xl md:text-[2.8rem] font-light">All</span>
        </Link>
        <Link
          href="/projects?type=Book"
          className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${type === 'Book' ? 'text-white' : 'text-signals-navy'}`}
        >
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
            <Icon icon="octicon:book-24" className="w-full h-full" />
          </span>
          <span className="text-xl md:text-[2.8rem] font-light">Books</span>
        </Link>
        <Link
          href="/projects?type=Sign"
          className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${type === 'Sign' ? 'text-white' : 'text-signals-navy'}`}
        >
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
            <Icon icon="octicon:bookmark-24" className="w-full h-full" />
          </span>
          <span className="text-xl md:text-[2.8rem] font-light">Signs</span>
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {sortedProjects.map(project => {
          const fields = project.fields as ProjectFields
          return (
            <Link
              key={project.sys.id}
              href={`/projects/${fields.slug}`}
              className="group block"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-signals-slate mb-4">
                {fields.coverImage && (
                  <Image
                    src={`https:${fields.coverImage.fields.file.url}`}
                    alt={fields.title}
                    fill
                    className="object-cover"
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
                        className="w-5 h-5 text-white"
                      />
                    )}
                  </div>
                  <h2 className="text-lg font-light text-white">{fields.title}</h2>
                  <span className="text-lg font-light text-white">{fields.year}</span>
                </div>

                {/* Tags */}
                {fields.tags && fields.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {fields.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-lg font-light px-2 py-1 bg-white/10 text-white"
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