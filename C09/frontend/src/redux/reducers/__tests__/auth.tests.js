/* globals describe, it, expect */
import auth from '../auth'

const initialState = {
  token: null,
  loading: false,
  lastError: null
}

describe('Auth reducer tests', () => {
  it('handles its initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState)
  })
  it('handles the AUTH_LOADING event', () => {
    expect(
      auth(initialState, {
        type: 'AUTH_LOADING'
      })
    ).toEqual(Object.assign({}, initialState, { loading: true }))
  })
  it('handles the AUTH_LOADED event', () => {
    expect(
      auth(initialState, {
        type: 'AUTH_LOADED'
      })
    ).toEqual(Object.assign({}, initialState, { loading: false }))
  })
  it('handles the AUTH_ERROR event', () => {
    const error = {
      message: 'Oh no!'
    }
    expect(
      auth(initialState, {
        type: 'AUTH_ERROR',
        error: error
      })
    ).toEqual(Object.assign({}, initialState, { lastError: error }))
  })
  it('handles the SET_AUTH_TOKEN event ', () => {
    const token = '123123tokentoken'
    expect(
      auth(initialState, {
        type: 'SET_AUTH_TOKEN',
        token: token
      })
    ).toEqual(Object.assign({}, initialState, { token: token }))
  })
})
