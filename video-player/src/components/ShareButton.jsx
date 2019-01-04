import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import copy from 'copy-to-clipboard';
import { connect } from 'react-redux';
import { Button, message } from 'antd';

import { disableEdit, addClip } from '../redux/actions';

class ShareButton extends Component {
  copyUrl = () => {
    const data = {
      starts: this.props.clips.map(c => c.start),
      ends: this.props.clips.map(c => c.end),
      names: this.props.clips.map(c => c.name),
      watch: true
    };
    const url = `${window.location.origin}?${qs.stringify(data)}`;
    copy(url);
    message.success('Url coppied to clipboard!');
  };
  render() {
    const { disableEdit } = this.props;
    return (
      !disableEdit && (
        <Button type="primary" onClick={this.copyUrl}>
          Share
        </Button>
      )
    );
  }
  componentDidMount() {
    if (window.location.search) {
      try {
        const query = qs.parse(window.location.search);
        if (query.watch) {
          this.props.dispatch(disableEdit(true));
        } else {
          this.props.dispatch(disableEdit(false));
        }
        if (this.props.clips.length > 0) return;
        for (let i = 0; i < query.names.length; i++) {
          this.props.dispatch(
            addClip({
              start: query.starts[i],
              end: query.ends[i],
              name: query.names[i]
            })
          );
        }
      } catch (e) {
        message.error('Something went wrong loading the content.');
      }
    }
  }
}

ShareButton.propTypes = {
  clips: PropTypes.array,
  disableEdit: PropTypes.bool
};

const mapStateToProps = state => ({
  clips: state.clips,
  disableEdit: state.disableEdit
});

// for testing purposes
export const PlainShareButton = ShareButton;

export default connect(mapStateToProps)(ShareButton);
