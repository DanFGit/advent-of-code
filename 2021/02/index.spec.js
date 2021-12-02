const { example, calculatePosition, calculatePositionWithAim } = require(".");

test("02a - should calculate the position of the sub", () => {
  expect(calculatePosition(example)).toBe(150);
});

test("02b - should calculate the position of the sub with aim", () => {
  expect(calculatePositionWithAim(example)).toBe(900);
});
