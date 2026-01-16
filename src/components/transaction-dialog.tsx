"use client"

import { useState, useEffect } from "react"
import { Loader2, Minus } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiClient } from "@/lib/api-client"

interface TransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: {
    id: string
    name: string
    last4: string
    points_1_0_liter: number
    points_1_5_liter: number
  }
  action: "EARN" | "REDEEM"
  onSuccess: () => void
}

interface Product {
  product_type: "1_0_LITER" | "1_5_LITER"
  points: number
}

export function TransactionDialog({ open, onOpenChange, member, action, onSuccess }: TransactionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [receiptNumber, setReceiptNumber] = useState("")

  useEffect(() => {
    if (!open) {
      setProducts([])
      setReceiptNumber("")
    } else {
      console.log('Dialog opened with member:', member, 'action:', action)
    }
  }, [open, member, action])

  const getProductPoints = (productType: "1_0_LITER" | "1_5_LITER") => {
    return products.find(p => p.product_type === productType)?.points || 0
  }

  const addProduct = (productType: "1_0_LITER" | "1_5_LITER") => {
    const pointsToAdd = action === "REDEEM" ? 5 : 1
    
    // Validate for REDEEM: check if member has enough points
    if (action === "REDEEM") {
      const currentMemberPoints = productType === "1_0_LITER" ? member.points_1_0_liter : member.points_1_5_liter
      const currentProductPoints = getProductPoints(productType)
      const newTotalPoints = currentProductPoints + pointsToAdd
      
      console.log('Validation:', {
        productType,
        currentMemberPoints,
        currentProductPoints,
        pointsToAdd,
        newTotalPoints,
        willBlock: newTotalPoints > currentMemberPoints
      })
      
      if (newTotalPoints > currentMemberPoints) {
        const maxBottles = Math.floor(currentMemberPoints / 5)
        const currentBottles = currentProductPoints / 5
        toast.error(`แต้มไม่เพียงพอ! ลูกค้ามีแต้ม ${productType === "1_0_LITER" ? "1.0" : "1.5"} ลิตร เพียง ${currentMemberPoints} แต้ม (แลกได้สูงสุด ${maxBottles} ขวด, เลือกไปแล้ว ${currentBottles} ขวด)`)
        return
      }
    }
    
    setProducts(prev => {
      const existing = prev.find(p => p.product_type === productType)
      if (existing) {
        return prev.map(p => 
          p.product_type === productType 
            ? { ...p, points: p.points + pointsToAdd }
            : p
        )
      }
      return [...prev, { product_type: productType, points: pointsToAdd }]
    })
  }

  const removeProduct = (productType: "1_0_LITER" | "1_5_LITER") => {
    const pointsToRemove = action === "REDEEM" ? 5 : 1
    setProducts(prev => {
      const existing = prev.find(p => p.product_type === productType)
      if (existing && existing.points > pointsToRemove) {
        return prev.map(p => 
          p.product_type === productType 
            ? { ...p, points: p.points - pointsToRemove }
            : p
        )
      }
      return prev.filter(p => p.product_type !== productType)
    })
  }

  const getTotalPoints = () => {
    return products.reduce((sum, p) => sum + p.points, 0)
  }

  const generateDescription = () => {
    const parts: string[] = []
    const points_1_0 = getProductPoints("1_0_LITER")
    const points_1_5 = getProductPoints("1_5_LITER")
    
    if (points_1_0 > 0) {
      parts.push(`${points_1_0} แต้มจะถูกเพิ่มสำหรับ 1.0ล`)
    }
    if (points_1_5 > 0) {
      parts.push(`${points_1_5} แต้มจะถูกเพิ่มสำหรับ 1.5ล`)
    }
    
    const totalMilestone = getTotalPoints()
    if (totalMilestone > 0) {
      parts.push(`รวม Milestone จะเพิ่ม ${totalMilestone} แต้ม`)
    }
    
    return parts.join('\n')
  }

  const generateAutoDescription = () => {
    const parts: string[] = []
    const points_1_0 = getProductPoints("1_0_LITER")
    const points_1_5 = getProductPoints("1_5_LITER")
    
    if (action === "EARN") {
      if (points_1_0 > 0) {
        parts.push(`มอบแต้ม 1.0 ลิตร ${points_1_0} ขวด`)
      }
      if (points_1_5 > 0) {
        parts.push(`มอบแต้ม 1.5 ลิตร ${points_1_5} ขวด`)
      }
    } else {
      if (points_1_0 > 0) {
        parts.push(`แลกแต้ม 1.0 ลิตร ${points_1_0 / 5} ขวด (${points_1_0} แต้ม)`)
      }
      if (points_1_5 > 0) {
        parts.push(`แลกแต้ม 1.5 ลิตร ${points_1_5 / 5} ขวด (${points_1_5} แต้ม)`)
      }
    }
    
    return parts.join(', ')
  }

  const onSubmit = async () => {
    if (products.length === 0) {
      toast.error("กรุณาเลือกแต้มที่ต้องการ" + (action === "EARN" ? "มอบ" : "แลก"))
      return
    }

    if (!receiptNumber.trim()) {
      toast.error("กรุณากรอกหมายเลขใบเสร็จ")
      return
    }

    setIsSubmitting(true)
    try {
      await apiClient.createTransaction({
        member_id: member.id,
        action,
        products,
        receipt_text: generateAutoDescription() + " - " + receiptNumber,
      })
      
      toast.success(action === "EARN" ? "มอบแต้มสำเร็จ!" : "แลกแต้มสำเร็จ!")
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "เกิดข้อผิดพลาด")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{action === "EARN" ? "มอบแต้ม" : "แลกแต้ม"}</DialogTitle>
          <DialogDescription>
            {action === "EARN" ? "มอบ" : "แลก"}แต้มสะสมให้ {member.name} (****{member.last4})
          </DialogDescription>
          {action === "REDEEM" && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-medium">แต้มที่มีอยู่:</div>
              <div className="flex gap-4 mt-1">
                <div className="text-sm">
                  <span className="font-bold text-blue-600">{member.points_1_0_liter}</span> แต้ม 1.0ล 
                  <span className="text-gray-500"> (แลกได้ {Math.floor(member.points_1_0_liter / 5)} ขวด)</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-blue-600">{member.points_1_5_liter}</span> แต้ม 1.5ล
                  <span className="text-gray-500"> (แลกได้ {Math.floor(member.points_1_5_liter / 5)} ขวด)</span>
                </div>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold mb-3 block">
              {action === "EARN" ? "แตะเพื่อเพิ่มแต้ม (1 แต้ม/ขวด)" : "แตะเพื่อแลกแต้ม (5 แต้ม/ขวด)"}
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => addProduct("1_0_LITER")}
                disabled={isSubmitting}
                className="p-6 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <div className="text-2xl font-bold">1.0 ลิตร</div>
                <div className="text-sm text-muted-foreground">{action === "EARN" ? "1 แต้ม/ขวด" : "5 แต้ม/ขวด"}</div>
              </button>
              <button
                type="button"
                onClick={() => addProduct("1_5_LITER")}
                disabled={isSubmitting}
                className="p-6 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <div className="text-2xl font-bold">1.5 ลิตร</div>
                <div className="text-sm text-muted-foreground">{action === "EARN" ? "1 แต้ม/ขวด" : "5 แต้ม/ขวด"}</div>
              </button>
            </div>
          </div>

          {products.length > 0 && (
            <div className="space-y-2">
              {products.map((product) => (
                <div
                  key={product.product_type}
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                >
                  <span className="font-medium">
                    {action === "EARN" 
                      ? `จำนวนขวด (${product.product_type === "1_0_LITER" ? "1.0" : "1.5"} ลิตร): ${product.points}`
                      : `จำนวนขวด (${product.product_type === "1_0_LITER" ? "1.0" : "1.5"} ลิตร): ${product.points / 5} (${product.points} แต้ม)`
                    }
                  </span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeProduct(product.product_type)}
                    disabled={isSubmitting}
                  >
                    ลบ
                  </Button>
                </div>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-1">
              {getProductPoints("1_0_LITER") > 0 && (
                <div className="text-sm">{getProductPoints("1_0_LITER")} แต้มจะถูก{action === "EARN" ? "เพิ่ม" : "หัก"}สำหรับ 1.0ล</div>
              )}
              {getProductPoints("1_5_LITER") > 0 && (
                <div className="text-sm">{getProductPoints("1_5_LITER")} แต้มจะถูก{action === "EARN" ? "เพิ่ม" : "หัก"}สำหรับ 1.5ล</div>
              )}
              {action === "EARN" && (
                <div className="text-sm font-bold text-yellow-700 pt-1 border-t border-yellow-300 mt-2">
                  รวม Milestone จะเพิ่ม {getTotalPoints()} แต้ม
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">คำอธิบาย (ไม่บังคับ)</Label>
            <textarea
              id="description"
              value={generateAutoDescription()}
              readOnly
              disabled
              className="w-full min-h-[80px] px-3 py-2 border rounded-md resize-none bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt_number">หมายเลขใบเสร็จ</Label>
            <Input
              id="receipt_number"
              placeholder="เช่น 5-99925, 15-28182"
              disabled={isSubmitting}
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              รูปแบบ: X-XXXXX, XX-XXXXX หรือคล้ายกัน (รวม 5-6 หลัก) ตัวอย่าง: 5-99925, 15-28182, 4-235680, 235-58012
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            ยกเลิก
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={isSubmitting || products.length === 0}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังดำเนินการ...
              </>
            ) : (
              action === "EARN" ? "มอบแต้ม" : "แลกแต้ม"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
