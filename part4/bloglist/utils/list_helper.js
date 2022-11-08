const dummy = (blogs) => (
  1
)

const totalLikes = (blogs) => (
  blogs.reduce((sum, item) => sum + item.likes, 0)
)

const favoriteBlog = (blogs) => {
  maxLikeBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes >= maxLikeBlog.likes) {
      maxLikeBlog = blog
    }
  })
  return maxLikeBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

