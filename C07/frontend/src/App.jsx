import React, { Component } from 'react'
import { css } from 'emotion'
import mq from './styles/mediaQueries'
import theme from './styles/theme'
import plutoFont from './styles/plutoFont'
import Header from './components/Header'
import Nav from './components/Nav'
import Bookshelf from './components/Bookshelf'
import SearchField from './components/SearchField'
import axios from 'axios'

const locations = new Map([
  ['everywhere', 'Everywhere'],
  ['medellin', 'Medellin'],
  ['quito', 'Quito'],
  ['cartagena', 'Cartagena'],
  ['digital', 'Digital']
])

const appStyle = css`
  display: grid;
  ${mq({
    'grid-template-columns': [
      '1fr',
      '1fr',
      '240px 1fr',
      '240px 1fr'
    ],
    'grid-tempalte-rows': [
      '160px 1fr',
      '160px 1fr',
      '160px 1fr',
      '80px 1fr'
    ],
    'grid-template-areas': [
      `'header' 'bookshelf'`,
      `'header' 'bookshelf'`,
      `'nav header' 'nav bookshelf'`,
      `'nav header' 'nav bookshelf'`
    ]
  })}
  .header {
    grid-area: header;
  }
  .bookshelf {
    grid-area: bookshelf;
    max-height: calc(100vh - 80px);
    overflow: auto;
  }
  .drawer-background {
    background: ${theme.hoverBackgroundColor};
    height: 100%;
    position: fixed;
    width: 100%;
    z-index: 2;
  }
  .search-terms {
    padding: 20px 0px 10px 44px;
    ${plutoFont('cond_light', 20)}
    color: ${theme.heTextColor}
  }
  .loading,
  .error {
    padding: 20px 0px 10px 44px;
    ${plutoFont('cond_light', 30)}
    color: ${theme.heTextColor};
    min-height: calc(100vh - 130px);
  }
`
const navStyles = showNav => {
  const displayClass = showNav ? 'flex' : 'none'
  return css`
    grid-area: nav;
    ${mq({
    'display': [displayClass, displayClass, 'flex', 'flex'],
    'position': ['fixed', 'fixed', 'relative', 'relative']
  })};
    height: 100%;
    min-height: 100vh;
    width: 240px;
    z-index: 100;
  `
}

const BooksSection = (loading, books, error) => {
  if (loading) {
    return (<h1 className='loading'>Loading...</h1>)
  } else {
    if (error) {
      return (<h1 className='error'>There was an error fetching the books</h1>)
    } else {
      return (<Bookshelf books={books} />)
    }
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerms: '',
      showNav: false,
      books: [],
      loading: false,
      location: 'everywhere',
      lastError: null
    }
    this.jwt = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVmMzkxOWViNmE3YTc0NzZZjY3NjciLCJ1c2VybmFtZSI6ImJpbGwiLCJpYXQiOjE1NDI5MjIzODJ9.alpB13JGFwDpyq49jiSdZ8WuvIj8tkX42ilr35Mohv0'
    this.requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': this.jwt }
    })
    this.updateSearchTerms = this.updateSearchTerms.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
  }
  render () {
    const { showNav, loading, searchTerms, location, lastError } = this.state
    const books = this.filterBooks(this.state.books, searchTerms)
    return (
      <div className={appStyle}>
        <div className='header'>
          <Header
            search={<SearchField onValueChange={this.updateSearchTerms} />}
            onMenuTap={this.toggleNav}
          />
        </div>
        <Nav style={navStyles(showNav)} onLocationChange={this.updateLocation} />
        {showNav && <div className='drawer-background' onClick={this.toggleNav} />}
        <section className='bookshelf'>
          <div className='search-terms'>{searchTerms ? `Searching: ${searchTerms} in ${locations.get(location)}` : `Location: ${locations.get(location)}` }</div>
          {BooksSection(loading, books, lastError)}
        </section>
      </div>
    )
  }

  updateLocation (location) {
    this.setState({ location: location })
    this.fetchBooks(location)
  }

  updateSearchTerms (value) {
    this.setState({ searchTerms: value })
  }

  filterBooks (books, searchTerms) {
    if (!searchTerms) return books
    return books.filter((b) => {
      return b.title.toLowerCase().indexOf(searchTerms.toLowerCase()) >= 0 || b.description.toLowerCase().indexOf(searchTerms.toLowerCase()) >= 0
    })
  }

  toggleNav () {
    this.setState((state) => {
      return { showNav: !state.showNav }
    })
  }

  fetchBooks (location) {
    const url = location === 'everywhere' ? '/books' : `/books?location=${location}`
    this.setState({ loading: true })
    this.requester.get(url)
      .then((res) => {
        this.setState({ loading: false })
        this.setState({ books: res.data.data })
      })
      .catch((err) => {
        this.setState({ loading: false, lastError: err })
      })
  }

  componentDidMount () {
    this.fetchBooks(this.state.location)
  }
}

export default App
