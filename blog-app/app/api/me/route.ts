// import { NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "../../../lib/auth"
// import { addNote } from "../../services/notes"
// import { revalidatePath } from "next/cache"

// export const POST = async (req: NextRequest) => {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const body = await req.json()
//   const { content, important = false } = body

//   if (!content || content.length < 10) {
//     return NextResponse.json(
//       { error: "Content must be at least 10 characters" },
//       { status: 400 },
//     )
//   }

//   await addNote(content, important)
//   revalidatePath("/notes")
//   return NextResponse.json({ success: true }, { status: 201 })
// }

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

