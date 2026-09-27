"use client";

import { useCallback, useEffect, useState } from "react";

const sections = [
  "home",
  "about",
  "work",
  "education",
  "projects",
  "engineering",
  "contact",
];

export default function SectionIndicator() {
  const [active, setActive] = useState("home");

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const secId = sections[i];
      if (secId) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollY) {
            setActive(secId);
            break;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const section = el.closest("section") || el.parentElement;
      if (section) {
        section.style.opacity = "1";
        section.style.transform = "none";
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => scrollTo(s)}
          title={s}
          aria-label={`Jump to ${s} section`}
          className="p-1 -m-1 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              active === s
                ? "bg-emerald-400 scale-125"
                : "bg-black/15 dark:bg-white/10 group-hover:bg-black/30 dark:group-hover:bg-white/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
