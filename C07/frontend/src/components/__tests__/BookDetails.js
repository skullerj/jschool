/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import BookDetails from '../BookDetails.jsx'
import { books } from './fixtures.json'

const details = shallow(<BookDetails book={books[0]} />)

describe('Nav tests', () => {
  it('should render normally', () => {
    expect(details.instance()).toBeDefined()
  })
})
