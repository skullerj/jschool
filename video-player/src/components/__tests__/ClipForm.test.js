import moment from 'moment';
import { getSeconds, validateTime } from '../ClipForm';

describe('Clip Form functions tests', () => {
  describe('getSeconds test', () => {
    it('should return 0 when falsy value is passed', () => {
      expect(getSeconds(null)).toEqual(0);
    });
    it('should return 0 seconds', () => {
      expect(getSeconds(moment('00:00:00', 'HH:mm:ss'))).toEqual(0);
    });
    it('should return 7 seconds', () => {
      expect(getSeconds(moment('00:00:07', 'HH:mm:ss'))).toEqual(7);
    });
    it('should return 17 seconds', () => {
      expect(getSeconds(moment('00:00:17', 'HH:mm:ss'))).toEqual(17);
    });
    it('should return 67 seconds', () => {
      expect(getSeconds(moment('00:01:07', 'HH:mm:ss'))).toEqual(67);
    });
  });
  describe('validateTime tests', () => {
    const duration = 60;
    describe('Validating start time', () => {
      it('should return an error when value is null', () => {
        const result = validateTime('Start', duration, null, 0);
        expect(result.map(e => e.message)).toContain('Start time is required');
      });
      it('should return an error when value exceeds duration', () => {
        const result = validateTime(
          'Start',
          duration,
          duration + 10,
          duration + 20
        );
        expect(result.map(e => e.message)).toContain(
          'Start time exceeds video duration'
        );
      });
      it('should return an error when value is equal to end time', () => {
        const result = validateTime('Start', duration, 10, 10);
        expect(result.map(e => e.message)).toContain(
          'Start time must be behind end time'
        );
      });
      it('should return an error when value is greater than end time', () => {
        const result = validateTime('Start', duration, 12, 10);
        expect(result.map(e => e.message)).toContain(
          'Start time must be behind end time'
        );
      });
      it('should return no errors', () => {
        const result = validateTime('Start', duration, 8, 10);
        expect(result.length).toEqual(0);
      });
    });
    describe('Validating end time', () => {
      it('should return an error when value is null', () => {
        const result = validateTime('End', duration, null, 0);
        expect(result.map(e => e.message)).toContain('End time is required');
      });
      it('should return an error when value exceeds duration', () => {
        const result = validateTime(
          'End',
          duration,
          duration + 10,
          duration + 20
        );
        expect(result.map(e => e.message)).toContain(
          'End time exceeds video duration'
        );
      });
      it('should return an error when value is equal to start time', () => {
        const result = validateTime('End', duration, 10, 10);
        expect(result.map(e => e.message)).toContain(
          'End time must be ahead start time'
        );
      });
      it('should return an error when value is less than end time', () => {
        const result = validateTime('End', duration, 8, 10);
        expect(result.map(e => e.message)).toContain(
          'End time must be ahead start time'
        );
      });
      it('should return no errors', () => {
        const result = validateTime('End', duration, 10, 8);
        expect(result.length).toEqual(0);
      });
    });
  });
});
