"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import FadeIn from "@/components/fade-in";
import { skillCategories } from "@/lib/data";

type SectionKey = "skills";

const sections: { id: SectionKey; label: string }[] = [
  { id: "skills", label: "Technical Skills" },
];

export default function Engineering() {
  const [open, setOpen] = useState<Set<SectionKey>>(new Set(["skills"]));
  const reduceMotion = useReducedMotion();

  const toggle = (id: SectionKey) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <FadeIn as="section" className="py-16 border-t b-subtle">
      <div id="engineering">
        <h2 className="text-2xl md:text-3xl font-semibold t-primary mb-10">
          Engineering
        </h2>
        <div className="space-y-1">
          {sections.map((s) => (
            <div key={s.id}>
              <button
                onClick={() => toggle(s.id)}
                className="w-full text-left flex items-center justify-between py-3 group"
                aria-expanded={open.has(s.id)}
              >
                <span
                  className={`text-sm font-medium transition-colors ${open.has(s.id) ? "t-primary" : "t-muted group-hover:t-secondary"}`}
                >
                  {s.label}
                </span>
                <svg
                  className={`w-4 h-4 t-faint transition-transform ${open.has(s.id) ? "rotate-180" : ""}`}
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
                {open.has(s.id) && (
                  <motion.div
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                    }
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {skillCategories.map((cat) => (
                          <div key={cat.category}>
                            <h3 className="text-xs font-medium t-muted uppercase tracking-wider mb-2">
                              {cat.category}
                            </h3>
                            <p className="text-sm t-muted leading-relaxed">
                              {cat.items.join(", ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
