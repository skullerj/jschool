/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import ReservationForm from '../ReservationForm'
import { books } from './fixtures.json'

const bookLend = jest.fn()
const page = shallow(<ReservationForm book={books[0]} onBookLend={bookLend} />)

describe('ReservationForm tests', () => {
  it('should render normally', () => {
    expect(page.instance()).toBeDefined()
  })
})
