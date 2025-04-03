'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  textColor?: string
  hoverClass?: string
  showContact?: boolean
}

export default function Header({ 
  textColor = 'text-white', 
  hoverClass = 'hover:opacity-80',
  showContact = false 
}: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-24">
      <Link href="/">
        <div className="w-[192px] md:w-[256px]">
          <Image 
            src="/signals-header.png" 
            alt="SIGNALS"
            width={400}
            height={100}
            className="w-full"
            priority
          />
        </div>
      </Link>
      <div className="flex gap-8">
        <Link 
          href="/about"
          className={`text-xl md:text-[2.8rem] font-extralight ${textColor} ${hoverClass} transition-all duration-300`}
        >
          About
        </Link>
        {showContact && (
          <Link 
            href="/contact"
            className={`text-xl md:text-[2.8rem] font-extralight ${textColor} ${hoverClass} transition-all duration-300`}
          >
            Contact
          </Link>
        )}
      </div>
    </div>
  )
} 