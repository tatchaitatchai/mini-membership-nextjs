import { NextRequest, NextResponse } from "next/server"

interface DeletionRequest {
  contact: string
  storeName?: string
  message: string
  honeypot?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: DeletionRequest = await request.json()

    // Honeypot spam protection - if filled, it's likely a bot
    if (body.honeypot) {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      )
    }

    // Basic validation
    if (!body.contact || !body.message) {
      return NextResponse.json(
        { success: false, error: "Contact and message are required" },
        { status: 400 }
      )
    }

    // Validate contact format (email or phone)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.contact)
    const isPhone = /^[0-9+\-\s()]{8,}$/.test(body.contact)
    
    if (!isEmail && !isPhone) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email or phone number" },
        { status: 400 }
      )
    }

    // Log the deletion request
    // In production, this should:
    // 1. Store in database
    // 2. Send email notification to support team
    // 3. Send confirmation email to user
    console.log("=== Account Deletion Request ===")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Contact:", body.contact)
    console.log("Store Name:", body.storeName || "N/A")
    console.log("Message:", body.message)
    console.log("IP:", request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown")
    console.log("================================")

    // TODO: In production, implement:
    // - Save to database
    // - Send email to support team
    // - Send confirmation email to user
    // Example:
    // await sendEmail({
    //   to: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    //   subject: "Account Deletion Request",
    //   body: `Contact: ${body.contact}\nStore: ${body.storeName}\nMessage: ${body.message}`
    // })

    return NextResponse.json({
      success: true,
      message: "Your deletion request has been received. We will contact you within 1-2 business days to verify and process your request.",
    })
  } catch (error) {
    console.error("Error processing deletion request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process request. Please try again or contact support directly." },
      { status: 500 }
    )
  }
}
