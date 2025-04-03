import React from 'react'
import { getProjectsByType } from '../lib/contentful'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import PageLayout from './components/PageLayout'
import Image from 'next/image'

export const revalidate = 60 // Revalidate every minute

export default async function HomePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const type = searchParams.type as string | undefined
  
  const [books, signs] = await Promise.all([
    getProjectsByType('Book'),
    getProjectsByType('Sign')
  ])

  const allProjects = [...books, ...signs]
    .filter(project => !type || project.fields.type === type)
    .sort((a, b) => (a.fields.title as string).localeCompare(b.fields.title as string))

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
        {allProjects.map((project, index) => (
          <React.Fragment key={project.sys.id}>
            <div className="relative inline group">
              <Link 
                href={`/projects/${project.sys.id}`}
                className="inline-flex items-center gap-2 hover:text-signals-navy transition-all duration-300"
              >
                <span className="inline-block w-8 h-8 md:w-10 md:h-10 text-signals-navy">
                  <Icon 
                    icon={project.fields.type === 'Book' ? 'octicon:book-24' : 'octicon:bookmark-24'} 
                    className="w-full h-full"
                  />
                </span>
                <span className="relative text-xl md:text-[2.8rem] font-extralight whitespace-nowrap">
                  <span className="relative z-10 group-hover:mix-blend-difference">{project.fields.title}</span>
                  {index < allProjects.length - 1 && <span className="relative z-10 group-hover:mix-blend-difference">,&nbsp;</span>}
                  {project.fields.coverImage && (
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none overflow-hidden"
                      style={{
                        width: `${(project.fields.title as string).length * 2.8}rem`,
                        height: `${(project.fields.title as string).length * 1.8}rem`,
                        minWidth: '200px',
                        minHeight: '133px',
                        maxWidth: '400px',
                        maxHeight: '267px'
                      }}
                    >
                      <Image
                        src={`https:${project.fields.coverImage.fields.file.url}`}
                        alt={project.fields.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 400px) 100vw, 400px"
                      />
                    </div>
                  )}
                </span>
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
    </PageLayout>
  )
} 