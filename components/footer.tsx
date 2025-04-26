import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Dorna Raj Budthapa</h3>
            <p className="mt-2 text-sm text-muted-foreground">Entrepreneur | Engineer | Digital Advocate</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="mt-2 flex space-x-4">
              <Link
                href="https://facebook.com/dornaseason"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link
                href="https://instagram.com/dornaseason2020"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link
                href="https://twitter.com/dornarajbudthapa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link
                href="https://linkedin.com/in/dornaraj/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="https://github.com/season1999" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="mailto:Hello@dornarajbudthapa.com.np" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dorna Raj Budthapa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

