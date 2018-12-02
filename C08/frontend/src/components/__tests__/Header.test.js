/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header.jsx'

const Element = shallow(<Header />)

describe('Header tests', () => {
  it('should render normally', () => {
    expect(Element.find('div.title').length).toEqual(1)
    expect(Element.find('div.search').length).toEqual(1)
    expect(Element.find('div.avatar').length).toEqual(1)
  })
})
