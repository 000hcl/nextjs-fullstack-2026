import { NextRequest, NextResponse } from "next/server"
import { getUserByAPIToken } from "@/app/services/users"


export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get("Authorization")
  console.log(Object.fromEntries(request.headers.entries()));


  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized, missing token" }, { status: 401 })
  }

  const token = authHeader.substring(7)
  const userInfo = await getUserByAPIToken(token)
  if (userInfo) {
    return NextResponse.json(userInfo)
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

