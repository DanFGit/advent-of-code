import { example, input, findXMAS, findXesOfMAS } from ".";

it("should find all the XMAS in the wordsearch", () => {
  expect(findXMAS(example)).toBe(18);
});

it("should find all the X-MAS in the wordsearch", () => {
  expect(findXesOfMAS(example)).toBe(9);
});
