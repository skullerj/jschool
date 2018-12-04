/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from '../NotFoundPage.jsx'

const page = shallow(<NotFoundPage />)

describe('NotFoundPage tests', () => {
  it('should render normally', () => {
    expect(page.instance()).toBeDefined()
  })
})
