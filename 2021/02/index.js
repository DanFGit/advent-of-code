const input = require("./input");
const example = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

const calculatePosition = (values) => {
  let depth = 0;
  let hPos = 0;

  values.forEach((value) => {
    const [instruction, count] = value.split(" ");

    switch (instruction) {
      case "forward":
        hPos += Number(count);
        return;

      case "down":
        depth += Number(count);
        return;

      case "up":
        depth -= Number(count);
        return;

      default:
        throw new Error("nope");
    }
  });

  return depth * hPos;
};

const calculatePositionWithAim = (values) => {
  let depth = 0;
  let hPos = 0;
  let aim = 0;

  values.forEach((value) => {
    const [instruction, count] = value.split(" ");

    switch (instruction) {
      case "forward":
        hPos += Number(count);
        depth += Number(count) * aim;
        return;

      case "down":
        aim += Number(count);
        return;

      case "up":
        aim -= Number(count);
        return;

      default:
        throw new Error("nope");
    }
  });

  return depth * hPos;
};

console.log("Part 1 - Example:", calculatePosition(example));
console.log("Part 1 - Actual: ", calculatePosition(input));

console.log("Part 2 - Example:", calculatePositionWithAim(example));
console.log("Part 2 - Actual: ", calculatePositionWithAim(input));

module.exports = {
  input,
  example,
  calculatePosition,
  calculatePositionWithAim,
};
