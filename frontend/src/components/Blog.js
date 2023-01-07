import Togglable from './Togglable'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'
import Like from './Like'

const Blog = ({ blog, blogs, setBlogs }) => {
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
    <div className='blog' style={blogStyle}>
      <div>
        <span className='outTogglable'>{blog.title}, by {blog.author}</span>
        <Togglable buttonShow="view" buttonHide="hide">
          <div>
            <div className='url' >{blog.url}</div>
            <Like blog={blog} />
            <div style={showWhenMine}><button onClick={handleRemove} className='removeBtn'>remove</button></div>
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