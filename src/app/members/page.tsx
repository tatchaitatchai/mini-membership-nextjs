"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Phone, MapPin, Calendar, Trophy, LogOut, Shield, Users } from "lucide-react"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/auth-store"
import { useMembersStore } from "@/stores/members-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AddMemberDialog } from "@/components/add-member-dialog"
import { TransactionDialog } from "@/components/transaction-dialog"

export default function MembersPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized, logout, initAuth } = useAuthStore()
  const { members, total, page, search, isLoading, fetchMembers, setSearch, setPage } = useMembersStore()
  const [isClient, setIsClient] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [showTransactionDialog, setShowTransactionDialog] = useState(false)
  const [transactionAction, setTransactionAction] = useState<"EARN" | "REDEEM">("EARN")
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null)

  const safeMembers = members || []

  useEffect(() => {
    // Force check and clear stale localStorage on mount
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
        console.warn('Detected stale localStorage - clearing and redirecting to login')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth-storage')
        router.replace('/login')
        return
      }
    }
    
    setIsClient(true)
    initAuth()
  }, [initAuth, router])

  useEffect(() => {
    if (!isAuthenticated && isClient && isInitialized) {
      router.replace("/login")
    }
  }, [isAuthenticated, isClient, isInitialized, router])

  useEffect(() => {
    if (isAuthenticated && isClient) {
      fetchMembers()
    }
  }, [isAuthenticated, isClient, fetchMembers])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("ออกจากระบบสำเร็จ")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleSearch = () => {
    setSearch(searchInput)
    fetchMembers(searchInput, 1)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (!isClient || !isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
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
              <p className="text-xs text-muted-foreground">{user?.branch}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.push("/transactions")}
            >
              ประวัติการทำรายการ
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Shield className="h-4 w-4" />
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="font-medium text-foreground">Customers</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">การจัดการลูกค้า</h2>
            <p className="text-muted-foreground">จัดการลูกค้าในระบบสะสมแต้มและดูข้อมูลจุดประสงค์ทาน</p>
          </div>

          <Button 
            onClick={() => setShowAddDialog(true)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold mb-6"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            เพิ่มลูกค้าใหม่
          </Button>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ค้นหาชื่อ, เบอร์โทร หรือหมายเลขสมาชิก..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="pl-12 h-12"
            />
            <Button 
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              size="sm"
            >
              ค้นหา
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Users className="h-4 w-4" />
            <span>{total} ลูกค้าทั้งหมด</span>
            <span>•</span>
            <span>แสดง 1-12 จาก {total}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
              <p className="mt-4 text-muted-foreground">กำลังโหลด...</p>
            </div>
          </div>
        ) : safeMembers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">ไม่พบข้อมูลลูกค้า</h3>
            <p className="text-muted-foreground mb-6">เริ่มต้นเพิ่มลูกค้าเข้าสู่ระบบ</p>
            <Button onClick={() => setShowAddDialog(true)} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มลูกค้าใหม่
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {safeMembers.map((member) => (
              <Card key={member.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {member.membership_number ? (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">ID: {member.membership_number}</span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">ยังไม่มีไอดี</span>
                        )}
                      </div>
                    </div>
                    {!member.welcome_bonus_claimed && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">ยังไม่ได้รับ โบนัสสมัครใหม่</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>****{member.last4}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{member.branch}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-b">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{member.points_1_0_liter}</div>
                      <div className="text-xs text-muted-foreground">แต้ม 1.0ล</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{member.points_1_5_liter}</div>
                      <div className="text-xs text-muted-foreground">แต้ม 1.5ล</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{member.milestone_score}</div>
                      <div className="text-xs text-muted-foreground">ไมส์สโตน</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>ลงทะเบียน: {formatDate(member.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-3 w-3" />
                      <span>ลงทะเบียนโดย: {member.registered_by_staff}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                      size="sm"
                      onClick={() => {
                        setSelectedMember(member)
                        setTransactionAction("EARN")
                        setShowTransactionDialog(true)
                      }}
                    >
                      มอบแต้ม
                    </Button>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                      size="sm"
                      disabled={member.points_1_0_liter < 5 && member.points_1_5_liter < 5}
                      onClick={() => {
                        setSelectedMember(member)
                        setTransactionAction("REDEEM")
                        setShowTransactionDialog(true)
                      }}
                    >
                      แลกแต้ม
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && safeMembers.length > 0 && total > safeMembers.length && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const newPage = page - 1
                setPage(newPage)
                fetchMembers(search, newPage)
              }}
              disabled={page === 1}
            >
              ก่อนหน้า
            </Button>
            <div className="flex items-center gap-2 px-4">
              หน้า {page} จาก {Math.ceil(total / 20)}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                const newPage = page + 1
                setPage(newPage)
                fetchMembers(search, newPage)
              }}
              disabled={page >= Math.ceil(total / 20)}
            >
              ถัดไป
            </Button>
          </div>
        )}
      </main>

      <AddMemberDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      
      {selectedMember && (
        <TransactionDialog 
          open={showTransactionDialog} 
          onOpenChange={setShowTransactionDialog}
          member={{
            id: selectedMember.id,
            name: selectedMember.name,
            last4: selectedMember.last4,
            points_1_0_liter: selectedMember.points_1_0_liter,
            points_1_5_liter: selectedMember.points_1_5_liter,
          }}
          action={transactionAction}
          onSuccess={() => fetchMembers()}
        />
      )}
    </div>
  )
}
