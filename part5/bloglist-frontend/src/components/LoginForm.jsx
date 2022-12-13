import { useState } from 'react'

const LoginForm = ({  handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLoginFrom = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password
    })
    setUsername('')
    setPassword('')

  }
  return (
    <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLoginFrom}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
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
  
}

export default LoginForm