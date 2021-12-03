const {
  example,
  calculatePowerConsumption,
  calculateLifeSupportRating,
} = require(".");

test("03a - should calculate the power consumption", () => {
  expect(calculatePowerConsumption(example)).toBe(198);
});

test("03b - should calculate the life support rating", () => {
  expect(calculateLifeSupportRating(example)).toBe(230);
});
