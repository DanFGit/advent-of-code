const fs = require("fs");
const util = require("util");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  return data.split("\n").map((row) => row.split("").map(Number));
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const findVisibleTrees = (grid) => {
  let visibleTrees = 0;

  grid.forEach((row, y) => {
    row.forEach((tree, x) => {
      // if a tree is on the edge, it's visible
      if (x === 0 || y === 0 || x === grid.length - 1 || y === row.length - 1) {
        visibleTrees += 1;
        return;
      }

      let left = true;
      let right = true;
      let top = true;
      let bottom = true;

      for (let i = x - 1; i >= 0; i -= 1) {
        if (tree <= grid[y][i]) {
          left = false;
          break;
        }
      }

      for (let i = x + 1; i < grid.length; i += 1) {
        if (tree <= grid[y][i]) {
          right = false;
          break;
        }
      }

      for (let i = y - 1; i >= 0; i -= 1) {
        if (tree <= grid[i][x]) {
          top = false;
          break;
        }
      }

      for (let i = y + 1; i < grid.length; i += 1) {
        if (tree <= grid[i][x]) {
          bottom = false;
          break;
        }
      }

      if (left || right || top || bottom) {
        visibleTrees += 1;
      }
    });
  });

  return visibleTrees;
};

const findHighestScenicScore = (grid) => {
  let highest = 0;

  grid.forEach((row, y) => {
    row.forEach((tree, x) => {
      let left = 0;
      let right = 0;
      let top = 0;
      let bottom = 0;

      for (let i = x - 1; i >= 0; i -= 1) {
        left += 1;

        if (tree <= grid[y][i]) break;
      }

      for (let i = x + 1; i < grid.length; i += 1) {
        right += 1;

        if (tree <= grid[y][i]) break;
      }

      for (let i = y - 1; i >= 0; i -= 1) {
        top += 1;

        if (tree <= grid[i][x]) break;
      }

      for (let i = y + 1; i < grid.length; i += 1) {
        bottom += 1;

        if (tree <= grid[i][x]) break;
      }

      const score = left * right * top * bottom;
      if (score > highest) highest = score;
    });
  });

  return highest;
};

module.exports = {
  input,
  example,
  findVisibleTrees,
  findHighestScenicScore,
};
