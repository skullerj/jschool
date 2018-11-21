import React, { Component } from 'react'
import { css } from 'emotion'

import plutoFont from '../styles/plutoFont'

const style = css`
  h1{
    ${plutoFont('regular', 24)}
  }
`

class Header extends Component {
  render () {
    return (
      <header className={style}>
        <h1><i className='fas fa-bars' id='burgerMenu' />Bookshelf</h1>
        <div className='search-container'>
          <i className='fas fa-search' />
          <input type='text' value='' placeholder='Search...' />
        </div>
        <div className='avatar'>
          <div className='spacer' />
          <span className='name'>Jakob Treml</span>
          <i className='fas fa-caret-down' />
          <img src='images/avatar.png' alt='Jackob Treml' />
          <div className='divider' />
        </div>
      </header>
    )
  }
}

export default Header
