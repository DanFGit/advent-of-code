import { example, input, totalDistanceBetweenLists, similarityScore } from ".";

it("should calculate the distance between the two lists", () => {
  expect(totalDistanceBetweenLists(example)).toBe(11);
});

it("should calculate the similarity score of the two lists", () => {
  expect(similarityScore(example)).toBe(31);
});
