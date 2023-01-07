import { useState } from 'react'
import blogServices from '../services/blogs'

const Like = ({ blog, handleLike }) => {
  const [likes, setLikes] = useState(blog.likes)

  if(handleLike) { // if handleLike is passed as a prop, use it (maily for testing)
    return(
      <div className='likes'> likes {likes} <button onClick={handleLike} className='likeBtn'>like</button></div>
    )
  }
  handleLike = () => {
    const blogObject = { ...blog, likes: likes + 1
    }

    blogServices.update(blog.id, blogObject)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })

  }

  return(
    <div className='likes'> likes {likes} <button onClick={handleLike} className='likeBtn'>like</button></div>
  )

}

export default Like