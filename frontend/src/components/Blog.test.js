import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog component tests', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'www.test.com',
    likes: 0,
    user: {
      username: 'testuser',
      name: 'Test User',
      id: '5f9f9c5b9c9b9c0b3c8b0b5c'
    }
  }

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(blog.user))

  const mockSetBlogs = jest.fn()
  const mockBlogs = [blog]

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} blogs={mockBlogs} setBlogs={mockSetBlogs} />
    )
  })


  test('renders title and author', () => {
    const div = component.container.querySelector('.outTogglable')
    expect(div).toHaveTextContent('Test title, by Test author')
    expect(div).not.toHaveTextContent('www.test.com')
    expect(div).not.toHaveTextContent('likes 0')
    const showBtn = component.container.querySelector('.showBtn')
    expect(showBtn).toHaveTextContent('view')
  })

  test('renders url and likes when view button is clicked', () => {

    let button = component.container.querySelector('.showBtn')
    expect(button).toHaveTextContent('view')

    fireEvent.click(button)

    const urlDiv = component.container.querySelector('.url')
    expect(urlDiv).toHaveTextContent('www.test.com')
    const likesDiv = component.container.querySelector('.likes')
    expect(likesDiv).toHaveTextContent('likes 0')

  })

  test('at start url and likes are not shown', () => {
    const button = component.getByText('view')

    const div = component.container.querySelector('.togglableContent') // url and likes inside togglableContent
    expect(div).toHaveStyle('display: none')
    fireEvent.click(button)
    expect(div).not.toHaveStyle('display: none')
  })

})