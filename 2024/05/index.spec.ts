import {
  example,
  input,
  findMiddlePageTotal,
  findMiddlePageTotalOfInvalidUpdates,
} from ".";

it("should find the middle page of all valid updates", () => {
  expect(findMiddlePageTotal(example)).toBe(143);
});

it("should find the middle page of all invalid updates, after making them valid", () => {
  expect(findMiddlePageTotalOfInvalidUpdates(example)).toBe(123);
});
