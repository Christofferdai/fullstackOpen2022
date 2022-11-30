import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input 
          type='text'
          value={password}
          name='Passowrd'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      
    </form>
  )
  const blogForm = () => (
    // <form onSubmit={handleLogin}>
    //   <div>
    //     username
    //     <input 
    //       type='text'
    //       value={username}
    //       name='Username'
    //       onChange={({ target }) => setUserName(target.value)}
    //     />
    //   </div>
    //   <div>
    //     password
    //     <input 
    //       type='text'
    //       value={password}
    //       name='Passowrd'
    //       onChange={({ target }) => setPassword(target.value)}
    //     />
    //   </div>
      
    // </form>
    <div>
      user loged in
    </div>
  )

  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      console.log('need more code')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs
        .filter((blog) => blog.user.username === user.username)
        .map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
