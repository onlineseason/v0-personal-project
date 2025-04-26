import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, ArrowLeft, Tag } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/prismic"
import * as prismicH from "@prismicio/helpers"
import { PrismicRichText } from "@prismicio/react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const posts = await client.getAllByType("blog_post")

  return posts.map((post) => ({
    slug: post.uid,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const client = createClient()
  const post = await client.getByUID("blog_post", params.slug).catch(() => null)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    }
  }

  return {
    title: `${prismicH.asText(post.data.title)} | Dorna Raj Budthapa`,
    description: prismicH.asText(post.data.excerpt),
    openGraph: {
      images: [{ url: prismicH.asImageSrc(post.data.featured_image) || "" }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const client = createClient()
  const post = await client.getByUID("blog_post", params.slug).catch(() => null)

  if (!post) {
    notFound()
  }

  // Get the publication date
  const publicationDate = post.data.publication_date || post.first_publication_date
  const formattedDate = new Date(publicationDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
          <Image
            src={prismicH.asImageSrc(post.data.featured_image) || "/placeholder.svg"}
            alt={prismicH.asText(post.data.title) || ""}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <header className="mb-10 border-b pb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              {prismicH.asText(post.data.title)}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={publicationDate}>{formattedDate}</time>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Blog Content */}
          <div className="blog-content">
            <PrismicRichText field={post.data.content} />
          </div>
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
