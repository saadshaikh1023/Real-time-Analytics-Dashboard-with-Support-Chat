"use client"

import { useState, useEffect } from "react"
import { socket } from "@/lib/mockSocket"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    // Simulate random disconnects
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        socket.disconnect()
        setTimeout(() => socket.connect(), 2000)
      }
    }, 10000)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      clearInterval(interval)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`p-2 rounded ${isConnected ? "bg-green-500" : "bg-red-500"} text-white`}>
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </CardContent>
    </Card>
  )
}

