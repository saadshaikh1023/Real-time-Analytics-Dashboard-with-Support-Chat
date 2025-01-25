"use client"

import { useState } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"
import { MessageCircle, LogOut } from "lucide-react"
import { LoadingPage } from "./LoadingPage"

export const Header = () => {
  const { data: session } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ redirect: false })
    // The page will be redirected by the AuthProvider
  }

  if (isSigningOut) {
    return <LoadingPage />
  }

  return (
    <header className="flex justify-between items-center p-4 bg-background border-b">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Link href="/support">
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-5 w-5 mr-2" />
            Support Chat
          </Button>
        </Link>
        <ThemeToggle />
        {session ? (
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        ) : null}
      </div>
    </header>
  )
}

