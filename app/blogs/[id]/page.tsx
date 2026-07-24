import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog } from "@/app/actions/blogs"
import { blogInReadingList } from "@/app/services/readinglist"
import { addReading } from "@/app/actions/readinglist"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const inList = await blogInReadingList(blog.id)

  return (
    <div className="max-w-2xl mx-auto p-6" data-testid="blog-detail">
      <h2 className="text-2xl font-bold mb-4" data-testid='blog-title'>{blog.title}</h2>
      <b className="text-gray-500" data-testid='blog-author'>{blog.author}</b>
      <div className="hover:text-emerald-500">{blog.url}</div>
      <div>{blog.likes} likes</div>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="border rounded p-1 hover:bg-emerald-200">
          like
        </button>
      </form>
      <form action={addReading}>
        <input type="hidden" name="id" value={blog.id} />
        {!inList ? <button type="submit" data-testid="add-to-reading-list-button" className="border rounded p-1 hover:bg-emerald-200">
          add to reading list</button> :
          <button disabled={true} className="border rounded p-1 bg-gray-300">already added to reading list</button>}
      </form>
      
    </div>
  )
}

export default BlogPage