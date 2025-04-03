'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'

const colors = [
  { bg: 'bg-signals-red', cursor: '/chevron-left-red.svg' },
  { bg: 'bg-signals-red-dark', cursor: '/chevron-left-red-dark.svg' },
  { bg: 'bg-signals-red-deeper', cursor: '/chevron-left-red-deeper.svg' },
  { bg: 'bg-signals-navy', cursor: '/chevron-left-navy.svg' },
  { bg: 'bg-signals-slate', cursor: '/chevron-left-slate.svg' }
]

interface ImageCarouselProps {
  onColorChange: (colorIndex: number) => void
  images: Array<{
    url: string
    width: number
    height: number
    title?: string
    description?: string
  }>
}

export default function ImageCarousel({ onColorChange, images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentColorIndex, setCurrentColorIndex] = useState(Math.floor(Math.random() * colors.length))
  const [isGridView, setIsGridView] = useState(false)

  // Set initial color on mount
  useEffect(() => {
    // Force scrollbar to always be visible to prevent layout shift
    document.documentElement.style.overflow = 'scroll'
    onColorChange(currentColorIndex)
    
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  const goToNext = () => {
    if (currentIndex < images.length - 1 && !isTransitioning) {
      setIsTransitioning(true)
      const newColorIndex = Math.floor(Math.random() * colors.length)
      setCurrentColorIndex(newColorIndex)
      onColorChange(newColorIndex)
      setCurrentIndex(currentIndex + 1)
      setTimeout(() => setIsTransitioning(false), 1000)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true)
      const newColorIndex = Math.floor(Math.random() * colors.length)
      setCurrentColorIndex(newColorIndex)
      onColorChange(newColorIndex)
      setCurrentIndex(currentIndex - 1)
      setTimeout(() => setIsTransitioning(false), 1000)
    }
  }

  const toggleView = () => {
    setIsGridView(!isGridView)
  }

  return (
    <div className="relative">
      {/* View toggle button */}
      <button
        onClick={toggleView}
        className="absolute right-4 top-4 z-10 p-3 hover:bg-white/5 transition-colors flex flex-col items-center"
        aria-label={isGridView ? "Switch to carousel view" : "Switch to grid view"}
      >
        <Icon 
          icon={isGridView ? "material-symbols-light:view-carousel-outline-rounded" : "material-symbols-light:grid-view-outline-rounded"}
          className="w-8 h-8 text-signals-red"
        />
        <span className="text-signals-red text-sm mt-1 font-light transition-opacity duration-300 ease-in-out opacity-100">
          {isGridView ? 'SLIDER' : 'GRID'}
        </span>
      </button>

      {isGridView ? (
        // Grid view
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden overscroll-none">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[16/10] bg-neutral-600 cursor-pointer"
              onClick={() => {
                setIsGridView(false)
                setCurrentIndex(index)
              }}
            >
              <Image
                src={image.url}
                alt={image.title || `Project image ${index + 1}`}
                fill
                className="object-cover hover:opacity-80 transition-opacity"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
          ))}
        </div>
      ) : (
        // Carousel view
        <div className="overflow-hidden overscroll-none">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="aspect-[16/10] relative bg-neutral-600">
                  <Image
                    src={image.url}
                    alt={image.title || `Project image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation areas */}
          {currentIndex > 0 && !isTransitioning && (
            <div 
              onClick={goToPrev}
              className={`absolute left-0 top-0 w-1/2 h-full hover:bg-white/5 transition-colors`}
              style={{ cursor: `url('${colors[currentColorIndex].cursor}') 48 48, w-resize` }}
            />
          )}
          
          {currentIndex < images.length - 1 && !isTransitioning && (
            <div 
              onClick={goToNext}
              className={`absolute right-0 top-0 w-1/2 h-full hover:bg-white/5 transition-colors`}
              style={{ cursor: `url('${colors[currentColorIndex].cursor.replace('left', 'right')}') 48 48, e-resize` }}
            />
          )}
        </div>
      )}
    </div>
  )
} 