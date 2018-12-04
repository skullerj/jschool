/* globals describe, it, expect */
import books from '../books'

describe('Books reducer tests', () => {
  it('should handle initial state', () => {
    expect(
      books(undefined, {})
    ).toEqual({ entities: [], selectedBook: null })
  })
  it('should handle ADD_BOOK action', () => {
    expect(
      books(undefined, {
        type: 'ADD_BOOK',
        book: {
          id: 1,
          title: 'Javascript Rocks'
        }
      }).entities
    ).toEqual([
      {
        id: 1,
        title: 'Javascript Rocks'
      }
    ])
  })
  it('should handle UPDATE_BOOK action', () => {
    expect(
      books({
        entities: [
          {
            id: 1,
            title: 'PHP sucks'
          },
          {
            id: 2,
            title: 'How to cook'
          }
        ]
      }, {
        type: 'UPDATE_BOOK',
        book: {
          id: 1,
          title: 'Javascript Rocks'
        }
      }).entities
    ).toEqual([
      {
        id: 1,
        title: 'Javascript Rocks'
      },
      {
        id: 2,
        title: 'How to cook'
      }
    ])
  })
})
