/* globals localStorage */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { checkLogin } from './redux/actions/auth'

import ProtectedRoute from './components/ProtectedRoute'
import Nav from './components/Nav'
import Header from './containers/Header'
import LoginPage from './containers/LoginPage'
import BooksPage from './containers/BooksPage'

const styles = theme => ({
  main: {
    display: 'grid',
    height: '100vh',
    grid: {
      templateColumns: '1fr',
      templateRows: '160px 1fr',
      templateAreas: `'header' 'content'`
    },
    [theme.mq.m]: {
      grid: {
        templateColumns: '240px 1fr',
        templateAreas: `'drawer header' 'drawer content'`
      }
    },
    [theme.mq.l]: {
      grid: {
        templateRows: '80px 1fr'
      }
    }
  }
})

class App extends Component {
  render () {
    const { classes, authenticated } = this.props
    return (
      <div className={classes.main}>
        <Header />
        <Nav />
        <section className={classes.content}>
          <Switch>
            <Route path='/' exact render={() => <Redirect to='/books' />} />
            <Route path='/login' exact component={LoginPage} />
            <ProtectedRoute path='/books' component={BooksPage} authenticated={authenticated} />
          </Switch>
        </section>
      </div>
    )
  }
  componentDidMount () {
    this.props.dispatch(checkLogin(localStorage))
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.token && true
})

App.propTypes = {
  authenticated: PropTypes.bool
}

// Export with router to ensure App is re rendered when location changes
export default withRouter(connect(mapStateToProps)(injectSheet(styles)(App)))
