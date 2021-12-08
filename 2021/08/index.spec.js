const {
  example,
  countDigitsWithUniqueSegments,
  calculateSumOfOutputValues,
  input,
} = require(".");

test("08a - calculate digits with unique segments (1, 4, 7, 8)", () => {
  expect(countDigitsWithUniqueSegments(example)).toBe(26);
});

test("08b - sum of the output values", () => {
  expect(calculateSumOfOutputValues(example)).toBe(61229);
});
