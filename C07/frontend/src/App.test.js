/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import App from './App.jsx'

const app = shallow(<App />)

describe('App tests', () => {

  describe('Nav drawer opening and closing', () => {
    it('should toggle state.showNav when toggleNav is called', () => {
      expect(app.state('showNav')).toEqual(false)
      app.instance().toggleNav()
      expect(app.state('showNav')).toEqual(true)
      app.instance().toggleNav()
      expect(app.state('showNav')).toEqual(false)
    })
    it('should show and hide a div.drawer-background element accordingly', () => {
      expect(app.state('showNav')).toEqual(false)
      expect(app.find('div.drawer-background').length).toEqual(0)
      app.setState({ showNav: true })
      expect(app.state('showNav')).toEqual(true)
      expect(app.find('div.drawer-background').length).toEqual(1)
    })
  })

  describe('Search terms text', () => {
    it('state.searchTerms should be updated using updateSearch terms method', () => {
      expect(app.state('searchTerms')).toEqual('')
      app.instance().updateSearchTerms('Searching books')
      expect(app.state('searchTerms')).toEqual('Searching books')
      app.instance().updateSearchTerms('')
      expect(app.state('searchTerms')).toEqual('')
    })
    it('should show and hide a div.search-terms element accordingly', () => {
      expect(app.state('searchTerms')).toEqual('')
      expect(app.find('div.search-terms').length).toEqual(0)
      app.instance().setState({ searchTerms: 'Searching books' })
      expect(app.state('searchTerms')).toEqual('Searching books')
      expect(app.find('div.search-terms').length).toEqual(1)
    })
  })
})
