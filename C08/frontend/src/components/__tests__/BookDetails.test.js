/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import BookDetails from '../BookDetails.jsx'
import { books } from './fixtures.json'

const details = shallow(<BookDetails book={books[0]} />)

describe('BookDetails tests', () => {
  it('should render normally', () => {
    expect(details.instance()).toBeDefined()
  })
})
