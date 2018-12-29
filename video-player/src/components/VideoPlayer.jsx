import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  render() {
    const { src, fragment } = this.props;
    return (
      <div>
        <video ref={this.player} controls>
          <source src={`${src}${fragment}`} />
        </video>
      </div>
    );
  }
  componentDidMount() {
    this.player.current.addEventListener('ended', () => {
      console.log('ended');
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

const mapStateToProps = state => ({
  src: state.videoSrc,
  fragment: computeMediaFragment(state.clips, state.selectedClip)
});

export default connect(mapStateToProps)(VideoPlayer);
