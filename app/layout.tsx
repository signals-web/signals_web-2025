import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { DM_Sans, DM_Mono } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400'],
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'SIGNALS',
  description: 'Design studio focused on books and wayfinding signage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className={dmSans.className}>{children}</body>
    </html>
  )
} 