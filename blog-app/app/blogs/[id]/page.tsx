import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <b>{blog.author}</b>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
    </div>
  )
}

export default BlogPage