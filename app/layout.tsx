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
  title: {
    default: 'SIGNALS',
    template: '%s | SIGNALS'
  },
  description: 'Design studio focused on books and wayfinding signage',
  openGraph: {
    title: 'SIGNALS',
    description: 'Design studio focused on books and wayfinding signage',
    url: 'https://sendoutsignals.com',
    siteName: 'SIGNALS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIGNALS',
    description: 'Design studio focused on books and wayfinding signage',
  },
  robots: {
    index: true,
    follow: true,
  }
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