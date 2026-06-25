import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(b => (
          <li key={b.id}>
            {b.title} by {b.author}: {b.url} <b>{b.likes} likes</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs