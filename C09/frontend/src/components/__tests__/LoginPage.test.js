/* global describe, it, expect, jest */

import React from 'react'
import { shallow } from 'enzyme'
import LoginPage from '../LoginPage.jsx'

const handler = jest.fn()
const page = shallow(<LoginPage onLogin={handler} />)

describe('LoginPage tests', () => {
  it('should render normally', () => {
    expect(page.instance()).toBeDefined()
  })
  describe('User input', () => {
    it('should update its state when fields change', () => {
      const ui = page.find(`input[name='username']`).at(0)
      ui.simulate('change', { target: { value: 'user', name: 'username' } })
      const pi = page.find(`input[name='password']`).at(0)
      pi.simulate('change', { target: { value: 'password', name: 'password' } })
      expect(page.state('username')).toEqual('user')
      expect(page.state('password')).toEqual('password')
    })
    it('should set propper errors and prevent onLogin call when', () => {
      const button = page.find('button.submit').at(0)
      page.setState({ username: '', password: '' })
      button.simulate('click')
      expect(handler.mock.calls.length).toEqual(0)
      expect(page.state('usernameError')).toEqual(true)
      expect(page.state('passwordError')).toEqual(true)
    })
    it('should call onLogin when user input is valid', () => {
      const button = page.find('button.submit').at(0)
      page.setState({ username: 'username', password: 'password' })
      button.simulate('click')
      expect(handler.mock.calls.length).toEqual(1)
      expect(handler.mock.calls[0][0]).toEqual('username')
      expect(handler.mock.calls[0][1]).toEqual('password')
    })
  })
  it('should hide the send button when props.loadingAuth is true', () => {
    page.setProps({ loadingAuth: true })
    page.update()
    expect(page.find('button.submit').length).toEqual(0)
    page.setProps({ loadingAuth: false })
    page.update()
    expect(page.find('button.submit').length).toEqual(1)
  })
})
