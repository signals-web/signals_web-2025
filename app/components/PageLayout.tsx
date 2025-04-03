'use client'

import React from 'react'
import Header from './Header'

interface PageLayoutProps {
  children: React.ReactNode
  bgColor?: string
  textColor?: string
  hoverClass?: string
  showContact?: boolean
}

export default function PageLayout({ 
  children, 
  bgColor = 'bg-[#FF0054]',
  textColor = 'text-white',
  hoverClass = 'hover:opacity-80',
  showContact = false
}: PageLayoutProps) {
  return (
    <main className={`min-h-screen p-8 md:p-16 transition-colors duration-1000 ${bgColor}`}>
      <div className="max-w-[1200px] mx-auto">
        <Header textColor={textColor} hoverClass={hoverClass} showContact={showContact} />
        {children}
      </div>
    </main>
  )
} 