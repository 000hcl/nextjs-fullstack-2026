import { eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async (filter: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`)
  })
  }
  return db.query.blogs.findMany()
}


export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url, likes: 0 })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const likeById = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes+1 })
      .where(eq(blogs.id, id))
  }
}

