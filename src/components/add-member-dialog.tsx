"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMembersStore } from "@/stores/members-store"
import { useAuthStore } from "@/stores/auth-store"

const memberSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  last4: z.string().length(4, "กรุณากรอกเบอร์โทร 4 หลักท้าย"),
  branch: z.string().min(1, "กรุณาเลือกสาขา"),
  registration_receipt_number: z.string().min(1, "กรุณากรอกเลขที่ใบเสร็จ"),
})

type MemberFormValues = z.infer<typeof memberSchema>

interface AddMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMemberDialog({ open, onOpenChange }: AddMemberDialogProps) {
  const { createMember } = useMembersStore()
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      branch: user?.branch || "",
    },
  })

  const onSubmit = async (data: MemberFormValues) => {
    setIsSubmitting(true)
    try {
      await createMember(data)
      toast.success("เพิ่มสมาชิกสำเร็จ!")
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "เกิดข้อผิดพลาด")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>เพิ่มลูกค้าใหม่</DialogTitle>
          <DialogDescription>
            ลงทะเบียนลูกค้าใหม่เข้าสู่ระบบสะสมแต้ม
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อ</Label>
            <Input
              id="name"
              placeholder="ชื่อ"
              disabled={isSubmitting}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last4">เบอร์โทร 4 หลัก</Label>
            <Input
              id="last4"
              placeholder="1234"
              maxLength={4}
              disabled={isSubmitting}
              {...register("last4")}
            />
            {errors.last4 && (
              <p className="text-sm text-destructive">{errors.last4.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">สาขา</Label>
            <Input
              id="branch"
              value={user?.branch || ""}
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
            {errors.branch && (
              <p className="text-sm text-destructive">{errors.branch.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registration_receipt_number">หมายเลขใบเสร็จในระบบ</Label>
            <Input
              id="registration_receipt_number"
              placeholder="เช่น 5-99925, 15-28182"
              disabled={isSubmitting}
              {...register("registration_receipt_number")}
            />
            <p className="text-xs text-muted-foreground">
              Format: X-XXXXX, XX-XXXXX, or similar (5-6 digits total). Examples: 5-99925, 15-28182, 4-235680, 236-58012
            </p>
            {errors.registration_receipt_number && (
              <p className="text-sm text-destructive">{errors.registration_receipt_number.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                onOpenChange(false)
              }}
              disabled={isSubmitting}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังเพิ่ม...
                </>
              ) : (
                "เพิ่มลูกค้า"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
