export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'

function getTokenFromLocalStorage (localStorage) {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return jwt
  }
  return null
}

export const requestLogin = (username, password) => {
  return {
    type: REQUEST_LOGIN,
    username: username,
    password: password
  }
}

export const logIn = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token: token
  }
}

export const logInError = (error) => {
  return {
    type: LOGIN_ERROR,
    error: error
  }
}

export const logOut = () => {
  return {
    type: LOGOUT
  }
}

export const checkLogin = (localStorage) => {
  const token = getTokenFromLocalStorage(localStorage)
  if (token) {
    return logIn(token)
  } else {
    return logOut()
  }
}
