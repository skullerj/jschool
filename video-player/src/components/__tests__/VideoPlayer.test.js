import React from 'react';
import { mount } from 'enzyme';
import { Spin } from 'antd';
import { clips } from './fixtures.json';
import {
  computeMediaFragment,
  getNextClip,
  getPrevClip,
  PlainVideoPlayer
} from '../VideoPlayer';

describe('VideoPlayer functions tests', () => {
  describe('computeMediaFragment tests', () => {
    it('should return empty string when there is no selectedClip', () => {
      expect(computeMediaFragment(clips, null)).toEqual('');
    });
    it('should return a string in the format #t={start},{end} depending on the selected clip', () => {
      expect(computeMediaFragment(clips, 1)).toEqual('#t=12,13');
      expect(computeMediaFragment(clips, 2)).toEqual('#t=3,8');
      expect(computeMediaFragment(clips, 3)).toEqual('#t=14,24');
    });
    it('should return empty string when the selected clip does not exists on the clip list', () => {
      expect(computeMediaFragment(clips, 4)).toEqual('');
    });
    it("should return empty string when the clip's list is empty", () => {
      expect(computeMediaFragment([], 1)).toEqual('');
    });
  });
  describe('getNextClip tests', () => {
    it('should return null when there is no selectedClip', () => {
      expect(getNextClip(clips, null)).toBeNull();
    });
    it("should return the next clip's id", () => {
      expect(getNextClip(clips, 1)).toEqual(2);
      expect(getNextClip(clips, 2)).toEqual(3);
    });
    it("should return null when there is no next clip's id", () => {
      expect(getNextClip(clips, 3)).toBeNull();
    });
    it("should return null when the clip's list is empty", () => {
      expect(getNextClip([], 1)).toBeNull();
    });
  });
  describe('getPrevClip tests', () => {
    it('should return null when there is no selectedClip', () => {
      expect(getPrevClip(clips, null)).toBeNull();
    });
    it("should return the previous clip's id", () => {
      expect(getPrevClip(clips, 2)).toEqual(1);
      expect(getPrevClip(clips, 3)).toEqual(2);
    });
    it("should return null when there is no prev clip's id", () => {
      expect(getPrevClip(clips, 1)).toBeNull();
    });
    it("should return null when the clip's list is empty", () => {
      expect(getPrevClip([], 2)).toBeNull();
    });
  });
});

describe('VideoPlayer component test', () => {
  const player = mount(<PlainVideoPlayer />);
  it('should render properly', () => {
    expect(player.find('video').length).toEqual(1);
  });
  it('should show a Spin component and hide the player controls when watingNext is true', () => {
    player.setProps({ watingNext: true });
    expect(player.find(Spin).length).toEqual(1);
    expect(
      player
        .find('video')
        .at(0)
        .prop('controls')
    ).toBeFalsy();
  });
  it('should hide the Spin component and show the player controls when watingNext is false', () => {
    player.setProps({ watingNext: false });
    expect(player.find(Spin).length).toEqual(0);
    expect(
      player
        .find('video')
        .at(0)
        .prop('controls')
    ).toEqual(true);
  });
  it('should set the src property from the source element inside video according to props', () => {
    player.setProps({ src: 'someurl', fragment: 'somefragment' });
    expect(
      player
        .find('source')
        .at(0)
        .prop('src')
    ).toEqual('someurlsomefragment');
  });
});
