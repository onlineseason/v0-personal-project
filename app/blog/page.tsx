"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { blogPosts } from "@/data/blog-posts"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Blog & Insights
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground"
      >
        Thoughts on technology, sustainable development, rural innovation, and entrepreneurship in Nepal.
      </motion.p>

      <div className="mx-auto max-w-3xl space-y-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <time className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="mt-2 text-2xl font-bold transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="ml-4 h-5 w-5 flex-shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
