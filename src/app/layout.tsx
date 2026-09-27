import React from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/theme-provider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Raja Dubey - Full Stack Engineer',
  description:
    'Full stack engineer with 5+ years of experience building fintech and B2B data intelligence systems across backend services, RESTful APIs, distributed data ingestion, search platforms, and high-performance web applications.',
  authors: [{ name: 'Raja Dubey' }],
  creator: 'Raja Dubey',
  openGraph: {
    title: 'Raja Dubey - Full Stack Engineer',
    description:
      'Full stack engineer with 5+ years of experience building fintech and B2B data intelligence systems.',
    url: 'https://rajadubey.in',
    siteName: 'Raja Dubey Portfolio',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');document.documentElement.className=t}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
