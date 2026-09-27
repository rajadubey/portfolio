import HomeShell from "@/components/home-shell";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Education from "@/components/sections/education";
import Engineering from "@/components/sections/engineering";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Work from "@/components/sections/work";

export default function Home() {
  return (
    <HomeShell>
      <main className="max-w-[1120px] mx-auto px-6 pt-14">
        <Hero />
        <About />
        <Work />
        <Education />
        <Projects />
        <Engineering />
        <Contact />
      </main>
      <div className="max-w-[1120px] mx-auto px-6">
        <Footer />
      </div>
    </HomeShell>
  );
}
