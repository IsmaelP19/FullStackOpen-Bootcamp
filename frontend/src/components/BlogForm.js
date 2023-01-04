import React from "react"
import blogService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs, user, setMessage }) => {
  const [newBlog, setNewBlog] = React.useState({
    title: "",
    author:"",
    url: "",
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
    }

  blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
        title: "",
        author: "",
        url: "",
      })
      setMessage([`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success'])
    })

  }

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    })
  }

  const form = () => {
    // we have to return the form with the input fields along with the labels for each field
    return(
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input  value={newBlog.title} onChange={handleBlogChange} name="title" />
          </div>
          <div>
            author:
            <input  value={newBlog.author} onChange={handleBlogChange} name="author" />
          </div>
          <div>
            url:
            <input  value={newBlog.url} onChange={handleBlogChange} name="url" />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    )

  }

  return(
    <div>
      { user !== null && form()}
    </div>
  )

}

export default BlogForm