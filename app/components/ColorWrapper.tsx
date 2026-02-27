'use client'

import React from 'react'

interface ColorWrapperProps {
    children: React.ReactNode
    bgColor: string
}

export default function ColorWrapper({ children, bgColor }: ColorWrapperProps) {
    return (
        <main className={`min-h-screen transition-colors duration-1000 ${bgColor}`}>
            {children}
        </main>
    )
}
