import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { playNext, selectClip } from '../redux/actions';
import '../styles/VideoPlayer.css';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  render() {
    const { src, fragment, watingNext } = this.props;
    return (
      <div className="video-container">
        {watingNext && <Spin size="large" className="loading" />}
        <video ref={this.player} controls={!watingNext}>
          <source src={`${src}${fragment}`} />
        </video>
      </div>
    );
  }
  componentDidMount() {
    const player = this.player.current;
    player.addEventListener('pause', () => {
      if (
        this.props.selectedClip &&
        this.props.selectedClip.end === Math.floor(player.currentTime) &&
        this.props.autoplay &&
        this.props.nextClip
      ) {
        this.props.dispatch(playNext(this.props.nextClip));
      }
    });
    window.addEventListener('keypress', e => {
      if (e.target.tagName === 'INPUT') {
        return;
      }
      switch (e.key) {
        case 'h':
          if (this.props.nextClip) {
            this.props.dispatch(selectClip(this.props.nextClip));
          }
          break;
        case 'j':
          if (this.props.prevClip) {
            this.props.dispatch(selectClip(this.props.prevClip));
          }
          break;
        case ' ':
          player.paused ? player.play() : player.pause();
          break;
        default:
          return;
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.fragment !== this.props.fragment) {
      this.player.current.load();
      this.player.current.play();
    }
  }
}

// Returns the appropiate media fragment to control the video player
export const computeMediaFragment = (clips, selectedClip) => {
  if (!selectedClip) return '';
  return clips.reduce((r, c) => {
    if (c.id === selectedClip) {
      r = `#t=${c.start},${c.end}`;
    }
    return r;
  }, '');
};
// Computes the next clip's id from the list of clips and the currently selected clip
export const getNextClip = (clips, selectedClip) => {
  if (!selectedClip) return null;
  const index = clips.findIndex(c => c.id === selectedClip);
  if (index + 1 <= clips.length - 1) {
    return clips[index + 1].id;
  } else {
    return null;
  }
};
// Computes the previous clip's id from the list of clips and the currently selected clip
export const getPrevClip = (clips, selectedClip) => {
  if (!selectedClip) return null;
  const index = clips.findIndex(c => c.id === selectedClip);
  if (index - 1 >= 0) {
    return clips[index - 1].id;
  } else {
    return null;
  }
};

VideoPlayer.propTypes = {
  src: PropTypes.string,
  fragment: PropTypes.string,
  autoplay: PropTypes.bool,
  selectedClip: PropTypes.number,
  nextClip: PropTypes.number,
  prevClip: PropTypes.number,
  watingNext: PropTypes.bool
};

const mapStateToProps = state => ({
  src: state.videoSrc,
  fragment: computeMediaFragment(state.clips, state.selectedClip),
  autoplay: state.autoplay,
  selectedClip: state.clips.find(c => c.id === state.selectedClip),
  nextClip: getNextClip(state.clips, state.selectedClip),
  prevClip: getPrevClip(state.clips, state.selectedClip),
  watingNext: state.watingNextPlay
});

// For testing purposes
export const PlainVideoPlayer = VideoPlayer;

export default connect(mapStateToProps)(VideoPlayer);
