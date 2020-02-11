import {sum} from '../index';

describe('sum', () => {
  it('should return sum of passed arguments', () => {
    expect(sum(1, 2, 3, 4)).toBe(10);
  });
});
