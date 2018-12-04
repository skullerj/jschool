/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from 'react-router-dom'
import Nav from '../Nav.jsx'

const nav = shallow(<Nav />)

describe('Nav tests', () => {
  it('should render normally', () => {
    expect(nav.find(NavLink).length).toEqual(5)
    expect(nav.find('img').length).toEqual(1)
  })
})
