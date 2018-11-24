/* globals localStorage */
import React, { Component } from 'react'
import { appStyle, headerStyle, navStyle, booksStyle } from './styles/appStyles'
import Header from './components/Header'
import Nav from './components/Nav'
import Bookshelf from './components/Bookshelf'
import BooksSection from './components/BooksSection'
import SearchField from './components/SearchField'
import Avatar from './components/Avatar'
import axios from 'axios'

const locations = new Map([
  ['everywhere', 'Everywhere'],
  ['medellin', 'Medellin'],
  ['quito', 'Quito'],
  ['cartagena', 'Cartagena'],
  ['digital', 'Digital']
])

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerms: '',
      showNav: false,
      books: [],
      loading: false,
      location: 'everywhere',
      authenticated: false,
      lastError: null,
      user: {
        username: null
      }
    }
    this.updateSearchTerms = this.updateSearchTerms.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.loginAndFetchBooks = this.loginAndFetchBooks.bind(this)
  }
  render () {
    const { showNav, loading, searchTerms, location, lastError, authenticated, user } = this.state
    const books = this.filterBooks(this.state.books, searchTerms)
    return (
      <main className={appStyle}>
        <Header
          search={<SearchField onValueChange={this.updateSearchTerms} />}
          avatar={<Avatar authenticated={authenticated} user={user} onLoginClick={this.loginAndFetchBooks} />}
          onMenuTap={this.toggleNav}
          styles={headerStyle}
        />
        <Nav style={navStyle(showNav)} onLocationChange={this.updateLocation} />
        {showNav && <div className='drawer-background' onClick={this.toggleNav} />}
        <BooksSection styles={booksStyle} loading={loading} error={lastError} authenticated={authenticated} onLoginClick={this.loginAndFetchBooks}>
          <div className='search-terms'>{searchTerms ? `Searching: ${searchTerms} in ${locations.get(location)}` : `Location: ${locations.get(location)}` }</div>
          <Bookshelf books={books} />
        </BooksSection>
      </main>
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

  checkLogin () {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.requester = axios.create({
        baseURL: '/',
        headers: { 'Authorization': `Bearer ${jwt}` }
      })
      this.setState({ authenticated: true, user: { username: 'frodo' } })
      return true
    }
    return false
  }

  login () {
    return new Promise((resolve, reject) => {
      axios.post('/auth/login', { username: 'frodo', password: 'givemethatring' })
        .then((response) => {
          localStorage.jwt = response.data.jwt
          this.requester = axios.create({
            baseURL: '/',
            headers: { 'Authorization': `Bearer ${response.data.jwt}` }
          })
          this.setState({ authenticated: true, user: { username: 'frodo' } })
          resolve()
        })
        .catch((err) => {
          this.setState({ lastError: err, authenticated: false })
          reject(err)
        })
    })
  }

  loginAndFetchBooks () {
    this.login()
      .then(() => {
        this.fetchBooks(this.state.location)
      })
  }

  componentDidMount () {
    if (this.checkLogin()) {
      this.fetchBooks(this.state.location)
    }
  }
}

export default App
