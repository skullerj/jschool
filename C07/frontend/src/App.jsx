import React, { Component } from 'react'
import { css } from 'emotion'
import mq from './styles/mediaQueries'
import theme from './styles/theme'
import Header from './components/Header'
import Nav from './components/Nav'
import Bookshelf from './components/Bookshelf'
import SearchField from './components/SearchField'
import axios from 'axios'

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
    width: 240px;
    z-index: 100;
  `
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerms: '',
      showNav: false,
      books: []
    }
    this.updateSearchTerms = this.updateSearchTerms.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
  }
  render () {
    const { showNav, books } = this.state
    return (
      <div className={appStyle}>
        <div className='header'>
          <Header
            search={<SearchField onValueChange={this.updateSearchTerms} />}
            onMenuTap={this.toggleNav}
          />
        </div>
        <Nav style={navStyles(showNav)} />
        {showNav && <div className='drawer-background' onClick={this.toggleNav} />}     
        <section className='bookshelf'>      
          {this.state.searchTerms && <div className='search-terms'>{`Buscando: ${this.state.searchTerms}`}</div>}
          <Bookshelf books={books} />
        </section>
      </div>
    )
  }

  updateSearchTerms (value) {
    this.setState({ searchTerms: value })
  }

  toggleNav () {
    this.setState((state) => {
      return { showNav: !state.showNav }
    })
  }
  componentDidMount () {
    const jwt = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVmMzkxOWViNmE3YTc0NzZlZjY3NjciLCJ1c2VybmFtZSI6ImJpbGwiLCJpYXQiOjE1NDI5MjIzODJ9.alpB13JGFwDpyq49jiSdZ8WuvIj8tkX42ilr35Mohv0'
    let requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': jwt }
    })
    requester.get('/books')
      .then((res) => {
        console.log(res)
        this.setState({ books: res.data.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default App
