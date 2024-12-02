import {
  example,
  input,
  calculateSafeReports,
  calculateSafeReportsWithinTolerance,
} from ".";

it("should calculate how many reports are safe", () => {
  expect(calculateSafeReports(example)).toBe(2);
});

it("should calculate how many reports are safe within tolerance", () => {
  expect(calculateSafeReportsWithinTolerance(example)).toBe(4);
});
