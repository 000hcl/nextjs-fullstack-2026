import { db } from "../../db"
import bcrypt from "bcryptjs"
import { sql } from "drizzle-orm"
import { users } from "../../db/schema"

export const reset = async () => {
  await db.execute(sql`TRUNCATE TABLE blogs, readingList, users RESTART IDENTITY CASCADE`);
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