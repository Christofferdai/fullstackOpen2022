import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) =>{
    event.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
         value={title}  
         onChange={handleChange}/>

      </form>
    </div>
  )
}