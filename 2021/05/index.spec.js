const { example, calculateOverlaps, calculateOverlapsTwo } = require(".");

test("05a - calculate overlapping horizontal and vertical lines", () => {
  expect(calculateOverlaps(example)).toBe(5);
});

test("05b - calculate all overlapping lines", () => {
  expect(calculateOverlapsTwo(example)).toBe(12);
});
