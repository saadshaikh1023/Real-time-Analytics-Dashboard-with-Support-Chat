"use client"

import { useState, useEffect } from "react"
import { socket } from "@/lib/mockSocket"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LiveUserCounter() {
  const [userCount, setUserCount] = useState(1)

  useEffect(() => {
    const handleUserConnected = () => {
      setUserCount((prevCount) => prevCount + 1)
    }

    const handleUserDisconnected = () => {
      setUserCount((prevCount) => Math.max(1, prevCount - 1))
    }

    socket.on("userConnected", handleUserConnected)
    socket.on("userDisconnected", handleUserDisconnected)

    // Simulate random user connections and disconnections
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        socket.emit("userConnected")
      } else {
        socket.emit("userDisconnected")
      }
    }, 5000)

    return () => {
      socket.off("userConnected", handleUserConnected)
      socket.off("userDisconnected", handleUserDisconnected)
      clearInterval(interval)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Users</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{userCount}</p>
      </CardContent>
    </Card>
  )
}

