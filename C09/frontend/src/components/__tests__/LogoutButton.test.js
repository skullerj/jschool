/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import LogoutButton from '../LogoutButton.jsx'

const onClickStub = jest.fn()
const button = shallow(<LogoutButton
  onLogout={onClickStub} user={{ username: 'frodo' }} />)

describe('LogoutButton tests', () => {
  it('should render normally', () => {
    expect(button.instance()).toBeDefined()
  })

  it('should show and hide the button when user is authenticated or not', () => {
    button.setProps({ authenticated: true })
    expect(button.find('button.logout-button').length).toEqual(1)
    button.setProps({ authenticated: false })
    expect(button.find('button.logout-button').length).toEqual(0)
  })
  it('should dispatch onLogout', () => {
    button.setProps({ authenticated: true })
    button.find('button.logout-button').at(0).simulate('click')
    expect(onClickStub.mock.calls.length).toEqual(1)
  })
})
