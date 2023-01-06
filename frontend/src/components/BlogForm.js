import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ user, createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author:'',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
      user: user,
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
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
            <input id='title' value={newBlog.title} onChange={handleBlogChange} name="title" />
          </div>
          <div>
            author:
            <input id='author' value={newBlog.author} onChange={handleBlogChange} name="author" />
          </div>
          <div>
            url:
            <input id='url' value={newBlog.url} onChange={handleBlogChange} name="url" />
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
  user: PropTypes.object.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm