/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'
import PageLinks from '../PageLinks.jsx'
import { MemoryRouter } from 'react-router-dom'
const router = mount(<MemoryRouter>
  <PageLinks total={60} page={2} />
</MemoryRouter>)
const links = router.find(PageLinks).at(0)

describe('PageLinks tests', () => {
  it('should render normally', () => {
    expect(links).toBeDefined()
  })
  it('should render a div for each page', () => {
    expect(links.find('div').at(0).children('span').length).toEqual(4)
  })
  it('should render the selected page div with special styles', () => {
    const selectedPage = links.find('div').at(0).childAt(1).instance()
    expect(selectedPage.selected).toEqual(true)
  })
  it('should add the propper query params to the url when a page is clicked', () => {
    const link = links.find('div').childAt(1)
    link.simulate('click')
    const instance = router.instance()
    expect(instance.history.location.search.indexOf('page=2')>=0).toEqual(true)
  })
})
