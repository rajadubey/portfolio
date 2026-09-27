"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import FadeIn from "@/components/fade-in";
import { projects } from "@/lib/data";

type Tab = "overview" | "stack";

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<Tab>("overview");
  const reduceMotion = useReducedMotion();

  const project = projects[selected] || projects[0];
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "stack", label: "Stack" },
  ];

  return (
    <FadeIn as="section" className="py-16 border-t b-subtle">
      <div id="projects">
        <h2 className="text-2xl md:text-3xl font-semibold t-primary mb-10">
          Projects
        </h2>

        {/* Desktop: split view */}
        <div className="hidden md:grid grid-cols-[280px_1fr] gap-8">
          {/* Left panel — project list */}
          <div className="space-y-1">
            {projects.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  setSelected(i);
                  setTab("overview");
                }}
                className={`w-full text-left px-3 py-3 rounded-lg transition-colors group ${
                  selected === i
                    ? "border-l-2 border-emerald-500 bg-white/[0.03]"
                    : "border-l-2 border-transparent hover:bg-white/[0.02]"
                }`}
              >
                <div className="font-medium text-sm t-secondary group-hover:t-primary transition-colors">
                  {p.name}
                </div>
                <div className="text-xs t-muted mt-0.5 line-clamp-1">
                  {p.description}
                </div>
              </button>
            ))}
          </div>

          {/* Right panel — detail */}
          {project && (
            <div className="sticky top-20 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.name}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.15 }
                  }
                >
                  <h3 className="text-xl font-semibold t-primary mb-4 flex items-center justify-between">
                    <span>{project.name}</span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-500 hover:underline font-mono"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </h3>

                  {/* Tabs */}
                  <div className="flex gap-4 mb-6 border-b b-subtle">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`text-sm pb-2 -mb-px transition-colors border-b ${
                          tab === t.id
                            ? "text-emerald-500 border-emerald-500 font-medium"
                            : "border-transparent t-muted hover:t-secondary"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={
                        reduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }
                      }
                      transition={
                        reduceMotion ? { duration: 0 } : { duration: 0.1 }
                      }
                    >
                      <TabContent project={project} tab={tab} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-3">
          {projects.map((p, i) => (
            <MobileProject
              key={p.name}
              project={p}
              isOpen={selected === i}
              onToggle={() => {
                setSelected(selected === i ? -1 : i);
                setTab("overview");
              }}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function TabContent({
  project,
  tab,
}: {
  project: (typeof projects)[number];
  tab: Tab;
}) {
  if (tab === "overview") {
    return (
      <ul className="space-y-3">
        {project.bullets.map((b) => (
          <li
            key={b.slice(0, 32)}
            className="text-sm t-muted leading-relaxed pl-3 border-l b-subtle"
          >
            {b}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {project.stack.map((t) => (
        <span
          key={t}
          className="text-sm t-secondary border b-muted rounded px-2.5 py-1"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function MobileProject({
  project,
  isOpen,
  onToggle,
}: {
  project: (typeof projects)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border b-subtle rounded-lg">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <div>
          <div className="font-medium text-sm t-secondary">{project.name}</div>
          <div className="text-xs t-muted mt-0.5 line-clamp-1">
            {project.description}
          </div>
        </div>
        <svg
          className={`w-4 h-4 t-faint transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {project.github && (
                <div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-500 hover:underline font-mono inline-flex items-center"
                  >
                    GitHub ↗
                  </a>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs t-muted border b-subtle rounded px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="space-y-2">
                {project.bullets.map((b) => (
                  <li
                    key={b.slice(0, 32)}
                    className="text-sm t-muted leading-relaxed pl-2 border-l b-subtle"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
