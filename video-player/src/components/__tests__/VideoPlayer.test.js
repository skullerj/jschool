import React from 'react';
import { mount } from 'enzyme';
import { Spin } from 'antd';
import {
  computeMediaFragment,
  getNextClip,
  getPrevClip,
  PlainVideoPlayer
} from '../VideoPlayer';

const fixtures = [
  {
    id: 1,
    start: 12,
    end: 13
  },
  {
    id: 2,
    start: 3,
    end: 8
  },
  {
    id: 3,
    start: 14,
    end: 24
  }
];

describe('VideoPlayer functions tests', () => {
  describe('computeMediaFragment tests', () => {
    it('should return empty string when there is no selectedClip', () => {
      expect(computeMediaFragment(fixtures, null)).toEqual('');
    });
    it('should return a string in the format #t={start},{end} depending on the selected clip', () => {
      expect(computeMediaFragment(fixtures, 1)).toEqual('#t=12,13');
      expect(computeMediaFragment(fixtures, 2)).toEqual('#t=3,8');
      expect(computeMediaFragment(fixtures, 3)).toEqual('#t=14,24');
    });
    it('should return empty string when the selected clip does not exists on the clip list', () => {
      expect(computeMediaFragment(fixtures, 4)).toEqual('');
    });
    it("should return empty string when the clip's list is empty", () => {
      expect(computeMediaFragment([], 1)).toEqual('');
    });
  });
  describe('getNextClip tests', () => {
    it('should return null when there is no selectedClip', () => {
      expect(getNextClip(fixtures, null)).toBeNull();
    });
    it("should return the next clip's id", () => {
      expect(getNextClip(fixtures, 1)).toEqual(2);
      expect(getNextClip(fixtures, 2)).toEqual(3);
    });
    it("should return null when there is no next clip's id", () => {
      expect(getNextClip(fixtures, 3)).toBeNull();
    });
    it("should return null when the clip's list is empty", () => {
      expect(getNextClip([], 1)).toBeNull();
    });
  });
  describe('getPrevClip tests', () => {
    it('should return null when there is no selectedClip', () => {
      expect(getPrevClip(fixtures, null)).toBeNull();
    });
    it("should return the previous clip's id", () => {
      expect(getPrevClip(fixtures, 2)).toEqual(1);
      expect(getPrevClip(fixtures, 3)).toEqual(2);
    });
    it("should return null when there is no prev clip's id", () => {
      expect(getPrevClip(fixtures, 1)).toBeNull();
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
