import { notFound } from "next/navigation"
import { blogPosts } from "@/data/blog-posts"
import Link from "next/link"
import { Calendar, ArrowLeft, Tag } from "lucide-react"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Map blog post slugs to their featured images
const blogImages: Record<string, string> = {
  "ai-machine-learning-transforming-rural-nepal": "/images/blog/digital-literacy-nepal.png",
  "marsi-rice-worlds-highest-cultivated-rice": "/images/blog/marsi-rice-terraces.png",
  "lifi-technology-wireless-communication-rural-nepal": "/images/blog/rural-communication-nepal.png",
  "sustainable-agriculture-nepal": "/images/blog/sustainable-agriculture-nepal.png",
  "renewable-energy-rural-communities": "/images/blog/renewable-energy-nepal.png",
  "digital-literacy-nepal-future": "/images/blog/digital-literacy-nepal.png",
  "entrepreneurship-nepal": "/images/blog/sustainable-agriculture-nepal.png",
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get the featured image for this post or use a placeholder
  const featuredImage = blogImages[params.slug] || "/placeholder.svg?height=800&width=1200"

  // Function to convert markdown-like content to HTML with proper formatting
  const formatContent = (content: string) => {
    // Remove the markdown title at the beginning if it exists
    const formattedContent = content.replace(/^#\s+.*\n/, "")

    // Split content by sections (## headings)
    const sections = formattedContent.split(/##\s+/)

    // Process the introduction (content before the first ## heading)
    let processedContent = sections[0] ? `<div class="mb-10">${processSection(sections[0])}</div>` : ""

    // Process each section
    for (let i = 1; i < sections.length; i++) {
      const sectionParts = sections[i].split("\n")
      const sectionTitle = sectionParts[0]
      const sectionContent = sectionParts.slice(1).join("\n")

      processedContent += `
        <section class="mb-10">
          <h2 class="text-2xl font-bold mb-6 text-foreground border-b pb-2">${sectionTitle}</h2>
          ${processSection(sectionContent)}
        </section>
      `
    }

    return processedContent
  }

  // Helper function to process a section's content
  const processSection = (content: string) => {
    let processed = content

    // Process subsections (### headings)
    processed = processed.replace(
      /###\s+(.*)\n/g,
      '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>',
    )

    // Process bold text
    processed = processed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Process paragraphs - split by double newlines and wrap each in a paragraph tag
    const paragraphs = processed.split(/\n\n+/)
    processed = paragraphs
      .map((p) => {
        // Skip if it's already an HTML element
        if (p.trim().startsWith("<")) return p
        return `<p class="mb-4 text-muted-foreground">${p.trim()}</p>`
      })
      .join("\n")

    // Process lists
    processed = processed.replace(/- (.*?)(?=\n- |\n\n|$)/g, '<li class="ml-6 mb-2">$1</li>')
    processed = processed.replace(/(<li.*?<\/li>\n)+/g, (match) => `<ul class="list-disc mb-6">${match}</ul>`)

    return processed
  }

  return (
    <div className="container max-w-4xl py-8 px-4 sm:py-12 sm:px-6 lg:py-16">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </div>

      <article className="bg-card rounded-lg shadow-sm overflow-hidden">
        {/* Featured Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
          <Image src={featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <header className="mb-10 border-b pb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Blog Content */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
        </div>
      </article>

      {/* Related Posts or CTA */}
      <div className="mt-12 bg-muted rounded-lg p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-4">Continue Reading</h2>
        <p className="text-muted-foreground mb-6">
          Explore more articles about entrepreneurship, technology, and sustainable development in Nepal.
        </p>
        <Link href="/blog" className="btn-primary inline-block">
          View All Articles
        </Link>
      </div>
    </div>
  )
}

