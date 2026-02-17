"use client"

import { useState, FormEvent } from "react"
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "posme.membership@gmail.com"

export function DeletionRequestForm() {
  const [contact, setContact] = useState("")
  const [storeName, setStoreName] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/account-deletion-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact,
          storeName,
          message,
          honeypot,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus("success")
        setContact("")
        setStoreName("")
        setMessage("")
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.error || "Failed to submit request")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please try again or contact support directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Submit Deletion Request</h3>
          <p className="text-sm text-slate-500">We&apos;ll contact you to verify and process your request</p>
        </div>
      </div>

      {submitStatus === "success" ? (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Request Submitted Successfully</h4>
          <p className="text-sm text-slate-600 mb-6">
            We&apos;ve received your account deletion request. Our team will contact you within 1-2 business days
            to verify your identity and process the deletion.
          </p>
          <button
            onClick={() => setSubmitStatus("idle")}
            className="text-sm text-blue-600 hover:underline"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email or Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="your@email.com or +66812345678"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-500 mt-1">
              Use the email or phone number registered with your POS ME account
            </p>
          </div>

          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-slate-700 mb-1.5">
              Store Name (if applicable)
            </label>
            <input
              type="text"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Your store name"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
              Reason for Deletion <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please tell us why you want to delete your account (optional but helps us improve)"
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {submitStatus === "error" && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Submit Request
                </>
              )}
            </button>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Account Deletion Request`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Or Email Directly
            </a>
          </div>

          <p className="text-xs text-slate-500 text-center">
            By submitting this form, you confirm that you are the account owner and understand that
            account deletion is permanent and irreversible.
          </p>
        </form>
      )}
    </div>
  )
}
