const {
  example,
  calculateTotalScore,
  calculateMovesAndTotalScore,
  input,
} = require(".");

test("2a - calculate total score with assumption", () => {
  expect(calculateTotalScore(example)).toBe(15);
});

test("2b - calculate moves to make and the total score", () => {
  expect(calculateMovesAndTotalScore(example)).toBe(12);
});
