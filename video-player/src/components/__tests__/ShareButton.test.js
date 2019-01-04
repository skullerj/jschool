import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import { PlainShareButton } from '../ShareButton';
const button = shallow(<PlainShareButton />);

describe('ShareButton tests', () => {
  it('should render normally', () => {
    expect(button.find(Button).length).toEqual(1);
  });
  it('should show/hide the button when disableEdit is false/true', () => {
    button.setProps({ disableEdit: true });
    expect(button.find(Button).length).toEqual(0);
    button.setProps({ disableEdit: false });
    expect(button.find(Button).length).toEqual(1);
  });
});
