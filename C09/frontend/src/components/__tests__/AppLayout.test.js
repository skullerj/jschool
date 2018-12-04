/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import AppLayout from '../AppLayout.jsx'

const layout = shallow(<AppLayout />)

describe('AppLayout tests', () => {
  it('should render normally', () => {
    expect(layout.instance()).toBeDefined()
  })
})
