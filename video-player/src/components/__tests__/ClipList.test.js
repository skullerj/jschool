import React from 'react';
import { mount } from 'enzyme';
import { clips } from './fixtures.json';
import { List, Switch, Button, Popconfirm } from 'antd';
import { formatSecondsToMin, PlainClipList } from '../ClipList';

describe('ClipLists functions tests', () => {
  describe('formatSecondsToMin', () => {
    it('should return 0:00 when a falsy value is passed', () => {
      expect(formatSecondsToMin(null)).toEqual('0:00');
    });
    it('should return 0:07 when 7 is passed', () => {
      expect(formatSecondsToMin(7)).toEqual('0:07');
    });
    it('should return 0:37 when 37 is passed', () => {
      expect(formatSecondsToMin(37)).toEqual('0:37');
    });
    it('should return 1:00 when 60 is passed', () => {
      expect(formatSecondsToMin(60)).toEqual('1:00');
    });
    it('should return 1:05 when 65 is passed', () => {
      expect(formatSecondsToMin(65)).toEqual('1:05');
    });
  });
});

describe('ClipList component tests', () => {
  let list;
  beforeAll(() => {
    list = mount(<PlainClipList autoplay />);
  });
  it('should render normally', () => {
    expect(list.find('div.clips-list').length).toEqual(1);
  });
  it('should render a list of clips', () => {
    list.setProps({ clips: clips });
    expect(list.find(List.Item).length).toEqual(clips.length + 1); // +1 because the full video is at the top
  });
  it('should show the name, start and end for each clip', () => {
    list.setProps({ clips: clips });
    const clip = clips[0];
    const firstItemMeta = list.find(List.Item.Meta).at(1);
    expect(firstItemMeta.prop('title').props.children).toEqual(clip.name);
    const startEnd = `${formatSecondsToMin(clip.start)} - ${formatSecondsToMin(
      clip.end
    )}`;
    expect(firstItemMeta.prop('description')).toEqual(startEnd);
  });
  it('should show which clip is selected', () => {
    list.setProps({ clips: clips, selectedClip: clips[0].id });
    const firstItemMeta = list.find(List.Item.Meta).at(1);
    expect(firstItemMeta.prop('title').props.style).toEqual({
      color: '#1890ff'
    });
  });
});
