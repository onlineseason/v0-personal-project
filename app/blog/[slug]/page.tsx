"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { blogPosts } from "@/data/blog-posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import ReactMarkdown from "react-markdown"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string

  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug)
  }, [slug])

  if (!post) {
    return (
      <div className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold">Blog post not found</h1>
          <p className="mt-4 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="mt-6 inline-block">
            <Button>Back to Blog</Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mt-6 max-w-3xl">
          <div>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-neutral dark:prose-invert mt-12 max-w-3xl"
          >
            <article className="space-y-6 text-foreground">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside space-y-2 my-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside space-y-2 my-4" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </motion.div>

          <div className="mt-12 border-t pt-8">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
