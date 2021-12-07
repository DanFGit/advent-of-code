const { example, calculateFuel, calculateFuelPartTwo, input } = require(".");

test("07a - calculate fuel", () => {
  expect(calculateFuel(example)).toBe(37);
});

test("07b - calculate fuel", () => {
  expect(calculateFuelPartTwo(example)).toBe(168);
});
