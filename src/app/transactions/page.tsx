"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Package, TrendingUp, TrendingDown, Shield } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Transaction {
  id: string
  member_id: string
  staff_user_id: string
  action: "EARN" | "REDEEM"
  product_type: "1_0_LITER" | "1_5_LITER"
  points: number
  receipt_text: string
  created_at: string
}

export default function TransactionsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized, initAuth } = useAuthStore()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (!isAuthenticated && isClient && isInitialized) {
      router.replace("/login")
    }
  }, [isAuthenticated, isClient, isInitialized, router])

  useEffect(() => {
    if (isAuthenticated && isClient) {
      fetchTransactions()
    }
  }, [isAuthenticated, isClient, page])

  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.getBranchTransactions(page, 20)
      setTransactions(response.transactions)
      setTotal(response.total)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatProductType = (type: string) => {
    return type === "1_0_LITER" ? "1.0 ลิตร" : "1.5 ลิตร"
  }

  if (!isClient || !isInitialized) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/members")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับ
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ประวัติการทำรายการ</h1>
                <p className="text-xs text-muted-foreground">Transaction History</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.branch}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">ประวัติการทำรายการทั้งหมด</h2>
          <p className="text-muted-foreground">รายการมอบแต้มและแลกแต้มของสาขา {user?.branch}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                          transaction.action === "EARN" 
                            ? "bg-green-100" 
                            : "bg-blue-100"
                        }`}>
                          {transaction.action === "EARN" ? (
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          ) : (
                            <TrendingDown className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              transaction.action === "EARN"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              {transaction.action === "EARN" ? "มอบแต้ม" : "แลกแต้ม"}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {formatProductType(transaction.product_type)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-2">
                            {transaction.receipt_text}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(transaction.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              ID: {transaction.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          transaction.action === "EARN" ? "text-green-600" : "text-blue-600"
                        }`}>
                          {transaction.action === "EARN" ? "+" : "-"}{transaction.points}
                        </div>
                        <div className="text-xs text-muted-foreground">แต้ม</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {transactions.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">ยังไม่มีรายการ</h3>
                <p className="text-muted-foreground">ยังไม่มีประวัติการทำรายการในสาขานี้</p>
              </div>
            )}

            {total > transactions.length && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                >
                  ก่อนหน้า
                </Button>
                <div className="flex items-center px-4">
                  <span className="text-sm text-muted-foreground">
                    หน้า {page} / {Math.ceil(total / 20)}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= Math.ceil(total / 20) || isLoading}
                >
                  ถัดไป
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
