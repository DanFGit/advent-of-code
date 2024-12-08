import {
  example,
  input,
  findVisitedPositions,
  findObstacleLocationsWhichCauseLoops,
} from ".";

it("should find how many distinct positions the guard visits", () => {
  expect(findVisitedPositions(example)).toBe(41);
});

it("should find how many places we can put an obstacle to trap the guard in a loop", () => {
  expect(findObstacleLocationsWhichCauseLoops(example)).toBe(6);
});
