import React from 'react'
import InjectSheet from 'react-jss'

const styles = ({
  container: {}
})

const BookDetails = (props) => {
  const { classes, book } = props
  return (
    <div className={classes.container} >
      <h1>Hello from book details. Book id is {book.id}</h1>
    </div>
  )
}

export default InjectSheet(styles)(BookDetails)
