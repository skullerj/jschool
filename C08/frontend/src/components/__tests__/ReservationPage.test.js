/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import ReservationPage from '../ReservationPage'
import { books } from './fixtures.json'

const bookUpdate = jest.fn()
const page = shallow(<ReservationPage book={books[0]} onBookUpdate={bookUpdate} />)

describe('ReservationPage tests', () => {
  it('should render normally', () => {
    expect(page.instance()).toBeDefined()
  })
})
