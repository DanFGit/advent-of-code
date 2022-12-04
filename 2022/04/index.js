const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  return data.split("\n");
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const findFullyContainedOverlaps = (assignments) => {
  let overlaps = 0;

  assignments.forEach((assignment) => {
    const [first, second] = assignment
      .split(",")
      .map((elf) => elf.split("-").map(Number));

    // if the 1st assignment entirely contains the 2nd assignment
    if (first[0] <= second[0] && first[1] >= second[1]) {
      overlaps += 1;
      return;
    }

    // if the 2nd assignment entirely contains the 1st assignment
    if (second[0] <= first[0] && second[1] >= first[1]) {
      overlaps += 1;
    }
  });

  return overlaps;
};

const findAnyOverlaps = (assignments) => {
  let overlaps = 0;

  assignments.forEach((assignment) => {
    const [first, second] = assignment
      .split(",")
      .map((elf) => elf.split("-").map(Number));

    // if the 1st assignment's 1st section is within the 2nd assignment's range
    if (first[0] >= second[0] && first[0] <= second[1]) {
      overlaps += 1;
      return;
    }

    // if the 1st assignment's last section is within the 2nd assignment's range
    if (first[1] >= second[0] && first[1] <= second[1]) {
      overlaps += 1;
      return;
    }

    // if the 1st assignment's 1st section is within the 2nd assignment's range
    if (second[0] >= first[0] && second[0] <= first[1]) {
      overlaps += 1;
      return;
    }

    // if the 1st assignment's last section is within the 2nd assignment's range
    if (second[1] >= first[0] && second[1] <= first[1]) {
      overlaps += 1;
      return;
    }
  });

  return overlaps;
};

module.exports = {
  input,
  example,
  findFullyContainedOverlaps,
  findAnyOverlaps,
};
