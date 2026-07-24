import { NextResponse } from "next/server"
import { reset } from "@/app/services/testing"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }
  try {
    await reset()
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({error, status: 500})
  }

}