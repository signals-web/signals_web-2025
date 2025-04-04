'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  textColor?: string
  hoverClass: string
}

export default function Header({ 
  textColor = 'text-white', 
  hoverClass
}: HeaderProps) {
  return (
    <header className="flex justify-between items-start mb-24">
      <Link href="/" className="block">
        <Image 
          src="/signals-header.png" 
          alt="SIGNALS"
          width={192}
          height={48}
          className="w-[144px] md:w-[192px]"
          priority
        />
      </Link>
      <nav className="flex gap-8">
        <Link 
          href="/about"
          className={`text-lg md:text-[1.75rem] font-extralight ${textColor} ${hoverClass} transition-all duration-300`}
        >
          About
        </Link>
        <Link 
          href="/contact"
          className={`text-lg md:text-[1.75rem] font-extralight ${textColor} ${hoverClass} transition-all duration-300`}
        >
          Contact
        </Link>
      </nav>
    </header>
  )
} 