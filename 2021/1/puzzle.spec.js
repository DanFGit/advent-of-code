const {
  example,
  countDepthIncreases,
  countSlidingDepthIncreases,
} = require("./puzzle");

test("should count how many times the depth increases", () => {
  expect(countDepthIncreases(example)).toBe(7);
});

test("should count how many times the depth increases with a sliding window", () => {
  expect(countSlidingDepthIncreases(example, 3)).toBe(5);
});
