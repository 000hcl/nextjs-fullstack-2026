"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeById } from "../services/blogs"
import { auth } from "../auth"

export const createBlog = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
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