import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { css } from 'emotion'
import theme from '../styles/theme'

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
`

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendForm = this.sendForm.bind(this)
  }

  render () {
    const { username, password, usernameError, passwordError } = this.state
    const { loadingAuth, authError } = this.props
    return (
      <section className={style}>
        <h1>Login</h1>
        <input type='text' name='username' onChange={this.handleChange} value={username} />
        {usernameError && <span>Username is required</span>}
        <input type='password' name='password' onChange={this.handleChange} value={password} />
        {passwordError && <span>Password is required</span>}
        {authError && <span>Invalid username or password</span> }
        {loadingAuth ? <span>Loading ...</span> : <button onClick={this.sendForm}>Login</button> }
      </section>
    )
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  sendForm () {
    this.props.onLogin(this.state.username, this.state.password)
  }
}

LoginPage.propTypes = {
  loadingAuth: PropTypes.bool,
  authError: PropTypes.object,
  onLogin: PropTypes.func.isRequired
}

export default LoginPage
