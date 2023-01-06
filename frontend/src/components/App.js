import React, { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import LoginForm from './LoginForm'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([])

  const hook = () => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }

  useEffect(hook, [])

  const loginHook = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  useEffect(loginHook, [])

  const showBlogs = () => {
    return (
      blogs.sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)
    )
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage([`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success'])
        setTimeout(() => { setMessage([]) }, 5000)
      })
      .catch(error => {
        setMessage([error.response.data.error, 'error'])
        setTimeout(() => { setMessage([]) }, 5000)
      })
  }

  return (
    <div>
      <Notification message={message[0]} type={message[1]} />
      <h2>Blogs</h2>

      <LoginForm user={user} setUser={setUser} setMessage={setMessage} />

      { user !== null &&
        <Togglable buttonShow="create new blog" buttonHide="cancel" ref={blogFormRef}>
          <BlogForm user={user} createBlog={addBlog} />
        </Togglable>
      }

      { user !== null && showBlogs() }

    </div>
  )
}


/*
// TODO: Phonebook
const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState([])


  const [filter, setFilter] = useState('')


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message[0]} type={message[1]} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3> Add a new </h3>

      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}


// TODO: Countries
const App = () => {

  const [filter, setFilter] = useState('')



  return(
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries filter={filter} setFilter={setFilter}/>
    </div>

  )



}


// Notes
const App = () => {

  const [notes, setNotes] = useState([])
  const [message, setMessage] = useState([])
  const [user, setUser] = useState(null)



  const hook = () => {
    noteService.getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
  }

  const loginHook = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }

  useEffect(hook, [])
  useEffect(loginHook, [])

  return(
    <div>
      <h1>Notes</h1>

      <Notification message={message[0]} type={message[1]} />
      <LoginForm user={user} setUser={setUser} setMessage={setMessage} />

      <Notes notes={notes} setNotes={setNotes} />
      <NoteForm notes={notes} setNotes={setNotes} user={user} setMessage={setMessage}/>
      <Footer />
    </div>
  )
}
*/

export default App