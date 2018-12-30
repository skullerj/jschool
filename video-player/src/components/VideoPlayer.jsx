import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { playNext } from '../redux/actions';
import '../styles/VideoPlayer.css'

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
        <video ref={this.player} controls>
          <source src={`${src}${fragment}`} />
        </video>
      </div>
    );
  }
  componentDidMount() {
    const player = this.player.current;
    player.addEventListener('pause', () => {
      if (
        this.props.selectedClip.end === Math.floor(player.currentTime) &&
        this.props.autoplay &&
        this.props.nextClip
      ) {
        this.props.dispatch(playNext(this.props.nextClip));
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

VideoPlayer.propTypes = {
  src: PropTypes.string,
  fragment: PropTypes.string
};

const computeMediaFragment = (clips, selectedClip) => {
  if (!selectedClip) return '';
  return clips.reduce((r, c) => {
    if (c.id === selectedClip) {
      r = `#t=${c.start},${c.end}`;
    }
    return r;
  }, '');
};

const getNextClip = (clips, selectedClip) => {
  if (!selectedClip) return null;
  const index = clips.findIndex(c => c.id === selectedClip);
  if (index + 1 <= clips.length - 1) {
    return clips[index + 1].id;
  } else {
    return null;
  }
};

const mapStateToProps = state => ({
  src: state.videoSrc,
  fragment: computeMediaFragment(state.clips, state.selectedClip),
  autoplay: state.autoplay,
  selectedClip: state.clips.find(c => c.id === state.selectedClip),
  nextClip: getNextClip(state.clips, state.selectedClip),
  watingNext: state.watingNextPlay
});

export default connect(mapStateToProps)(VideoPlayer);
