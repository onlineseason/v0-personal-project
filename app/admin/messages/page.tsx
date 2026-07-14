"use client"

import { useState, useEffect } from "react"
import { Mail, MailOpen, Trash2, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase/client"
import type { Message } from "@/lib/supabase/client"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function markAsRead(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: !currentStatus })
        .eq("id", id)

      if (error) throw error

      setMessages(
        messages.map((m) =>
          m.id === id ? { ...m, read: !currentStatus } : m
        )
      )
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const { error } = await supabase.from("messages").delete().eq("id", id)

      if (error) throw error

      setMessages(messages.filter((m) => m.id !== id))
      setSelectedMessage(null)
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Failed to delete message")
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="mt-2 text-muted-foreground">
          {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p className="text-sm text-muted-foreground">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex justify-center py-8">
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                      selectedMessage?.id === message.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!message.read && (
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{message.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {message.subject || message.body.substring(0, 40)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="lg:col-span-2">
          {selectedMessage ? (
            <>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b pb-4">
                <div>
                  <CardTitle>{selectedMessage.subject || "No Subject"}</CardTitle>
                  <CardDescription className="mt-2">
                    From: <a href={`mailto:${selectedMessage.email}`} className="hover:underline">
                      {selectedMessage.name} ({selectedMessage.email})
                    </a>
                  </CardDescription>
                  <CardDescription>
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(selectedMessage.id, selectedMessage.read)}
                  >
                    {selectedMessage.read ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <MailOpen className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="whitespace-pre-wrap text-sm">{selectedMessage.body}</p>
                  </div>
                  <Button asChild className="w-full">
                    <a href={`mailto:${selectedMessage.email}`}>
                      <Reply className="mr-2 h-4 w-4" />
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">Select a message to view details</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
