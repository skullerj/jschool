import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import Timeline from './Timeline';

const styles = theme => ({
  container: {
    width: '100%',
    position: 'relative'
  },
  video: {
    width: '100%'
  },
  loading: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    background: 'rgba(0,0,0,0.6)',
    color: theme.colors.bg,
    'z-index': '100'
  }
});

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      ready: false,
      progress: 0,
      playing: false,
      duration: 0
    };
  }
  togglePlay = () => {
    this.setState(state => {
      const newState = !state.playing;
      if (newState) {
        this.player.current.play();
      } else {
        this.player.current.pause();
      }
      return { playing: newState };
    });
  };
  updateProgress = progress => {
    const newTime = progress * this.player.current.duration;
    this.player.current.currentTime = newTime;
    this.setState({ progress: progress });
  };
  render() {
    const { src, classes } = this.props;
    const { progress, playing, ready, duration } = this.state;
    return (
      <div className={classes.container}>
        {!ready && (
          <div className={classes.loading}>
            <span>Loading the video...</span>
          </div>
        )}
        <video ref={this.player} className={classes.video}>
          <source src={src} />
        </video>
        <Timeline
          onPlayToggle={this.togglePlay}
          onNotchMove={this.updateProgress}
          progress={progress}
          playing={playing}
          duration={duration}
        />
      </div>
    );
  }
  componentDidMount() {
    const player = this.player.current;
    player.addEventListener('canplay', () => {
      this.setState({ ready: true, duration: player.duration });
    });
    player.addEventListener('timeupdate', e => {
      this.setState({ progress: player.currentTime / player.duration });
    });
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string
};

export default InjectSheet(styles)(VideoPlayer);
