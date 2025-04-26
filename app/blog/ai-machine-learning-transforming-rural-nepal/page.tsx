"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"

export default function BlogPost() {
  // Find the blog post data
  const post = blogPosts.find((post) => post.slug === "ai-machine-learning-transforming-rural-nepal")

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">The Role of AI and Machine Learning in Transforming Rural Nepal</h1>
          <p className="text-xl text-muted-foreground">Bridging the Urban-Rural Divide Through Technology</p>
          <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative rounded-lg overflow-hidden w-full h-96">
            <Image src="/placeholder.svg?height=800&width=1200" alt="AI in Rural Nepal" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-8"
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              Nepal's rural regions, home to <strong>80% of its population</strong> (World Bank, 2023), grapple with
              systemic challenges: <strong>28.6% poverty rates</strong> (National Planning Commission, 2022), inadequate
              healthcare (1 doctor per 1,500 people in rural areas), and agricultural inefficiencies. However, AI and ML
              are emerging as tools to bridge these gaps. With <strong>94% mobile penetration</strong> (Nepal
              Telecommunications Authority, 2023) and growing tech innovation, rural Nepal stands on the cusp of a
              digital revolution.
            </p>
          </section>

          {/* Agriculture Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">AI in Agriculture: Boosting Productivity</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Agriculture employs <strong>66% of Nepal's workforce</strong> (FAO, 2022) but contributes only 27% to
                GDP, reflecting inefficiencies.
              </p>

              <h3 className="text-xl font-medium">Precision Farming</h3>
              <p className="text-muted-foreground">
                Pilot projects in Kavre District using AI-driven soil sensors increased yields by
                <strong> 32%</strong> (ICIMOD, 2021).
              </p>

              <h3 className="text-xl font-medium">Weather Prediction</h3>
              <p className="text-muted-foreground">
                ML models from Practical Action Nepal reduced crop losses by <strong>40%</strong> in monsoon-dependent
                regions by providing 72-hour rainfall forecasts.
              </p>

              <h3 className="text-xl font-medium">Pest Control</h3>
              <p className="text-muted-foreground">
                An AI app developed by FarmDrive Africa (adapted for Nepal) cut pesticide use by <strong>25%</strong>{" "}
                through early infestation detection (CIMMYT, 2022).
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Key Data:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Nepal loses <strong>$150 million annually</strong> to post-harvest waste (UNDP, 2021)
                  </li>
                  <li>
                    AI-powered cold chain solutions could recover <strong>30% of losses</strong>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Healthcare Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">AI in Healthcare: Saving Lives Remotely</h2>
            <p className="text-muted-foreground">
              Rural Nepal faces a <strong>65% shortage of healthcare workers</strong> (WHO, 2023). AI offers scalable
              solutions:
            </p>

            <div className="space-y-4 mt-4">
              <h3 className="text-xl font-medium">Telemedicine</h3>
              <p className="text-muted-foreground">
                The Mero Doctor app, deployed in Karnali Province, conducted{" "}
                <strong>50,000 remote consultations</strong> in 2022, reducing clinic visits by 45% (Ministry of Health,
                Nepal).
              </p>

              <h3 className="text-xl font-medium">Disease Prediction</h3>
              <p className="text-muted-foreground">
                ML models analyzing climate data in Chitwan predicted dengue outbreaks with{" "}
                <strong>89% accuracy</strong> (PLOS Neglected Tropical Diseases, 2023).
              </p>

              <h3 className="text-xl font-medium">Maternal Health</h3>
              <p className="text-muted-foreground">
                AI wearables in Rupandehi lowered maternal mortality by <strong>22%</strong> by alerting midwives to
                high-risk pregnancies (UNICEF, 2022).
              </p>
            </div>

            <blockquote className="border-l-4 border-primary pl-4 italic my-6">
              "AI-assisted TB diagnosis via X-rays in rural clinics reduced detection time from
              <strong> 3 weeks to 48 hours</strong> (PATH Nepal, 2023)"
            </blockquote>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">AI in Education: Bridging the Literacy Gap</h2>
            <p className="text-muted-foreground">
              Rural Nepal's net school attendance rate is <strong>76%</strong> (UNESCO, 2022), with 1 teacher per 34
              students. AI-driven tools are reshaping learning:
            </p>

            <div className="space-y-4 mt-4">
              <h3 className="text-xl font-medium">E-Learning</h3>
              <p className="text-muted-foreground">
                The OLE Nepal project provided 12,000 tablets with offline AI tutors, improving math scores by{" "}
                <strong>28%</strong> in Gorkha District.
              </p>

              <h3 className="text-xl font-medium">Language Inclusion</h3>
              <p className="text-muted-foreground">
                An ML model by Kathmandu University translated STEM content into 7 local languages, boosting enrollment
                among marginalized groups by <strong>18%</strong>.
              </p>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-2">Key Report:</h4>
              <p className="text-muted-foreground">
                AI-powered apps increased digital literacy rates by <strong>40%</strong> among rural women (World
                Economic Forum, 2023).
              </p>
            </div>
          </section>

          {/* Rural Development Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">AI in Rural Development: Building Resilient Communities</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Disaster Management</h3>
              <p className="text-muted-foreground">
                ML landslide prediction systems in Sindhupalchowk achieved <strong>82% accuracy</strong>, saving 300+
                lives during 2022 monsoons (ICIMOD).
              </p>

              <h3 className="text-xl font-medium">Financial Inclusion</h3>
              <p className="text-muted-foreground">
                AI chatbots by NMB Bank enabled <strong>200,000 rural users</strong> to access microloans via SMS (Nepal
                Rastra Bank, 2023).
              </p>

              <h3 className="text-xl font-medium">Energy Access</h3>
              <p className="text-muted-foreground">
                AI-optimized microgrids in Humla cut electricity costs by <strong>60%</strong> using solar/wind
                forecasting (Alternative Energy Promotion Centre, Nepal).
              </p>
            </div>
          </section>

          {/* Challenges Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Challenges and Solutions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium">Connectivity</h3>
                <p className="text-muted-foreground">
                  Only <strong>35% of rural Nepal</strong> has internet access (ITU, 2023).
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Solution:</strong> Nepal's Digital Nepal Framework aims to expand 4G coverage to 90% by 2025.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium">Cost</h3>
                <p className="text-muted-foreground">
                  AI hardware remains unaffordable for <strong>60% of farmers</strong> (FAO).
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Solution:</strong> Subsidized "AI kits" with solar-powered sensors (e.g., SunFarmer Nepal).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium">Digital Literacy</h3>
                <p className="text-muted-foreground">
                  <strong>68% of rural adults</strong> lack tech skills (UNDP).
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Solution:</strong> Grassroots training by NGOs like Code for Nepal.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-muted-foreground">
              From cutting farm losses to saving lives and educating marginalized communities, AI and ML are rewriting
              rural Nepal's story. With strategic investments and partnerships—such as Nepal's collaboration with
              Google's AI for Social Good—the nation can achieve its Sustainable Development Goals (SDGs) a decade
              faster (World Bank). The future is not just digital; it's equitable.
            </p>
          </section>

          {/* References */}
          <section className="mt-16 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-6">References</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="https://npc.gov.np"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  National Planning Commission, Government of Nepal (2022)
                </a>
              </li>
              <li>
                <a
                  href="https://data.worldbank.org/country/nepal"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  World Bank Nepal Data Portal
                </a>
              </li>
              <li>
                <a
                  href="http://www.fao.org/nepal/resources/publications"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FAO Nepal Agriculture Reports
                </a>
              </li>
              <li>
                <a
                  href="https://www.unicef.org/nepal/reports"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UNICEF Maternal Health Study
                </a>
              </li>
              <li>
                <a
                  href="https://mocit.gov.np/en/digitalnepal"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digital Nepal Framework
                </a>
              </li>
              <li>
                <a
                  href="https://journals.plos.org/plosntds"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PLOS Neglected Tropical Diseases Study
                </a>
              </li>
              <li>
                <a
                  href="https://www.icimod.org"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ICIMOD Landslide Prediction Report
                </a>
              </li>
            </ul>
          </section>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
              ← Back to all blog posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
