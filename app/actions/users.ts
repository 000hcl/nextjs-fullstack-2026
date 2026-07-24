"use server"

import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm";
import { getUserByUsername } from "../services/users"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../services/session"
import { redirect } from "next/navigation";

type UserState = {
  errors?: {
    username?: string,
    password?: string,
    passwordConfirm?: string
  }

  values?: {
    username: string,
    name: string,
    password: string,
    passwordConfirm: string
  }
  success?: boolean
}

export const registerUser = async (
  prevState: UserState,
  formData: FormData
) => {
  const errors: {
    username?: string,
    password?: string,
    passwordConfirm?: string
  } = {}
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"

  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password != passwordConfirm) {
    errors.passwordConfirm =  "Passwords must match"

  }

  const matchingUsername = await getUserByUsername(username)
  if (matchingUsername) {
    errors.username = `User by the name of "${username}" already exists`

  }
  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm },success: false }
  }


  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })
  revalidatePath("/users")
  return { success: true}
}

export const createNewToken = async () => {
  
  const user = await getCurrentUser()
  const id = user?.id
  const newToken = crypto.randomUUID()
  if (id) {
    await db.update(users).set({ token: newToken}).where(eq(users.id, id))
    revalidatePath("/me")
    redirect("/me")
  }
  
}