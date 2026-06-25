// "use server"

// import { redirect } from "next/navigation"
// import { revalidatePath } from "next/cache"
// import { addNote } from "../services/blogs"

// export const createNote = async (formData: FormData) => {
//   const content = formData.get("content") as string
//   const important = formData.get("important") === "on"
//   addNote(content, important)
//   revalidatePath("/notes")
//   redirect("/notes")
// }