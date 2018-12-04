/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import BookStars from '../BookStars.jsx'

const stars = shallow(<BookStars score={4} />)

describe('BookStars tests', () => {
  it('should render normally', () => {
    expect(stars.instance()).toBeDefined()
  })
  it('should render 4 filled stars and one empty', () => {
    expect(stars.find('i.fas.fa-star').length).toEqual(4)
    expect(stars.find('i.far.fa-star').length).toEqual(1)
  })
})
