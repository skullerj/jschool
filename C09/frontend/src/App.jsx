import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { addBook } from './redux/actions'
const styles = theme => ({
  title: {
    font: theme.font('regular', 16),
    [theme.mq.s]: {
      font: theme.font('regular', 26)
    },
    [theme.mq.m]: {
      font: theme.font('regular', 36)
    }
  }
})

class App extends Component {
  render () {
    const { classes, addBook, books } = this.props
    return (<main>
      <h1 className={classes.title}>Hello world</h1>
      <h2>Hello world 2 </h2>
      <div>{books}</div>
      <button onClick={() => addBook({ id: 1, title: 'New Book' })}>Add Book</button>
    </main>)
  }
}

const mapStateToProps = state => ({
  books: state.books.entities.map(b => b.title)
})
const mapDispatchToProps = dispatch => ({
  addBook: (book) => dispatch(addBook(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(App))
