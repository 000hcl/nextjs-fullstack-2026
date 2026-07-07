const blogs = [
  { id: 1, title: 'Getting titles', author: 'Maverick Beeson', url:'someurl.com', likes: 300 },
  { id: 2, title: 'On pizza pies', author: 'Chef Ian', url:'someurl.com/greatestchef', likes: 6042 },
  { id: 3, title: 'Pastries are overrated', author: 'Benedict Bishop', url:'benedict.com/pastriesareoverrated', likes: 0 },
  { id: 4, title: 'On liking blogs', author: 'John Next', url: 'john.com/onlikingblogs', likes: 0}

]

let nextId = blogs.length + 1

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes:0 })
}

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id)
}

export const likeById = (id: number) => {
  const blog = blogs.find(blog => blog.id === id)
  if (blog) {
    blog.likes = blog.likes+1
  }
}