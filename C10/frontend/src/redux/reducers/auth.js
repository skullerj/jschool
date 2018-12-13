import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from '../actions/auth'

const auth = (state = {
  token: null,
  loading: false,
  lastError: null
}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.token }
    case LOGIN_ERROR:
      return { ...state, loading: false, token: null, lastError: action.error }
    case LOGOUT:
      return { ...state, token: null }
    default:
      return state
  }
}

export default auth
