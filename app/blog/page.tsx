"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"

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

export default function BlogPage() {
  return (
    <div className="container py-12 px-4 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Blog & Insights
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground"
      >
        Thoughts, insights, and experiences from my journey in entrepreneurship, engineering, and digital advocacy in
        Nepal.
      </motion.p>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <Link href={`/blog/${blogPosts[0].slug}`} className="block">
            <div className="group overflow-hidden rounded-lg border bg-card shadow-md">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image
                    src={blogImages[blogPosts[0].slug] || "/placeholder.svg?height=600&width=800"}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={blogPosts[0].date}>{blogPosts[0].date}</time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
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
        </motion.div>
      )}

      {/* All Posts */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(1).map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm h-full"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={blogImages[post.slug] || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <Link href={`/blog/${post.slug}`} className="flex-grow">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              </Link>
              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

