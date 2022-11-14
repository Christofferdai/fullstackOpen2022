const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initalBlogs, blogsInDb } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initalBlogs.map((note) => new Blog(note))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})
test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogs = await blogsInDb()
  expect(blogs).toHaveLength(initalBlogs.length)
})

test('the unique identifier property is named id', async () => {
  const blogs = await blogsInDb()
  blogs.forEach((blog) => expect(blog.id).toBeDefined())
})

afterAll(() => {
  mongoose.connection.close()
})
