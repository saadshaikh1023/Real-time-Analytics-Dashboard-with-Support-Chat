"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { socket } from "@/lib/socket"

export function UserSimulator() {
  const [userCount, setUserCount] = useState(1)
  const [activityInterval, setActivityInterval] = useState(5)
  const [isSimulating, setIsSimulating] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isSimulating) {
      // Simulate user connections
      for (let i = 1; i < userCount; i++) {
        socket.emit("userConnected")
      }

      // Simulate user activity
      interval = setInterval(() => {
        const randomUser = Math.floor(Math.random() * userCount) + 1
        const activities = ["viewed a page", "clicked a button", "made a purchase", "logged in", "logged out"]
        const randomActivity = activities[Math.floor(Math.random() * activities.length)]

        socket.emit("userActivity", { user: `User ${randomUser}`, activity: randomActivity })
      }, activityInterval * 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
      // Disconnect simulated users
      for (let i = 1; i < userCount; i++) {
        socket.emit("userDisconnected")
      }
    }
  }, [isSimulating, userCount, activityInterval])

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  return (
    <div className="p-4 bg-card rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">User Activity Simulator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="userCount" className="block text-sm font-medium mb-1">
            Number of Users
          </label>
          <Input
            id="userCount"
            type="number"
            min="1"
            value={userCount}
            onChange={(e) => setUserCount(Number.parseInt(e.target.value) || 1)}
            disabled={isSimulating}
          />
        </div>
        <div>
          <label htmlFor="activityInterval" className="block text-sm font-medium mb-1">
            Activity Interval (seconds)
          </label>
          <Input
            id="activityInterval"
            type="number"
            min="1"
            value={activityInterval}
            onChange={(e) => setActivityInterval(Number.parseInt(e.target.value) || 1)}
            disabled={isSimulating}
          />
        </div>
        <Button onClick={toggleSimulation} className="w-full">
          {isSimulating ? "Stop Simulation" : "Start Simulation"}
        </Button>
      </div>
    </div>
  )
}

