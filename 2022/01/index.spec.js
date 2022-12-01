const { example, findMaxCalories, findTopThreeCalories, input } = require(".");

test("1a - find elf with most calories", () => {
  expect(findMaxCalories(example)).toBe(24000);
});

test("1b - find top three elves with most calories", () => {
  expect(findTopThreeCalories(example)).toBe(45000);
});
