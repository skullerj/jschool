import axios from 'axios'
import { push } from 'connected-react-router'

export const setAuthLoading = (loading) => {
  if (loading) {
    return {
      type: 'AUTH_LOADING'
    }
  } else {
    return {
      type: 'AUTH_LOADED'
    }
  }
}

export const setAuthToken = (token) => {
  return {
    type: 'SET_AUTH_TOKEN',
    token: token
  }
}

export const setAuthError = (error) => {
  return {
    type: 'SET_AUTH_TOKEN',
    error: error
  }
}

function getTokenFromLocalStorage (localStorage) {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return jwt
  }
  return null
}

export const logIn = (username, password, localStorage) => {
  return (dispatch, getState) => {
    if (getState().auth.loading) {
      return false
    }
    dispatch(setAuthLoading(true))
    axios.post('/auth/login', { username, password })
      .then((response) => {
        localStorage.jwt = response.data.jwt
        dispatch(setAuthToken(response.data.jwt))
        dispatch(setAuthLoading(false))
        dispatch(push('/books'))
      })
      .catch((err) => {
        dispatch(setAuthLoading(false))
        dispatch(setAuthError(err.response.data.error))
      })
  }
}

export const checkLogin = (localStorage) => {
  return (dispatch) => {
    const token = getTokenFromLocalStorage(localStorage)
    if (token) {
      dispatch(setAuthToken(token))
      return true
    } else {
      return false
    }
  }
}

export const logOut = (localStorage) => {
  localStorage.removeItem('jwt')
  return setAuthToken(null)
}
