import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
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
        <button type='submit'>login</button>
      </form>
    </>
  )
  const blogPage = () => (
    <>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>

      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs
        .filter((blog) => blog.user.username === user.username)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

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
    setUserName('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      user,
    }

    setTitle('')
    setAuthor('')
    setUrl('')
    const blogObject = await blogService.create(newBlog)
    setBlogs(blogs.concat(blogObject))

    setMessage(`a new blog: ${newBlog.title} by ${newBlog.author} added`)
    setClassName('info')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  return (
    <div>
      <Notification message={message} className={className} />
      {user === null ? loginForm() : blogPage()}
    </div>
  )
}

export default App
