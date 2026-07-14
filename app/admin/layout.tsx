import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-lg font-bold">
              Admin
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/admin/projects"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Projects
              </Link>
              <Link
                href="/admin/posts"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Posts
              </Link>
              <Link
                href="/admin/messages"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Messages
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Site</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                // Client-side logout will be implemented
                window.location.href = "/admin/login?logout=true"
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main>{children}</main>
    </div>
  )
}
