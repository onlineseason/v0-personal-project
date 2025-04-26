import { createClient } from "@/lib/prismic"
import { NextResponse } from "next/server"

export async function GET() {
  const client = createClient()

  try {
    const posts = await client.getAllByType("blog_post", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
