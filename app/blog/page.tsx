import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag } from "lucide-react"
import { createClient } from "@/lib/prismic"
import * as prismicH from "@prismicio/helpers"

export async function generateMetadata() {
  return {
    title: "Blog & Insights | Dorna Raj Budthapa",
    description:
      "Thoughts, insights, and experiences from my journey in entrepreneurship, engineering, and digital advocacy in Nepal.",
  }
}

export default async function BlogPage() {
  const client = createClient()
  const blogPosts = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  })

  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <div className="container py-12 px-4 md:py-16">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl">Blog & Insights</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Thoughts, insights, and experiences from my journey in entrepreneurship, engineering, and digital advocacy in
        Nepal.
      </p>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.uid}`} className="block">
            <div className="group overflow-hidden rounded-lg border bg-card shadow-md">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image
                    src={prismicH.asImageSrc(featuredPost.data.featured_image) || "/placeholder.svg"}
                    alt={prismicH.asText(featuredPost.data.title) || ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={featuredPost.data.publication_date || featuredPost.first_publication_date}>
                      {new Date(
                        featuredPost.data.publication_date || featuredPost.first_publication_date,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {prismicH.asText(featuredPost.data.title)}
                  </h2>
                  <p className="text-muted-foreground mb-4">{prismicH.asText(featuredPost.data.excerpt)}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.data.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary font-medium inline-flex items-center">
                    Read article
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* All Posts */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post, index) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm h-full"
          >
            <Link href={`/blog/${post.uid}`} className="block">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={prismicH.asImageSrc(post.data.featured_image) || "/placeholder.svg"}
                  alt={prismicH.asText(post.data.title) || ""}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={post.data.publication_date || post.first_publication_date}>
                  {new Date(post.data.publication_date || post.first_publication_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <Link href={`/blog/${post.uid}`} className="flex-grow">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {prismicH.asText(post.data.title)}
                </h2>
                <p className="text-muted-foreground mb-4">{prismicH.asText(post.data.excerpt)}</p>
              </Link>
              <div className="flex flex-wrap gap-2 mt-auto">
                {post.data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
