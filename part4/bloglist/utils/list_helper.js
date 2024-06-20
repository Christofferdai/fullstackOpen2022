// import countBy from 'lodash/countBy.js'
// import keys from 'lodash/keys.js'
// import maxBy from 'lodash/maxBy.js'
import _ from 'lodash'
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite =  blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog, blogs[0])
  const {title, author, likes} = favorite
  return {title, author, likes}
}

const mostBlogs = (blogs => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  return {author:topAuthor, blogs: authorCounts[topAuthor]} 
})

const mostLikes = (blogs => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  return {author:topAuthor, blogs: authorCounts[topAuthor]} 
})

export default {dummy, totalLikes, favoriteBlog, mostBlogs}