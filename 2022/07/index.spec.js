const {
  example,
  sumDirectorySize,
  findDirectoryToDelete,
  input,
} = require(".");

test("7a - calculate sum of directory sizes (excluding dirs larger than 100,000)", () => {
  expect(sumDirectorySize(example, 100000)).toBe(95437);
});

test("7b - find directory to delete", () => {
  expect(findDirectoryToDelete(example, 70000000, 30000000)).toBe(24933642);
});
