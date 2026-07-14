"use server"

import { z } from "zod"
import { submitMessage } from "@/lib/supabase/client"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = (formData.get("subject") as string) || undefined
    const message = formData.get("message") as string

    // Validate form data
    const result = contactFormSchema.safeParse({ name, email, subject, message })

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      }
    }

    // Save contact message to Supabase
    await submitMessage({
      name,
      email,
      subject,
      body: message,
    })

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again.",
    }
  }
}
