import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog } from "@/app/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <b>{blog.author}</b>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          like
        </button>
      </form>
    </div>
  )
}

export default BlogPage