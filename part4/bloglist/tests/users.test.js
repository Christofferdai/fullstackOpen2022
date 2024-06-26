import { test, beforeEach, after } from 'node:test'
import assert from 'node:assert'
import mongoose from "mongoose";
import supertest from "supertest";
import app from '../app.js'
import User from '../models/user.js';


const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('invalid new user will not be added', async () => {
  const userWrongUsername = {
    username: 'to',
    password:'123456'
  }
  const userWrongPassword = {
    username: 'tomriddle',
    password:'12'
  }
  const responseWrongUsername = await api
    .post('/api/users')
    .send(userWrongUsername)
    .expect(400)
  const responseWrongPassword = await api
    .post('/api/users')
    .send(userWrongPassword)
    .expect(400)
  console.log('wrongpassword', responseWrongPassword.body)
  assert(responseWrongPassword.body.error, 'Password must be at least 3 characters')
  assert(responseWrongUsername.body.error.includes('shorter'))
})

after(async () => {
  await mongoose.connection.close()
})