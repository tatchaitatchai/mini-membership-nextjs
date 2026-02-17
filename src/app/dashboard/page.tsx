"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Users, UserCog, Shield } from "lucide-react"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, initAuth } = useAuthStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (!isAuthenticated && isClient) {
      router.push("/backoffice/login")
    } else if (isAuthenticated && isClient) {
      router.push("/members")
    }
  }, [isAuthenticated, router, isClient])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("ออกจากระบบสำเร็จ")
      router.push("/backoffice/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Membership System</h1>
              <p className="text-xs text-muted-foreground">Backoffice Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.email}</p>
              {/* <p className="text-xs text-muted-foreground">{user?.role}</p> */}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">ยินดีต้อนรับ, {user?.email}!</h2>
          <p className="text-muted-foreground">จัดการระบบสมาชิกของคุณได้ที่นี่</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">สมาชิกทั้งหมด</CardTitle>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>จำนวนสมาชิกในระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-2">
                เริ่มเพิ่มสมาชิกเพื่อเริ่มต้นใช้งาน
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">สมาชิกใหม่</CardTitle>
                <UserCog className="h-8 w-8 text-green-600" />
              </div>
              <CardDescription>สมาชิกที่เพิ่มเข้ามาใหม่</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">0</p>
              <p className="text-sm text-muted-foreground mt-2">
                ในเดือนนี้
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">บทบาท</CardTitle>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <CardDescription>บทบาทของคุณในระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600 capitalize">
                {/* {user?.role || "User"} */}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                สิทธิ์การเข้าถึงเต็มรูปแบบ
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>ข้อมูลผู้ใช้</CardTitle>
            <CardDescription>ข้อมูลบัญชีของคุณ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">{user?.id}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">อีเมล:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              {/* <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">ชื่อ:</span>
                <span className="font-medium">{user?.name || "-"}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">บทบาท:</span>
                <span className="font-medium capitalize">{user?.role}</span>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
