'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import PageLayout from '../../components/PageLayout'
import ImageCarousel from '../../components/ImageCarousel'
import { Project, ProjectFields } from '@/lib/contentful'
import { Asset } from 'contentful'
import ReactMarkdown from 'react-markdown'

interface CarouselImage {
  url: string
  width: number
  height: number
  title?: string
  description?: string
}

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
  project: Project
  prevProject?: Project
  nextProject?: Project
}

// Helper function to get a random color that's different from the current one
const getRandomColor = (currentColor: number): number => {
  const availableColors = Array.from({ length: colors.length }, (_, i) => i).filter(i => i !== currentColor)
  return availableColors[Math.floor(Math.random() * availableColors.length)]
}

export default function ProjectClient({ project, prevProject, nextProject }: ProjectClientProps) {
  const [currentColor, setCurrentColor] = useState(Math.floor(Math.random() * colors.length))
  const [showTextModal, setShowTextModal] = useState(true)
  const fields = project.fields as ProjectFields
  
  // Auto-hide text modal after 5 seconds
  useEffect(() => {
    if (showTextModal) {
      const timer = setTimeout(() => {
        setShowTextModal(false)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [showTextModal])

  // Simplified text color logic
  const textColor = currentColor === 4 ? 'text-signals-navy' : 'text-white'
  const hoverClass = currentColor === 4 ? 'hover:text-signals-slate' : 'hover:opacity-80'

  const handleColorChange = () => {
    setCurrentColor(getRandomColor(currentColor))
  }

  const processedImages: CarouselImage[] = fields.images?.map((image: Asset) => {
    const file = image.fields.file
    const details = file.details as { image: { width: number; height: number } }
    
    return {
      url: `https:${file.url}`,
      width: details.image?.width || 800,
      height: details.image?.height || 600,
      title: typeof image.fields.title === 'string' ? image.fields.title : undefined,
      description: typeof image.fields.description === 'string' ? image.fields.description : undefined
    }
  })
  .sort((a, b) => {
    // Sort by filename if available in the URL
    const aNum = parseInt(a.url.match(/(\d+)\.[^.]+$/)?.[1] || '0')
    const bNum = parseInt(b.url.match(/(\d+)\.[^.]+$/)?.[1] || '0')
    return aNum - bNum
  }) || []

  return (
    <PageLayout bgColor={colors[currentColor]} textColor={textColor} hoverClass={hoverClass}>
      {/* Project info section - reduced margin */}
      <div className="flex justify-between mb-4">
        {/* Left side - Project title and year */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="octicon:book-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
            <h1 className={`text-lg md:text-xl font-extralight ${textColor}`}>{fields.title}</h1>
          </div>
          <p className={`text-lg md:text-xl font-extralight ${textColor}`}>{fields.year}</p>
        </div>

        {/* Right side - Author and category */}
        <div className="text-right">
          <h2 className={`text-lg md:text-xl font-extralight ${textColor} mb-1`}>{fields.author}</h2>
          <p className={`text-lg md:text-xl font-extralight ${textColor}`}>{fields.category}</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative">
        <ImageCarousel 
          onColorChange={handleColorChange} 
          images={processedImages}
        />

        {/* Text toggle button and award */}
        <div className="absolute left-4 top-4 z-20 flex flex-col items-center gap-2">
          <button
            onClick={() => setShowTextModal(!showTextModal)}
            className="p-3 hover:bg-white/5 transition-colors flex flex-col items-center"
            aria-label={showTextModal ? "Hide project text" : "Show project text"}
          >
            <Icon 
              icon={showTextModal ? "octicon:x-24" : "octicon:note-24"}
              className={`w-8 h-8 ${showTextModal ? 'text-white' : 'text-signals-red'}`}
            />
            <span className={`text-sm mt-1 font-light transition-all duration-300 ease-in-out opacity-100 ${
              showTextModal ? 'text-white' : 'text-signals-red'
            }`}>
              {showTextModal ? 'CLOSE' : 'ABOUT'}
            </span>
          </button>
          
          {fields.hasAward && (
            fields.awardUrl ? (
              <a 
                href={fields.awardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 flex flex-col items-center hover:bg-white/5 transition-colors"
              >
                <Icon 
                  icon="material-symbols-light:award-star-outline-rounded"
                  className={`w-8 h-8 ${showTextModal ? 'text-white' : 'text-signals-red'}`}
                />
                <span className={`text-sm mt-1 font-light transition-all duration-300 ease-in-out opacity-100 ${
                  showTextModal ? 'text-white' : 'text-signals-red'
                }`}>
                  AWARD
                </span>
              </a>
            ) : (
              <div className="p-3 flex flex-col items-center">
                <Icon 
                  icon="material-symbols-light:award-star-outline-rounded"
                  className={`w-8 h-8 ${showTextModal ? 'text-white' : 'text-signals-red'}`}
                />
                <span className={`text-sm mt-1 font-light transition-all duration-300 ease-in-out opacity-100 ${
                  showTextModal ? 'text-white' : 'text-signals-red'
                }`}>
                  AWARD
                </span>
              </div>
            )
          )}
        </div>

        {/* Text modal sheet */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ease-in-out z-10 ${colors[currentColor]} ${
            showTextModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-full flex items-center justify-center">
            <div className="p-8 max-w-4xl">
              <div className="text-xl md:text-[2.5rem] text-white font-extralight leading-relaxed">
                <ReactMarkdown>{fields.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
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
              href={`/projects/${(prevProject.fields as ProjectFields).slug}`}
              className={`flex items-center gap-2 ${textColor} ${hoverClass} transition-all duration-300`}
            >
              <Icon icon="octicon:arrow-left-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
              <span className="text-lg md:text-xl font-extralight rotate-180 transform origin-center">
                {(prevProject.fields as ProjectFields).title}
              </span>
            </Link>
          )}
          {nextProject && (
            <Link 
              href={`/projects/${(nextProject.fields as ProjectFields).slug}`}
              className={`flex items-center gap-2 ${textColor} ${hoverClass} transition-all duration-300`}
            >
              <span className="text-lg md:text-xl font-extralight">{(nextProject.fields as ProjectFields).title}</span>
              <Icon icon="octicon:arrow-right-24" className={`w-5 h-5 md:w-6 md:h-6 ${textColor}`} />
            </Link>
          )}
        </div>
      </div>
    </PageLayout>
  )
}