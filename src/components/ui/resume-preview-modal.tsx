'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo, experience, education, projects, skillCategories } from '@/lib/data'

interface ResumePreviewModalProps {
  open: boolean
  onClose: () => void
}

export default function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = personalInfo.resumeUrl
    link.download = 'Raja_Babu_Dubey_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#121214] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161619]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <h3 className="font-semibold text-base text-white">Raja Babu Dubey - Resume Preview</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Resume content sheet */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-neutral-300 font-sans">
              {/* Profile Header */}
              <div className="border-b border-white/10 pb-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white tracking-wide">{personalInfo.name}</h1>
                <p className="text-emerald-400 text-sm font-semibold mt-1">{personalInfo.title}</p>
                <div className="flex flex-wrap gap-4 text-xs text-neutral-400 mt-2">
                  <span>📞 {personalInfo.phone}</span>
                  <span>✉️ {personalInfo.email}</span>
                  <span>📍 {personalInfo.location}</span>
                  <span>🔗 linkedin.com/in/rajadubey</span>
                  <span>💻 github.com/rajadubey</span>
                </div>
              </div>

              {/* Profile Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  PROFILE SUMMARY
                </h4>
                <p className="text-xs leading-relaxed text-neutral-300">{personalInfo.subtitle}</p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  WORK EXPERIENCE
                </h4>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.company} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{exp.title} - {exp.company}</span>
                        <span className="text-neutral-400 font-mono">{exp.period}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 italic mb-1">{exp.location}</div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  EDUCATION
                </h4>
                {education.map((ed) => (
                  <div key={ed.institution} className="flex justify-between text-xs text-white">
                    <div>
                      <span className="font-semibold">{ed.institution}</span> — {ed.degree}
                      <span className="block text-[11px] text-neutral-400">{ed.location}</span>
                    </div>
                    <span className="font-mono text-neutral-400">{ed.period}</span>
                  </div>
                ))}
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  TECHNICAL SKILLS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {skillCategories.map((cat) => (
                    <div key={cat.category}>
                      <span className="font-semibold text-white">{cat.category}: </span>
                      <span className="text-neutral-300">{cat.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Projects */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  PERSONAL PROJECTS
                </h4>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.name} className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{proj.name}</span>
                        <span className="font-mono text-[10px] text-emerald-400 font-normal">
                          ({proj.stack.join(', ')})
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
                        {proj.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
