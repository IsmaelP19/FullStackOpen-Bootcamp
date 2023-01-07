import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm test', () => {
  let component
  let user
  let createBlog
  let newBlog

  beforeEach(() => {
    createBlog = jest.fn()

    newBlog = {
      title: 'new test title',
      author: 'new test author',
      url: 'new test url'
    }

    user = {
      username: 'test',
      name: 'test',
      token: 'test'
    }
    component = render(
      <BlogForm user={user} createBlog={createBlog} />
    )
  })

  test('form calls the event handler it received as props with the right details when a new blog is created', () => {
    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: newBlog.title }
    })
    fireEvent.change(author, {
      target: { value: newBlog.author }
    })
    fireEvent.change(url, {
      target: { value: newBlog.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('new test title')
    expect(createBlog.mock.calls[0][0].author).toBe('new test author')
    expect(createBlog.mock.calls[0][0].url).toBe('new test url')

  })


})
