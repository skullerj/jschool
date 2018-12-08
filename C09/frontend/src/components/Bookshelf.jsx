import React from 'react'
import InjectSheet from 'react-jss'
import Book from './Book'

const styles = (theme) => ({
  container: {

  }
})

const Bookshelf = (props) => {
  const { classes, books } = props
  return (
    <div className={classes.container}>
      {
        books.map((book, i) => {
          return (<Book book={book} key={i} />)
        })
      }
      {!books[0] && <span className={classes.noResult}>No results found :(</span>}
    </div>
  )
}

export default InjectSheet(styles)(Bookshelf)
