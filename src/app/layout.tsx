import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://posme.app"
const SITE_NAME = "POS ME"
const SITE_TITLE = "POS ME - ระบบจัดการร้านค้าครบวงจร | POS สมาชิก หลังบ้าน"
const SITE_DESC =
  "POS ME ระบบจัดการร้านค้าครบวงจร แอปสมาชิกสะสมแต้ม ระบบขายหน้าร้าน POS จัดการ Stock หลายสาขา และ Backoffice Dashboard ในแพลตฟอร์มเดียว ใช้งานง่าย รองรับธุรกิจค้าปลีกทุกขนาด"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    "POS",
    "POS ME",
    "Points ME",
    "ระบบจัดการร้านค้า",
    "ระบบ POS",
    "ระบบขายหน้าร้าน",
    "ระบบสมาชิก",
    "สะสมแต้ม",
    "loyalty program",
    "membership app",
    "ระบบจัดการสต๊อก",
    "จัดการหลายสาขา",
    "backoffice",
    "dashboard ยอดขาย",
    "ระบบเปิดปิดกะ",
    "ระบบ POS ร้านค้า",
    "แอปสมาชิกร้านค้า",
    "ระบบจัดการร้านค้าออนไลน์",
    "ซอฟต์แวร์ร้านค้าปลีก",
    "retail management",
    "point of sale",
    "inventory management",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "POS ME - ระบบจัดการร้านค้าครบวงจร",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
