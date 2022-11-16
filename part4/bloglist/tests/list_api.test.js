const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initalBlogs, blogsInDb } = require('./test_helper')

const api = supertest(app)
const newBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
}

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

test('a blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  const titles = blogsAtEnd.map((n) => n.title)

  expect(blogsAtEnd).toHaveLength(initalBlogs.length + 1)
  expect(titles).toContain(
    'Go To Statement Considered Harmful',
  )
})

test('the defalut likes is 0 if missing', async () => {
  const { likes, ...blogWithoutLikes } = newBlog
  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)

  const blogsAtEnd = await blogsInDb()
  const likesList = blogsAtEnd.map((n) => n.likes)
  expect(likesList[likesList.length - 1]).toBe(0)
})

test('response status 400 if request missing the title or url', async () => {
  const { title, ...blogWithoutTitle } = newBlog
  const { url, ...blogWithoutUrl } = newBlog
  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initalBlogs.length)
})

test('deletion of a blog', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await blogsInDb()
  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(blogsAtEnd).toHaveLength(initalBlogs.length - 1)
  expect(titles).not.toContain(blogToDelete.title)
})

test('update of a blog', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
  const blogsAtEnd = await blogsInDb()
  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
