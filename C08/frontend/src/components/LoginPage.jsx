import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18vh;
  min-height: calc(100vh - 80px);
  h1 {
    ${plutoFont('cond_regular', 18)}
    color: ${theme.meTextColor};
    margin-bottom: 20px;
  }
  .error {
    ${plutoFont('cond_light', 12)}
    margin-top: 10px;
    color: ${theme.errorColor}
  }
  .submit {
    background-color: ${theme.accentColor};
    color: #fff;
    border: 2px solid ${theme.accentColor};
    ${plutoFont('cond_light', 16)};
    text-align: center;
    height: 36px;
    width: 120px;
    border-radius: 18px;
    line-height: 36px;
  }
  .loading {
    ${plutoFont('cond_light', 16)};
    color: ${theme.meTextColor};
    line-height: 36px;
  }
`

const inputStyle = (hasError) => css`
  min-height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-bottom: 10px;
  input {
    border: 2px solid ${hasError ? theme.errorColor : theme.accentColor};
    height: 36px;
    border-radius: 20px;
    padding: 0 10px;
  } 
`

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendForm = this.sendForm.bind(this)
  }

  render () {
    const { username, password, usernameError, passwordError } = this.state
    const { loadingAuth, authError } = this.props
    return (
      <section className={style}>
        <h1>Log In</h1>
        <div className={inputStyle(usernameError)}>
          <input type='text' placeholder='Username' name='username' onChange={this.handleChange} value={username} />
          {usernameError && <span className='error'>Username is required</span>}
        </div>
        <div className={inputStyle(passwordError)}>
          <input type='password' placeholder='Password' name='password' onChange={this.handleChange} value={password} />
          {passwordError && <span className='error'>Password is required</span>}
        </div>    
        {loadingAuth ? <span className='loading'>Loading ...</span> : <button onClick={this.sendForm} className='submit'>Log in</button> }
        {authError && <span className='error' >Invalid username or password</span> }
      </section>
    )
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  validateForm () {
    let valid = true
    if (!this.state.username) {
      this.setState({ usernameError: true })
      valid = false
    } else {
      this.setState({ usernameError: false })
    }
    if (!this.state.password) {
      this.setState({ passwordError: true })
      valid = false
    } else {
      this.setState({ passwordError: false })
    }
    return valid
  }
  sendForm () {
    if (this.validateForm()) {
      this.props.onLogin(this.state.username, this.state.password)
    }
  }
}

LoginPage.propTypes = {
  loadingAuth: PropTypes.bool,
  authError: PropTypes.object,
  onLogin: PropTypes.func.isRequired
}

export default LoginPage
