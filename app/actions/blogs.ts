"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeById } from "../services/blogs"
import { addToReadingList } from "../services/readinglist"
import { auth } from "../auth"

type BlogState = {
  error?: string
  values?: {
    title: string
    author: string
    url: string
  }
  success?: boolean
}

export const createBlog = async (
  prevState: BlogState,
  formData: FormData
) => {

  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  if (!title || title.length < 5) {
    return { 
      error: "Title must be at least 5 characters long",
      values: { title, author, url },
      success: false
  }}

  if (!author || author.length < 5) {
    return { 
      error: "Author must be at least 5 characters long",
      values: { title, author, url },
      success: false
  }}

  
  if (!url || url.length < 5) {
    return { 
      error: "URL must be at least 5 characters long",
      values: { title, author, url },
      success: false
  }}

  const newBlog = await addBlog(title, author, url)
  await addToReadingList(newBlog.id)
  revalidatePath("/blogs")
  revalidatePath("/me")
  return { error: '', success: true}
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