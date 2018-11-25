/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import App from './App.jsx'
import { books } from './components/__tests__/fixtures.json'
const app = shallow(<App />)

describe('App tests', () => {
  it('state.searchTerms should be updated using updateSearch terms method', () => {
    expect(app.state('searchTerms')).toEqual('')
    app.instance().updateSearchTerms('Searching books')
    expect(app.state('searchTerms')).toEqual('Searching books')
    app.instance().updateSearchTerms('')
    expect(app.state('searchTerms')).toEqual('')
  })
  it('filterBooks should work correctly', () => {
    const result = app.instance().filterBooks(books, 'Eloquent JavaScript')
    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Eloquent JavaScript, 3rd Edition')
  })
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
})
