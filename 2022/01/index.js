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

const findMaxCalories = (values) => {
  let max = 0;
  let current = 0;

  values.forEach((value) => {
    if (value === "") {
      if (current > max) max = current;
      current = 0;
    } else {
      current += Number(value);
    }
  });

  // realised after part 2 that this wouldn't work if the last elf
  // was the one with the most calories... oh well

  return max;
};

const findTopThreeCalories = (values) => {
  let elvesCalories = [];
  let current = 0;

  // loop through all the calories
  values.forEach((value) => {
    if (value === "") {
      elvesCalories.push(current); // add elf to list
      current = 0; // start a new elf
    } else {
      current += Number(value);
    }
  });

  // don't forget to add the last elf
  elvesCalories.push(current);

  // sort the elves
  elvesCalories.sort((a, b) => (a > b ? -1 : 1));

  return elvesCalories[0] + elvesCalories[1] + elvesCalories[2];
};

// console.log("Part 1 - Example:", findMaxCalories(example));
// console.log("Part 1 - Actual: ", findMaxCalories(input));

// console.log("Part 2 - Example:", findTopThreeCalories(example));
// console.log("Part 2 - Actual: ", findTopThreeCalories(input));

module.exports = {
  input,
  example,
  findMaxCalories,
  findTopThreeCalories,
};
