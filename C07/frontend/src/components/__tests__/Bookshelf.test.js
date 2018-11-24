/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import Bookshelf from '../Bookshelf.jsx'
import Book from '../Book'
import BookDetails from '../BookDetails'
import { books } from './fixtures.json'

const shelf = shallow(<Bookshelf books={books} />)

describe('Bookshelf tests', () => {
  it('should render normally', () => {
    expect(shelf.instance()).toBeDefined()
  })
  it('should render a Book component for each book', () => {
    shelf.update()
    expect(shelf.find(Book).length).toEqual(books.length)
  })
  describe('showing book details', () => {
    let testEvent = {
      preventDefault: () => {},
      stopPropagation: () => {}
    }
    it('should set state.selectedBook when a Book is clicked', () => {
      const book = shelf.find(Book).at(0)
      expect(book).toBeDefined()
      book.prop('onBookClick')(testEvent)
      expect(shelf.state('selectedBook')).toEqual(books[0].id)
    })
    it('should set state.selectedBook when a book is hovered', () => {
      const book = shelf.find(Book).at(0)
      expect(book).toBeDefined()
      book.prop('onBookPointerEnter')(testEvent)
      expect(shelf.state('selectedBook')).toEqual(books[0].id)
    })
    it('should reset state.selectedBook when a book is hovered', () => {
      const book = shelf.find(Book).at(0)
      expect(book).toBeDefined()
      book.prop('onBookPointerLeave')(testEvent)
      expect(shelf.state('selectedBook')).toEqual(null)
    })
    it('should render a BookDetails component when selectedBook is defined', () => {
      shelf.setState({ selectedBook: books[0].id })
      shelf.update()
      expect(shelf.find(BookDetails).length).toEqual(1)
    })
  })
})
