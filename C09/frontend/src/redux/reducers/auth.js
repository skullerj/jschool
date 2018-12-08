const auth = (state = {
  token: null,
  loading: false,
  lastError: null
}, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return Object.assign({}, state, { loading: true })
    case 'AUTH_LOADED':
      return Object.assign({}, state, { loading: false })
    case 'AUTH_ERROR':
      return Object.assign({}, state, { lastError: action.error })
    case 'SET_AUTH_TOKEN':
      return Object.assign({}, state, { token: action.token })
    default:
      return state
  }
}

export default auth
