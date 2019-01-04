import { formatSecondsToMin } from '../ClipList';

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
