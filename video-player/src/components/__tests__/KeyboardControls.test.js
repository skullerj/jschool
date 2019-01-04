import React from 'react';
import { shallow } from 'enzyme';
import KeyboardControls from '../KeyboardControls';

const controls = shallow(<KeyboardControls />);

describe('KeyboardControls tests', () => {
  it('should render normally', () => {
    expect(controls.find('div.controls-container').length).toEqual(1);
  });
  it('should contain 3 key indicators', () => {
    expect(controls.find('div.control').length).toEqual(3);
    expect(controls.find('span.key').length).toEqual(3);
    expect(controls.find('span.description').length).toEqual(3);
  });
});
