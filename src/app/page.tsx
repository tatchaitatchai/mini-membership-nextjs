import Image from "next/image"
import Link from "next/link"
import {
  Smartphone,
  Monitor,
  ShoppingCart,
  BarChart3,
  ArrowRight,
  Mail,
  Phone,
  Star,
  Package,
  Users,
  CheckCircle2,
  QrCode,
  TrendingUp,
  Shield,
  Bell,
  GitBranch,
} from "lucide-react"

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
      <span className="text-sm text-gray-600">{children}</span>
    </li>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="POS ME" width={36} height={36} className="rounded-xl" />
            <span className="text-lg font-bold text-gray-900">POS ME</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="#products"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ผลิตภัณฑ์
            </Link>
            <Link
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ติดต่อ
            </Link>
            <Link
              href="/backoffice/login"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-32 -left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-20 w-80 h-80 bg-indigo-300/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="mb-10">
            <Image
              src="/logo.png"
              alt="POS ME"
              width={112}
              height={112}
              className="mx-auto rounded-[1.75rem] shadow-xl shadow-blue-500/15 ring-1 ring-white/80"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            ระบบจัดการร้านค้า
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ครบจบในที่เดียว
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            แอปสมาชิก ระบบขายหน้าร้าน และหลังบ้าน รวมในแพลตฟอร์มเดียว
            <br className="hidden sm:block" />
            ใช้งานง่าย รองรับหลายสาขา ครบทุกฟีเจอร์ที่ธุรกิจต้องการ
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="#products"
              className="group px-7 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all inline-flex items-center gap-2"
            >
              ดูรายละเอียด
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/backoffice/login"
              className="px-7 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all"
            >
              Backoffice
            </Link>
          </div>

          {/* Mini stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Star, label: "สะสมแต้ม", sub: "Membership" },
              { icon: ShoppingCart, label: "ขายหน้าร้าน", sub: "POS" },
              { icon: BarChart3, label: "Dashboard", sub: "Backoffice" },
              { icon: GitBranch, label: "หลายสาขา", sub: "Multi-Branch" },
            ].map((s) => (
              <div key={s.label} className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 px-4 py-3.5 text-center shadow-sm">
                <s.icon className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                <div className="text-sm font-semibold text-gray-900">{s.label}</div>
                <div className="text-xs text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 mb-2">ผลิตภัณฑ์</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">3 ระบบ ครบจบในที่เดียว</h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">ออกแบบมาเพื่อธุรกิจค้าปลีกโดยเฉพาะ ใช้งานง่าย ครอบคลุมทุกกระบวนการ</p>
          </div>

          {/* Product 1: Points ME */}
          <div className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-8 sm:p-10 border border-emerald-100/60">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Points ME</h3>
                    <p className="text-xs font-medium text-emerald-600">Membership App</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  แอปพลิเคชันสมาชิกสำหรับลูกค้า ดาวน์โหลดได้ทั้ง App Store
                  และ Play Store หรือสแกน QR Code เพื่อเข้าถึง
                </p>
                <ul className="space-y-2.5">
                  <Bullet>เข้าสู่ระบบด้วยเบอร์โทร + OTP สมัครง่ายรับแรงค์ทันที</Bullet>
                  <Bullet>ดูคะแนนสะสม ยอดซื้อ และสิทธิพิเศษแต่ละแรงค์</Bullet>
                  <Bullet>ติดตามแรงค์ สะสมอีกกี่แต้มถึงเลื่อนขั้น</Bullet>
                  <Bullet>ประวัติการซื้อพร้อมรายละเอียดบิล</Bullet>
                  <Bullet>แจ้งเตือนแต้มเข้าทันที</Bullet>
                </ul>
              </div>
              <div className="w-full lg:w-[320px] shrink-0">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/15">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-3">
                    <div className="text-emerald-100 text-xs mb-0.5">คะแนนสะสม</div>
                    <div className="text-2xl font-bold">1,250 แต้ม</div>
                    <div className="text-emerald-200 text-xs mt-1">อีก 750 แต้ม เลื่อนเป็น Gold</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">Silver</div>
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">12 รายการ</div>
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">3 แจ้งเตือน</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2: POS ME */}
          <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 sm:p-10 border border-blue-100/60">
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">POS ME</h3>
                    <p className="text-xs font-medium text-blue-600">Point of Sale</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  แอปพลิเคชันขายสินค้าหน้าร้าน จัดการทุกอย่างตั้งแต่เปิดกะถึงปิดกะ
                  ครบจบในแอปเดียว
                </p>
                <ul className="space-y-2.5">
                  <Bullet>เปิด-ปิดกะ กรอกเงินทอนในลิ้นชัก PIN พนักงาน</Bullet>
                  <Bullet>รับ Order ระบุลูกค้าด้วยเบอร์ 4 ตัวท้าย</Bullet>
                  <Bullet>เลือกสินค้า ดู Stock คำนวณราคาพร้อมโปรโมชั่น</Bullet>
                  <Bullet>แนบสลิป ระบุเงินรับ ปิดออเดอร์ ตัด Stock อัตโนมัติ</Bullet>
                  <Bullet>รับของ เบิกของระหว่างสาขา ปรับ Stock พร้อมเหตุผล</Bullet>
                  <Bullet>แจ้งเตือนสินค้าใกล้หมด ปิดกะอัตโนมัติ</Bullet>
                </ul>
              </div>
              <div className="w-full lg:w-[320px] shrink-0">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/15">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-3">
                    <div className="text-blue-100 text-xs mb-0.5">ยอดขายวันนี้</div>
                    <div className="text-2xl font-bold">฿12,450</div>
                    <div className="text-blue-200 text-xs mt-1">18 ออเดอร์ | กะเช้า</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">เปิดกะ</div>
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">รับของ</div>
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">Stock</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product 3: Backoffice */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50/50 rounded-3xl p-8 sm:p-10 border border-purple-100/60">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Web Backoffice</h3>
                    <p className="text-xs font-medium text-purple-600">Web Management</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  เว็บแอปพลิเคชันจัดการหลังบ้าน ดู Dashboard จัดการสาขา สมาชิก
                  สินค้า และ Stock ทั้งหมดจากที่เดียว
                </p>
                <ul className="space-y-2.5">
                  <Bullet>จัดการสมาชิกและพนักงาน กำหนด PIN เข้าใช้แอป</Bullet>
                  <Bullet>จัดการสาขา เพิ่ม แก้ไข เปิด-ปิด</Bullet>
                  <Bullet>Dashboard ยอดขาย ต้นทุน กราฟ แยกสาขาหรือรวมได้</Bullet>
                  <Bullet>ประวัติการขาย กรองรายสาขา รายวัน รายกะ</Bullet>
                  <Bullet>จัดการสินค้า Stock เบิกของ รับของ Broadcast</Bullet>
                </ul>
              </div>
              <div className="w-full lg:w-[320px] shrink-0">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/15">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-3">
                    <div className="text-purple-100 text-xs mb-0.5">ยอดขายรวมเดือนนี้</div>
                    <div className="text-2xl font-bold">฿385,200</div>
                    <div className="text-purple-200 text-xs mt-1">+12.5% จากเดือนก่อน</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">สมาชิก</div>
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">Dashboard</div>
                    <div className="flex-1 bg-white/15 rounded-lg p-2.5 text-center text-xs">3 สาขา</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 mb-2">วิธีใช้งาน</p>
            <h2 className="text-3xl font-bold text-gray-900">เริ่มต้นง่ายๆ 3 ขั้นตอน</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: QrCode,
                title: "ลูกค้าสมัครสมาชิก",
                desc: "สแกน QR Code หรือดาวน์โหลดแอป Points ME สมัครด้วยเบอร์โทร + OTP รับแรงค์ทันที",
                color: "bg-emerald-600",
              },
              {
                num: "02",
                icon: Package,
                title: "พนักงานขายหน้าร้าน",
                desc: "เปิดกะ รับออเดอร์ ระบุลูกค้า เลือกสินค้า ใส่โปรโมชั่น ปิดบิล ตัด Stock อัตโนมัติ",
                color: "bg-blue-600",
              },
              {
                num: "03",
                icon: TrendingUp,
                title: "เจ้าของดูผลจาก Backoffice",
                desc: "ติดตามยอดขาย จัดการสาขา สต๊อก สมาชิก โปรโมชั่น และ Broadcast จากหน้าเว็บ",
                color: "bg-purple-600",
              },
            ].map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${s.color} text-white flex items-center justify-center`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-300">{s.num}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            พร้อมเริ่มต้นใช้งานแล้วหรือยัง?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            ติดต่อเราเพื่อเริ่มต้นระบบ POS ME สำหรับธุรกิจของคุณ
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/backoffice/login"
              className="group px-7 py-3 text-sm font-semibold text-blue-700 bg-white rounded-xl hover:bg-blue-50 shadow-lg transition-all inline-flex items-center gap-2"
            >
              เข้าสู่ระบบ Backoffice
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/policy/points-me"
              className="px-7 py-3 text-sm font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* Contact + Footer */}
      <footer id="contact" className="py-12 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="POS ME" width={40} height={40} className="rounded-xl" />
              <div>
                <div className="text-base font-bold text-white">POS ME</div>
                <div className="text-xs text-gray-500">ระบบจัดการร้านค้าครบวงจร</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-400">
              <a href="mailto:posme.membership@gmail.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                posme.membership@gmail.com
              </a>
              <a href="tel:0969593087" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                096-959-3087
              </a>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>&copy; 2025 POS ME. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/policy/points-me" className="hover:text-gray-300 transition-colors">
                Privacy Policy (Points ME)
              </Link>
              <Link href="/policy/pos-me" className="hover:text-gray-300 transition-colors">
                Privacy Policy (POS ME)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
