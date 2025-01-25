import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/components/AuthProvider"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoadingPage } from "@/components/LoadingPage"
import { connectSocket } from "@/lib/mockSocket"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Attempt to connect the socket when the app loads
  if (typeof window !== "undefined") {
    connectSocket()
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

