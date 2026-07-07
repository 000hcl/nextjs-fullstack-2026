import { getBlogs } from "../services/blogs"
import Link from "next/link"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
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