import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service",
  description: "Privacy Policy and Terms of Service",
}

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {children}
    </div>
  )
}
