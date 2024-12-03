import {
  example,
  example2,
  input,
  findInstructions,
  findEnabledInstructions,
} from ".";

it("should add up all of the results of the multiplications", () => {
  expect(findInstructions(example)).toBe(161);
});

it("should add up all of the results of the enabled multiplications", () => {
  expect(findEnabledInstructions(example2)).toBe(48);
});
