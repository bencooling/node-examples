import test from 'tape';
import squared from './index.js';

test('squared squares numbers', t => {
  const expected = 4;
  t.equal(squared(2), expected, '2 squared is equal to 4');
  t.end();
});
