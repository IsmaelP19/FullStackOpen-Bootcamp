import React, {useState} from "react"
import loginService from '../services/login'
import noteService from '../services/notes'

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
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
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
      <button type="submit">logout</button> 
    </form>
  )

  const logoutContainer = () => {
    return(
      <div>
        <i>{user.name} logged in</i>
        {logoutForm()}
      </div>
    )
  }

  return(
    <div>
      {user === null ? form() : logoutContainer()}
    </div>
  )

  


} 


export default LoginForm