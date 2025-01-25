import { Loader2 } from "lucide-react"

export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Loader2 className="h-16 w-16 animate-spin text-blue-600 dark:text-blue-400" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Loading...</h2>
    </div>
  )
}

