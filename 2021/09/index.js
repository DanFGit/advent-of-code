const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  const lines = data.split("\n");

  return lines.map((line) => line.split("").map(Number));
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const calculateRiskLevels = (grid) => {
  let risk = 0;

  for (x = 0; x < grid.length; x += 1) {
    for (y = 0; y < grid[x].length; y += 1) {
      const row = grid[x];
      const cell = grid[x][y];

      const up = x === 0 ? Infinity : grid[x - 1][y];
      const left = y === 0 ? Infinity : grid[x][y - 1];
      const down = x === grid.length - 1 ? Infinity : grid[x + 1][y];
      const right = y === row.length - 1 ? Infinity : grid[x][y + 1];

      if (cell < up && cell < left && cell < down && cell < right)
        risk += cell + 1;
    }
  }

  return risk;
};

const calculateBasinSize = (grid, x, y, searched) => {
  if (searched[x][y]) return 0;

  let size = 1;

  // Intentional mutation!
  searched[x][y] = true;

  // Intentional recursion!
  if (x !== 0 && !searched[x - 1][y])
    size += calculateBasinSize(grid, x - 1, y, searched);

  if (x !== grid.length - 1 && !searched[x + 1][y])
    size += calculateBasinSize(grid, x + 1, y, searched);

  if (y !== 0 && !searched[x][y - 1])
    size += calculateBasinSize(grid, x, y - 1, searched);

  if (y !== grid[x].length - 1 && !searched[x][y + 1])
    size += calculateBasinSize(grid, x, y + 1, searched);

  return size;
};

const findLargestBasins = (grid) => {
  const basins = [];

  // This will tell us if a particular cell has already been searched. Any 9's
  // are immediately counted as searched.
  const searched = grid.map((row) => row.map((cell) => cell === 9));

  for (x = 0; x < grid.length; x += 1) {
    const row = grid[x];

    for (y = 0; y < row.length; y += 1) {
      const cell = grid[x][y];

      if (!searched[x][y])
        basins.push(calculateBasinSize(grid, x, y, searched));
    }
  }

  basins.sort((a, b) => (a > b ? -1 : 1));

  return basins[0] * basins[1] * basins[2];
};

console.log("Part 1 - Example:", calculateRiskLevels(example));
console.log("Part 1 - Actual: ", calculateRiskLevels(input));

console.log("Part 2 - Example:", findLargestBasins(example));
console.log("Part 2 - Actual: ", findLargestBasins(input));

module.exports = {
  input,
  example,
  calculateRiskLevels,
  findLargestBasins,
};
