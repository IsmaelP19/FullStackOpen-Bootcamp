import React, { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'
import PropTypes from 'prop-types'

const LoginForm = ({ user, setUser, setMessage }) => {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(['Login successful', 'success'])
      setTimeout(() => {setMessage([])}, 5000)

    } catch(exception){
      setMessage(['Wrong username or password', 'error'])
      setTimeout(() => {setMessage([])}, 5000)

    }
  }

  const form = () => (
    <form id='loginForm' onSubmit={handleLogin}>
      <div>
          username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginBtn' type="submit">login</button>
    </form>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setMessage(['Logout successful', 'success'])
      setTimeout(() => {setMessage([])}, 5000)
    } catch(exception){
      setMessage(['Logout failed', 'error'])
      setTimeout(() => {setMessage([])}, 5000)
    }
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button id='logoutBtn' type="submit">logout</button>
    </form>
  )

  const logoutContainer = () => {
    const divStyle = {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',

    }
    return(
      <div style={divStyle}>
        <i>{user.name} logged in</i> {logoutForm()}
      </div>
    )
  }


  return(
    <div>
      {user === null ? form() : logoutContainer()}
    </div>
  )

}

LoginForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default LoginForm