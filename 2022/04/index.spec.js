const {
  example,
  findFullyContainedOverlaps,
  findAnyOverlaps,
  input,
} = require(".");

test("4a - find fully contained overlaps", () => {
  expect(findFullyContainedOverlaps(example)).toBe(2);
});

test("4b - find any overlaps", () => {
  expect(findAnyOverlaps(example)).toBe(4);
});
