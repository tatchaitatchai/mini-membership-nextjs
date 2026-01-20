"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isInitialized, initAuth } = useAuthStore()
  const [hasRedirected, setHasRedirected] = useState(false)

  // Force check and clear stale localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('auth_token')
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null
        return null
      }
      const cookieToken = getCookie('auth_token')
      
      // If localStorage has token but cookie doesn't, clear everything
      if (localToken && !cookieToken) {
        console.warn('Detected stale localStorage - clearing immediately')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth-storage')
        // Force reload to clear Zustand state
        window.location.reload()
        return
      }
    }
    
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
