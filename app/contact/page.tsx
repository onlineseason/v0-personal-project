"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, Mail, Twitter, Facebook, Instagram, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      // In a real implementation, this would send data to a service like Formspree or EmailJS
      // For demo purposes, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormState("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setFormState("error")
    }
  }

  return (
    <div className="container py-12 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Contact Me
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground"
      >
        Have a question or want to work together? Feel free to reach out through the form below or connect with me on
        social media.
      </motion.p>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button type="submit" disabled={formState === "submitting"} className="btn-primary w-full">
              {formState === "submitting" ? "Sending..." : "Send Message"}
            </button>
            {formState === "success" && (
              <p className="text-center text-green-600">Thank you for your message! I'll get back to you soon.</p>
            )}
            {formState === "error" && (
              <p className="text-center text-red-600">There was an error sending your message. Please try again.</p>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold">Connect</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center">
              <Mail className="mr-4 h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">Hello@dornarajbudthapa.com.np</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-medium">Social Media</h3>
              <div className="grid grid-cols-3 gap-4">
                <Link
                  href="https://facebook.com/dornaseason"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Facebook className="h-6 w-6 mb-2" />
                  <span className="text-xs">Facebook</span>
                </Link>
                <Link
                  href="https://instagram.com/dornaseason2020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-6 w-6 mb-2" />
                  <span className="text-xs">Instagram</span>
                </Link>
                <Link
                  href="https://twitter.com/dornarajbudthapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Twitter className="h-6 w-6 mb-2" />
                  <span className="text-xs">Twitter</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/dornaraj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="h-6 w-6 mb-2" />
                  <span className="text-xs">LinkedIn</span>
                </Link>
                <Link
                  href="https://github.com/season1999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Github className="h-6 w-6 mb-2" />
                  <span className="text-xs">GitHub</span>
                </Link>
                <Link
                  href="https://micd.academia.edu/DornaRajBudthapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span className="text-xs">Academia</span>
                </Link>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-6">
              <h3 className="font-medium">Office Hours</h3>
              <p className="mt-2 text-muted-foreground">
                Monday - Friday: 9:00 AM - 5:00 PM (NPT)
                <br />
                I'll do my best to respond to all inquiries within 24-48 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

