'use client'
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Expertise } from '../components/Expertise';
import { ResumePreview } from '../components/ResumePreview';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Education } from '../components/Education';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-500 selection:text-white font-sans">
      <Navbar />
      <Hero />
      <Expertise />
      <ResumePreview />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
