const { example, playBingo, playBingoToLose } = require(".");

test("04a - should find the winning board", () => {
  expect(playBingo(example)).toBe(4512);
});

test("04b - should find the losing board", () => {
  expect(playBingoToLose(example)).toBe(1924);
});
