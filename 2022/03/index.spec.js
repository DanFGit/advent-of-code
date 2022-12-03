const {
  example,
  findItemInBothCompartments,
  findItemInThreeRucksacks,
  input,
} = require(".");

test("3a - find item in both rucksack compartments", () => {
  expect(findItemInBothCompartments(example)).toBe(157);
});

test("3b - find item in all three rucksacks", () => {
  expect(findItemInThreeRucksacks(example)).toBe(70);
});
