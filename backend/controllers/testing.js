const testingRrouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRrouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRrouter
