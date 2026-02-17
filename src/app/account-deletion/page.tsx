import { Metadata } from "next"
import { Trash2, Mail, AlertCircle, CheckCircle2, Clock, Shield } from "lucide-react"
import { DeletionRequestForm } from "./deletion-form"

export const metadata: Metadata = {
  title: "Request Account Deletion - POS ME",
  description:
    "Request deletion of your POS ME account and associated data. Learn about our data deletion process and timeline.",
}

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "posme.membership@gmail.com"

function InfoBox({ 
  icon: Icon, 
  title, 
  children, 
  variant = "default" 
}: { 
  icon: any
  title: string
  children: React.ReactNode
  variant?: "default" | "warning" | "success"
}) {
  const variantStyles = {
    default: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  }

  const iconStyles = {
    default: "text-blue-600",
    warning: "text-amber-600",
    success: "text-emerald-600",
  }

  return (
    <div className={`rounded-lg border p-4 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconStyles[variant]}`} />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
          {number}
        </div>
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export default function AccountDeletionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600 text-white mb-5 shadow-lg shadow-red-600/20">
            <Trash2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Request Account Deletion
          </h1>
          <p className="text-lg text-slate-500">POS ME</p>
        </div>

        {/* Important Notice */}
        <InfoBox icon={AlertCircle} title="Important Notice" variant="warning">
          <p className="mb-2">
            Account deletion is <strong>permanent and irreversible</strong>. Once your account is deleted:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>You will lose access to all your data</li>
            <li>Your store and customer records will be removed</li>
            <li>Transaction history will be deleted</li>
            <li>This action cannot be undone</li>
          </ul>
        </InfoBox>

        <div className="h-8" />

        {/* How to Request Deletion */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Request Account Deletion</h2>
          
          <div className="space-y-0">
            <Step number={1} title="Option A: Delete In-App (Recommended)">
              <p className="mb-2">If you have access to the POS ME app:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Open the POS ME app</li>
                <li>Go to <strong>Settings</strong></li>
                <li>Tap <strong>Account</strong></li>
                <li>Select <strong>Delete Account</strong></li>
                <li>Follow the confirmation steps</li>
              </ol>
            </Step>

            <Step number={2} title="Option B: Request via Email">
              <p className="mb-3">
                If you cannot access the app or prefer email, send your deletion request to:
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Account Deletion Request`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {SUPPORT_EMAIL}
              </a>
              <p className="mt-4 mb-2">Please include the following information:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Registered email or phone number</strong> (used for login)
                </li>
                <li>
                  <strong>Store name</strong> (if you are a merchant/store owner)
                </li>
                <li>
                  <strong>Reason for deletion</strong> (optional, helps us improve)
                </li>
              </ul>
            </Step>

            <Step number={3} title="Verification & Processing">
              <p>
                We will verify your identity to ensure account security. You may receive a confirmation
                email or SMS to the registered contact. Once verified, your deletion request will be processed.
              </p>
            </Step>
          </div>
        </section>

        <div className="h-8" />

        {/* What Data Will Be Deleted */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What Data Will Be Deleted</h2>
          
          <div className="grid gap-4">
            <InfoBox icon={Shield} title="Account Profile Data">
              <ul className="list-disc list-inside space-y-1">
                <li>Email address and phone number</li>
                <li>Account credentials and authentication data</li>
                <li>Profile information and preferences</li>
              </ul>
            </InfoBox>

            <InfoBox icon={Shield} title="Store Profile Data (for Merchants)">
              <ul className="list-disc list-inside space-y-1">
                <li>Store name and business information</li>
                <li>Branch details and settings</li>
                <li>Staff accounts created by you</li>
              </ul>
            </InfoBox>

            <InfoBox icon={Shield} title="Customer Records">
              <ul className="list-disc list-inside space-y-1">
                <li>Customer profiles created in your store</li>
                <li>Customer phone numbers and names</li>
                <li>Loyalty points and membership ranks</li>
              </ul>
            </InfoBox>

            <InfoBox icon={Shield} title="Transaction History">
              <ul className="list-disc list-inside space-y-1">
                <li>Sales records and orders created by your account</li>
                <li>Payment history</li>
                <li>Product and inventory data</li>
              </ul>
            </InfoBox>
          </div>
        </section>

        <div className="h-8" />

        {/* Timeline & Retention */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Deletion Timeline & Data Retention</h2>
          
          <div className="space-y-4">
            <InfoBox icon={Clock} title="Standard Deletion Timeline" variant="success">
              <p>
                Your account and associated data will be <strong>permanently deleted within 30 days</strong> after
                we verify your identity and ownership of the account.
              </p>
            </InfoBox>

            <InfoBox icon={AlertCircle} title="Legal & Compliance Retention" variant="warning">
              <p className="mb-2">
                Some records may be retained for legal, tax, or accounting compliance purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Financial transaction records may be retained for up to <strong>90 days</strong></li>
                <li>Records required by law (e.g., tax invoices) may be retained as legally mandated</li>
                <li>After the retention period, all data will be permanently deleted</li>
              </ul>
            </InfoBox>

            <InfoBox icon={CheckCircle2} title="Confirmation" variant="success">
              <p>
                You will receive a confirmation email once your account deletion is complete.
                If you do not receive confirmation within 30 days, please contact our support team.
              </p>
            </InfoBox>
          </div>
        </section>

        <div className="h-8" />

        {/* Optional: Deletion Request Form */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Request Form</h2>
          <DeletionRequestForm />
        </section>

        <div className="h-8" />

        {/* Contact Support */}
        <section className="text-center py-8 px-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Need Help?</h2>
          <p className="text-sm text-slate-600 mb-4">
            If you have questions about account deletion or data privacy, contact our support team:
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {SUPPORT_EMAIL}
          </a>
          <p className="text-xs text-slate-400 mt-6">
            For privacy policy and terms of service, visit{" "}
            <a href="/policy/pos-me" className="text-blue-600 hover:underline">
              /policy/pos-me
            </a>
          </p>
        </section>

        <div className="h-8" />

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400">
          <p>POS ME - Point of Sale & Membership Management System</p>
          <p className="mt-1">Last updated: February 17, 2025</p>
        </footer>
      </div>
    </main>
  )
}
