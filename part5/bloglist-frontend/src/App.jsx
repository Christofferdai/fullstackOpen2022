import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [className, setClassName] = useState('')
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleCreate} />
    </Togglable>
  )

  const handleLogin = async (userObject) => {
    
    try {
      const user = await loginService.login(userObject)

      blogService.setToken(user.token)
      setUser(user)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      setClassName('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
 
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.user = user

    const retrunedblog = await blogService.create(blogObject)
    setBlogs(blogs.concat(retrunedblog))

    setMessage(`a new blog: ${blogObject.title} by ${blogObject.author} added`)
    setClassName('info')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} className={className} />
      {user === null ? 
        <Togglable buttonLabel='log in'>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable> :
      <div>
      <div>
        <p>
          {user.username} logged in
          <button type='button' onClick={handleLogout}>log out</button>
        </p>
        {blogForm()}
      </div>
      <>
      {blogs
        .filter((blog) => blog.user.username === user.username)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))
      }    
      </>
      </div>
      }
    </div>
)
}

export default App
