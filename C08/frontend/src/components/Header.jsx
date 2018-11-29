import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import plutoFont from '../styles/plutoFont'
import mq from '../styles/mediaQueries'
import theme from '../styles/theme'

const grid = css`
  display: grid;
  padding: 23px;
  z-index: 10;
  ${mq({
    'grid-template-areas': [
      `'title title avatar' 'search search search'`,
      `'title title avatar' 'search search search'`,
      `'title title avatar' 'search search search'`,
      `'title search avatar'`
    ],
    'grid-template-columns': [
      'auto auto auto',
      'auto auto auto',
      'auto auto auto',
      'auto 300px 240px'
    ],
    'grid-template-rows': ['1fr 1fr', '1fr 1fr', '1fr']
  })}

  .title { 
    align-self: center;
    display: flex;
    grid-area: title;

    h1{
      align-self: center;
      display: flex;
      ${plutoFont('regular', 24)};
    }

    .fa-bars {
      margin-right: 16px;
      ${mq({ 'display': ['block', 'block', 'none'] })}
    }
  }
  .search {
    grid-area: search;
  }

  .avatar {
    grid-area: avatar;
  }
`
const Header = (props) => {
  const { search, avatar, onMenuTap } = props
  return (
    <div className={grid}>
      <div className='title'>
        <i className='fas fa-bars' onClick={onMenuTap} />
        <h1>Bookshelf</h1>
      </div>
      <div className='search'>
        {search}
      </div>
      <div className='avatar'>
        {avatar}
      </div>
    </div>
  )
}

Header.propTypes = {
  search: PropTypes.element,
  avatar: PropTypes.element,
  onMenuTap: PropTypes.func
}

export default Header
