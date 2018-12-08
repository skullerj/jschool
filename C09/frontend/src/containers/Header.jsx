/* globals localStorage */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '../redux/actions/auth'
import injectSheet from 'react-jss'
import SearchInput from './SearchInput'
import Button from '../components/Button'

const styles = (theme) => ({
  header: {
    background: theme.colors.header.bg,
    heigth: '100%',
    padding: theme.spacing * 3,
    'z-index': '10',
    display: 'grid',
    grid: {
      area: 'header',
      templateColumns: 'auto auto auto',
      templateRows: '1fr 1fr',
      templateAreas: `'title title avatar' 'search search search'`
    },
    [theme.mq.l]: {
      grid: {
        templateColumns: 'auto 300px 240px',
        templateRows: '1fr',
        templateAreas: `'title search avatar'`
      }
    }
  },
  title: {
    grid: {
      area: 'title'
    },
    display: 'flex',
    flex: {
      direction: 'row'
    },
    'align-items': 'center',
    '& h1': {
      font: theme.font('regular', 24),
      margin: 0
    },
    '& .menu-button': {
      'margin-right': theme.spacing * 2,
      display: 'block',
      [theme.mq.l]: {
        display: 'none'
      }
    }
  },
  search: {
    grid: {
      area: 'search'
    }
  },
  avatar: {
    grid: {
      area: 'avatar'
    },
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-content': 'center'
  }
})

class Header extends Component {
  render () {
    const { classes, authenticated } = this.props
    return (
      <header className={classes.header}>
        <div className={classes.title}>
          <i className='fas fa-bars menu-button' />
          <h1>Bookshelf</h1>
        </div>
        <div className={classes.search}>
          {authenticated && <SearchInput />}
        </div>
        <div className={classes.avatar}>
          {authenticated && <Button onClick={() => this.props.dispatch(logOut(localStorage))}>Log out</Button>}
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.token && true
})

Header.propTypes = {
  authenticated: PropTypes.bool
}

export default connect(mapStateToProps)(injectSheet(styles)(Header))
