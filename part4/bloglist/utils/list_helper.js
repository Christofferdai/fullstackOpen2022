import _ from 'lodash'


const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite =  blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog, blogs[0])
  const { title, author, likes } = favorite
  return { title, author, likes }
}

const mostBlogs = (blogs => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  return { author:topAuthor, blogs: authorCounts[topAuthor] }
})

const mostLikes = (blogs => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  return { author:topAuthor, blogs: authorCounts[topAuthor] }
})

export default {totalLikes, favoriteBlog, mostBlogs }