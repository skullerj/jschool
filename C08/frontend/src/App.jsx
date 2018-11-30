/* globals localStorage */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Nav from './components/Nav'
import AppLayout from './components/AppLayout'
import withAuth from './components/withAuth'
import BooksSection from './components/BooksSection'
import LoginPage from './components/LoginPage'
import SearchField from './components/SearchField'
import { locations } from './components/Book'
import Avatar from './components/Avatar'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNav: false
    }
    this.updateSearchTerms = this.updateSearchTerms.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
  }
  render () {
    const { showNav } = this.state
    const { authenticated, authToken, loadingAuth, authError, logout } = this.props
    // Usar un redirect para mandar al usuario a la página de login O a la página de books
    return (
      <Router>
        <AppLayout
          onNavToggle={this.toggleNav}
          showNav={showNav}
          appNav={<Nav />}
          appHeader={<Header onMenuTap={this.toggleNav.bind(this)} avatar={<Avatar authenticated={authenticated} onLogout={logout} />} />}
          appContent={
            <Switch>
              <Route exact path='/' render={() => <Redirect to={authenticated ? '/books' : '/login'} />} />
              <Route exact path='/login' render={() =>
                !authenticated ? <LoginPage onLogin={this.props.login} loadingAuth={loadingAuth} authError={authError} /> : <Redirect to='/books' />
              } />
              <Route path='/books' render={(props) =>
                authenticated
                  ? <BooksSection match={props.match} token={authToken} />
                  : <Redirect to='/login' />
              } />
            </Switch>
          } />
      </Router>
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
}

export default withAuth(App)
