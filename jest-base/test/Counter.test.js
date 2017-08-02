// 
import Counter from '../src/Counter.js';

describe('Counter', function() {
  describe('increment()', function() {
    it('shoud be increment', () => {
      const counter = new Counter(1);
      counter.increment();
      expect(counter.count).toBe(2);
    })
  });
});