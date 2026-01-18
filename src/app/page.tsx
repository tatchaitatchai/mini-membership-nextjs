"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isInitialized, initAuth } = useAuthStore()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (isInitialized && !hasRedirected) {
      setHasRedirected(true)
      if (isAuthenticated) {
        router.replace("/members")
      } else {
        router.replace("/login")
      }
    }
  }, [isAuthenticated, isInitialized, router, hasRedirected])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
