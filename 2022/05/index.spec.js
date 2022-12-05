const {
  example,
  findContainersOnTop9000,
  findContainersOnTop9001,
  input,
} = require(".");

test("5a - find containers on top using CrateMover 9000", () => {
  expect(findContainersOnTop9000(example)).toBe("CMZ");
});

test("5b - find containers on top using CrateMover 9001", () => {
  expect(findContainersOnTop9001(example)).toBe("MCD");
});
