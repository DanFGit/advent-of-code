const { example, findTailVisits, findHighestScenicScore, input } = require(".");

test("9a - find all positions the tail visited at least once", () => {
  expect(findTailVisits(example)).toBe(13);
});

// test("9b - find best spot for tree house", () => {
//   expect(findHighestScenicScore(example)).toBe(8);
// });
