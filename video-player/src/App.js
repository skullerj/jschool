import React, { Component } from 'react';
import InjectSheet from 'react-jss';
import Button from './components/Button';
const styles = theme => ({
  main: {
    background: theme.colors.primary,
    height: '100vh',
    width: '100vw'
  },
  header: {
    background: theme.colors.lightPrimary,
    color: theme.colors.text.he,
    height: '4rem',
    padding: '0.5rem 1rem',
    display: 'flex',
    flex: {
      direction: 'row'
    }
  },
  title: {
    ...theme.fonts.h5,
    display: 'flex',
    flex: '1',
    'self-align': 'center'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <header className={classes.header}>
          <h1 className={classes.title}>{`< Video Player />`}</h1>
          <Button variant="accent" raised>Share</Button>
        </header>
        <section className={classes.player}>
          <h2>Videos here</h2>
          <Button variant="normal">Play</Button>
          <Button variant="accent">Pause</Button>
          <Button variant="error">Stop</Button>
        </section>
        <section className={classes.clips}>
          <h3>Clips here</h3>
        </section>
      </main>
    );
  }
}

export default InjectSheet(styles)(App);
