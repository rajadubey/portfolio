"use client";

import FadeIn from "@/components/fade-in";

export default function About() {
  return (
    <FadeIn as="section" className="py-12 border-t b-subtle">
      <div id="about">
        <h2 className="text-2xl md:text-3xl font-semibold t-primary mb-4">
          Building Scalable Web Systems & Platforms
        </h2>
        <div className="space-y-5 text-base t-muted leading-relaxed">
          <p>
            I am a <span className="t-secondary">Full Stack Engineer</span> with{" "}
            <span className="t-secondary">5+ years of experience</span> building
            fintech and B2B data intelligence systems across backend
            microservices, RESTful APIs, distributed data ingestion, search
            platforms, and high-performance web applications.
          </p>
          <p>
            At <span className="t-secondary">Oxyzo Financial Services</span> and{" "}
            <span className="t-secondary">OfBusiness</span>, I have led
            full-stack delivery of enterprise workflow automation platforms,
            scaled bidder and company datasets to over 10M+ profiles handling
            1M+ daily scraper requests, and optimized SSR applications achieving
            95+ Lighthouse performance scores.
          </p>
          <p>
            I graduated with a Bachelor of Engineering in Computer Science from{" "}
            <span className="t-secondary">
              Government Engineering College, Ujjain
            </span>
            .
          </p>
          <p>
            I focus on{" "}
            <span className="t-secondary">robust software engineering</span>,{" "}
            <span className="t-secondary">clean design systems</span>, and
            delivering{" "}
            <span className="t-secondary">
              high-speed, accessible user experiences
            </span>
            .
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
