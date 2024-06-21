import express from 'express'
import 'express-async-errors'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = blog.save()
  response.status(201).json(result)

})

export default blogsRouter