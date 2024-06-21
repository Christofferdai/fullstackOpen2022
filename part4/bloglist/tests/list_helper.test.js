import { test,describe } from 'node:test'
import assert from "node:assert"
import listHelper from '../utils/list_helper.js'
import helper from './test_helper.js'

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('when list has one blog, favorite blog', () => {
    const { title, author, likes } = listWithOneBlog[0]
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog),{ title, author, likes } )
  }),
  test('when list has many blogs, favorite blog', () => {
    const { title, author, likes } = helper.blogs[2]
    assert.deepStrictEqual(listHelper.favoriteBlog(helper.blogs),{ title, author, likes } )
  })
})

describe('most blogs', () => {
  test('when list has one blog, most blogs author', () => {

    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog),{ author:listWithOneBlog[0].author,blogs:1 } )
  }),
  test('when list has many blogs, most blogs author', () => {
    const mostblogs = { author:"Robert C. Martin", blogs:3 }
    assert.deepStrictEqual(listHelper.mostBlogs(helper.blogs),mostblogs )
  })
})