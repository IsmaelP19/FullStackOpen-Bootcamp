describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')

    cy.get('#loginForm')
      .should('be.visible')

    cy.get('#blogs')
      .should('not.be.visible')

  })

})

describe('Login',function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#loginBtn').click()

    cy.get('.success')
      .should('contain', 'Login successful')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
      .and('have.css', 'border-color', 'rgb(0, 128, 0)')

    cy.get('#logoutBtn')
      .should('be.visible')


  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#loginBtn').click()

    cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
      .and('have.css', 'border-color', 'rgb(255, 0, 0)')

  })

})

describe('When logged in', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: 'root',
      name: 'Root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    // now we login by the api so we can get the token

    cy.request('POST', 'http://localhost:3003/api/login', user)
      .then(response => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

  })


  it('A blog can be created', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('test title')
    cy.get('#author').type('test author')
    cy.get('#url').type('test url')
    cy.contains('save').click()

    cy.get('.success')
      .should('contain', 'a new blog test title by test author added')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
      .and('have.css', 'border-color', 'rgb(0, 128, 0)')

    cy.get('#blogs')
      .should('contain', 'test title')
      .and('contain', 'test author')
      .and('contain', 'view')

  })


})

describe('When logged in and a blog is created', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: 'root',
      name: 'Root'
    }
    const user2 = {
      username: 'anotherUser',
      password: 'anotherUser',
      name: 'Another User'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    // this one is for testing the remove option

    // now we login by the api so we can get the token

    cy.request('POST', 'http://localhost:3003/api/login', user)
      .then(response => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

    cy.contains('create new blog').click()
    cy.get('#title').type('test title')
    cy.get('#author').type('test author')
    cy.get('#url').type('test url')
    cy.contains('save').click()


  })

  it('A blog can be liked', function() {
    cy.get('#blogs')
      .should('contain', 'test title')
      .and('contain', 'test author')
      .and('contain', 'view')
      .not('contain', 'like')

    cy.contains('view').click()

    cy.get('#blogs')
      .should('contain', 'test title')
      .and('contain', 'test author')
      .and('contain', 'like')
      .and('contain', 'hide')
      .and('contain', 'remove')

    cy.get('.likes').should('contain', 'likes 0')

    cy.contains('like').click()

    cy.get('.likes').should('contain', 'likes 1')


  })

  it('A blog can be removed by the user who created it', function() {
    cy.reload()
    cy.contains('view').click()
    cy.contains('remove').click()

    cy.get('#blogs')
      .should('not.contain', 'test title')
      .and('not.contain', 'test author')
      .and('not.contain', 'like')
      .and('not.contain', 'hide')
      .and('not.contain', 'remove')

  })

  it('A blog cannot be removed by another user', function() {
    cy.contains('logout').click()

    cy.get('#username').type('anotherUser')
    cy.get('#password').type('anotherUser')
    cy.get('#loginBtn').click()

    cy.get('#blogs')
      .should('contain', 'test title')
      .and('contain', 'test author')
      .and('contain', 'view')

    cy.contains('view').click()

    cy.get('#blogs')
      .should('contain', 'test title')
      .and('contain', 'test author')
      .and('contain', 'like')
      .and('contain', 'hide')

    // the remove button should not be visible
    cy.get('.removeBtn').should('not.be.visible')

  })


})

describe.only('When logged in and multiple blogs are created', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: 'root',
      name: 'Root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    // now we login by the api so we can get the token
    cy.request('POST', 'http://localhost:3003/api/login', user)
      .then(response => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

    cy.contains('create new blog').click()
    cy.get('#title').type('First blog')
    cy.get('#author').type('test author')
    cy.get('#url').type('test url')
    cy.contains('save').click()

    cy.contains('create new blog').click()
    cy.get('#title').type('Second blog')
    cy.get('#author').type('test author 2')
    cy.get('#url').type('test url 2')
    cy.contains('save').click()

    cy.contains('create new blog').click()
    cy.get('#title').type('Third blog')
    cy.get('#author').type('test author 3')
    cy.get('#url').type('test url 3')
    cy.contains('save').click()

    cy.reload() // to flush the notifications

  })

  it('Blogs are ordered by likes', function() {
    cy.contains('Third blog').parent().parent().as('theThirdBlog')
    cy.get('@theThirdBlog').contains('view').click()
    cy.get('@theThirdBlog').contains('like').click()
    cy.get('@theThirdBlog').should('contain', 'likes 1')
    cy.get('@theThirdBlog').contains('like').click()
    cy.get('@theThirdBlog').should('contain', 'likes 2')

    cy.contains('First blog').parent().parent().as('theFirstBlog')
    cy.get('@theFirstBlog').contains('view').click()
    cy.get('@theFirstBlog').contains('like').click()
    cy.get('@theFirstBlog').should('contain', 'likes 1')

    cy.reload()

    cy.get('.blog').then(blogs => {
      expect(blogs.length).to.eq(3)
      cy.wrap(blogs[0]).should('contain', 'Third blog')
      cy.wrap(blogs[1]).should('contain', 'First blog')
      cy.wrap(blogs[2]).should('contain', 'Second blog')
    })
  })

})
