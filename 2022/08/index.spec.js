const {
  example,
  findVisibleTrees,
  findHighestScenicScore,
  input,
} = require(".");

test("8a - calculate sum of directory sizes (excluding dirs larger than 100,000)", () => {
  expect(findVisibleTrees(example)).toBe(21);
});

test("8b - find best spot for tree house", () => {
  expect(findHighestScenicScore(example)).toBe(8);
});
