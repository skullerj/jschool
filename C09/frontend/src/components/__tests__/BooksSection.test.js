/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import BooksSection from '../BooksSection.jsx'

const section = mount(
  <MemoryRouter>
    <Route render={props => <BooksSection {...props} />} />
  </MemoryRouter>
)

describe('BooksSection tests', () => {
  it('should render normally', () => {
    expect(section.instance()).toBeDefined()
  })
})
