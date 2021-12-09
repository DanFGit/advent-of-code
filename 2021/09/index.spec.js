const { example, calculateRiskLevels, findLargestBasins, input } = require(".");

test("09a - calculate risk levels of lava tubes", () => {
  expect(calculateRiskLevels(example)).toBe(15);
});

test("09b - find largest basins", () => {
  expect(findLargestBasins(example)).toBe(1134);
});
