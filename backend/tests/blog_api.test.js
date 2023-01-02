const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

let headers = {}

beforeAll(async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'testpassword'
  }

  await api
    .post('/api/users')
    .send(newUser)

  const loginResponse = await api
    .post('/api/login')
    .send(newUser)

  headers = {
    Authorization: `bearer ${loginResponse.body.token}`
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Getting information of existing blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is an example', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe(helper.initialBlogs[0].title)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'My second blog'
    )
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe('Adding a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'My third blog',
      author: 'John Doe',
      url: 'newblog.com'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'My third blog'
    )
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'newblog.com'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Another blog',
      author: 'John Doe'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without likes is added with 0 likes by default', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Jane Doe',
      url: 'newblog.com'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'New blog')
    expect(addedBlog.likes).toBe(0)
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without token is not added', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Jane Doe',
      url: 'newblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain('New blog')
  })
})

describe('Viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445' // one less character than valid id

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('Deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Another blog',
      author: 'John Doe',
      url: 'newblog.com'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)

    const blogsAtMiddle = await helper.blogsInDb()
    expect(blogsAtMiddle).toHaveLength(blogsAtStart.length + 1)
    const middleTitles = blogsAtMiddle.map(b => b.title)
    expect(middleTitles).toContain(newBlog.title)

    const blogToDelete = blogsAtMiddle.find(blog => blog.title === 'Another blog')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .set(headers)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445' // one less character than valid id

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set(headers)
      .expect(400)
  })

  test('fails with statuscode 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })

  test('fails with statuscode 401 if the user is not the creator of the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log('blogToDelete', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(401)
  })
})

describe('Updating a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Another blog',
      author: 'John Doe',
      url: 'newblog.com'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)

    const blogsAtMiddle = await helper.blogsInDb()
    expect(blogsAtMiddle).toHaveLength(blogsAtStart.length + 1)
    const middleTitles = blogsAtMiddle.map(b => b.title)
    expect(middleTitles).toContain(newBlog.title)

    const blogToUpdate = blogsAtMiddle.find(blog => blog.title === 'Another blog')

    const updatedBlog = {
      ...blogToUpdate,
      likes: 100
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set(headers)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtMiddle.length)
    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlogInDb.likes).toBe(100)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .set(headers)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
