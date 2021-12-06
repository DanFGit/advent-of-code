const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  const coords = data.split("\n").map((line) => {
    const string = line.split(" -> ");

    const [x1, y1] = string[0].split(",");
    const [x2, y2] = string[1].split(",");

    return [
      [Number(x1), Number(y1)],
      [Number(x2), Number(y2)],
    ];
  });

  return coords;
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const calculateOverlaps = (values) => {
  const positions = {};

  values.forEach((coords) => {
    const [[x1, y1], [x2, y2]] = coords;

    // Only horizontal and vertical lines
    if (x1 != x2 && y1 != y2) return;

    for (i = x1; i <= x2; i += 1) {
      if (x1 === x2) break;

      if (positions[`${i},${y1}`] === undefined) positions[`${i},${y1}`] = 0;
      positions[`${i},${y1}`] += 1;
    }

    for (i = x1; i >= x2; i -= 1) {
      if (x1 === x2) break;

      if (positions[`${i},${y1}`] === undefined) positions[`${i},${y1}`] = 0;
      positions[`${i},${y1}`] += 1;
    }

    for (i = y1; i <= y2; i += 1) {
      if (y1 === y2) break;

      if (positions[`${x1},${i}`] === undefined) positions[`${x1},${i}`] = 0;
      positions[`${x1},${i}`] += 1;
    }

    for (i = y1; i >= y2; i -= 1) {
      if (y1 === y2) break;

      if (positions[`${x1},${i}`] === undefined) positions[`${x1},${i}`] = 0;
      positions[`${x1},${i}`] += 1;
    }
  });

  let count = 0;
  Object.keys(positions).forEach((position) => {
    if (positions[position] > 1) count += 1;
  });

  return count;
};

calculateOverlapsTwo = (values) => {
  const positions = {};

  values.forEach((coords) => {
    const [[x1, y1], [x2, y2]] = coords;

    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;
    const isDiagonal = !isHorizontal && !isVertical;

    // [0, 0], [2, 0]    horizontal ltr
    // [2, 0], [0, 0]    horizontal rtl
    // [0, 0], [0, 2]    vertical ttb
    // [0, 2], [0, 0]    vertical btt
    // [0, 0], [2, 2]    diagonal tl br
    // [2, 2], [0, 0]    diagonal br tl
    // [2, 0], [0, 2]    diagonal tr bl
    // [0, 2], [2, 0]    diagonal bl tr

    if (isHorizontal) {
      const left = Math.min(x1, x2);
      const right = Math.max(x1, x2);

      console.log("left", [left, y1], [right, y2]);
    }

    // console.log({ isHorizontal, isVertical, isDiagonal });
  });

  let count = 0;
  Object.keys(positions).forEach((position) => {
    if (positions[position] > 1) count += 1;
  });

  return count;
};

// console.log("Part 1 - Example:", calculateOverlaps(example));
// console.log("Part 1 - Actual: ", calculateOverlaps(input));

console.log("Part 2 - Example:", calculateOverlapsTwo(example));
// console.log("Part 2 - Actual: ", calculateOverlapsTwo(input));

module.exports = {
  input,
  example,
  calculateOverlaps,
  calculateOverlapsTwo,
};
