import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import { getPublishedProjects } from "@/lib/supabase/client"

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <div className="container py-12 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Projects
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground"
      >
        Explore my portfolio of projects spanning entrepreneurship, engineering, and digital advocacy. Each initiative
        represents my commitment to sustainable development and technological innovation.
      </motion.p>

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
