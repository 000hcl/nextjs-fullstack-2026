import { getBlogs } from "../services/blogs"
import { filterBlogs } from "../actions/blogs"
import Link from "next/link"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = await getBlogs(filter ? filter: '')
  const blogs = allBlogs.sort((a,b) => b.likes-a.likes)
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="mb-4">
        <form action={filterBlogs} className="space-x-2">
          <input type="text" name="filterInput" className="border rounded p-1"></input>
          <button type="submit" className="border rounded p-1 hover:bg-emerald-200">search</button>
        </form>
      </div>
      <ul className="space-y-2">
        {blogs.map(b => (
          <li key={b.id} className="border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${b.id}`}>
              {b.title} by {b.author}: {b.url} <b>{b.likes} likes</b>
            </Link>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs