"use client"
import { createBlog } from "@/app/actions/blogs"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const initialState = {
    error: "",
    success: false,
    values: {
      title: "",
      author: "",
      url: "",
    }
  }
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      showNotification('blog created')
      router.push('/blogs')
    }

  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-2">
        <div>
          <div>
            {state.error && <p style={{ color: "red" }}>{state.error}</p>}
          </div>
          <label className="text-gray-500 text-s">
            Title
            <input type="text" name="title" defaultValue={state.values?.title} required className="border rounded p-1"/>
          </label>

        </div>
        <div>
          <label className="text-gray-500 text-s">
            Author
            <input type="text" name="author" defaultValue={state.values?.author} required className="border rounded p-1"/>
          </label>

        </div>
        <div>
          <label className="text-gray-500 text-s">
            URL
            <input type="text" name="url" defaultValue={state.values?.url} required className="border rounded p-1"/>
          </label>

        </div>
        <button type="submit" data-testid="create-blog-button" className="border rounded p-1 hover:bg-emerald-200">Create</button>
      </form>

    </div>
  )
}


export default NewBlog