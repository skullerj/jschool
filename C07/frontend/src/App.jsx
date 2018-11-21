import React, { Component } from 'react'

import Header from './components/Header'
import Nav from './components/Nav'
import Bookshelf from './components/Bookshelf'
import SearchField from './components/SearchField'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerms: ''
    }
    this.updateSearchTerms = this.updateSearchTerms.bind(this);
  }
  render () {
    return (
      <div className='app'>
        <Header
          search={<SearchField onValueChange={this.updateSearchTerms} />}
        />
        {this.state.searchTerms && `Buscando: ${this.state.searchTerms}`}
        <Nav />
        <Bookshelf />
      </div>
    )
  }

  updateSearchTerms (value) {
    this.setState({searchTerms:value})
  }
}

export default App
