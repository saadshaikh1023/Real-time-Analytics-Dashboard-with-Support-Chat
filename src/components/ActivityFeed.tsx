"use client"

import { useState, useEffect } from "react"
import { socket } from "@/lib/mockSocket"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Activity = {
  id: string
  user: string
  activity: string
  timestamp: Date
}

const activities = [
  "viewed a page",
  "clicked a button",
  "made a purchase",
  "logged in",
  "logged out",
  "added item to cart",
  "removed item from cart",
  "searched for a product",
  "subscribed to newsletter",
  "left a review",
]

export function ActivityFeed() {
  const [activityList, setActivityList] = useState<Activity[]>([])

  useEffect(() => {
    const handleNewActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
      setActivityList((prevActivities) =>
        [
          {
            ...activity,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
          ...prevActivities,
        ].slice(0, 5),
      ) // Keep only the last 5 activities
    }

    socket.on("newActivity", handleNewActivity)

    // Simulate random activities
    const interval = setInterval(() => {
      const randomUser = `User${Math.floor(Math.random() * 100)}`
      const randomActivity = activities[Math.floor(Math.random() * activities.length)]
      socket.emit("newActivity", { user: randomUser, activity: randomActivity })
    }, 3000)

    return () => {
      socket.off("newActivity", handleNewActivity)
      clearInterval(interval)
    }
  }, [])

  return (
    <Card className="h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {activityList.map((activity) => (
            <li key={activity.id} className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.activity} at{" "}
              <span className="text-muted-foreground">{activity.timestamp.toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

