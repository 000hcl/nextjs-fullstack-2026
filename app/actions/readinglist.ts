"use server"

import { revalidatePath } from "next/cache"
import { addToReadingList, markReadById } from "../services/readinglist"

export const addReading = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addToReadingList(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}

export const markAsRead = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await markReadById(id)
  revalidatePath("/me")
}