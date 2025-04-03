'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import PageLayout from '../../components/PageLayout'
import ImageCarousel from '../../components/ImageCarousel'

// Tailwind colors to cycle through - simplified list
const colors = [
  'bg-signals-red',
  'bg-signals-red-dark',
  'bg-signals-red-deeper',
  'bg-signals-navy',
  'bg-signals-slate'
]

// Define which backgrounds should use dark text
const useDarkText = new Set(['bg-signals-gray', 'bg-signals-slate'])

interface ProjectClientProps {
  project: any // TODO: Add proper type
  prevProject?: { sys: { id: string }, fields: { title: string } }
  nextProject?: { sys: { id: string }, fields: { title: string } }
}

// Helper function to get a random color that's different from the current one
const getRandomColor = (currentColor: number): number => {
  const availableColors = Array.from({ length: colors.length }, (_, i) => i).filter(i => i !== currentColor)
  return availableColors[Math.floor(Math.random() * availableColors.length)]
}

export default function ProjectClient({ project, prevProject, nextProject }: ProjectClientProps) {
  const [currentColor, setCurrentColor] = useState(Math.floor(Math.random() * colors.length))
  
  // Simplified text color logic
  const textColor = currentColor === 4 ? 'text-signals-navy' : 'text-white'
  const hoverClass = currentColor === 4 ? 'hover:text-signals-slate' : 'hover:opacity-80'

  const handleColorChange = () => {
    setCurrentColor(getRandomColor(currentColor))
  }

  return (
    <PageLayout bgColor={colors[currentColor]} textColor={textColor} hoverClass={hoverClass}>
      {/* Project info section - reduced margin */}
      <div className="flex justify-between mb-4">
        {/* Left side - Project title and year */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="octicon:book-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
            <h1 className={`text-lg md:text-xl font-extralight ${textColor}`}>{project.fields.title}</h1>
          </div>
          <p className={`text-lg md:text-xl font-extralight ${textColor}`}>{project.fields.year}</p>
        </div>

        {/* Right side - Author and category */}
        <div className="text-right">
          <h2 className={`text-lg md:text-xl font-extralight ${textColor} mb-1`}>{project.fields.author}</h2>
          <p className={`text-lg md:text-xl font-extralight ${textColor}`}>{project.fields.category}</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative">
        <ImageCarousel 
          onColorChange={handleColorChange} 
          images={project.fields.images
            ?.map((image: any) => ({
              url: `https:${image.fields.file.url}`,
              width: image.fields.file.details.image.width,
              height: image.fields.file.details.image.height,
              title: image.fields.title,
              description: image.fields.description,
              filename: image.fields.file.fileName
            }))
            .sort((a, b) => {
              // Extract numbers from filenames
              const aMatch = a.filename.match(/(\d+)\.[^.]+$/)
              const bMatch = b.filename.match(/(\d+)\.[^.]+$/)
              const aNum = aMatch ? parseInt(aMatch[1]) : 0
              const bNum = bMatch ? parseInt(bMatch[1]) : 0
              return aNum - bNum
            })
            .map(({ filename, ...image }) => image) // Remove filename from final object
            || []
          }
        />
      </div>

      {/* Navigation footer - reduced margin */}
      <div className="flex justify-between items-center mt-4">
        {/* Back to projects */}
        <Link 
          href="/" 
          className={`flex items-center gap-2 ${textColor} ${hoverClass} transition-all duration-300`}
        >
          <Icon icon="octicon:move-to-start-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
          <span className="text-lg md:text-xl font-extralight">Back to Projects</span>
        </Link>

        {/* Project navigation */}
        <div className="flex items-center gap-4 md:gap-8">
          {prevProject && (
            <Link 
              href={`/projects/${prevProject.sys.id}`}
              className={`flex items-center gap-2 ${textColor} ${hoverClass} transition-all duration-300`}
            >
              <Icon icon="octicon:arrow-left-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
              <span className="text-lg md:text-xl font-extralight rotate-180 transform origin-center">
                {prevProject.fields.title}
              </span>
            </Link>
          )}
          {nextProject && (
            <Link 
              href={`/projects/${nextProject.sys.id}`}
              className={`flex items-center gap-2 ${textColor} ${hoverClass} transition-all duration-300`}
            >
              <span className="text-lg md:text-xl font-extralight">{nextProject.fields.title}</span>
              <Icon icon="octicon:arrow-right-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
            </Link>
          )}
        </div>
      </div>
    </PageLayout>
  )
}