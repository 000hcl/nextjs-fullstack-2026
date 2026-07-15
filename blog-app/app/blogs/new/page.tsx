"use client"
import { createBlog } from "@/app/actions/blogs"
import { useActionState } from "react"

const newBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" })

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
            Url
            <input type="text" name="url" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      <div>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </div>
    </div>
  )
}


export default newBlog