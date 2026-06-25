const blogs = [
  { id: 1, title: 'Getting titles', author: 'Maverick Beeson', url:'someurl.com', likes: 300 },
  { id: 2, title: 'On pizza pies', author: 'Chef Ian', url:'someurl.com/greatestchef', likes: 6042 },
  { id: 3, title: 'Pastries are overrated', author: 'Benedict Bishop', url:'benedict.com/pastriesareoverrated', likes: 0 }

]

let nextId = blogs.length + 1

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes:0 })
}