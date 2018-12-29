import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Button, Popconfirm, message } from 'antd';
import '../styles/ClipList.css';

import { openCreate, selectClip, removeClip } from '../redux/actions';

const formatSecondsToMin = seconds => {
  if (!seconds) return '0:00';
  const secs = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min}:${('0' + secs).slice(-2)}`;
};

class ClipList extends Component {
  createClip = () => {
    this.props.dispatch(selectClip(null));
    this.props.dispatch(openCreate());
  };
  playClip = id => {
    this.props.dispatch(selectClip(id));
  };
  deleteClip = id => {
    this.props.dispatch(removeClip(id));
    message.info('Clip deleted');
  };
  selectClip = id => {
    this.props.dispatch(selectClip(id));
    this.props.dispatch(openCreate());
  };
  render() {
    const { clips, selectedClip } = this.props;
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
              <List.Item
                actions={[
                  <Button
                    icon="play-circle"
                    onClick={() => this.playClip(null)}
                  />
                ]}
              >
                <List.Item.Meta title="Full Video" />
              </List.Item>
            </div>
          }
          locale={{ emptyText: 'No clips to show' }}
          dataSource={clips}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  icon="play-circle"
                  onClick={() => this.playClip(item.id)}
                />,
                <Button icon="edit" onClick={() => this.selectClip(item.id)} />,
                <Popconfirm
                  placement="topRight"
                  title="Do you really want to delete this clip?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => this.deleteClip(item.id)}
                >
                  <Button icon="delete" />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={
                  <span
                    style={{
                      color: item.id === selectedClip ? '#1890ff' : 'inherit'
                    }}
                  >
                    {item.name}
                  </span>
                }
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
  clips: state.clips,
  selectedClip: state.selectedClip
});

export default connect(mapStateToProps)(ClipList);
