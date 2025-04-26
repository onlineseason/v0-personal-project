import * as prismic from "@prismicio/client"

const repositoryName = process.env.PRISMIC_NEXTJS_BLOG_REPOSITORY_NAME || ""

export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    ...config,
    routes: [
      {
        type: "blog_post",
        path: "/blog/[uid]",
      },
    ],
  })

  return client
}
