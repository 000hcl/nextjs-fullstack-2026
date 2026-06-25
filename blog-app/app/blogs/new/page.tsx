import { createBlog } from "@/app/actions/blogs"

const newBlog = () => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
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
            <input type="text" name="title" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}


export default newBlog