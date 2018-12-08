import React, { Component } from 'react'
import { connect } from 'react-redux'

class BooksPage extends Component {
  render () {
    const { authenticated } = this.props
    return (
      <div>
        <h1>Welcome to our books friend</h1>
      </div>
    )
  }
}

export default BooksPage
