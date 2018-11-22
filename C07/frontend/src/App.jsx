import React, { Component } from 'react'
import { css } from 'emotion'
import mq from './styles/mediaQueries'
import Header from './components/Header'
import Nav from './components/Nav'
import Bookshelf from './components/Bookshelf'
import SearchField from './components/SearchField'

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
  }
  .nav {
    grid-area: nav;
  }
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerms: ''
    }
    this.updateSearchTerms = this.updateSearchTerms.bind(this)
  }
  render () {
    return (
      <div className={appStyle}>
        <div className='header'>
          <Header
            search={<SearchField onValueChange={this.updateSearchTerms} />}
          />
        </div>
        <div className='nav'>
          <Nav className='nav' />
        </div>
        <div className='bookshelf'>
          {this.state.searchTerms && `Buscando: ${this.state.searchTerms}`}
          <Bookshelf />
        </div>
      </div>
    )
  }

  updateSearchTerms (value) {
    this.setState({ searchTerms: value })
  }
}

export default App
