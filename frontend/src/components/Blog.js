import { useState } from 'react'
import Togglable from './Togglable'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs }) => {

  const [likes, setLikes] = useState(blog.likes)

  const handleLike = () => {
    const blogObject = { ...blog, likes: likes + 1
    }

    blogServices.update(blog.id, blogObject)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })

  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogServices.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isMine = () => {
    return blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username
  }

  const showWhenMine = { display: isMine() ? '' : 'none' }



  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, by {blog.author}
        <Togglable buttonShow="view" buttonHide="hide">
          <div>
            <div>{blog.url}</div>
            <div> likes {likes} <button onClick={handleLike}>like</button></div>
            {/* { isMine() && <div>{blog.user.name}</div> } */}
            <div style={showWhenMine}><button onClick={handleRemove}>remove</button></div>
          </div>
        </Togglable>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}


export default Blog