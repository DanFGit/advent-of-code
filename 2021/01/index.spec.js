const {
  example,
  countDepthIncreases,
  countSlidingDepthIncreases,
} = require(".");

test("01a - should count how many times the depth increases", () => {
  expect(countDepthIncreases(example)).toBe(7);
});

test("01b - should count how many times the depth increases with a sliding window", () => {
  expect(countSlidingDepthIncreases(example, 3)).toBe(5);
});
