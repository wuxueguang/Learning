const sum = require('../src/sum');

afterAll(() => {
  console.log('after all after 1000ms')
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('true', () => {
  const n = undefined;
  expect(n).not.toBeNull();
  // expect(n).toBeDefined();
  // expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  // expect(n).not.toBeFalsy();
});