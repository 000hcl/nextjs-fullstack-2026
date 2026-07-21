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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <b className="text-gray-500">{blog.author}</b>
      <div className="hover:text-emerald-500">{blog.url}</div>
      <div>{blog.likes} likes</div>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="border rounded p-1 hover:bg-emerald-200">
          like
        </button>
      </form>
    </div>
  )
}

export default BlogPage