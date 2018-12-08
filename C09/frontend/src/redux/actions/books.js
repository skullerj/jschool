import axios from 'axios'
let requester = null

export const addBook = (book) => {
  return {
    type: 'ADD_BOOK',
    book: book
  }
}
export const updateBook = (id, updates) => {
  return {
    type: 'UPDATE_BOOK',
    id,
    updates
  }
}
export const loadBooks = (books) => {
  return {
    type: 'LOAD_BOOKS',
    books: books
  }
}
export const setBooksTotal = (total) => {
  return {
    type: 'SET_BOOKS_TOTAL',
    total: total
  }
}
export const setBooksError = (err) => {
  return {
    type: 'SET_BOOKS_ERROR',
    error: err
  }
}
export const setBooksLoading = (loading) => {
  return {
    type: loading ? 'BOOKS_LOADING' : 'BOOKS_LOADED'
  }
}

export const selectBook = (id) => {
  return {
    type: 'SELECT_BOOK',
    bookId: id
  }
}

function generateRequesterFromState (state) {
  if (!state.auth.token) return null
  if (requester) {
    return requester
  } else {
    return axios.create({
      baseURL: '/',
      headers: { 'Authorization': `Bearer ${state.auth.token}` }
    })
  }
}

export const fetchBooks = (location, query) => {
  return (dispatch, getState) => {
    const requester = generateRequesterFromState(getState())
    if (!requester) return false
    const url = location === 'everywhere' ? `/books?${query}` : `/books?location=${location}&${query}`
    dispatch(setBooksLoading(true))
    requester.get(url)
      .then((res) => {
        dispatch(setBooksLoading(false))
        dispatch(setBooksTotal(res.data.total))
        dispatch(loadBooks(res.data.data))
      })
      .catch((err) => {
        dispatch(setBooksLoading(false))
        dispatch(setBooksError(err.response.data.error))
      })
  }
}

export const fetchSingleBook = (id) => {
  return (dispatch, getState) => {
    const requester = generateRequesterFromState(getState())
    if (!requester) return false
    const url = `/books/${id}`
    dispatch(setBooksLoading(true))
    requester.get(url)
      .then((res) => {
        dispatch(setBooksLoading(false))
        dispatch(addBook(res.data.data))
      })
      .catch((err) => {
        dispatch(setBooksLoading(false))
        dispatch(setBooksError(err.response.data.error))
      })
  }
}

export const lendBook = (id, location, returnDate) => {
  return (dispatch, getState) => {
    const requester = generateRequesterFromState(getState())
    if (!requester) return false
    const url = `/books/${id}/lend`
    dispatch(setBooksLoading(true))
    requester.post(url, { location, returnDate })
      .then((res) => {
        dispatch(setBooksLoading(false))
        dispatch(updateBook(id, { returnDate: returnDate.toString() }))
      })
      .catch((err) => {
        dispatch(setBooksLoading(false))
        dispatch(setBooksError(err.response.data.error))
      })
  }
}
