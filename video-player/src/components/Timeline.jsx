import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { fromEvent } from 'rxjs';
import { notchBounce, notchDrag } from '../animations/utils';
import { map } from 'rxjs/operators';

const styles = theme => ({
  container: {
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center'
  },
  controls: {
    padding: '0.5rem'
  },
  notch: {
    position: 'absolute',
    background: theme.colors.accent,
    'border-radius': '50%',
    border: `3px solid ${theme.colors.lightPrimary}`,
    height: '1rem',
    width: '1rem',
    top: '-0.25rem',
    left: '-8px'
  },
  timeline: {
    flex: '1',
    position: 'relative',
    width: '100%',
    height: '0.5rem',
    background: theme.colors.error
  },
  progress: {
    height: '100%',
    background: theme.colors.accent
  },
  time: {
    padding: '0.5rem',

  }
});

const formatSecondsToMin = seconds => {
  if (!seconds) return '0:00';
  const secs = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min}:${('0' + secs).slice(-2)}`;
};

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.timeline = React.createRef();
    this.notch = React.createRef();
    this.state = {
      notchScale: 1
    };
  }

  notchMouseDown = e => {
    e.preventDefault();
  };

  render() {
    const { notchScale } = this.state;
    const { classes, playing, onPlayToggle, progress, duration } = this.props;
    const position = progress * this.timelineWidht || 0;
    return (
      <div className={classes.container}>
        <div className={classes.controls}>
          <i
            className={`fas ${playing ? 'fa-pause' : 'fa-play'}`}
            onClick={onPlayToggle}
          />
        </div>
        <div className={classes.timeline} ref={this.timeline}>
          <div
            className={classes.progress}
            style={{ width: `${position + 8}px` }}
          />
          <div
            className={classes.notch}
            ref={this.notch}
            onMouseDown={this.notchMouseDown}
            style={{
              transform: `translate(${position}px, 0) scale(${notchScale}, ${notchScale})`
            }}
          />
        </div>
        <div className={classes.time}>
          <span>
            {formatSecondsToMin(duration * progress)}
            {` / `}
            {formatSecondsToMin(duration)}
          </span>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const timeline = this.timeline.current;
    const notch = this.notch.current;
    this.timelineWidht = timeline.getBoundingClientRect().width;
    notchBounce(fromEvent(notch, 'mousedown')).subscribe(scale => {
      this.setState({ notchScale: scale });
    });
    fromEvent(notch, 'click').subscribe(e => e.stopPropagation());
    notchDrag(
      fromEvent(notch, 'mousedown').pipe(
        map(e => ({ e: e, startAt: this.props.progress }))
      ),
      timeline.getBoundingClientRect().width
    ).subscribe(progress => {
      this.props.onNotchMove(progress);
    });
    fromEvent(timeline, 'click').subscribe(e => {
      this.props.onNotchMove(e.offsetX / this.timelineWidht);
    });
  }
}

export default injectSheet(styles)(Timeline);
