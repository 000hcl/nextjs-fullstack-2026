import { getBlogs } from "../services/blogs"
import { filterBlogs } from "../actions/blogs"
import Link from "next/link"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = getBlogs().sort((a,b) => b.likes-a.likes)
  const blogs = filter
    ? allBlogs.filter(b => b.title.toUpperCase().includes(filter.toUpperCase()))
    : allBlogs
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <form action={filterBlogs}>
          <input type="text" name="filterInput"></input>
          <button type="submit">search</button>
        </form>
      </div>
      <ul>
        {blogs.map(b => (
          <li key={b.id}>
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