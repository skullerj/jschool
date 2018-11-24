/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import Book from '../Book.jsx'
import { books } from './fixtures.json'

const onClickStub = jest.fn()
const onPointerEnterStub = jest.fn()
const onPointerLeaveStub = jest.fn()
const book = shallow(<Book book={books[0]}
  onBookClick={onClickStub}
  onBookPointerEnter={onPointerEnterStub}
  onBookPointerLeave={onPointerLeaveStub} />)

describe('Nav tests', () => {
  it('should render normally', () => {
    expect(book.instance()).toBeDefined()
  })
  describe('event dispatching', () => {
    it('should fire onBookClick', () => {
      const art = book.find('article')
      art.simulate('click')
      expect(onClickStub.mock.calls.length).toEqual(1)
    })
    it('should fire onBookPointerEnter', () => {
      const art = book.find('article')
      art.simulate('pointerenter')
      expect(onPointerEnterStub.mock.calls.length).toEqual(1)
    })
    it('should fire onBookPointerLeave', () => {
      const art = book.find('article')
      art.simulate('pointerleave')
      expect(onPointerLeaveStub.mock.calls.length).toEqual(1)
    })
  })
})
