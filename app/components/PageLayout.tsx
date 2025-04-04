'use client'

import React from 'react'
import Header from './Header'

interface PageLayoutProps {
  children: React.ReactNode
  bgColor?: string
  textColor?: string
  hoverClass?: string
}

export default function PageLayout({ 
  children, 
  bgColor = 'bg-[#FF0054]',
  textColor = 'text-white',
  hoverClass = 'hover:text-signals-navy'
}: PageLayoutProps) {
  return (
    <main className={`min-h-screen transition-colors duration-1000 ${bgColor}`}>
      <div className="px-8 md:px-16 py-8 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <Header textColor={textColor} hoverClass={hoverClass} />
          {children}
        </div>
      </div>
    </main>
  )
} 