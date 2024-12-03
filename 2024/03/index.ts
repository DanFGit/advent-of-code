const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input"): string => {
  return fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");
};

const input = loadInput("input");
const example = loadInput("example");
const example2 = loadInput("example2");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const findInstructions = (instructions: string) => {
  const valid = instructions.matchAll(/mul\((\d+),(\d+)\)/g);

  let total = 0;

  for (let instruction of valid) {
    total += Number(instruction[1]) * Number(instruction[2]);
  }

  return total;
};

const findEnabledInstructions = (instructions: string) => {
  const valid = instructions.matchAll(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g);

  let total = 0;
  let enabled = true;

  for (let instruction of valid) {
    if (instruction[0] === "don't()") enabled = false;
    if (instruction[0] === "do()") enabled = true;

    if (instruction[0].startsWith("mul") && enabled === true) {
      total += Number(instruction[1]) * Number(instruction[2]);
    }
  }

  return total;
};

export { input, example, example2, findInstructions, findEnabledInstructions };
