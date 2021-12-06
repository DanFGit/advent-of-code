const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  return data.split(",").map(Number);
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const breedLanternfish = (values, days) => {
  const fishes = [...values];

  for (let day = 0; day < days; day += 1) {
    const numFishes = fishes.length;

    for (let fish = 0; fish < numFishes; fish += 1) {
      if (fishes[fish] === 0) {
        fishes[fish] = 6;
        fishes.push(8);
      } else {
        fishes[fish] = fishes[fish] - 1;
      }
    }
  }

  return fishes.length;
};

const breedInvincibleLanternfish = (values, days) => {
  let fishesByAge = {
    "-1": 0,
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };

  values.forEach((daysLeft) => {
    const age = 7 - daysLeft;

    if (fishesByAge[age] === undefined) fishesByAge[age] = 1;
    else fishesByAge[age] += 1;
  });

  for (let day = 0; day < days; day += 1) {
    const tomorrow = {
      "-1": 0,
    };

    Object.keys(fishesByAge).forEach((age) => {
      tomorrow[Number(age) + 1] = fishesByAge[age];

      if (age !== "0" && age % 7 === 0) tomorrow["-1"] += fishesByAge[age];
    });

    fishesByAge = tomorrow;
  }

  return Object.keys(fishesByAge).reduce((total, age) => {
    return (total += fishesByAge[age]);
  }, 0);
};

console.log("Part 1 - Example:", breedLanternfish(example, 80));
console.log("Part 1 - Actual: ", breedLanternfish(input, 80));

console.log("Part 2 - Example:", breedInvincibleLanternfish(example, 256));
console.log("Part 2 - Actual: ", breedInvincibleLanternfish(input, 256));

module.exports = {
  input,
  example,
  breedLanternfish,
  breedInvincibleLanternfish,
};
