import ProjectCard from "@/components/project-card"
import { ProjectsHeader } from "@/components/projects-header"
import { getPublishedProjects } from "@/lib/supabase/client"

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <div className="container py-12 md:py-16">
      <ProjectsHeader />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
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
    </div>
  )
}
