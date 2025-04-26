"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, Mail, Twitter, Facebook, Instagram, BookOpen, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState("submitting")

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      // Replace this URL with your Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setFormState("success")
        form.reset()
      } else {
        setFormState("error")
      }
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
            <input type="hidden" name="_subject" value="New contact form submission" />
            <input type="hidden" name="_replyto" value="%email%" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                required
                rows={5}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="btn-primary w-full flex items-center justify-center"
            >
              {formState === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {formState === "success" && (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Thank you for your message! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {formState === "error" && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      There was an error sending your message. Please try again.
                    </p>
                  </div>
                </div>
              </div>
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
                <p className="text-muted-foreground">dornaseason@gmail.com</p>
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
