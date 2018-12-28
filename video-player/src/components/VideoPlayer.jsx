import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import Timeline from './Timeline';

import { play, pause, setDuration, setProgress } from '../redux/actions';

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
    this.state = { ready: false };
  }
  togglePlay = () => {
    if (this.props.playing) {
      this.player.current.pause();
      this.props.dispatch(pause());
    } else {
      this.player.current.play();
      this.props.dispatch(play());
    }
  };
  updateProgress = progress => {
    console.log(progress, this.player.current.duration);
    const newTime = progress * this.player.current.duration;
    this.player.current.currentTime = newTime;
    this.props.dispatch(setProgress(progress));
  };
  render() {
    const { src, classes, progress, playing, duration } = this.props;
    console.log(progress)
    const { ready } = this.state;
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
      this.props.dispatch(setDuration(player.duration));
      this.setState({ ready: true });
    });
    player.addEventListener('timeupdate', e => {
      this.props.dispatch(setProgress(player.currentTime / player.duration));
    });
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string,
  progress: PropTypes.number
};

const mapStateToProps = state => ({
  progress: state.progress,
  playing: state.playing,
  duration: state.duration
});

export default connect(mapStateToProps)(InjectSheet(styles)(VideoPlayer));
