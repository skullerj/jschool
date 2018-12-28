import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Button from './Button';

const formatSecondsToMin = seconds => {
  if (!seconds) return '0:00';
  const secs = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min}:${('0' + secs).slice(-2)}`;
};

const styles = theme => ({
  container: {
    padding: '0.5rem'
  }
});

class ClipList extends Component {
  render() {
    const { classes, clips, onPlayClick, onNewClipClick } = this.props;
    return (
      <div className={classes.container}>
        <Button raised variant="accent" onClick={onNewClipClick}>
          New Clip
        </Button>
        {clips.map(clip => (
          <div className={classes.clip}>
            <span>{formatSecondsToMin(clip.startTime)}</span>
            <span>{formatSecondsToMin(clip.endTime)}</span>
            <Button onClick={e => onPlayClick(clip)}>Play</Button>
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

export default injectSheet(styles)(ClipList);
