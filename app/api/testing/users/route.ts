import { NextRequest, NextResponse } from "next/server"
import { createDirectUser } from "@/app/services/testing"

export const POST = async (request: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }
  const body = await request.json()
  try {
    await createDirectUser(body)
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({error, status: 500})
  }
}