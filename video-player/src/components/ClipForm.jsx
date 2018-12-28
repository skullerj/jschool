import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, TimePicker, Form } from 'antd';
import moment from 'moment';
import '../styles/ClipForm.css';

import { closeCreate, addClip } from '../redux/actions';

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const getSeconds = moment => {
  if (!moment) return 0;
  return moment.second() + moment.minute() * 60 + moment.hour() * 3600;
};

class ClipForm extends Component {
  getBack = () => {
    this.props.dispatch(closeCreate());
  };
  validateEnd = (rule, value, callback) => {
    const errors = [];
    if (!value) {
      errors.push(new Error('End time is required!'));
    }
    const endSeconds = getSeconds(value);
    const startSeconds = getSeconds(this.props.form.getFieldValue('start'));
    if (startSeconds && endSeconds <= startSeconds) {
      errors.push(new Error('End time must be later than start time'));
    }
    if (endSeconds > this.props.duration) {
      errors.push(new Error('End time exceedes the video duration'));
    }
    return callback(errors);
  };
  validateStart = (rule, value, callback) => {
    const errors = [];
    if (!value) {
      errors.push(new Error('Start time is required!'));
    }
    const startSeconds = getSeconds(value);
    const endSeconds = getSeconds(this.props.form.getFieldValue('end'));
    if (endSeconds && endSeconds <= startSeconds) {
      errors.push(new Error('Start time must be earlier than end time'));
    }
    if (startSeconds >= this.props.duration) {
      errors.push(new Error('Start time exceedes the video duration'));
    }
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
        this.props.dispatch(addClip(clip));
        this.props.form.resetFields();
        this.props.dispatch(closeCreate());
      }
    });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const nameError = isFieldTouched('name') && getFieldError('name');
    const startError = isFieldTouched('start') && getFieldError('start');
    const endError = isFieldTouched('end') && getFieldError('end');
    return (
      <div className="clip-form">
        <div className="clip-form-title">
          <h1>New Clip</h1>
          <Button onClick={this.getBack}>Return</Button>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={nameError ? 'error' : 'success'}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Name is required' }]
            })(<Input size="large" placeholder="Name" />)}
          </Form.Item>
          <Form.Item
            validateStatus={startError ? 'error' : 'success'}
            help={startError || ''}
          >
            {getFieldDecorator('start', {
              rules: [
                {
                  validator: this.validateStart
                }
              ]
            })(
              <TimePicker
                size="large"
                placeholder="Start Time"
              // defaultOpenValue={moment('00:00:01', 'HH:mm:ss')}
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={endError ? 'error' : 'success'}
            help={endError || ''}
          >
            {getFieldDecorator('end', {
              rules: [
                {
                  validator: this.validateEnd
                }
              ]
            })(
              <TimePicker
                size="large"
                placeholder="End time"
              // defaultOpenValue={moment('00:00:02', 'HH:mm:ss')}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  duration: state.duration
});

export default Form.create()(connect(mapStateToProps)(ClipForm));
