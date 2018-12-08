/* globals localStorage */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InjectSheet from 'react-jss'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logIn } from '../redux/actions/auth'
import Input from '../components/Input'
import Button from '../components/Button'
const styles = (theme) => ({
  container: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'padding-top': '18vh',
    'max-width': 300,
    'margin': 'auto'
  },
  title: {
    font: theme.font('regular', 36),
    color: theme.colors.heText
  },
  subtitle: {
    font: theme.font('regular', 24),
    color: theme.colors.meText
  },
  loading: {
    font: theme.font('regular', 16),
    color: theme.colors.meText
  },
  error: {
    font: theme.font('regular', 16),
    color: theme.colors.error
  }
})

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      redirectToReferer: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }
  render () {
    const { classes, loading, error, authenticated } = this.props
    const { username, password, usernameError, passwordError } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (authenticated) return <Redirect to={from} />
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Log in</h1>
        <h2 className={classes.subtitle}>Hello friend, you must be logged in to see the books.</h2>
        <Input
          type='text'
          placeholder='Username'
          name='username'
          onChange={this.handleChange}
          value={username}
          errorMessage='Username is required'
          invalid={usernameError}
          icon={<i className='fas fa-user' />} />
        <Input
          type='password'
          placeholder='Password'
          name='password'
          onChange={this.handleChange}
          value={password}
          errorMessage='Password is required'
          invalid={passwordError}
          icon={<i className='fas fa-key' />} />
        {loading ? <span className={classes.loading}>Loading ...</span> : <Button onClick={this.login}>Log in</Button> }
        {error
          ? error.status === 401
            ? <span className={classes.error} >Invalid username or password</span>
            : <span className={classes.error} >Something went wrong. Please try again later</span>
          : null}
      </div>
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
  login () {
    if (this.validateForm()) {
      this.props.dispatch(logIn(this.state.username, this.state.password, localStorage))
    }
  }
}
LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  authenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  authenticated: state.auth.token && true
})

export default connect(mapStateToProps)(InjectSheet(styles)(LoginPage))
