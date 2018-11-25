/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import Avatar from '../Avatar.jsx'

const onClickStub = jest.fn()
const avatar = shallow(<Avatar
  onLoginClick={onClickStub} user={{ username: 'frodo' }} />)

describe('Avatar tests', () => {
  it('should render normally', () => {
    expect(avatar.instance()).toBeDefined()
  })

  it('should show and hide profile when user is authenticated or not', () => {
    avatar.setProps({ authenticated: true })
    expect(avatar.find('span.name').length).toEqual(1)
    avatar.setProps({ authenticated: false })
    expect(avatar.find('button.login-button').length).toEqual(1)
  })
  it('should dispatch onLoginClick', () => {
    avatar.setProps({ authenticated: false })
    avatar.find('button.login-button').at(0).simulate('click')
    expect(onClickStub.mock.calls.length).toEqual(1)
  })
})
