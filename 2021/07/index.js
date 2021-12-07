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

const calculateFuel = (values) => {
  const crabs = values.sort((a, b) => a - b);
  const median = crabs[crabs.length / 2];

  let fuel = 0;

  crabs.forEach((crab) => {
    fuel += Math.abs(crab - median);
  });

  return fuel;
};

const calculateFuelPartTwo = (values) => {
  const max = Math.max(...values);
  const min = Math.min(...values);

  let lowestFuel = Infinity;

  // Brute force it
  for (let destination = min; destination < max; destination += 1) {
    let fuel = 0;

    values.forEach((crab) => {
      const distance = Math.abs(crab - destination);
      const fuelCost = (distance * (distance + 1)) / 2;

      fuel += fuelCost;
    });

    if (fuel < lowestFuel) lowestFuel = fuel;
  }

  return lowestFuel;
};

console.log("Part 1 - Example:", calculateFuel(example));
console.log("Part 1 - Actual: ", calculateFuel(input));

console.log("Part 2 - Example:", calculateFuelPartTwo(example));
console.log("Part 2 - Actual: ", calculateFuelPartTwo(input));

module.exports = {
  input,
  example,
  calculateFuel,
  calculateFuelPartTwo,
};
