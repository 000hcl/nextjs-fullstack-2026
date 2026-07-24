import { eq, and } from "drizzle-orm"
import { db } from "../../db"
import { readingList } from "../../db/schema"
import { getCurrentUser } from "./session"
import { getBlogById } from "./blogs"

export const getReadingList = async () => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  const readinglist = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: { blog: true }
  })
  return readinglist
}

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  if (await blogInReadingList(blogId)) {
    throw new Error("Blog already added to reading list")
  }
  await db.insert(readingList).values({ userId: user.id, blogId })
}

export const blogInReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (user) {
    const existing = await db.query.readingList.findFirst({
      where: and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId)
      )
    })
    if (existing) {
      return true
    }
  }
  return false
}

export const markReadById = async (blogId: number) => {
  const blog = await getBlogById(blogId)
  const user = await getCurrentUser()
  if (blog && user) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(
        and(
          eq(readingList.blogId, blogId),
          eq(readingList.userId, user.id)
        )
        
      )
  }
}