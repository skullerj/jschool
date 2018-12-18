import React, { Component } from 'react';
import InjectSheet from 'react-jss';

const styles = theme => ({
  header: {
    background: theme.colors.bg,
    color: theme.colors.text.he
  },
  h1: {
    ...theme.fonts.h1
  },
  h2: {
    ...theme.fonts.h2
  },
  h3: {
    ...theme.fonts.h3
  },
  h4: {
    ...theme.fonts.h4
  },
  h5: {
    ...theme.fonts.h5
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
      <div>
        <header className={classes.header}>
          <h1 className={classes.h1}>Video killed the radio star!</h1>
          <h2 className={classes.h2}>Video killed the radio star!</h2>
          <h3 className={classes.h3}>Video killed the radio star!</h3>
          <h4 className={classes.h4}>Video killed the radio star!</h4>
          <h5 className={classes.h5}>Video killed the radio star!</h5>
          <span className={classes.body}>Video killed the radio star!</span>
          <button className={classes.button}>
            Video killed the radio star!
          </button>
        </header>
      </div>
    );
  }
}

export default InjectSheet(styles)(App);
