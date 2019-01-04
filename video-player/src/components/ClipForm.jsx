import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, TimePicker, Form, message } from 'antd';
import moment from 'moment';
import '../styles/ClipForm.css';

import { closeCreate, addClip, editClip } from '../redux/actions';

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

// Parse a momentjs object to a value in seconds
// it assumes a HH:mm:ss format
export const getSeconds = moment => {
  if (!moment) return 0;
  return moment.second() + moment.minute() * 60 + moment.hour() * 3600;
};

// Validates a start or ending time relative to it's counterpart and the video duration
// This are the rules: start < duration ; end < duration ; start < end
//
export const validateTime = (type, videoDuration, value, complement) => {
  const errors = [];
  if (!value) errors.push(new Error(`${type} time is required`));
  if (type === 'Start') {
    // in this case value => start and complement => end
    if (complement && value >= complement) {
      errors.push(new Error('Start time must be behind end time'));
    }
  } else if (type === 'End') {
    // in this case value => start and complement => end
    if (complement && value <= complement) {
      errors.push(new Error('End time must be ahead start time'));
    }
  }
  if (type === 'Start' ? value >= videoDuration : value > videoDuration) {
    errors.push(new Error(`${type} time exceeds video duration`));
  }
  return errors;
};

class ClipForm extends Component {
  getBack = () => {
    this.props.dispatch(closeCreate());
  };
  validateEnd = (rule, value, callback) => {
    const errors = validateTime(
      'End',
      this.props.duration,
      getSeconds(value),
      getSeconds(this.props.form.getFieldValue('start'))
    );
    return callback(errors);
  };
  validateStart = (rule, value, callback) => {
    const errors = validateTime(
      'Start',
      this.props.duration,
      getSeconds(value),
      getSeconds(this.props.form.getFieldValue('end'))
    );
    return callback(errors);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const clip = {
          name: values.name,
          start: getSeconds(values.start),
          end: getSeconds(values.end)
        };
        if (this.props.editing) {
          clip.id = this.props.editingClip.id;
          this.props.dispatch(editClip(clip));
          message.success('Clip saved!');
        } else {
          this.props.dispatch(addClip(clip));
          message.success('Clip added!');
        }
        this.props.form.resetFields();
        this.props.dispatch(closeCreate());
      }
    });
  };
  handleStartOpenChange = opened => {
    if (!opened) {
      const start = this.props.form.getFieldValue('start');
      if (!start) return;
      this.props.form.setFieldsValue({ end: moment(start).add(1, 'seconds') });
    }
  };
  render() {
    const { editing } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const nameError = getFieldError('name');
    const startError = isFieldTouched('start') && getFieldError('start');
    const endError = isFieldTouched('end') && getFieldError('end');
    return (
      <div className="clip-form">
        <div className="clip-form-title">
          <h1>{editing ? 'Edit Clip' : 'New Clip'}</h1>
          <Button onClick={this.getBack}>Return</Button>
        </div>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          <Form.Item
            validateStatus={nameError ? 'error' : 'success'}
            label="Name"
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Name is required' }]
            })(<Input size="large" placeholder="The best clip ever" />)}
          </Form.Item>
          <Form.Item
            validateStatus={startError ? 'error' : 'success'}
            label="Start time"
            help={startError || ''}
          >
            {getFieldDecorator('start', {
              rules: [
                {
                  required: true,
                  validator: this.validateStart
                }
              ]
            })(
              <TimePicker
                size="large"
                placeholder="Start Time"
                onOpenChange={this.handleStartOpenChange}
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={endError ? 'error' : 'success'}
            label="End time"
            help={endError || ''}
          >
            {getFieldDecorator('end', {
              rules: [
                {
                  required: true,
                  validator: this.validateEnd
                }
              ]
            })(<TimePicker size="large" placeholder="End time" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              {editing ? 'Save' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  componentDidMount(prevProps) {
    if (this.props.editing) {
      const clip = this.props.editingClip;
      const formClip = {
        name: clip.name,
        start: moment('00:00:00', 'HH:mm:ss').seconds(clip.start),
        end: moment('00:00:00', 'HH:mm:ss').seconds(clip.end)
      };
      this.props.form.setFieldsValue(formClip);
    } else {
      const formClip = {
        name: '',
        start: moment('00:00:00', 'HH:mm:ss'),
        end: null
      };
      this.props.form.setFieldsValue(formClip);
    }
  }
}

const mapStateToProps = state => ({
  duration: state.duration,
  editing: state.selectedClip && state.creatingClip,
  editingClip: state.clips.find(c => c.id === state.selectedClip)
});

export default Form.create()(connect(mapStateToProps)(ClipForm));
