import React, { Component } from 'react'
import { css } from 'emotion'
import axios from 'axios'

import Book from './Book/Book'
import BookDetails from './Book/BookDetails'

const style = css`
  display: grid;
  grid-gap: 31px;
  grid-template-columns: repeat(auto-fill, 175px);
  justify-content: space-around;
  padding: 31px;
`

class Bookshelf extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedBook: null,
      books: []
    }
  }

  render () {
    const { books, selectedBook } = this.state
    return (
      <section className={style}>
        {books.map((book, i) => {
          return (
            <Book book={book} key={book.id} >
              {selectedBook === book.id ? <BookDetails book={book} alignment={i % 2 === 0 ? 'left' : 'right'} /> : ''}
            </Book>)
        })}
      </section>
    )
  }

  componentDidMount () {
    const jwt = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVmMzkxOWViNmE3YTc0NzZlZjY3NjciLCJ1c2VybmFtZSI6ImJpbGwiLCJpYXQiOjE1NDI5MjIzODJ9.alpB13JGFwDpyq49jiSdZ8WuvIj8tkX42ilr35Mohv0'
    let requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': jwt }
    })

    requester.get('/books')
      .then((res) => {
        console.log(res)
        this.setState({ books: res.data.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default Bookshelf
