/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import Nav from '../Nav.jsx'

const handler = jest.fn()
const nav = shallow(<Nav onLocationChange={handler} />)

describe('Nav tests', () => {
  it('should render normally', () => {
    expect(nav.find('nav').length).toEqual(1)
    expect(nav.find('a').length).toEqual(5)
    expect(nav.find('div.logo').length).toEqual(1)
    expect(nav.find('img').length).toEqual(1)
  })

  it('should select location, update its state and dispatch its onLocationChange callback', () => {
    const links = nav.find('a')
    for (let i = 0; i < links.length; i++) {
      links.at(i).simulate('click')
      expect(handler.mock.calls.length).toEqual(i + 1)
      expect(handler.mock.calls[i][0]).toEqual(nav.state('location'))
    }
  })
})
