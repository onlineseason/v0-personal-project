import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProjectCard from "@/components/project-card"
import { CommandPalette } from "@/components/command-palette"
import { HomeHero } from "@/components/home-hero"
import { getPublishedProjects } from "@/lib/supabase/client"

export default async function Home() {
  const projects = await getPublishedProjects()

  return (
    <div className="flex flex-col">
      <CommandPalette 
        projects={projects.map(p => ({ slug: p.slug, title: p.title }))}
      />

      <HomeHero />

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 text-lg text-muted-foreground">Some of my recent work and ongoing initiatives</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={{
                  id: project.id,
                  title: project.title,
                  description: project.description || "",
                  image: project.image_url || "/placeholder.svg",
                  link: project.link,
                  tags: project.tags,
                }}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/projects" className="inline-flex items-center text-primary hover:underline">
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
