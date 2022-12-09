const { example, findTailVisits, findNineTailVisits, input } = require(".");

test("9a - find all positions the tail visited at least once", () => {
  expect(findTailVisits(example)).toBe(13);
});

test("9b - find all positions the 9th tail visited at least once", () => {
  expect(findNineTailVisits(example)).toBe(1);
});
