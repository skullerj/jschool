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
    padding: '0.5rem',
    display: 'flex',
    flex: {
      direction: 'row'
    }
  },
  title: {
    ...theme.fonts.h5,
    display: 'flex',
    flex: '1'
  },
  h2: {
    ...theme.fonts.h2
  },
  h3: {
    ...theme.fonts.h3
  },
  h4: {
    ...theme.fonts.h4,
    color: theme.colors.accent
  },
  h5: {
    ...theme.fonts.h5,
    color: theme.colors.error
  },
  body: {
    ...theme.fonts.body,
    color: theme.colors.text.disabled
  },
  button: {
    ...theme.fonts.button,
    color: theme.colors.text.me
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <header className={classes.header}>
          <h1 className={classes.title}>{`<Video Player />`}</h1>
          <Button variant="normal" raised>Play</Button>
          <Button variant="accent" raised>Play</Button>
          <Button variant="error" raised>Play</Button>
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
