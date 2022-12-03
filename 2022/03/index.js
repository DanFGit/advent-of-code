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

// would be more efficient to just make a dictionary but that's effort
const calculateItemPriority = (item) => {
  return item > "Z" ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 64 + 26;
};

const findItemInBothCompartments = (rucksacks) => {
  let prioritySum = 0;

  rucksacks.forEach((rucksack) => {
    const compartments = [
      rucksack.substr(0, rucksack.length / 2),
      rucksack.substr(rucksack.length / 2, rucksack.length / 2),
    ];

    // for each item in the first compartment, try to find it in the second
    const duplicate = compartments[0].split("").find((item) => {
      return compartments[1].indexOf(item) !== -1;
    });

    prioritySum += calculateItemPriority(duplicate);
  });

  return prioritySum;
};

const findItemInThreeRucksacks = (rucksacks) => {
  let prioritySum = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const elves = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];

    // for each item in the first elf's rucksack, see if the other elves also have it
    const common = elves[0].split("").find((item) => {
      return elves[1].indexOf(item) !== -1 && elves[2].indexOf(item) !== -1;
    });

    prioritySum += calculateItemPriority(common);
  }

  return prioritySum;
};

module.exports = {
  input,
  example,
  findItemInBothCompartments,
  findItemInThreeRucksacks,
};
