const {
  example,
  calculatePosition,
  calculatePositionWithAim,
} = require("./puzzle");

test("should calculate the position of the sub", () => {
  expect(calculatePosition(example)).toBe(150);
});

test("should calculate the position of the sub with aim", () => {
  expect(calculatePositionWithAim(example)).toBe(900);
});
