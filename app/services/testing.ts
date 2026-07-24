import { db } from "../../db"
import bcrypt from "bcryptjs"
import { sql } from "drizzle-orm"
import { users, readingList, blogs } from "../../db/schema"

export const reset = async () => {
  console.log("RESETTING DATABASE")
  try {
    await db.delete(readingList)
    await db.delete(blogs)
    await db.delete(users)

  } catch (error) {
    console.log(error)
  }

  const result = await db.execute(sql`
    SELECT COUNT(*) FROM users
  `)

  console.log("USERS AFTER RESET:", result.rows)
}

type User = {
  username: string,
  name: string,
  password: string
}

export const createDirectUser = async ({ username, name, password }: User) => {
  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })
}