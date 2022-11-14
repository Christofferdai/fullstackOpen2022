const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')
const { listWithOneBlog, initalBlogs } = require('./test_helper')

test('dummy returns one', () => {
  expect(dummy([])).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    expect(totalLikes(initalBlogs)).toBe(36)
  })
})

describe('favorite Blog', () => {
  test('of empty list is undefined', () => {
    expect(favoriteBlog([])).toEqual(undefined)
  })
  test('when list has only one blog, return the blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })
  test('of a bigger list returns right blog', () => {
    expect(favoriteBlog(initalBlogs)).toEqual(initalBlogs[2])
  })
})
