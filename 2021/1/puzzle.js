const input = require("./input");
const example = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const countDepthIncreases = (values) => {
  let count = 0;

  for (i = 1; i < values.length; i += 1) {
    if (values[i] > values[i - 1]) count += 1;
  }

  return count;
};

const countSlidingDepthIncreases = (values, window) => {
  let count = 0;
  let previousWindow = Infinity; // start at infinity as the first window can't be higher than anything

  for (i = 2; i < values.length; i += 1) {
    const thisWindow = values[i - 2] + values[i - 1] + values[i];

    if (thisWindow > previousWindow) count += 1;

    previousWindow = thisWindow;
  }

  return count;
};

console.log("Part 1 - Example:", countDepthIncreases(example));
console.log("Part 1 - Actual: ", countDepthIncreases(input));

console.log("Part 2 - Example:", countSlidingDepthIncreases(example));
console.log("Part 2 - Actual: ", countSlidingDepthIncreases(input));

module.exports = {
  input,
  example,
  countDepthIncreases,
  countSlidingDepthIncreases,
};
