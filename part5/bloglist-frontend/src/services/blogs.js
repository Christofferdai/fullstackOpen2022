import axios from 'axios'
import Blog from '../components/Blog'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

const update = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}
const remove =async (blog) => {
  console.log(blog)
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    data: {
      user: blog.user
    }
  })
  return response.data
}

export default { getAll, setToken, create, update, remove,}