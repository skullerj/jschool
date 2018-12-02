/* global describe, it, expect, jest, beforeEach */

import React from 'react'
import { mount } from 'enzyme'
import SearchField from '../SearchField.jsx'
import { MemoryRouter } from 'react-router-dom'

let sf = mount(
  <MemoryRouter>
    <SearchField />
  </MemoryRouter>
)

describe('SearchField', () => {
  it('should render normally', () => {
    expect(sf.find('input').length).toEqual(1)
    expect(sf.find('i').length).toEqual(1)
  })
  it('should show and hide clear button', () => {
    const input = sf.find('input').at(0)
    expect(sf.find('i.fas.fa-times').length).toEqual(0)
    input.simulate('change', { target: { value: 'Searching books' } })
    expect(sf.find('i.fas.fa-times').length).toEqual(1)
    input.simulate('change', { target: { value: '' } })
    expect(sf.find('i.fas.fa-times').length).toEqual(0)
  })
  it('should be cleared by clear button being clicked', () => {
    const input = sf.find('input').at(0)
    input.simulate('change', { target: { value: 'Searching books' } })
    const button = sf.find('i.fas.fa-times')
    button.simulate('click', {})
    expect(input.instance().value).toEqual('')
  })
  it('should update the url when the users hits enter', () => {
    const input = sf.find('input').at(0)
    input.simulate('change', { target: { value: 'harrypotter' } })
    input.simulate('keypress', { key: 'Enter' })
    expect(sf.instance().history.location.search.indexOf('title=harrypotter') >= 0).toEqual(true)
  })
})
