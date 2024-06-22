import express from 'express'
import 'express-async-errors'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  if (!('url' in request.body) || !('title' in request.body)) {
    return response.status(400).end()
  }
  const blog = new Blog(request.body)
  blog.likes =blog.likes || 0
  const result = await blog.save()
  console.log('return from post', result)
  response.status(201).json(result)

})

export default blogsRouter