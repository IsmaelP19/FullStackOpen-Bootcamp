const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'My first blog',
    author: 'John Doe',
    url: 'http://www.example.com',
    user: '5e9f1b0b0f1b9c2b8c8b3b0c',
    likes: 0
  },
  {
    title: 'My second blog',
    author: 'Jane Doe',
    url: 'https://readerofpanemblog.wordpress.com',
    user: '5e9f1b0b0f1b9c2b8c8b3b0c',
    likes: 7
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Blog number 5', author: 'Jane Eyre', url: 'http://anotheblog.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
