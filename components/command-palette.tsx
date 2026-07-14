"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FileText, Folder, Link2, Home, Mail } from "lucide-react"

interface CommandItem {
  id: string
  title: string
  description?: string
  category: "Navigation" | "Project" | "Post"
  icon: React.ReactNode
  action: () => void
}

interface Project {
  slug: string
  title: string
}

interface Post {
  slug: string
  title: string
}

interface CommandPaletteProps {
  projects?: Project[]
  posts?: Post[]
}

export function CommandPalette({ projects = [], posts = [] }: CommandPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Handle keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const navigationItems: CommandItem[] = [
    {
      id: "home",
      title: "Home",
      description: "Go to home page",
      category: "Navigation",
      icon: <Home className="h-4 w-4" />,
      action: () => {
        router.push("/")
        setOpen(false)
      },
    },
    {
      id: "projects",
      title: "Projects",
      description: "View all projects",
      category: "Navigation",
      icon: <Folder className="h-4 w-4" />,
      action: () => {
        router.push("/projects")
        setOpen(false)
      },
    },
    {
      id: "contact",
      title: "Contact",
      description: "Get in touch",
      category: "Navigation",
      icon: <Mail className="h-4 w-4" />,
      action: () => {
        router.push("/contact")
        setOpen(false)
      },
    },
  ]

  const projectItems: CommandItem[] = projects.map((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    category: "Project",
    icon: <Folder className="h-4 w-4" />,
    action: () => {
      router.push(`/projects/${project.slug}`)
      setOpen(false)
    },
  }))

  const postItems: CommandItem[] = posts.map((post) => ({
    id: `post-${post.slug}`,
    title: post.title,
    category: "Post",
    icon: <FileText className="h-4 w-4" />,
    action: () => {
      router.push(`/blog/${post.slug}`)
      setOpen(false)
    },
  }))

  const allItems = [...navigationItems, ...projectItems, ...postItems]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:overflow-hidden [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5">
          <Command.Input
            placeholder="Search projects, posts, and navigation..."
            className="border-0 focus:ring-0"
          />
          <Command.List className="max-h-[300px] overflow-y-auto">
            <Command.Empty>No results found.</Command.Empty>

            {navigationItems.length > 0 && (
              <Command.Group heading="Navigation">
                {navigationItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title.toLowerCase()}
                    onSelect={item.action}
                    className="cursor-pointer"
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span>{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {projectItems.length > 0 && (
              <Command.Group heading="Projects">
                {projectItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title.toLowerCase()}
                    onSelect={item.action}
                    className="cursor-pointer"
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {postItems.length > 0 && (
              <Command.Group heading="Blog Posts">
                {postItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title.toLowerCase()}
                    onSelect={item.action}
                    className="cursor-pointer"
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          <div className="border-t px-2 py-2 text-xs text-muted-foreground">
            <span className="inline-block rounded bg-muted px-1.5 py-0.5">⌘K</span>
            <span className="ml-2">to toggle</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
