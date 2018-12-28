import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formatSecondsToMin = seconds => {
  if (!seconds) return '0:00';
  const secs = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min}:${('0' + secs).slice(-2)}`;
};

class ClipList extends Component {
  render() {
    const { clips, onPlayClick, onNewClipClick } = this.props;
    return (
      <div>
        {clips.map(clip => (
          <div>
            <span>{formatSecondsToMin(clip.startTime)}</span>
            <span>{formatSecondsToMin(clip.endTime)}</span>
          </div>
        ))}
      </div>
    );
  }
}

ClipList.propTypes = {
  clips: PropTypes.array,
  onPlayClick: PropTypes.func,
  onNewClipClick: PropTypes.func
};

ClipList.defaultProps = {
  clips: []
};

export default ClipList;
