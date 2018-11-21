/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import Bookshelf from '../Bookshelf.jsx'

const Element = shallow(<Bookshelf />)

describe('Bookshelf tests', () => {
  it('should render normally', () => {
    expect(Element.find('section').length).toEqual(1)
  })
})
