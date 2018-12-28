import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  render() {
    const { src } = this.props;
    return (
      <div>
        <video ref={this.player} controls>
          <source src={src} />
        </video>
      </div>
    );
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
