import { redirect } from "next/navigation"
import Link from "next/link"
import { getUser } from "@/lib/supabase/server"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Folder, BarChart3 } from "lucide-react"

async function getStats() {
  try {
    // Get user to check auth
    const user = await getUser()
    if (!user) {
      redirect("/admin/login")
    }

    // Get counts
    const [
      { count: projectsCount },
      { count: postsCount },
      { count: unreadMessagesCount },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("messages").select("*", { count: "exact", head: true }).eq("read", false),
    ])

    return {
      projectsCount: projectsCount || 0,
      postsCount: postsCount || 0,
      unreadMessagesCount: unreadMessagesCount || 0,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return {
      projectsCount: 0,
      postsCount: 0,
      unreadMessagesCount: 0,
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to your portfolio admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Projects</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectsCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/projects" className="hover:underline">
                Manage projects
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postsCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/posts" className="hover:underline">
                Manage posts
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessagesCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/messages" className="hover:underline">
                View messages
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your portfolio content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/projects">
                <Folder className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/posts">
                <FileText className="mr-2 h-4 w-4" />
                Posts
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
