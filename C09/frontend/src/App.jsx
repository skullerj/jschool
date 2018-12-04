import React, { Component } from 'react'
import injectSheet from 'react-jss'

const styles = theme => ({
  title: {
    font: theme.font('regular', 16)
  }
})

class App extends Component {
  render () {
    const { classes } = this.props
    return (<main>
      <h1 className={classes.title}>Hello world</h1>
      <h2>Hello world 2 </h2>
    </main>)
  }
}

export default injectSheet(styles)(App)
