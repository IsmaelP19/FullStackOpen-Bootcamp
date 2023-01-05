import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, user, setMessage }) => {
  const [newBlog, setNewBlog] = React.useState({
    title: '',
    author:'',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
      user: user.id,
    }

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          title: '',
          author: '',
          url: '',
        })
        setMessage([`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success'])
        setTimeout(() => { setMessage([]) }, 5000)
      })

  }

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    })
  }

  const form = () => {
    return(
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input value={newBlog.title} onChange={handleBlogChange} name="title" />
          </div>
          <div>
            author:
            <input value={newBlog.author} onChange={handleBlogChange} name="author" />
          </div>
          <div>
            url:
            <input value={newBlog.url} onChange={handleBlogChange} name="url" />
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

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default BlogForm