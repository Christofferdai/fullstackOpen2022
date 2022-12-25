import { useState } from 'react'

const Blog = ({blog, handleLikes, handleRemove}) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const clickRemove = (blog) => {
    window.confirm(`Remove blog ${blog.title}`)
    handleRemove(blog)
  }
  return (
    <div>
      <div style={blogStyle}>
        {blog.title} {}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{display: visible ? '' : 'none'}}>
        {blog.url}
        <br />
        {blog.likes}
        <button onClick={() => handleLikes({...blog, user: blog.user.id, likes: blog.likes + 1})}>like</button>
        <br />
        {blog.author}
        <button onClick={() => clickRemove(blog)}>remove</button>
      </div>
       
      
    </div>    
  )
}

export default Blog