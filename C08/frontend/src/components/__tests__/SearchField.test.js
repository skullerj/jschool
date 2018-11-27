/* global describe, it, expect, jest, beforeEach */

import React from 'react'
import { shallow } from 'enzyme'
import SearchField from '../SearchField.jsx'

let handler = jest.fn()
let sf = shallow(<SearchField onValueChange={handler} />)

describe('SearchField', () => {
  it('should render normally', () => {
    expect(sf.find('input').length).toEqual(1)
    expect(sf.find('i').length).toEqual(1)
  })

  describe('User input', () => {
    beforeEach(() => {
      handler = jest.fn()
      sf = shallow(<SearchField onValueChange={handler} />)
    })

    it('should update state and dispatch onValueChange callback', () => {
      const input = sf.find('input').at(0)
      input.simulate('change', { target: { value: 'Searching books' } })
      expect(sf.state('value')).toEqual('Searching books')
      expect(handler.mock.calls.length).toEqual(1)
      // Check for the first argument that it was called with
      expect(handler.mock.calls[0][0]).toEqual('Searching books')
    })

    it('should show and hide clear button', () => {
      const input = sf.find('input').at(0)
      const button = (<i className='fas fa-times' onClick={sf.instance().clearInput} />)
      expect(sf.contains(button)).toEqual(false)
      input.simulate('change', { target: { value: 'Searching books' } })
      expect(sf.contains(button)).toEqual(true)
      input.simulate('change', { target: { value: '' } })
      expect(sf.contains(button)).toEqual(false)
    })

    it('should be cleared by clear button being clicked', () => {
      const input = sf.find('input').at(0)
      input.simulate('change', { target: { value: 'Searching books' } })
      const button = sf.find('i.fas.fa-times')
      button.simulate('click', {})
      expect(sf.state('value')).toEqual('')
    })
  })
})
