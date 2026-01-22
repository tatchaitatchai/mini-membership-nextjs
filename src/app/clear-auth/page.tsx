"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ClearAuthPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🧹 Clearing all auth data...')
      
      // Clear all localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth-storage')
      
      // Clear all auth cookies
      const deleteCookie = (name: string) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Lax`
      }
      
      deleteCookie('auth_token')
      deleteCookie('auth_user')
      
      console.log('✅ All auth data cleared!')
      console.log('🔄 Redirecting to login in 1 second...')
      
      // Redirect to login after 1 second
      setTimeout(() => {
        router.replace('/login')
      }, 1000)
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            กำลังลบข้อมูล Authentication
          </h1>
          <p className="text-gray-600 mb-4">
            กำลังทำความสะอาด localStorage และ cookies...
          </p>
        </div>
        
        <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>ลบ auth_token</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>ลบ auth_user</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>ลบ auth-storage</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>ลบ cookies ทั้งหมด</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          กำลัง redirect ไปหน้า login...
        </p>
      </div>
    </div>
  )
}
