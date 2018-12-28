import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { play, pause, setDuration, setProgress } from '../redux/actions';

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
    const { src, progress, playing, duration } = this.props;
    console.log(progress)
    const { ready } = this.state;
    return (
      <div>
        {!ready && (
          <div>
            <span>Loading the video...</span>
          </div>
        )}
        <video ref={this.player}>
          <source src={src} />
        </video>
      </div>
    );
  }
  componentDidMount() {
    const player = this.player.current;
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

export default connect(mapStateToProps)(VideoPlayer);
