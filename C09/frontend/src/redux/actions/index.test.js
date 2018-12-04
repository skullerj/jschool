/* globals describe, it, expect */
import * as actions from './index'

describe('Books actions', () => {
  it('adBook should create an ADD_BOOK action', () => {
    expect(actions.addBook({ id: 1, title: 'New book' }))
      .toEqual({
        type: 'ADD_BOOK',
        book: {
          id: 1,
          title: 'New book'
        }
      })
  })
})
