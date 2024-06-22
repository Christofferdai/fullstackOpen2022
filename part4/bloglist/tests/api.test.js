import { test, beforeEach, after } from 'node:test'
import assert from 'node:assert'
import mongoose from "mongoose";
import supertest from "supertest";
import app from '../app.js'
import Blog from '../models/blog.js';
import helper from './test_helper.js'


const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})
  const blogObjects = helper.blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('return right amount of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, 6)
  assert.strictEqual(response.body[-1], helper.oneBlog)
})

test('_id changed to id', async () => {
  const response = await api
    .get('/api/blogs')
  response.body.forEach(blog => {
      assert.strictEqual(typeof blog.id, 'string');
      assert.strictEqual(typeof blog._id, 'undefined')
    })
  });

test('blog can be add', async () => {
  await api.post('/api/blogs').send(helper.oneBlog)
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, helper.blogs.length + 1)
})

test('blog likes defaulting to 0 if not provided', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
  assert.strictEqual(response.body.likes, 0);
})

test('blog without url or title will not be added', async () => {
  const newBlogWithoutTitle ={
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }
  const newBlogWithoutUrl = {
    title: "React patterns",
    author: "Michael Chan",
  }
  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)

})



after(async () => mongoose.connection.close())