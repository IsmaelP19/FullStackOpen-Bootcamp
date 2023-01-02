const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const dict = {} // dict with author as key and number of blogs as value
  blogs.forEach(blog => {
    if (blog.author in dict) {
      dict[blog.author] += 1
    } else {
      dict[blog.author] = 1
    }
  })
  const values = Object.values(dict)
  const max = Math.max(...values)
  const author = Object.keys(dict).find(key => dict[key] === max)
  return { author, blogs: max }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const dict = {} // dict with author as key and number of likes as value
  blogs.forEach(blog => {
    if (blog.author in dict) {
      dict[blog.author] += blog.likes
    } else {
      dict[blog.author] = blog.likes
    }
  })
  const values = Object.values(dict)
  const max = Math.max(...values)
  const author = Object.keys(dict).find(key => dict[key] === max)
  return { author, likes: max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
