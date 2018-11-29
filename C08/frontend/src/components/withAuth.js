import React from 'react'
import axios from 'axios'

function checkLogin () {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return jwt
  }
  return false
}

const withAuth = WrappedComponent => {
  return class extends React.Component {
    constructor (p) {
      super(p)
      const jwt = checkLogin()
      this.state = {
        authenticated: jwt && true,
        loading: false,
        error: null,
        token: jwt
      }
    }

    render () {
      const { authenticated, loading, error, token } = this.state
      return (<WrappedComponent {...this.props}
        authenticated={authenticated}
        loadingAuth={loading}
        authError={error}
        authToken={token}
        login={this.login.bind(this)} />)
    }

    login (username, password) {
      this.setState({ loading: true })
      axios.post('/auth/login', { username: username, password: password })
        .then((response) => {
          localStorage.jwt = response.data.jwt
          this.setState({ authenticated: true, token: response.data.jwt, loading: false })
        })
        .catch((err) => {
          this.setState({ error: err, authenticated: false, loading: false })
        })
    }  
  }
}

export default withAuth
