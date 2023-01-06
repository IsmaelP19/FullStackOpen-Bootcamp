import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Like from './Like'

describe('Like component tests', () => {
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

  test('like button is clicked twice', () => {
    const mockHandleLike = jest.fn()

    const component = render(
      <Like blog={blog} handleLike={mockHandleLike} />
    )

    const likeBtn = component.container.querySelector('.likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})