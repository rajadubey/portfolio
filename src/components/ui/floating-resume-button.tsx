'use client'

import React from 'react'

interface FloatingResumeButtonProps {
  onOpen: () => void
}

export default function FloatingResumeButton({ onOpen }: FloatingResumeButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={onOpen}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-xs sm:text-sm px-4 py-3 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
        title="Quick Resume Preview"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Resume</span>
      </button>
    </div>
  )
}
