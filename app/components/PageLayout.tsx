import React from 'react'
import Header from './Header'
import ColorWrapper from './ColorWrapper'

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
    <ColorWrapper bgColor={bgColor}>
      <div className="px-8 md:px-16 py-8 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <Header textColor={textColor} hoverClass={hoverClass} />
          {children}
        </div>
      </div>
    </ColorWrapper>
  )
}