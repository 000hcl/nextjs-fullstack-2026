"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { getUserByUsername } from "../services/users"
import { revalidatePath } from "next/cache"

type UserState = {
  errors: {
    username?: string,
    password?: string,
    passwordConfirm?: string
  }
  values: {
    username: string,
    name: string,
    password: string,
    passwordConfirm: string
  }
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
    console.log(passwordConfirm)
    console.log(password)
    console.log(password != passwordConfirm)
    errors.passwordConfirm = "Passwords must match"
  }

  const matchingUsername = await getUserByUsername(username)
  if (matchingUsername) {
    errors.username = `User by the name of "${username}" already exists`
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })
  revalidatePath("/users")
  redirect("/login")
}