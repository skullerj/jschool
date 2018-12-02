/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Book from '../Book'
import Bookshelf from '../Bookshelf'
import { books } from './fixtures.json'

const router = mount(
  <MemoryRouter>
    <Bookshelf books={books} />
  </MemoryRouter>
)
const shelf = router.find(Bookshelf).at(0)
describe('Bookshelf tests', () => {
  it('should render normally', () => {
    expect(shelf.instance()).toBeDefined()
  })
  it('should render a Book component for each book', () => {
    expect(shelf.find(Book).length).toEqual(books.length)
  })
  describe('redirecting to book page', () => {
    let testEvent = {
      preventDefault: () => {},
      stopPropagation: () => {}
    }
    it('should redirect the user to a the book page when a book is clicked', () => {
      const book = shelf.find(Book).at(0)
      expect(book).toBeDefined()
      book.prop('onBookClick')(testEvent)
      expect(router.instance().history.location.pathname === `/books/${books[0].id}`)
    })
  })
})
