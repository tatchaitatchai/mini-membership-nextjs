import { Metadata } from "next"
import { Shield, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "POS ME - Privacy Policy & Terms of Service",
  description:
    "Privacy Policy and Terms of Service for POS ME point-of-sale and membership application.",
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
        {number}
      </span>
      {children}
    </h2>
  )
}

function SubSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-slate-700 mb-2">
        {id} {title}
      </h3>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-600 text-sm leading-relaxed mb-3">{children}</p>
}

function Divider() {
  return <hr className="my-10 border-slate-200" />
}

export default function PosMePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white mb-5 shadow-lg shadow-emerald-600/20">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-lg text-slate-500 font-medium">POS ME</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-400">
          <span>Effective Date: February 16, 2025</span>
          <span className="hidden sm:inline">|</span>
          <span>Service Provider: POS ME Co.</span>
        </div>
      </div>

      {/* Language Navigation */}
      <div className="flex gap-2 mb-10 sticky top-4 z-10 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-slate-100 w-fit mx-auto">
        <a
          href="#thai"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white transition-colors"
        >
          ภาษาไทย
        </a>
        <a
          href="#english"
          className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          English
        </a>
      </div>

      {/* ==================== THAI VERSION ==================== */}
      <section id="thai">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6">
          ภาษาไทย
        </div>

        {/* Privacy Policy */}
        <SectionTitle number="1">นโยบายความเป็นส่วนตัว (Privacy Policy)</SectionTitle>
        <Paragraph>
          แอปพลิเคชันนี้ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งาน
          นโยบายฉบับนี้อธิบายถึงวิธีการเก็บรวบรวม ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลของท่าน
          ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
        </Paragraph>

        <SubSection id="1.1" title="ข้อมูลที่เก็บรวบรวม">
          <Paragraph>เราอาจเก็บรวบรวมข้อมูลดังต่อไปนี้:</Paragraph>
          <BulletList
            items={[
              "ชื่อผู้ใช้งาน",
              "หมายเลขโทรศัพท์",
              "อีเมล",
              "ข้อมูลบัญชีผู้ใช้งาน",
              "ประวัติการซื้อสินค้า",
              "ข้อมูลการใช้งานแอปพลิเคชัน",
              "ข้อมูลอุปกรณ์ (เพื่อความปลอดภัยของระบบ)",
            ]}
          />
        </SubSection>

        <SubSection id="1.2" title="วัตถุประสงค์ในการใช้ข้อมูล">
          <Paragraph>ข้อมูลของผู้ใช้งานจะถูกนำไปใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:</Paragraph>
          <BulletList
            items={[
              "ยืนยันตัวตนของผู้ใช้งาน",
              "ให้บริการระบบสมาชิกและระบบขายสินค้า (POS)",
              "คำนวณคะแนนสะสมและระดับสมาชิก (Rank)",
              "จัดการคำสั่งซื้อและสต๊อกสินค้า",
              "ส่งการแจ้งเตือนที่เกี่ยวข้องกับการใช้งาน",
              "ปรับปรุงความปลอดภัยและประสิทธิภาพของระบบ",
            ]}
          />
        </SubSection>

        <SubSection id="1.3" title="การใช้หมายเลขโทรศัพท์">
          <Paragraph>หมายเลขโทรศัพท์ของผู้ใช้งานจะถูกใช้เพื่อ:</Paragraph>
          <BulletList
            items={[
              "ยืนยันตัวตนผ่านระบบ OTP (One-Time Password)",
              "ระบุบัญชีผู้ใช้งาน",
              "แจ้งเตือนเกี่ยวกับบัญชีหรือธุรกรรม",
            ]}
          />
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
            <Paragraph>
              ระบบจะไม่ใช้ข้อมูลส่วนบุคคลเพื่อการตลาด การโฆษณา หรือการส่งเสริมการขายใด ๆ
              โดยไม่ได้รับความยินยอมจากผู้ใช้งานก่อน
            </Paragraph>
          </div>
        </SubSection>

        <SubSection id="1.4" title="การเปิดเผยข้อมูล">
          <BulletList
            items={[
              "ข้อมูลผู้ใช้งานจะถูกเปิดเผยเฉพาะกับร้านค้าที่ผู้ใช้งานเป็นสมาชิกเท่านั้น",
              "ร้านค้าแต่ละแห่งสามารถเข้าถึงข้อมูลเฉพาะลูกค้าของตนเองเท่านั้น",
              "ผู้ให้บริการจะไม่ขาย แลกเปลี่ยน หรือเปิดเผยข้อมูลส่วนบุคคลให้แก่บุคคลภายนอกเพื่อวัตถุประสงค์ทางการค้า",
            ]}
          />
        </SubSection>

        <SubSection id="1.5" title="การจัดเก็บและความปลอดภัย">
          <BulletList
            items={[
              "ข้อมูลถูกจัดเก็บด้วยมาตรการรักษาความปลอดภัยที่เหมาะสมทั้งทางเทคนิคและองค์กร",
              "จำกัดการเข้าถึงข้อมูลเฉพาะบุคลากรที่มีหน้าที่เกี่ยวข้องเท่านั้น",
              "มีระบบป้องกันการเข้าถึง การเปลี่ยนแปลง หรือการเปิดเผยข้อมูลโดยไม่ได้รับอนุญาต",
            ]}
          />
        </SubSection>

        <SubSection id="1.6" title="สิทธิของเจ้าของข้อมูล (PDPA / GDPR)">
          <Paragraph>ผู้ใช้งานมีสิทธิ์ดังต่อไปนี้:</Paragraph>
          <BulletList
            items={[
              "ขอเข้าถึง แก้ไข หรือปรับปรุงข้อมูลส่วนบุคคลของตน",
              "ถอนความยินยอมในการเก็บรวบรวมและใช้ข้อมูล",
              "ขอให้ลบข้อมูลส่วนบุคคลหรือปิดบัญชี",
            ]}
          />
          <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
            <Paragraph>
              การลบข้อมูลอาจใช้เวลาไม่เกิน 30 วันนับจากวันที่ได้รับคำขอ
              และเมื่อดำเนินการแล้วจะไม่สามารถกู้คืนข้อมูลได้
            </Paragraph>
          </div>
        </SubSection>

        <Divider />

        {/* Terms & Conditions */}
        <SectionTitle number="2">ข้อตกลงและเงื่อนไขการใช้งาน (Terms &amp; Conditions)</SectionTitle>

        <SubSection id="2.1" title="ขอบเขตการให้บริการ">
          <Paragraph>แอปพลิเคชันนี้เป็นแพลตฟอร์มสำหรับ:</Paragraph>
          <BulletList
            items={[
              "ระบบขายสินค้า (POS)",
              "ระบบสมาชิกและคะแนนสะสม",
              "ระบบจัดการร้านค้า",
            ]}
          />
          <Paragraph>
            ผู้ให้บริการเป็นเพียงผู้ให้บริการระบบเท่านั้น
            ไม่ใช่ผู้จำหน่ายสินค้าหรือคู่สัญญาทางการค้าระหว่างร้านค้าและลูกค้า
          </Paragraph>
        </SubSection>

        <SubSection id="2.2" title="บัญชีผู้ใช้งาน">
          <BulletList
            items={[
              "ผู้ใช้งานต้องให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบัน",
              "1 บัญชีต่อ 1 ผู้ใช้งานเท่านั้น",
              "ผู้ใช้งานต้องรับผิดชอบต่อการใช้งานและความปลอดภัยของบัญชีตนเอง",
            ]}
          />
        </SubSection>

        <SubSection id="2.3" title="การทำธุรกรรมและคำสั่งซื้อ">
          <BulletList
            items={[
              "รายการขายถือว่าสมบูรณ์เมื่อระบบบันทึกรายการสำเร็จ",
              "การยกเลิกหรือคืนเงินเป็นไปตามเงื่อนไขที่ร้านค้าแต่ละแห่งกำหนด",
            ]}
          />
        </SubSection>

        <SubSection id="2.4" title="คะแนนสะสมและระดับสมาชิก (Rank)">
          <BulletList
            items={[
              "คะแนนสะสมไม่มีมูลค่าเป็นเงินสด",
              "ไม่สามารถโอน แลกเปลี่ยน หรือแลกเป็นเงินสดได้",
              "ร้านค้ามีสิทธิ์กำหนดและปรับเปลี่ยนเงื่อนไขคะแนนและระดับสมาชิกได้ตามความเหมาะสม",
            ]}
          />
        </SubSection>

        <SubSection id="2.5" title="การระงับหรือยกเลิกบัญชี">
          <Paragraph>
            ผู้ให้บริการขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีผู้ใช้งาน
            หากตรวจพบการใช้งานที่ผิดกฎหมาย ฝ่าฝืนข้อตกลงนี้ หรือกระทำการใด ๆ
            ที่อาจก่อให้เกิดความเสียหายต่อระบบหรือผู้ใช้งานอื่น
          </Paragraph>
        </SubSection>

        <SubSection id="2.6" title="ข้อจำกัดความรับผิด">
          <Paragraph>ผู้ให้บริการไม่รับผิดชอบต่อ:</Paragraph>
          <BulletList
            items={[
              "ข้อพิพาทระหว่างร้านค้าและลูกค้า",
              "ความเสียหายที่เกิดจากการใช้งานระบบ",
            ]}
          />
        </SubSection>
      </section>

      <Divider />

      {/* ==================== ENGLISH VERSION ==================== */}
      <section id="english">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6">
          English
        </div>

        {/* Privacy Policy */}
        <SectionTitle number="1">Privacy Policy</SectionTitle>
        <Paragraph>
          This application respects your privacy and is committed to protecting your personal data
          in accordance with applicable data protection laws, including Thailand&apos;s Personal Data
          Protection Act (PDPA) and the General Data Protection Regulation (GDPR).
          This policy explains how we collect, use, disclose, and safeguard your information.
        </Paragraph>

        <SubSection id="1.1" title="Information We Collect">
          <Paragraph>We may collect the following information:</Paragraph>
          <BulletList
            items={[
              "User display name",
              "Phone number",
              "Email address",
              "Account information",
              "Purchase history",
              "Application usage data",
              "Device information (for system security purposes)",
            ]}
          />
        </SubSection>

        <SubSection id="1.2" title="Purpose of Data Collection">
          <Paragraph>Your information is used for the following purposes:</Paragraph>
          <BulletList
            items={[
              "Verify your identity",
              "Provide POS and membership services",
              "Manage orders, inventory, and loyalty points",
              "Send service-related notifications",
              "Improve system security and performance",
            ]}
          />
        </SubSection>

        <SubSection id="1.3" title="Use of Phone Number">
          <Paragraph>Your phone number is used for:</Paragraph>
          <BulletList
            items={[
              "OTP (One-Time Password) authentication",
              "Account identification",
              "Transaction-related notifications",
            ]}
          />
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
            <Paragraph>
              We do not use your personal data for marketing, advertising, or promotional
              purposes without your explicit prior consent.
            </Paragraph>
          </div>
        </SubSection>

        <SubSection id="1.4" title="Data Sharing and Disclosure">
          <BulletList
            items={[
              "Your data is shared only with the merchants you are a member of",
              "Each merchant can access only their own customers' data",
              "We do not sell, trade, or disclose personal data to third parties for commercial purposes",
            ]}
          />
        </SubSection>

        <SubSection id="1.5" title="Data Storage and Security">
          <Paragraph>
            We apply appropriate technical and organizational measures to protect your personal data,
            including restricting access to authorized personnel and implementing safeguards against
            unauthorized access, modification, or disclosure.
          </Paragraph>
        </SubSection>

        <SubSection id="1.6" title="User Rights (PDPA / GDPR)">
          <Paragraph>You have the right to:</Paragraph>
          <BulletList
            items={[
              "Access, correct, or update your personal data",
              "Withdraw your consent for data collection and processing",
              "Request deletion of your account and personal data",
            ]}
          />
          <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
            <Paragraph>
              Data deletion requests may take up to 30 days to process and are irreversible
              once completed.
            </Paragraph>
          </div>
        </SubSection>

        <Divider />

        {/* Terms of Service */}
        <SectionTitle number="2">Terms of Service</SectionTitle>

        <SubSection id="2.1" title="Service Scope">
          <Paragraph>This application provides:</Paragraph>
          <BulletList
            items={[
              "Point-of-sale (POS) system",
              "Membership and loyalty point system",
              "Store management system",
            ]}
          />
          <Paragraph>
            We act as a platform provider only and are not a party to any commercial
            transactions between merchants and customers.
          </Paragraph>
        </SubSection>

        <SubSection id="2.2" title="User Accounts">
          <BulletList
            items={[
              "Users must provide accurate, complete, and up-to-date information",
              "One account per user",
              "Users are responsible for the use and security of their own accounts",
            ]}
          />
        </SubSection>

        <SubSection id="2.3" title="Transactions">
          <BulletList
            items={[
              "Sales are considered complete when successfully recorded in the system",
              "Refunds or cancellations are subject to individual merchant policies",
            ]}
          />
        </SubSection>

        <SubSection id="2.4" title="Loyalty Points and Membership Rank">
          <BulletList
            items={[
              "Points have no cash value",
              "Points are non-transferable and cannot be exchanged for cash",
              "Merchants reserve the right to modify point and rank rules at their discretion",
            ]}
          />
        </SubSection>

        <SubSection id="2.5" title="Account Suspension or Termination">
          <Paragraph>
            We reserve the right to suspend or terminate any user account if we detect
            unlawful activity, violation of these terms, or any action that may cause
            harm to the system or other users.
          </Paragraph>
        </SubSection>

        <SubSection id="2.6" title="Limitation of Liability">
          <Paragraph>We are not liable for:</Paragraph>
          <BulletList
            items={[
              "Disputes between merchants and customers",
              "Damages arising from the use of the system",
            ]}
          />
        </SubSection>
      </section>

      <Divider />

      {/* Contact */}
      <section className="text-center pb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h2>
        <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="mailto:posme.membership@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
          >
            <Mail className="w-4 h-4" />
            posme.membership@gmail.com
          </a>
        </div>
        <p className="text-xs text-slate-400 mt-8">
          Last updated: February 16, 2025
        </p>
      </section>
    </main>
  )
}
