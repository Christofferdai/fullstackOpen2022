import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const blogForm = () => (
    <>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )

  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      console.log('need more code')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title, author, url, user
    }
    console.log('newBlog', newBlog);
    setTitle('')
    setAuthor('')
    setUrl('')
    const blogObject = await blogService.create(newBlog)
    setBlogs(blogs.concat(blogObject))
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs
        .filter((blog) => blog.user.username === user.username)
        .map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
