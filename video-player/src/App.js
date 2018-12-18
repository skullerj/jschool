import React, { Component } from 'react';
import InjectSheet from 'react-jss';
import Button from './components/Button';
const styles = theme => ({
  main: {
    background: theme.colors.white,
    height: '100vh',
    width: '100vw',
    display: 'grid',
    grid: {
      templateRows: '64px auto 120px',
      templateColumns: '6fr 3fr',
      templateAreas: `'header header' 'player clips' 'controls clips'`
    }
  },
  header: {
    background: theme.colors.primary,
    color: theme.colors.text.he,
    height: '4rem',
    padding: '0.5rem 1rem',
    display: 'flex',
    flex: {
      direction: 'row',
      justify: 'center'
    },
    'grid-area': 'header'
  },
  title: {
    ...theme.fonts.h5,
    display: 'flex',
    flex: '1'
  },
  player: {
    'grid-area': 'player',
    background: theme.colors.white
  },
  clips: {
    'grid-area': 'clips',
    background: '#E0DEDD'
  },
  controls: {
    'grid-area': 'controls',
    background: theme.colors.primary
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <header className={classes.header}>
          <h1 className={classes.title}>{`< Video Player />`}</h1>
          <Button raised>Share</Button>
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
        <section className={classes.controls}>
          <h3>Controls</h3>
        </section>
      </main>
    );
  }
}

export default InjectSheet(styles)(App);
