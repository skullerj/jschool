import React, { Component } from 'react';
import InjectSheet from 'react-jss';
import Button from './components/Button';
import VideoPlayer from './components/VideoPlayer';
import ClipList from './components/ClipList';

const styles = theme => ({
  main: {
    background: theme.colors.bg,
    height: '100vh',
    width: '100vw',
    display: 'grid',
    grid: {
      templateRows: '64px auto 64px',
      templateColumns: '1fr 30vw',
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
    background: theme.colors.bg
  },
  clips: {
    'grid-area': 'clips',
    background: theme.colors.darkBg
  },
  controls: {
    'grid-area': 'controls',
    background: theme.colors.primary
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clips: [
        { startTime: 0, endTime: 40 },
        { startTime: 12, endTime: 40 },
        { startTime: 8, endTime: 40 }
      ],
      creating: false
    };
  }

  playClip = e => {
    console.log(e);
  };

  createClip = e => {
    console.log(e);
  };

  handleProgressUpdate = progress => {
    this.setState({ progress: progress });
  };

  render() {
    const { classes } = this.props;
    const { clips, progress } = this.state;
    return (
      <main className={classes.main}>
        <header className={classes.header}>
          <h1 className={classes.title}>{`< Video Player />`}</h1>
          <Button raised>Share</Button>
        </header>
        <section className={classes.player}>
          <VideoPlayer
            src="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
            progress={progress}
            onProgressUpdate={this.handleProgressUpdate}
          />
        </section>
        <section className={classes.clips}>
          <ClipList
            clips={clips}
            onPlayClick={this.playClip}
            onNewClipClick={this.createClip}
          />
        </section>
        <section className={classes.controls}>
          <h3>Controls</h3>
        </section>
      </main>
    );
  }
}

export default InjectSheet(styles)(App);
