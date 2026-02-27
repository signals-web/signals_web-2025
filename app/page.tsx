import React from 'react'
import { getProjectsByType, ProjectFields } from '../lib/contentful'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import PageLayout from './components/PageLayout'
import Image from 'next/image'

export const revalidate = 60 // Revalidate every minute

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const type = typeof resolvedSearchParams.type === 'string' ? resolvedSearchParams.type : undefined

  const [books, signs] = await Promise.all([
    getProjectsByType('Book'),
    getProjectsByType('Sign')
  ])

  const allProjects = [...books, ...signs]
    .filter(project => {
      const fields = project.fields as ProjectFields
      return !type || fields.type === type
    })
    .sort((a, b) => {
      const fieldsA = a.fields as ProjectFields
      const fieldsB = b.fields as ProjectFields
      return fieldsA.title.localeCompare(fieldsB.title)
    })

  return (
    <PageLayout>
      <nav className="flex gap-8 md:gap-12 mb-12">
        <Link
          href="/"
          className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${!type ? 'text-white' : 'text-signals-navy'}`}
        >
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
            <Icon icon="octicon:issue-opened-24" className="w-full h-full" />
          </span>
          <span className="text-xl md:text-[2.8rem] font-extralight">All</span>
        </Link>
        <Link
          href="/?type=Book"
          className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${type === 'Book' ? 'text-white' : 'text-signals-navy'}`}
        >
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
            <Icon icon="octicon:book-24" className="w-full h-full" />
          </span>
          <span className="text-xl md:text-[2.8rem] font-extralight">Books</span>
        </Link>
        <Link
          href="/?type=Sign"
          className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${type === 'Sign' ? 'text-white' : 'text-signals-navy'}`}
        >
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
            <Icon icon="octicon:bookmark-24" className="w-full h-full" />
          </span>
          <span className="text-xl md:text-[2.8rem] font-extralight">Signs</span>
        </Link>
      </nav>

      <div className="project-list transition-opacity duration-300">
        {allProjects.map((project, index) => {
          const fields = project.fields as ProjectFields
          return (
            <React.Fragment key={project.sys.id}>
              <div className="relative inline-block md:inline group">
                <Link
                  href={`/projects/${(fields as ProjectFields).slug}`}
                  className={`inline-flex items-center gap-3 hover:text-signals-navy transition-all duration-300 ${!fields.coverImage ? 'text-signals-navy' : ''}`}
                >
                  <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
                    <Icon
                      icon={fields.type === 'Book' ? 'octicon:book-24' : 'octicon:bookmark-24'}
                      className="w-full h-full"
                    />
                  </span>
                  <span className="relative text-3xl md:text-[2.5rem] font-extralight whitespace-normal md:whitespace-nowrap">
                    <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">{fields.title}</span>
                    {index < allProjects.length - 1 && <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300 hidden md:inline">,&nbsp;</span>}
                    {fields.coverImage ? (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none overflow-hidden hidden md:block"
                        style={{
                          width: `${fields.title.length * 1.6}rem`,
                          height: `${fields.title.length * 1.1}rem`,
                          minWidth: '160px',
                          minHeight: '120px'
                        }}
                      >
                        <Image
                          src={`https:${fields.coverImage.fields.file.url}`}
                          alt={fields.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 400px) 100vw, 400px"
                        />
                      </div>
                    ) : (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden md:block"
                      >
                        <span className="text-xl md:text-[2.5rem] text-signals-navy font-extralight">On the boards</span>
                      </div>
                    )}
                  </span>
                </Link>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </PageLayout>
  )
} 