// this should be the imported module for the test
function sum(a, b) {
  return a + b;
}

// Test case 1: Basic addition
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
  
// Test case 2: Negative numbers
test('adds -1 + (-1) to equal -2', () => {
  expect(sum(-1, -1)).toBe(-2);
});
  
// Test case 3: Zero handling
test('adds 0 + 5 to equal 5', () => {
  expect(sum(0, 5)).toBe(5);
});