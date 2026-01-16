"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isInitialized, initAuth } = useAuthStore()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        router.replace("/members")
      } else {
        router.replace("/login")
      }
    }
  }, [isAuthenticated, isInitialized, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
