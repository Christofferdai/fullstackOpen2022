import {test, beforeEach, after} from 'node:test'
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

test('get return right amount of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  assert.strictEqual((response.body.length), 6)
})

after(async () => mongoose.connection.close())