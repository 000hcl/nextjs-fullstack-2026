"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeById } from "../services/blogs"
import { auth } from "../auth"

export const createBlog = async (
  prevState: { error: string },
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long" }
  }

  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters long" }
  }

  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    return { error: "URL must be at least 5 characters long" }
  }

  await addBlog(title, author, url)
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeById(id)
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
}

export const filterBlogs = async (formData: FormData) => {
  const filterInput = String(formData.get("filterInput"))
  if (filterInput) {
    redirect(`/blogs?filter=${filterInput}`)
  } else {
    redirect("/blogs")
  }
  
}