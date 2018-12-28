import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import '../styles/ClipList.css';

import { openCreate } from '../redux/actions';

const formatSecondsToMin = seconds => {
  if (!seconds) return '0:00';
  const secs = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min}:${('0' + secs).slice(-2)}`;
};

class ClipList extends Component {
  createClip = () => {
    this.props.dispatch(openCreate());
  };
  render() {
    const { clips } = this.props;
    return (
      <div className="clips-list">
        <List
          header={
            <div>
              <div className="clips-title">
                <h1>Clips</h1>
                <Button type="primary" onClick={this.createClip}>
                  New Clip
                </Button>
              </div>
              <List.Item actions={[<Button icon="play-circle" />]}>
                <List.Item.Meta title="Full Video" />
              </List.Item>
            </div>
          }
          locale={{ emptyText: 'No clips to show' }}
          dataSource={clips}
          renderItem={item => (
            <List.Item
              actions={[
                <Button icon="play-circle" />,
                <Button icon="edit" />,
                <Button icon="delete" />
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={`${formatSecondsToMin(
                  item.start
                )} - ${formatSecondsToMin(item.end)}`}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

ClipList.propTypes = {
  clips: PropTypes.array
};

const mapStateToProps = state => ({
  clips: state.clips
});

export default connect(mapStateToProps)(ClipList);
