"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const roles = ["Entrepreneur", "Engineer", "Digital Advocate"]

export function HomeHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Dorna Raj Budthapa
            </motion.h1>
            <RoleTyper roles={roles} />
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="#projects"
                className="btn-primary bg-white text-primary hover:bg-white/90 border border-transparent"
              >
                Explore My Work
              </Link>
              <Link href="/contact" className="btn-secondary border-white bg-transparent text-white hover:bg-white/10">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Awards & Recognition</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Recent achievements and acknowledgments in digital innovation
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg bg-card p-8 shadow-md"
            >
              <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB_IMG_1741256719456.jpg-04KZZd111Qu8XeVspLH9qJtvIVU7b8.jpeg"
                  alt="TagMe Landslides Mapping Challenge Award"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
                <div className="mt-6 text-center md:mt-0 md:text-left">
                  <h3 className="text-xl font-bold">First Place Winner</h3>
                  <p className="mt-2 text-lg text-primary">TagMe Landslides Mapping Challenge</p>
                  <p className="mt-4 text-muted-foreground">
                    Recognized as the top contributor with 60+ landslide tags, helping create vital data for disaster
                    prevention and management. This EU-funded initiative demonstrates our commitment to using technology
                    for community safety and environmental monitoring.
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-4 md:justify-start">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-primary">60+</span>
                      <span className="ml-2 text-sm text-muted-foreground">Landslides Tagged</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-primary">#1</span>
                      <span className="ml-2 text-sm text-muted-foreground">Ranking</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 rounded-lg bg-card p-8 shadow-md"
            >
              <h3 className="text-xl font-bold">Top 20 Climate Smart Entrepreneur of Karnali</h3>
              <p className="mt-2 text-lg text-primary">
                <Link
                  href="https://theyouthcan.org/climate-smart-entrepreneurship/idea-repository/lekali-karesa-group-of-company-pvtltd-ZtTpyE4C9sOLxart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  TheYouthCAN Climate Smart Entrepreneurship Program
                </Link>
              </p>
              <p className="mt-4 text-muted-foreground">
                Selected among the top 20 climate-smart entrepreneurs in the Karnali region for the Lekali Karesa Group
                initiative, which promotes sustainable agriculture and environmental conservation through innovative
                business practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Let's Work Together</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Have a project in mind or interested in collaboration? I'm always open to discussing new opportunities and
              ideas.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="btn-secondary bg-white text-primary hover:bg-white/90 border border-transparent"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function RoleTyper({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <motion.div
      key={roles[roleIndex]}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-4 h-8 text-xl font-medium text-white md:text-2xl"
    >
      {roles[roleIndex]}
    </motion.div>
  )
}
