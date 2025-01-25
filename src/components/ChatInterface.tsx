"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { socket } from "@/lib/mockSocket"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses = [
  "How can I assist you today?",
  "I'm here to help with any questions you might have.",
  "Is there anything specific you'd like to know about our services?",
  "Thank you for your message. How else can I help?",
  "I'm processing your request. Is there anything else you need?",
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastActivityRef = useRef<number>(Date.now())

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef])

  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now()
      if (now - lastActivityRef.current > 60000) {
        // 1 minute
        sendProactiveMessage()
      }
      lastActivityRef.current = now
    }

    const resetActivity = () => {
      lastActivityRef.current = Date.now()
    }

    window.addEventListener("mousemove", resetActivity)
    window.addEventListener("keypress", resetActivity)

    const interval = setInterval(checkInactivity, 60000)

    return () => {
      window.removeEventListener("mousemove", resetActivity)
      window.removeEventListener("keypress", resetActivity)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const botMessageListener = (message: string) => {
      addMessage(message, "bot");
      setIsLoading(false);
    };
  
    socket.on("botMessage", botMessageListener);
  
    return () => {
      socket.off("botMessage", botMessageListener);
    };
  }, []);

  const sendProactiveMessage = () => {
    if (messages.length === 0) {
      addMessage("Hello! 👋 How can I help you today?", "bot")
    } else {
      addMessage("Are you still there? Let me know if you need any assistance!", "bot")
    }
  }

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender,
        timestamp: new Date(),
      },
    ])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    setIsLoading(true)
    addMessage(inputMessage, "user")
    setInputMessage("")

    // Simulate bot response
    setTimeout(
      () => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        socket.emit("botMessage", randomResponse)
      },
      1000 + Math.random() * 2000,
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Dashboard</span>
            </Button>
          </Link>
          <CardTitle>Support Chat</CardTitle>
        </div>
        <ThemeToggle />
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

