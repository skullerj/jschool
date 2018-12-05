import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import injectSheet from 'react-jss'

import Nav from './components/Nav'
import Header from './components/Header'
import Input from './components/Input'

const styles = theme => ({
  main: {
    display: 'grid',
    height: '100vh',
    grid: {
      templateColumns: '1fr',
      templateRows: '160px 1fr',
      templateAreas: `'header' 'content'`
    },
    [theme.mq.m]: {
      grid: {
        templateColumns: '240px 1fr',
        templateAreas: `'drawer header' 'drawer content'`
      }
    },
    [theme.mq.l]: {
      grid: {
        templateRows: '80px 1fr'
      }
    }
  },
  test: {
    margin: 30,
    width: 200
  }
})

class App extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.main}>
        <Header />
        <Nav />
        <section className={classes.content}>
          <div className={classes.test}>
            <Input icon={<i className='fas fa-user' />} errorMessage='No puedes' placeholder='Username' />
          </div>
          <Switch>
            <Route path='/books' exact render={({ match }) => <h1>Welcome Everywhere {match.url}</h1>} />
            <Route path='/books/:location(quito|medellin|cartagena)' exact render={({ match }) => <h1>Welcome to {match.params.location}</h1>} />
            <Route path='/books/:id' exact render={(match) => <h1>Welcome to the {match.params.id}</h1>} />
            <Route render={(match) => <h1>Welcome to hell baby!!!</h1>} />
          </Switch>
        </section>
      </div>
    )
  }
}

export default injectSheet(styles)(App)
