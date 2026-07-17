"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeById } from "../services/blogs"
import { auth } from "../auth"

type BlogState = {
  errors: {
    title?: string
    author?: string
    url?: string
  }
  values: {
    title: string
    author: string
    url: string
  }
}

export const createBlog = async (
  prevState: BlogState,
  formData: FormData
) => {
  const errors: {
    title?: string
    author?: string
    url?: string
  } = {}
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long" 
  }

  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    errors.author ="Author must be at least 5 characters long" 
  }

  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    errors.url ="URL must be at least 5 characters long"
  }
  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } }
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